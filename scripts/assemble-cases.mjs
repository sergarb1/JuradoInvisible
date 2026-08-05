#!/usr/bin/env node
/**
 * Ensambla los casos desde fragmentos JSON.
 *
 * Fuente de verdad: data/cases/<id>/ (meta.json, characters.json, endings.json,
 * events/*.json). Este script fusiona cada caso y escribe el JSON único en:
 *   - data/cases/<id>.json            (lo importan los tests)
 *   - public/data/cases/<id>.json     (lo sirve la app en runtime)
 *
 * Uso:
 *   node scripts/assemble-cases.mjs            # ensambla todo
 *   node scripts/assemble-cases.mjs --watch    # regenera al detectar cambios
 */
import { readFileSync, readdirSync, writeFileSync, statSync, watch } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = process.cwd()
const casesDir = join(root, 'data', 'cases')
const schemaDir = join(root, 'data', 'schema')

function fail(msg) {
  const err = new Error(msg)
  err.isAssemblyError = true
  throw err
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch (err) {
    fail(`JSON inválido en ${file}: ${err.message}`)
  }
}

function findCaseFolders() {
  return readdirSync(casesDir).filter((name) => statSync(join(casesDir, name)).isDirectory())
}

function listEventFiles(caseDir) {
  const files = readdirSync(join(caseDir, 'events')).filter((f) => extname(f) === '.json')
  files.sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
  return files
}

/**
 * Ensambla un caso desde su carpeta de fragmentos y lo valida de forma
 * estructural (referencias, días, duplicados). Devuelve el objeto CaseData.
 */
export function assembleCase(caseName) {
  const caseDir = join(casesDir, caseName)
  const meta = readJson(join(caseDir, 'meta.json'))
  const characters = readJson(join(caseDir, 'characters.json'))
  const endings = readJson(join(caseDir, 'endings.json'))
  const prefix = `${caseName}: `

  if (!Array.isArray(characters)) fail(`${prefix}characters.json debe ser un array`)
  if (!Array.isArray(endings)) fail(`${prefix}endings.json debe ser un array`)

  const events = listEventFiles(caseDir).map((f) => {
    const event = readJson(join(caseDir, 'events', f))
    if (!event || typeof event.id !== 'string') fail(`${prefix}events/${f}: falta id`)
    return event
  })

  const charIds = new Set(characters.map((c) => c?.id))
  const seen = new Set()
  for (const ev of events) {
    if (seen.has(ev.id)) fail(`${prefix}id de evento duplicado: ${ev.id}`)
    seen.add(ev.id)
    if (!charIds.has(ev.actor)) fail(`${prefix}evento ${ev.id} referencia actor desconocido: ${ev.actor}`)
    if (!Number.isInteger(ev.day) || ev.day < 1 || ev.day > meta.days) {
      fail(`${prefix}evento ${ev.id} fuera de días (1..${meta.days}): día ${ev.day}`)
    }
    if (!Array.isArray(ev.choices) || ev.choices.length === 0) {
      fail(`${prefix}evento ${ev.id} no tiene opciones`)
    }
  }

  return { ...meta, characters, events, endings }
}

function checkRequired(caseName, merged) {
  const required = readJson(join(schemaDir, 'case.schema.json')).required
  for (const key of required) {
    if (!(key in merged)) fail(`${caseName}: falta el campo requerido "${key}"`)
  }
}

function writeMerged(caseName, merged) {
  const json = JSON.stringify(merged, null, 2) + '\n'
  writeFileSync(join(casesDir, `${caseName}.json`), json)
  writeFileSync(join(root, 'public', 'data', 'cases', `${caseName}.json`), json)
}

/** Ensambla todos los casos de las subcarpetas de data/cases/. */
export function assembleAll() {
  const folders = findCaseFolders()
  if (folders.length === 0) fail('no hay carpetas de caso en data/cases/')
  for (const name of folders) {
    const merged = assembleCase(name)
    checkRequired(name, merged)
    writeMerged(name, merged)
    console.log(
      `  ✓ ${name}: ${merged.events.length} eventos, ${merged.characters.length} personajes, ${merged.endings.length} finales`
    )
  }
  console.log(`[assemble-cases] ${folders.length} caso(s) ensamblado(s).`)
  return folders
}

function runWatch() {
  assembleAll()
  console.log('[assemble-cases] --watch activo. Regenerando al detectar cambios...')
  watch(casesDir, { recursive: true }, () => {
    try {
      assembleAll()
    } catch (err) {
      console.error(`[assemble-cases] ${err.message}`)
    }
  })
}

const isMain = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url
if (isMain) {
  const args = process.argv.slice(2)
  try {
    if (args.includes('--watch')) runWatch()
    else assembleAll()
  } catch (err) {
    console.error(`\n[assemble-cases] ERROR: ${err.message}`)
    process.exit(1)
  }
}