<script setup lang="ts">
const props = defineProps({gemSummary:{type:Object, required: true}});
</script>

<template>
  <div class="gem-card">
    <img
      :src="gemSummary.icon"
      :alt="gemSummary.name"
      class="gem-icon"
    />

    <p>{{ gemSummary.name }}</p>
    <p>{{ gemSummary.lvl1Price ?? 'NOP' }}</p>
    <p>{{ gemSummary.lvl1q20Price ?? 'NOP' }}</p>
    <p>{{ gemSummary.lvlMaxPrice ?? 'NOP' }}</p>
    <p>{{ gemSummary.lvlMaxq20Price ?? 'NOP' }}</p>
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
