<template>
  <div class="w-full border overflow-y-auto rounded-lg overflow-hidden bg-white shadow-sm">
    <div class="p-3 border-b bg-gray-50 font-semibold">
      Qurilma loglari
    </div>

    <table class="min-w-full overflow-y-auto text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 text-left font-medium">#</th>
          <th class="p-3 text-left font-medium">Xabar</th>
          <th class="p-3 text-left font-medium">Sana</th>
          <th class="p-3 text-left font-medium">Vaqt</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="log in logs"
          :key="log.id"
          class="border-b hover:bg-gray-50"
        >
          <td class="p-3">{{ log.id }}</td>
          <td class="p-3">{{ log.text }}</td>
          <td class="p-3">{{ log.date }}</td>
          <td class="p-3">{{ log.time }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  logs: { id: number; text: string; time: string; date: string }[]
}>()
</script>
