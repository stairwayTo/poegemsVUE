<script setup lang="ts">
import { computed } from 'vue'
import GemCard from '@/components/GemCard.vue'
import gemsData from '@/data/gems.json'

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
  id: number
  name: string
  icon: string
  lvl1Price?: number
  lvl1q20Price?: number
  lvlMaxPrice?: number
  lvlMaxq20Price?: number
  maxLevel: number
  profit1_0ToMax_0?: number
  profit1_0ToMax_20?: number
  profit1_20ToMax_20?: number
}

const gemResults = computed<GemSummary[]>(() => {
  const nonCorruptedGems = gemsData.lines.filter((gem) => !gem.corrupted && gem.count >= 10)

  const grouped = nonCorruptedGems.reduce<Record<string, Gem[]>>((acc, gem) => {
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

    for (let gem of gems) {
      if (gem.gemLevel === 1 && !gem.gemQuality)
        lvl1Price = gem.chaosValue
      if (gem.gemLevel === 1 && gem.gemQuality === 20)
        lvl1q20Price = gem.chaosValue
      if (gem.gemLevel === maxLevel && !gem.gemQuality)
        lvlMaxPrice = gem.chaosValue
      if (gem.gemLevel === maxLevel && gem.gemQuality === 20)
        lvlMaxq20Price = gem.chaosValue
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
        lvl1Price !== undefined && lvlMaxPrice !== undefined ? Math.round(lvlMaxPrice - lvl1Price) : undefined,
      profit1_0ToMax_20:
        lvl1Price !== undefined && lvlMaxq20Price !== undefined ? Math.round(lvlMaxq20Price - lvl1Price) : undefined,
      profit1_20ToMax_20:
        lvl1q20Price !== undefined && lvlMaxq20Price !== undefined ?Math.round(lvlMaxq20Price - lvl1q20Price) : undefined,
    }
  })
})
console.log(gemResults.value)
</script>

<template>
  <h1>POGNON</h1>
  <header></header>
  <main>
    <table>
      <thead>
      <tr>
        <th>Icon</th>
        <th>Name</th>
        <th>1/0q</th>
        <th>1/20q</th>
        <th>Max/0q</th>
        <th>Max/20q</th>
        <th>Profit <br> 1/0→1/20</th>
        <th>Profit <br> 1/0→Max/0</th>
        <th>Profit <br> 1/0→Max/20</th>
      </tr>
      </thead>
      <tbody>
      <GemCard v-for="item in gemResults" :key="item.name" :gemSummary="item" />
      </tbody>
    </table>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f5f5f0;
  font-family: Arial, sans-serif;
  color: #2c2c2c;
}

h1 {
  padding: 20px;
  font-size: 24px;
  color: #2c2c2c;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  font-size: 14px;
}

th {
  background-color: #e8e8e4;
  color: #2c2c2c;
  font-weight: bold;
  padding: 10px 12px;
  text-align: left;
  border-bottom: 2px solid #cccccc;
}

td {
  padding: 8px 12px;
  border-bottom: 1px solid #eeeeee;
  color: #2c2c2c;
}
</style>
