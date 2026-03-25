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
  lvl1Price: number | undefined
  lvl1q20Price: number | undefined
  lvlMaxPrice: number | undefined
  lvlMaxq20Price: number | undefined
  maxLevel: number
}

const gemResults = computed<GemSummary[]>(() => {
  const grouped = gemsData.lines.reduce<Record<string, Gem[]>>((acc, gem) => {
    if (gem.corrupted) return acc

    if (!acc[gem.name]) acc[gem.name] = []
    acc[gem.name].push(gem)
    return acc
  }, {})

  return Object.values(grouped).map((gems) => {
    const maxLevel = Math.max(...gems.map(g => g.gemLevel))

    return {
      name: gems[0].name,
      icon: gems[0].icon,
      lvl1Price: gems.find(g => g.gemLevel === 1 && !g.gemQuality)?.chaosValue,
      lvl1q20Price: gems.find(g => g.gemLevel === 1 && g.gemQuality === 20)?.chaosValue,
      lvlMaxPrice: gems.find(g => g.gemLevel === maxLevel && !g.gemQuality)?.chaosValue,
      lvlMaxq20Price: gems.find(g => g.gemLevel === maxLevel && g.gemQuality === 20)?.chaosValue,
      maxLevel
    }
  })
})
console.log(gemResults.value)
</script>

<template>

  <h1>POGNON</h1>
  <header>
  </header>
  <main>
    <div>
    </div>
    <GemCard
      v-for="item in gemResults"
      :key="item.name"
      :gemSummary="item"
    />
  </main>
</template>

<style scoped></style>
