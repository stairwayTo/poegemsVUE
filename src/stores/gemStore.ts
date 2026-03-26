import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GemSummary } from '@/type/gem.ts'
import { getGemSummaries } from '@/services/gemService.ts'

export const useGemStore = defineStore('gemStore', () => {
  const gems = ref<GemSummary[]>([])

  async function fetchGems() {
    gems.value = await getGemSummaries()
  }

  return {
    gems,
    fetchGems
  }
})
