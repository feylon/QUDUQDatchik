<template>
  <div class="flex font-bold text-[25px] items-center gap-2">
    <font-awesome-icon @click="router.go(-1)" icon="fa-solid fa-arrow-left" class="h-6" />
    Foydalanuvchilar
  </div>
  <div  class="ms-3 mb-6 overflow-x-scroll pt-5 min-h-[40px] items-end  flex  mt-9 min-w-[50%]">
   <UBreadcrumb :items="parent" />
   <nav class="text-sm text-gray-600 hidden" aria-label="Breadcrumb">
    <ol class="list-reset flex">
      <li v-for="(item, index) in parent" :key="index" class="flex items-center">
        <NuxtLink
          v-if="index !== parent.length - 1"
          :to="item.to"
          class="text-gray-500 hover:text-gray-700"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="text-gray-700">{{ item.label }}</span>
        
        <span v-if="index !== parent.length - 1" class="mx-2">/</span>
      </li>
    </ol>
  </nav>
   </div>

  <div class="w-full mt-3 flex items-center justify-center gap-4">
    <UInput icon="i-lucide-search" size="lg" class="max-w-[600px] w-full" variant="outline" color="secondary"
      placeholder="Xodimni qidirish" />
    <UButton icon="i-lucide-search" size="lg" color="secondary" />
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-1 justify-center  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">




    <div v-for="(value, index) in users"
      class="block p-4 justify-center relative min-w-sm me-3 pt-4 max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

      <div class="flex mt-6 justify-between">
        <h5 class="mb-2  text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">F.I.O</h5>
        <span class="font-normal text-gray-700 dark:text-gray-400">{{ value.fio }}</span>
      </div>


      <div class="flex justify-between">
        <h5 class="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Tashkilot</h5>
        <span class="font-normal text-gray-700 dark:text-gray-400">{{ value.organization }}</span>
      </div>


      <div class="flex justify-between">
        <h5 class="mb-2 text-[18px] font-bold tracking-tight text-gray-900 dark:text-white">Telefon</h5>
        <span class="font-normal text-gray-700 dark:text-gray-400">{{ value.phone }}</span>
      </div>

    


 <UButton @click="navigateTo('/superadmin/users/userschild');" v-if="value.child" icon="material-symbols-light:supervised-user-circle" size="md" color="neutral"
        class="absolute cursor-pointer right-25 top-1" />

      <UButton @click="openDrawer = true;" icon="i-lucide-info" size="md" color="neutral"
        class="absolute cursor-pointer right-13 top-1" />


      <UButton @click="navigateTo(`/superadmin/devices/${index}`)" size="md" color="neutral"
        class="absolute cursor-pointer right-2 top-1">
        <font-awesome-icon icon="fa-solid fa-list-check" class="h-[17px]" />
      </UButton>

    </div>




  </div>



  



  <div class="flex justify-center">
    <UPagination v-model:page="page" :total="total" class="mb-5 mx-auto mt-4" color="secondary"
      active-color="secondary" />
  </div>
  <div class="h-[200px]">
  </div>




  <UDrawer direction="right" aria-describedby="" v-model:open="openDrawer">

    <template #content>
      <div class="min-w-96 min-h-96 size-full m-4 ms-2">
        <span class="font-bold text-[20px] text-black">Foydalanuvchi haqida ma'lumot</span>
        <div class="flex flex-col">

          <div class="flex text-black mt-4 justify-between">
            <span class="font-bold">F.I.O</span>
            <span>Tursunov Shohruh Ismoilovich</span>
          </div>



      

          <hr class="mt-5">

          <div class="flex text-black mt-4 hidden justify-between">
            <span class="font-bold">Admin</span>
            
          </div>
<hr class="mt-5 mb-5">

              <UStepper orientation="vertical" :items="items" color="secondary" class="w-full" />

        </div>
      </div>
    </template>
  </UDrawer>
</template>
<script lang="ts" setup>
import type { StepperItem } from '@nuxt/ui';

