<template>
  <span class="text-[25px] justify-between font-semibold flex items-center gap-4">
    <div class="flex items-center gap-2">
      <font-awesome-icon @click="router.go(-1)" icon="fa-solid fa-arrow-left" class="h-6" />
    Foydalanuvchini tahrirlash
    </div>


  </span>


  <div>


  </div>

  <form @submit.prevent="AddDevice()" class="h-[200px] w-full max-w-[1000px] mt-5 mx-auto">
    <UCard>

        <div class="grid gap-8 md:grid-cols-2 grid-cols-1">

        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Foydalanuvchi ismi</span></label>
          <UInput v-model="formData.firstname" :required="true" class="w-[250px]" color="secondary" />
        </div>


        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Foydalanuvchi familiyasi</span></label>
          <UInput v-model="formData.lastname" :required="true" class="w-[250px]" color="secondary" />
        </div>


         <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Foydalanuvchi logini</span></label>
          <UInput v-model="formData.login" :required="true" class="w-[250px]" color="secondary" />
        </div>



         <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Foydalanuvchi paroli</span></label>
          <UInput v-model="formData.password" type="text" :required="true" class="w-[250px]" color="secondary" />
        </div>


        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Qurilma nomi</span></label>
          <USelectMenu color="secondary" v-model="formData.deviceid" :items="items" class="w-[250px]" />

        </div>

        <div></div>
         <div class="col-span-2 font-semibold">
         Foydalanuvchiga bog'langan foydalanuvchilar ro'yxati
        </div>
         <div v-for="item in formData.users" class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Foydalanuvchi login</span></label>
         <USelectMenu color="secondary" v-model="item.id" :items="users" class="w-[250px]" />
        </div>


        <div class="col-span-2 font-semibold justify-end">
         <UButton><Icon name="material-symbols:add-2-rounded" width="24" height="24" /></UButton>
        </div>

      </div>


      <div class="w-full mb-4 mt-4 justify-end flex">
        <UButton type="submit" color="secondary">Saqlash</UButton>
      </div>
      <div class="min-h-10">
      </div>
    </UCard>
  </form>





  <div class="mt-6 h-20"></div>
</template>

<script lang="ts" setup>
import type { SelectMenuItem } from '@nuxt/ui'

definePageMeta({
  layout: "dashboard"
});
const toast = useToast();



const devicePoints = ref([
  {
    id: 1, lat: 39.6714, lon: 67.0025

  },

]);
const picked = ref([]);
const router = useRouter();


const onPicked = (coords: any) => {
  picked.value = coords;
};


const emit = defineEmits<{
  (e: 'submit', payload: Record<string, any>): void
  (e: 'reset'): void
}>()



const formData = ref<{
  deviceid: string;
  firstname: string;
  lastname: string;
  login : string;
  password : string,
  users : {id  :string}[]
}>({
  deviceid: 'device_a1',
  firstname: 'Olim',
  lastname: "G`aniyev",
  login : "login0101",
  password : "13456790",
  users : [
  { id: "user1" },
  { id: "user2" },
  { id: "user3" },
  { id: "user4" },
  { id: "user5" },
  { id: "user6" },
  { id: "user7" },
  { id: "user8" },
  { id: "user9" },
  { id: "user10" }
]

});




const admin = ref<{
  firstname: string;
  lastname: string;
  login : string;
  password : string
}>({
  firstname: '',
  lastname: "",
  login : "",
  password : ""
})


const errors = reactive<{ [k: string]: string | null }>({})


const AddDevice = async () => {
  toast.add({
    title: "Qurilma qo'shildi",
    duration: 5000,
    color: "primary"

  })
}

const items = ref<SelectMenuItem[]>([
{ label: 'Qurilma A1', id: 'device_a1' },
  { label: 'Qurilma A2', id: 'device_a2' },
  { label: 'Qurilma A3', id: 'device_a3' },
  { label: 'Qurilma B1', id: 'device_b1' },
  { label: 'Qurilma B2', id: 'device_b2' },
  { label: 'Qurilma B3', id: 'device_b3' },
  { label: 'Qurilma C1', id: 'device_c1' },
  { label: 'Qurilma C2', id: 'device_c2' },
  { label: 'Qurilma C3', id: 'device_c3' },
  { label: 'Qurilma D1', id: 'device_d1' },
  { label: 'Qurilma D2', id: 'device_d2' },
  { label: 'Qurilma D3', id: 'device_d3' },
  { label: 'Qurilma E1', id: 'device_e1' },
  { label: 'Qurilma E2', id: 'device_e2' },
  { label: 'Qurilma E3', id: 'device_e3' },
  { label: 'Qurilma F1', id: 'device_f1' },
  { label: 'Qurilma F2', id: 'device_f2' },
  { label: 'Qurilma F3', id: 'device_f3' },
  { label: 'Qurilma G1', id: 'device_g1' },
  { label: 'Qurilma G2', id: 'device_g2' },
  { label: 'Qurilma G3', id: 'device_g3' },
  { label: 'Qurilma H1', id: 'device_h1' },
  { label: 'Qurilma H2', id: 'device_h2' },
  { label: 'Qurilma H3', id: 'device_h3' },
  { label: 'Qurilma I1', id: 'device_i1' },
  { label: 'Qurilma I2', id: 'device_i2' },
  { label: 'Qurilma I3', id: 'device_i3' },
  { label: 'Qurilma J1', id: 'device_j1' },
  { label: 'Qurilma J2', id: 'device_j2' },
  { label: 'Qurilma J3', id: 'device_j3' },
]);


const users = ref<SelectMenuItem>(
    [
[
  { label: 'Ali Valiyev', id: 'user1' },
  { label: 'Hasan Karimov', id: 'user2' },
  { label: 'Husan Abdullayev', id: 'user3' },
  { label: 'Javlon Qodirov', id: 'user4' },
  { label: 'Sardor Muxtorov', id: 'user5' },
  { label: 'Bekzod Olimov', id: 'user6' },
  { label: 'Diyor Raxmonov', id: 'user7' },
  { label: 'Oybek Tursunov', id: 'user8' },
  { label: 'Farrux Najmiddinov', id: 'user9' },
  { label: 'Jasur Ermatov', id: 'user10' }
]

]

)

const tabs = [
  {
    label: 'Foydalanuvchi qo`shish',
    icon: 'i-lucide-user',
    slot: 'simpleUser'
  },
  {
    label: 'Admin qo`shish',
    icon: 'material-symbols:verified-user',
    slot: 'admin'
  }
]
</script>
<style></style>