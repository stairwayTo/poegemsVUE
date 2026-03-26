<script setup lang="ts">
import { useWatchlistStore} from '@/stores/watchlistStore.ts'
import { onMounted } from 'vue'

const watchlistStore = useWatchlistStore()
onMounted(() => {watchlistStore.initStore()})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
