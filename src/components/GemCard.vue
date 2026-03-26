<script setup lang="ts">
const props = defineProps({gemSummary:{type:Object, required: true}});
</script>

<template>
  <tr>
    <img :src="gemSummary.icon" :alt="gemSummary.name" class="gem-icon" />

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
