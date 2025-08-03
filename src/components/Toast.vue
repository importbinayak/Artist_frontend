<script setup>
import { useToastStore } from '@/stores/toast'
const store = useToastStore()
</script>

<template>
  <div
    v-if="store.isVisible"
    class="transition transform ease-in-out duration-500 px-6 py-4 fixed top-8 right-8 rounded-xl shadow-xl text-white z-50"
    :class="store.classes"
  >
    {{ store.message }}
  </div>
</template>
