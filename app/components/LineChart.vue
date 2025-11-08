<template>
  <div class="w-full h-[300px] relative">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue"

const canvas = ref<HTMLCanvasElement | null>(null)
const chart = ref<any>(null)

const props = defineProps<{
  monthlyData: { day: number; level: number }[]
  label?: string
  color?: string
  backgroundColor?: string
  yText?: string
  xText?: string
}>()

const { $chart } = useNuxtApp()

const createChart = () => {
  if (!canvas.value) return

  // Eski chart bo‘lsa – o‘chiramiz
  if (chart.value) {
    chart.value.destroy()
  }

  chart.value = new $chart(canvas.value, {
    type: "line",
    data: {
      labels: props.monthlyData.map(d => `${d.day} `),
      datasets: [
        {
          label: props.label || "Suv balandligi (sm)",
          data: props.monthlyData.map(d => d.level),
          borderColor: props.color || "rgba(54, 162, 235, 1)",
          backgroundColor: props.backgroundColor || "rgba(54, 162, 235, 0.25)",
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: {
            display: true,
            text: props.yText || "Suv balandligi (sm)"
          }
        },
        x: {
          title: {
            display: true,
            text: props.xText || "Kun"
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

// ✅ Props o‘zgarsa grafik avtomatik yangilanadi
watch(props, () => {
  createChart()
}, { deep: true })

</script>
