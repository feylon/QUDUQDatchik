<template>
  <div class="min-h-full bg-gray-100 p-6">
    <UCard class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Harakatlar tarixi</h1>

      <div class="overflow-x-auto bg-white shadow rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in actionHistory" :key="index" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ item.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ item.action }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ item.user }}</td>
             
            </tr>
          </tbody>
        </table>
      </div>


      <div class="flex justify-center">
    <UPagination v-model:page="page" :total="total" class="mb-5 mx-auto mt-4" color="secondary"
      active-color="secondary" />
  </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    layout : "dashboard"
});

const page = ref<number>(1);
const total = ref<number>(100);




const actionHistory = ref([
 { date: '2025-11-08 10:30', action: 'Hisobotni yuborish', user: 'Jamshid', status: 'Bajarildi' },
{ date: '2025-11-08 09:45', action: 'So‘rovni tasdiqlash', user: 'Ali', status: 'Kutilmoqda' },
{ date: '2025-11-07 16:00', action: 'Uchrashuvni rejalashtirish', user: 'Zarina', status: 'Bajarildi' },
{ date: '2025-11-07 14:20', action: 'Faylni o‘chirish', user: 'Jamshid', status: 'Muvaffaqiyatsiz' },
])
</script>
