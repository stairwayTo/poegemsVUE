import type { GemSummary } from '@/type/gem.ts'
import { getGems } from '@/services/poeNinjaService.ts'

export async function getGemSummaries(): Promise<GemSummary[]> {
  const gems = await getGems()
  const nonCorruptedGems = gems.filter((gem) => !gem.corrupted && gem.count >= 10)

  const grouped = (nonCorruptedGems as any[]).reduce((acc: Record<string, any[]>, gem: any) => {
    if (!acc[gem.name]) acc[gem.name] = []
    acc[gem.name].push(gem)
    return acc
  }, {})

  return Object.values(grouped).map((gems) => {
    const maxLevel = Math.max(...gems.map((g) => g.gemLevel))
    let lvl1Price
    let lvl1q20Price
    let lvlMaxPrice
    let lvlMaxq20Price

    for (const gem of gems) {
      if (gem.gemLevel === 1 && !gem.gemQuality) lvl1Price = gem.chaosValue
      if (gem.gemLevel === 1 && gem.gemQuality === 20) lvl1q20Price = gem.chaosValue
      if (gem.gemLevel === maxLevel && !gem.gemQuality) lvlMaxPrice = gem.chaosValue
      if (gem.gemLevel === maxLevel && gem.gemQuality === 20) lvlMaxq20Price = gem.chaosValue
    }
    return {
      name: gems[0].name,
      icon: gems[0].icon,
      lvl1Price,
      lvl1q20Price,
      lvlMaxPrice,
      lvlMaxq20Price,
      maxLevel,
      profit1_0ToMax_0:
        lvl1Price !== undefined && lvlMaxPrice !== undefined
          ? Math.round(lvlMaxPrice - lvl1Price)
          : undefined,
      profit1_0ToMax_20:
        lvl1Price !== undefined && lvlMaxq20Price !== undefined
          ? Math.round(lvlMaxq20Price - lvl1Price)
          : undefined,
      profit1_20ToMax_20:
        lvl1q20Price !== undefined && lvlMaxq20Price !== undefined
          ? Math.round(lvlMaxq20Price - lvl1q20Price)
          : undefined,
    }
  })
}
