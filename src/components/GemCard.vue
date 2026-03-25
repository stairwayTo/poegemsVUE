<script setup lang="ts">
const props = defineProps({gemSummary:{type:Object, required: true}});
</script>

<template>
  <div class="gem-card">
    <img :src="gemSummary.icon" :alt="gemSummary.name" class="gem-icon" />

    <p>{{ gemSummary.name }}</p>
    <p>1/0 : {{ gemSummary.lvl1Price ?? 'NOP' }}</p>
    <p>1/20 : {{ gemSummary.lvl1q20Price ?? 'NOP' }}</p>
    <p>Max/0 : {{ gemSummary.lvlMaxPrice ?? 'NOP' }}</p>
    <p>Max/20 : {{ gemSummary.lvlMaxq20Price ?? 'NOP' }}</p>

    <p>Gain 1/0 → Max/0 : {{ gemSummary.profit10ToMax0 ?? 'NOP' }}</p>
    <p>Gain 1/0 → Max/20 : {{ gemSummary.profit10ToMax20 ?? 'NOP' }}</p>
    <p>Gain 1/20 → Max/20 : {{ gemSummary.profit120ToMax20 ?? 'NOP' }}</p>
  </div>
</template>

<style scoped>
.gem-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.gem-card {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
