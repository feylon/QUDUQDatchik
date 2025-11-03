<template>
  <div class="flex font-bold text-[25px] items-center gap-2">
    <font-awesome-icon @click="router.go(-1)" icon="fa-solid fa-arrow-left" class="h-6" />
    Foydalanuvchilar
  </div>


  <div class="w-full flex items-center justify-center gap-4">
    <UInput icon="i-lucide-search" size="lg" class="max-w-[600px] w-full" variant="outline" color="secondary"
      placeholder="Xodimni qidirish" />
    <UButton icon="i-lucide-search" size="lg" color="secondary" />
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-1 justify-center  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">




    <div v-for="value in 20"
      class="block p-4 relative min-w-sm pt-4 max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

      <div class="flex mt-6 justify-between">
        <h5 class="mb-2  text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">F.I.O</h5>
        <span class="font-normal text-gray-700 dark:text-gray-400">Qodirov L.O</span>
      </div>


      <div class="flex justify-between">
        <h5 class="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Lavozimi</h5>
        <span class="font-normal text-gray-700 dark:text-gray-400">Oddiy</span>
      </div>


      <div class="flex justify-between">
        <h5 class="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Telefon</h5>
        <span class="font-normal text-gray-700 dark:text-gray-400">+998 94 178 56 90</span>
      </div>


      <UButton icon="i-lucide-pen" size="lg" color="neutral" class="absolute cursor-pointer right-2 top-1" />
      <UButton icon="i-lucide-info" size="lg" color="neutral" class="absolute cursor-pointer right-13 top-1" />

    </div>




  </div>



  <div @click="navigateTo('/superadmin/adddevice')"
    class="w-[50px] h-[50px] flex items-center justify-center rounded-full fixed right-5 bg-blue-600 bottom-5">
    <font-awesome-icon class="h-[15px] text-white" icon="fa-solid fa-plus" />
  </div>




<div class="flex justify-center">
    <UPagination v-model:page="page" :total="total" class="mb-5 mx-auto mt-4" color="secondary"  active-color="secondary" />
</div>  <div class="h-[200px]">
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "dashboard"
});
const router = useRouter();
const value = ref('')
const page = ref(5)
const total = ref(100)


</script>