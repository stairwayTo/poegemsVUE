import type { GemSummary } from '@/type/gem.ts'
import { getGems } from '@/services/poeNinjaService.ts'
import gemsData from '@/data/gems.json'

type GemsDataType = Record<string, { maxLevel: number; xpToMax: number; gemClass: string }>
const localGemsData = gemsData as GemsDataType

const CACHE_KEY = 'poegems-summaries-v2'
const ONE_HOUR = 60 * 60 * 1000

export async function getGemSummaries(): Promise<GemSummary[]> {
  // Cache des données transformées (légères)
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    const { timestamp, data } = JSON.parse(cached)
    if (Date.now() - timestamp < ONE_HOUR) return data
  }

  const gems = await getGems()
  const nonCorruptedGems = gems.filter((gem) => !gem.corrupted && gem.count >= 10)

  const grouped = (nonCorruptedGems as any[]).reduce((acc: Record<string, any[]>, gem: any) => {
    if (!acc[gem.name]) acc[gem.name] = []
    acc[gem.name].push(gem)
    return acc
  }, {})

  const summaries: GemSummary[] = Object.values(grouped).map((gems) => {
    const maxLevel = Math.max(...gems.map((g) => g.gemLevel))
    let lvl1Price: number | undefined
    let lvl1q20Price: number | undefined
    let lvlMaxPrice: number | undefined
    let lvlMaxq20Price: number | undefined

    for (const gem of gems) {
      if (gem.gemLevel === 1 && !gem.gemQuality) lvl1Price = gem.chaosValue
      if (gem.gemLevel === 1 && gem.gemQuality === 20) lvl1q20Price = gem.chaosValue
      if (gem.gemLevel === maxLevel && !gem.gemQuality) lvlMaxPrice = gem.chaosValue
      if (gem.gemLevel === maxLevel && gem.gemQuality === 20) lvlMaxq20Price = gem.chaosValue
    }

    const gemName = gems[0].name
    const gemInfo = localGemsData[gemName]
    const xpToMax = gemInfo?.xpToMax ?? 0
    const gemClass = gemInfo?.gemClass ?? 'Unknown'

    const profit1_0To1_20 =
      lvl1Price !== undefined && lvl1q20Price !== undefined
        ? Math.round(lvl1q20Price - lvl1Price)
        : undefined

    const profit1_0ToMax_0 =
      lvl1Price !== undefined && lvlMaxPrice !== undefined
        ? Math.round(lvlMaxPrice - lvl1Price)
        : undefined

    const profitPerMXp =
      profit1_0ToMax_0 !== undefined && xpToMax > 0
        ? Math.round((profit1_0ToMax_0 / (xpToMax / 1_000_000)) * 100) / 100
        : undefined

    return {
      name: gemName,
      icon: gems[0].icon,
      lvl1Price,
      lvl1q20Price,
      lvlMaxPrice,
      lvlMaxq20Price,
      maxLevel,
      profit1_0To1_20,
      profit1_0ToMax_0,
      profit1_0ToMax_20:
        lvl1Price !== undefined && lvlMaxq20Price !== undefined
          ? Math.round(lvlMaxq20Price - lvl1Price)
          : undefined,
      profit1_20ToMax_20:
        lvl1q20Price !== undefined && lvlMaxq20Price !== undefined
          ? Math.round(lvlMaxq20Price - lvl1q20Price)
          : undefined,
      xpToMax,
      gemClass,
      profitPerMXp,
    }
  })

  localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: summaries }))
  return summaries
}
