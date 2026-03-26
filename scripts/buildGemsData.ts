import axios from 'axios'
import { writeFileSync } from 'fs'

const WIKI_API = 'https://www.poewiki.net/w/api.php'

async function fetchAllGems(): Promise<{ name: string, gemClass: string }[]> {
  const allGems: { name: string, gemClass: string }[] = []
  let offset = 0
  while (true) {
    const response = await axios.get(WIKI_API, {
      params: {
        action: 'cargoquery',
        tables: 'items',
        fields: 'items.name,items.class',
        where: 'items.class="Skill Gem" OR items.class="Support Gem"',
        format: 'json',
        limit: '500',
        offset: offset
      }
    })
    const batch = response.data.cargoquery.map((entry: any) => ({
      name: entry.title.name,
      gemClass: entry.title.class
    }))
    allGems.push(...batch)
    console.log(`📦 ${allGems.length} gems récupérées...`)
    if (batch.length < 500) break
    offset += 500
  }
  return allGems.filter((gem: any) => !gem.name.includes('{{'))
}

async function fetchGemMaxXp(gem: { name: string, gemClass: string }): Promise<{ maxLevel: number, xpToMax: number, gemClass: string }> {
  const response = await axios.get(WIKI_API, {
    params: {
      action: 'cargoquery',
      tables: 'items,skill_levels',
      join_on: 'items._pageID=skill_levels._pageID',
      fields: 'items.name,skill_levels.level,skill_levels.experience',
      where: `items.name="${gem.name}"`,
      format: 'json',
      limit: '30'
    }
  })
  const entries = response.data.cargoquery.map((e: any) => e.title)
  const levelable = entries.filter((e: any) => e.experience !== null)
  const maxEntry = levelable[levelable.length - 1]
  if (levelable.length === 0) {
    console.warn(`⚠️ Pas de données XP pour : ${gem.name}`)
    return {
      maxLevel: null,
      xpToMax: null,
      gemClass: gem.gemClass
    }
  }
  return {
    maxLevel: parseInt(maxEntry.level),
    xpToMax: parseInt(maxEntry.experience),
    gemClass: gem.gemClass
  }
}

async function fetchInBatches<T>(
  items: { name: string, gemClass: string }[],
  batchSize: number,
  fn: (item: { name: string, gemClass: string }) => Promise<T>
): Promise<T[]> {
  const results: T[] = []
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(fn))
    results.push(...batchResults)
    console.log(`✅ ${Math.min(i + batchSize, items.length)}/${items.length} gems traitées`)
  }
  return results
}

async function main() {
  console.log('🔍 Récupération de la liste des gems...')
  const gems = await fetchAllGems() // 🔧 fetchAllGems() au lieu de fetchAllGemNames()
  console.log(`📋 ${gems.length} gems trouvées`)

  console.log('⚡ Récupération des données XP...')
  const gemsData = await fetchInBatches(gems, 10, fetchGemMaxXp)

  // 🔧 On utilise gems[index].name pour la clé
  const result: Record<string, { maxLevel: number, xpToMax: number, gemClass: string }> = {}
  gems.forEach((gem, index) => {
    const data = gemsData[index]
    if (data.maxLevel !== null) { // 🆕 on ignore les gems sans XP
      result[gem.name] = data
    }
  })
  writeFileSync('src/data/gems.json', JSON.stringify(result, null, 2))
  console.log('✅ gems.json généré avec succès !')
}

main()
