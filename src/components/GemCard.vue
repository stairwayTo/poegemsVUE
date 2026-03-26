<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useWatchlistStore} from '@/stores/watchlistStore.ts'

const props = defineProps({gemSummary:{type:Object, required: true}});

const router = useRouter()

function goToDetail() {
  router.push(`/gem/${props.gemSummary.id}`)
}

const watchlistStore = useWatchlistStore()

function addToWatchlist() {
  watchlistStore.addToWatchlist(props.gemSummary)
  console.log(watchlistStore.watchlist)
}

</script>

<template>
  <tr @click="goToDetail">
<td>
    <img :src="gemSummary.icon" :alt="gemSummary.name" class="gem-icon" />
</td>
    <td>{{ gemSummary.name }}</td>
    <td>{{ gemSummary.lvl1Price ?? 'NOP' }}</td>
    <td>{{ gemSummary.lvl1q20Price ?? 'NOP' }}</td>
    <td>{{ gemSummary.lvlMaxPrice ?? 'NOP' }}</td>
    <td>{{ gemSummary.lvlMaxq20Price ?? 'NOP' }}</td>
    <td :class="gemSummary.profit1_0ToMax_0 ? 'profit-positive' : 'profit-none'">
      {{ gemSummary.profit1_0ToMax_0 ?? 'NOP' }}
    </td>
    <td :class="gemSummary.profit1_0ToMax_20 ? 'profit-positive' : 'profit-none'">
      {{ gemSummary.profit1_0ToMax_20 ?? 'NOP' }}
    </td>
    <td :class="gemSummary.profit1_20ToMax_20 ? 'profit-positive' : 'profit-none'">
      {{ gemSummary.profit1_20ToMax_20 ?? 'NOP' }}
    </td>
    <td>
      <button @click.stop ="addToWatchlist()"> FAV </button>
    </td>
  </tr>
</template>

<style scoped>
.gem-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.profit-positive {
  color: #2d8a4e;
  font-weight: bold;
}

.profit-none {
  color: #aaaaaa;
  font-style: italic;
}
</style>
