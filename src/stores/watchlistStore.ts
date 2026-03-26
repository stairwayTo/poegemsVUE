import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GemSummary } from '@/type/gem.ts'

export const useWatchlistStore = defineStore('watchlistStore', () => {
  const watchlist = ref<GemSummary[]>([])
  function addToWatchlist(gem: GemSummary) {
    watchlist.value.push(gem)
  }
  function removeFromWatchlist(gemId: number) {
    watchlist.value = watchlist.value.filter(g => g.id !== gemId)
  }
  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  }
})
