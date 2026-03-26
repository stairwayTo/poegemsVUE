<script setup lang="ts">
import { useWatchlistStore } from '@/stores/watchlistStore.ts'
import GemCard from '@/components/GemCard.vue'

const watchlistStore = useWatchlistStore()
</script>

<template>

  <GemCard v-for="item in watchlistStore.watchlist" :key="item.id" :gemSummary="item" />

</template>

<style scoped></style>
