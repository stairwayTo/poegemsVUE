<script setup lang="ts">
import { computed } from 'vue'
import GemCard from '@/components/GemCard.vue'
import gemsData from './data/gems.json'

interface Gem {
  id: number
  name: string
  icon: string
  gemLevel: number
  gemQuality: number
  chaosValue: number
  corrupted: boolean
}

interface GemSummary {
  name: string
  icon: string
  lvl1Price?: number
  lvl1q20Price?: number
  lvlMaxPrice?: number
  lvlMaxq20Price?: number
  maxLevel: number
  profit10ToMax0?: number
  profit10ToMax20?: number
  profit120ToMax20?: number
}

const gemResults = computed<GemSummary[]>(() => {
  const nonCorruptedGems = gemsData.lines.filter(gem => !gem.corrupted)

  const grouped = nonCorruptedGems.reduce<Record<string, Gem[]>>((acc, gem) => {
    if (!acc[gem.name]) acc[gem.name] = []
    acc[gem.name].push(gem)
    return acc
  }, {})

  return Object.values(grouped).map((gems) => {
    const maxLevel = Math.max(...gems.map(g => g.gemLevel))

    const lvl1Price = gems.find(
      g => g.gemLevel === 1 && !g.gemQuality)?.chaosValue

    const lvl1q20Price = gems.find(
      g => g.gemLevel === 1 && g.gemQuality === 20)?.chaosValue

    const lvlMaxPrice = gems.find(
      g => g.gemLevel === maxLevel && !g.gemQuality)?.chaosValue

    const lvlMaxq20Price = gems.find(
      g => g.gemLevel === maxLevel && g.gemQuality === 20)?.chaosValue

    return {
      name: gems[0].name,
      icon: gems[0].icon,
      lvl1Price,
      lvl1q20Price,
      lvlMaxPrice,
      lvlMaxq20Price,
      maxLevel,
      profit10ToMax0:
        lvl1Price !== undefined && lvlMaxPrice !== undefined
          ? lvlMaxPrice - lvl1Price
          : undefined,
      profit10ToMax20:
        lvl1Price !== undefined && lvlMaxq20Price !== undefined
          ? lvlMaxq20Price - lvl1Price
          : undefined,
      profit120ToMax20:
        lvl1q20Price !== undefined && lvlMaxq20Price !== undefined
          ? lvlMaxq20Price - lvl1q20Price
          : undefined
    }
  })
})
console.log(gemResults.value)
</script>

<template>
  <h1>POGNON</h1>
  <header></header>
  <main>
    <div></div>
    <GemCard v-for="item in gemResults" :key="item.name" :gemSummary="item" />
  </main>
</template>

<style scoped></style>
