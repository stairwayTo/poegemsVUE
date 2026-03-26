import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GemSummary } from '@/type/gem.ts'

export const useWatchlistStore = defineStore('watchlistStore', () => {
  const watchlist = ref<GemSummary[]>([])
  function addToWatchlist(gem: GemSummary) {
    watchlist.value.push(gem)
    persist()
  }
  function removeFromWatchlist(gemId: number) {
    watchlist.value = watchlist.value.filter(g => g.id !== gemId)
    persist()
  }
  function initStore() {
    const saved = localStorage.getItem('poegems-watchlist')
    if (saved) watchlist.value = JSON.parse(saved)
  }

  function persist() {
    localStorage.setItem('poegems-watchlist', JSON.stringify(watchlist.value))
  }
  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    initStore,
    persist
  }
})
