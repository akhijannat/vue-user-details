<script setup>
import MasterLayout from "../components/MasterLayout.vue";
</script>

<template>
  <MasterLayout/>
  <div class="w mt-10 mb-5">
  <slot />
  </div>
</template>

<style scoped>

.w{
  width: 1052px;
  margin-left:275px;
}

</style>
