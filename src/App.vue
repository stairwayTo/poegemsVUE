<script setup lang="ts">
import { ref, computed} from 'vue'

interface Gem {
  id: number
  name: string
  itemClass: number
  corrupted: boolean
  gemLevel: number
  gemQuality: number
  chaosValue: number
}

const gems = ref<Gem[]>([
  {
    id: 96049,
    name: 'Awakened Empower Support',
    itemClass: 4,
    corrupted: true,
    gemLevel: 5,
    gemQuality: 20,
    chaosValue: 76689,
  },
  {
    id: 9049,
    name: 'Awakened Support',
    itemClass: 4,
    corrupted: true,
    gemLevel: 2,
    gemQuality: 20,
    chaosValue: 79,
  },
  {
    id: 9609,
    name: 'Empower Support',
    itemClass: 4,
    corrupted: false,
    gemLevel: 3,
    gemQuality: 20,
    chaosValue: 7689,
  },
])

const searchBar = ref('');

const filteredGems = computed(() => {
  if (!searchBar.value) return gems.value
  return gems.value.filter(gems =>
    gems.name.toLowerCase().includes(searchBar.value.toLowerCase())||
      gems.corrupted.toString().includes(searchBar.value.toString(),
    )
  )
})

</script>

<template>
  <input
    v-model="searchBar"
    placeholder="Search Bar"
    class="search-bar"
    />

  <p class="count">{{ filteredGems.length }} gem(s)</p>


  <div v-for="item in filteredGems" :key="item.id">
    <p>{{ item.id }}</p>
    <p>{{ item.name }}</p>
    <p>{{ item.itemClass }}</p>
    <p v-if="item.corrupted">Corrupted</p>
    <p>{{ item.gemLevel }}</p>
    <p>{{ item.gemQuality }}</p>
    <p>{{ item.chaosValue }}</p>
  </div>
</template>

<style scoped></style>
