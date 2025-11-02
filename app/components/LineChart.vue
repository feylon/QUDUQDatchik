<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const canvas = ref<HTMLCanvasElement | null>(null)

const props = defineProps<{
  labels: string[],
  data: number[],
  color?: string
}>()

onMounted(() => {
  const { $chart } = useNuxtApp()

  new $chart(canvas.value!, {
    type: "line",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: "Line Chart",
          data: props.data,
          borderColor: props.color || "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 300px;
}
</style>
