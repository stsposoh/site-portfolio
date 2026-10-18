import { copyFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const outputDir = new URL('../.output/public/', import.meta.url).pathname
const uploadsDir = new URL('../../backend/public/uploads/', import.meta.url).pathname
const targetDir = join(outputDir, 'uploads')

const files = readdirSync(outputDir, { recursive: true }).filter((file) =>
  /\.(html|json)$/.test(file)
)

const used = new Set()
for (const file of files) {
  const content = readFileSync(join(outputDir, file), 'utf8')
  // Payloads escape slashes as unicode sequences
  for (const [, name] of content.matchAll(/(?:\/|\\u002F)uploads(?:\/|\\u002F)([\w.-]+)/g)) {
    used.add(name)
  }
}

mkdirSync(targetDir, { recursive: true })
used.forEach((name) => copyFileSync(join(uploadsDir, name), join(targetDir, name)))

console.log(`Copied ${used.size} uploads to .output/public/uploads`)
