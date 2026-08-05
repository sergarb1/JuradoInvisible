import type { CaseData } from '../models/types'
import type { SimulationState } from '../models/sim'

export interface StorageAdapter {
  get(key: string): string | null | Promise<string | null>
  set(key: string, value: string): void | Promise<void>
  remove(key: string): void | Promise<void>
}

/** Adaptador de memoria (tests). */
export class MemoryStorage implements StorageAdapter {
  private store = new Map<string, string>()
  get(key: string): string | null {
    return this.store.get(key) ?? null
  }
  set(key: string, value: string): void {
    this.store.set(key, value)
  }
  remove(key: string): void {
    this.store.delete(key)
  }
}

function getLocalStorage(): StorageAdapter | null {
  try {
    const ls = typeof localStorage !== 'undefined' ? localStorage : null
    if (ls) {
      return {
        get: (k) => ls.getItem(k),
        set: (k, v) => ls.setItem(k, v),
        remove: (k) => ls.removeItem(k),
      }
    }
  } catch {
    return null
  }
  return null
}

function getIndexedDB(): StorageAdapter | null {
  const idbCandidate: IDBFactory | undefined =
    typeof indexedDB !== 'undefined'
      ? indexedDB
      : (globalThis as unknown as { indexedDB?: IDBFactory }).indexedDB
  if (!idbCandidate) return null
  const idb = idbCandidate

  const DB_NAME = 'jurado-invisible'
  const STORE = 'saves'

  function openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const req = idb.open(DB_NAME, 1)
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE)) {
          req.result.createObjectStore(STORE)
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }

  return {
    async get(key: string): Promise<string | null> {
      const db = await openDb()
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly')
        const req = tx.objectStore(STORE).get(key)
        req.onsuccess = () => resolve((req.result as string) ?? null)
        req.onerror = () => reject(req.error)
      })
    },
    async set(key: string, value: string): Promise<void> {
      const db = await openDb()
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite')
        tx.objectStore(STORE).put(value, key)
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      })
    },
    async remove(key: string): Promise<void> {
      const db = await openDb()
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite')
        tx.objectStore(STORE).delete(key)
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      })
    },
  }
}

export interface SaveData {
  version: 1
  savedAt: string
  caseData: CaseData
  state: SimulationState
}

const SAVE_KEY = 'current'

/**
 * Sistema de guardado. Usa IndexedDB si está disponible y cae a localStorage.
 */
export class SaveSystem {
  private backend: StorageAdapter

  constructor(adapter?: StorageAdapter) {
    this.backend = adapter ?? getIndexedDB() ?? getLocalStorage() ?? new MemoryStorage()
  }

  async save(caseData: CaseData, state: SimulationState): Promise<void> {
    const data: SaveData = {
      version: 1,
      savedAt: new Date().toISOString(),
      caseData,
      state,
    }
    await this.backend.set(SAVE_KEY, JSON.stringify(data))
  }

  async load(): Promise<SaveData | null> {
    const raw = await this.backend.get(SAVE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SaveData
  }

  async clear(): Promise<void> {
    await this.backend.remove(SAVE_KEY)
  }

  async exportSave(): Promise<string> {
    const data = await this.load()
    if (!data) throw new Error('No hay partida que exportar')
    return JSON.stringify(data, null, 2)
  }

  async importSave(json: string): Promise<SaveData> {
    const data = JSON.parse(json) as SaveData
    if (data.version !== 1 || !data.caseData || !data.state) {
      throw new Error('JSON de partida inválido')
    }
    await this.backend.set(SAVE_KEY, JSON.stringify(data))
    return data
  }
}

export { getLocalStorage, getIndexedDB }
