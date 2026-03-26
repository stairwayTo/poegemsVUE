<script setup lang="ts">
import { onMounted } from 'vue'
import GemCard from '@/components/GemCard.vue'
import { useGemStore } from '@/stores/gemStore.ts'

const gemStore = useGemStore()
onMounted(() => {gemStore.fetchGems()})

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
          <th>
            Profit <br />
            1/0→1/20
          </th>
          <th>
            Profit <br />
            1/0→Max/0
          </th>
          <th>
            Profit <br />
            1/0→Max/20
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <GemCard v-for="item in gemStore.gems" :key="item.name" :gemSummary="item" />
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