definePageMeta({
  layout: "userdashboard"
});


const openDrawer = ref<boolean>(false);
const router = useRouter();
const value = ref('')
const page = ref(5)
const total = ref(100)

const users: {
  fio: string,
  lavozim: string,
  phone: string,
  child? :boolean,
  organization : string
}[] = [
  { fio: "Qodirov Laziz Olimovich", lavozim: "oddiy", phone: "+998 94 111 22 33", child: true, organization: "Tashkilot A" },
  { fio: "Ergashev Jamshid Ravshanovich", lavozim: "oddiy", phone: "+998 90 234 56 78", child: false, organization: "Tashkilot B" },
  { fio: "Karimova Malika Shavkatovna", lavozim: "oddiy", phone: "+998 93 445 23 11", child: true, organization: "Tashkilot C" },
  { fio: "Saidov Diyor Sherzodovich", lavozim: "oddiy", phone: "+998 97 556 44 21", child: true, organization: "Tashkilot A" },
  { fio: "Tursunov Shohruh Ismoilovich", lavozim: "oddiy", phone: "+998 90 998 12 54", child: false, organization: "Tashkilot D" },
  { fio: "Abdullayev Zafar Fayzullayevich", lavozim: "oddiy", phone: "+998 91 333 00 88", child: false, organization: "Tashkilot B" },
  { fio: "Ortiqboyeva Marjona Boboxonovna", lavozim: "oddiy", phone: "+998 93 774 12 45", child: false, organization: "Tashkilot E" },
  { fio: "Nurmurodov Azizbek Sheraliyevich", lavozim: "oddiy", phone: "+998 99 432 56 70", child: true, organization: "Tashkilot C" },
  { fio: "Xolmurodova Dilnoza Rustamovna", lavozim: "oddiy", phone: "+998 95 678 45 22", child: false, organization: "Tashkilot F" },
  { fio: "Sattorov Bekzod Kamolovich", lavozim: "oddiy", phone: "+998 97 123 78 90", child: true, organization: "Tashkilot A" },
  { fio: "Yo‘ldoshev Jamoliddin Erkinovich", lavozim: "oddiy", phone: "+998 94 889 34 56", child: true, organization: "Tashkilot D" },
  { fio: "Olimova Shaxnoza Baxtiyorovna", lavozim: "oddiy", phone: "+998 90 771 90 20", child: false, organization: "Tashkilot B" },
  { fio: "Rasulov Sherzod Alisherovich", lavozim: "oddiy", phone: "+998 93 612 44 99", child: true, organization: "Tashkilot E" },
  { fio: "Mamadaliev Akmal Odilovich", lavozim: "oddiy", phone: "+998 91 555 12 33", child: false, organization: "Tashkilot F" },
  { fio: "G‘aniyeva Muhayyo Sobir qizi", lavozim: "oddiy", phone: "+998 99 301 88 55", child: false, organization: "Tashkilot C" }
]
;



  const items = ref<StepperItem[]>([
  {
    title: 'Nurmurodov Azizbek Sheraliyevich',
    description: 'Foydalanuvchi',
    icon: 'material-symbols:perm-contact-calendar-sharp'
  },
  {
    title: 'Mamadaliev Akmal Odilovich',
    description: 'Foydalanuvchi',
    icon: 'material-symbols:perm-contact-calendar-sharp'
  },
  {
    title: 'Abdullayev Zafar Fayzullayevich',
    description: 'Foydalanuvchi',
    icon : 'material-symbols:perm-contact-calendar-sharp'
  }
])



const parent = ref([
  {
    label: 'Qodirov Laziz Olimovich',
    to: '/superadmin/users/'
  },
  {
    label: 'Ergashev Jamshid Ravshanovich',
    to: '/superadmin/users/'
  },
  {
    label: 'Abdullayev Sardor Islomovich',
    to: '/superadmin/users/'
  },
  {
    label: 'Toshpulatov Nodirbek Shavkatovich',
    to: '/superadmin/users/'
  }
]
)
</script>