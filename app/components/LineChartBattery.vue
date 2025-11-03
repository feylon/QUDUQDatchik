<template>
  <div class="w-full h-[300px] relative">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const canvas = ref<HTMLCanvasElement | null>(null)

const props = defineProps<{
  hourlyData: { hour: string; percent: number }[]
  color?: string
}>()

onMounted(() => {
  const { $chart } = useNuxtApp()

  new $chart(canvas.value!, {
    type: "line",
    data: {
      labels: props.hourlyData.map(d => d.hour),
      datasets: [
        {
          label: "Batareya (%)",
          data: props.hourlyData.map(d => d.percent),
          borderColor: props.color || "rgba(0, 200, 0, 1)",
          backgroundColor: "rgba(0, 200, 0, 0.25)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Batareya (%)"
          }
        },
        x: {
          title: {
            display: true,
            text: "Soat"
          }
        }
      }
    }
  })
})
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
