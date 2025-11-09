<template>
  <div class="min-h-full bg-gray-100 p-6">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Harakatlar tarixi</h1>

      <div class="overflow-x-auto bg-white shadow rounded-lg">
        <table class="min-w-full divide-gray-200">
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

  <div class="h-40"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    layout : "root"
});

const page = ref<number>(1);
const total = ref<number>(100);




interface ActionHistoryItem {
  date: string
  action: string
  user: string
  status: string
}

const actionHistory = ref<ActionHistoryItem[]>([
  { date: '2025-11-08 10:30', action: 'Foydalanuvchi qo‘shildi', user: 'Jamshid', status: 'Bajarildi' },
  { date: '2025-11-08 09:45', action: 'So‘rov tasdiqlandi', user: 'Ali', status: 'Kutilmoqda' },
  { date: '2025-11-07 16:00', action: 'Qurilma qo‘shildi', user: 'Vali', status: 'Bajarildi' },
  { date: '2025-11-07 14:20', action: 'Qurilma o‘chirildi', user: 'Jamshid', status: 'Muvaffaqiyatsiz' },
  { date: '2025-11-07 12:10', action: 'Parol yangilandi', user: 'Dilshod', status: 'Bajarildi' },
  { date: '2025-11-07 11:55', action: 'Profil ma’lumotlari o‘zgartirildi', user: 'Karim', status: 'Bajarildi' },
  { date: '2025-11-07 10:40', action: 'Foydalanuvchi vaqtincha bloklandi', user: 'Sardor', status: 'Kutilmoqda' },
  { date: '2025-11-07 09:30', action: 'Login urinishlari cheklangan', user: 'Bekzod', status: 'Bajarildi' },
  { date: '2025-11-06 17:20', action: 'Admin huquqi berildi', user: 'Olim', status: 'Bajarildi' },
  { date: '2025-11-06 16:05', action: 'Admin huquqi olib tashlandi', user: 'Shahzod', status: 'Muvaffaqiyatsiz' },
  { date: '2025-11-06 15:15', action: 'Tizim sozlamalari o‘zgartirildi', user: 'Akmal', status: 'Bajarildi' },
  { date: '2025-11-06 14:00', action: 'Hisob qayta tiklandi', user: 'Laziz', status: 'Kutilmoqda' },
  { date: '2025-11-06 12:50', action: 'Xavfsizlik tekshiruvlari o‘tkazildi', user: 'Muhammad', status: 'Bajarildi' },
  { date: '2025-11-06 11:40', action: 'Ruxsatlar yangilandi', user: 'Karim', status: 'Bajarildi' },
  { date: '2025-11-06 10:10', action: 'Audit loglari ko‘rildi', user: 'Ali', status: 'Bajarildi' },
  { date: '2025-11-05 18:00', action: 'Hisob blokdan chiqarildi', user: 'Vali', status: 'Bajarildi' },
  { date: '2025-11-05 17:35', action: 'Sessiya tugatildi', user: 'Jamshid', status: 'Bajarildi' },
  { date: '2025-11-05 16:00', action: 'Avtorizatsiya muvaffaqiyatsiz', user: 'Karim', status: 'Muvaffaqiyatsiz' },
  { date: '2025-11-05 15:25', action: 'Qo‘shimcha qurilma ulandi', user: 'Sardor', status: 'Bajarildi' },
  { date: '2025-11-05 14:40', action: 'Tarmoq sozlamalari tekshirildi', user: 'Bekzod', status: 'Kutilmoqda' },
  { date: '2025-11-05 13:10', action: 'Hisob ochildi', user: 'Akmal', status: 'Bajarildi' }
])

</script>
