<template>
  <span class="text-[25px] justify-between font-semibold flex items-center gap-4">
    <div class="flex items-center gap-2">
      <font-awesome-icon @click="router.go(-1)" icon="fa-solid fa-arrow-left" class="h-6" />
      Yangi qurilma qo'shish
    </div>


  </span>


  <div>
    <div class="max-w-[700px] mx-auto">
      <YandexPicker :points="devicePoints" />

    </div>

    
  </div>


  <form @submit.prevent = "AddDevice()" class="h-[200px] w-full max-w-[1000px] mt-5 mx-auto">
    <UCard>

      <div class="grid gap-8 md:grid-cols-2 grid-cols-1">

        <div class="flex gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Joylashuv</span></label>
          <UInput v-model="formData.location" :required="true" class="w-[250px]" color="secondary" />
        </div>

        <div class="flex gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Imei</span></label>
          <UInput :required="true" v-model="formData.imei" class="w-[250px]" color="secondary" />
        </div>


        <div class="flex gap-4 items-center justify-between mt-4">
          <label for=""><span class="font-semibold">Nomi</span></label>
          <UInput :required="true" v-model="formData.name" class="w-[250px]" color="secondary" />
        </div>


        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">Telefon raqami</span></label>
          <UInput :required="true" v-model="formData.phone" class="w-[250px]" color="secondary" />
        </div>


        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">Eng yuqori nuqta</span></label>
          <UInput :required="true" v-model="formData.highest" class="w-[250px]" color="secondary" />
        </div>


        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">Eng pastki nuqta</span></label>
          <UInput :required="true" v-model="formData.lowest" class="w-[250px]" color="secondary" />
        </div>

        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">Web 1</span></label>
          <UInput  v-model="formData.web1" :required="true" class="w-[250px]" color="secondary" />
        </div>



        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">Timeinterval(web1)</span></label>
          <UInput :required="true" v-model="formData.time_interval1" type="number" min="1" class="w-[250px]" color="secondary" />
        </div>



        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">Web 2</span></label>
          <UInput v-model="formData.web2" :required="true" class="w-[250px]" color="secondary" />
        </div>

        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">Timeinterval(web2)</span></label>
          <UInput :required="true" v-model="formData.time_interval2" type="number" min="1" class="w-[250px]" color="secondary" />
        </div>



        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">USSD 1</span></label>
          <UInput v-model="formData.ussd1" :required="true" class="w-[250px]" color="secondary" />
        </div>


        <div class="flex gap-4 items-center justify-between  mt-4">
          <label for=""><span class="font-semibold">USSD 2</span></label>
          <UInput v-model="formData.ussd2" :required="true" class="w-[250px]" color="secondary" />
        </div>
      </div>


      <div class="w-full mb-4 mt-4 justify-end flex">
        <UButton type="submit" color="secondary">Saqlash</UButton>
      </div>
      <div class="min-h-10">
      </div>
    </UCard>
  </form >


  <div class="mt-6 h-20"></div>
</template>

<script lang="ts" setup>
import YandexPicker from "@/components/YandexPicker.vue";
definePageMeta({
  layout: "dashboard"
});
const toast = useToast();

const formData = ref<{
  location: string,
  imei: string;
  name: string;
  phone: string;
  web1: string;
  time_interval1: number | string,
  web2: string;
  time_interval2: number | string,
  highest: number | string;
  lowest: number | string,
  ussd1: string,
  ussd2: string
}>({
  location: "39.6714, 67.0025",
  imei: "",
  name: '',
  highest: 0,
  lowest: 0,
  phone: '',
  web1: "",
  time_interval1: "1",
  time_interval2: "2",
  web2: "",
  ussd1: "",
  ussd2: ""

});


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

const form = reactive({
  imei: '',
  name: '',
  phone: '',
  time_interval: 60,
  web1: '',
  web2: '',
  engpastnuqta: null as number | null,
  enyuqorinuqta: null as number | null
})

const errors = reactive<{ [k: string]: string | null }>({})


const AddDevice = async ()=>{
toast.add({
  title : "Qurilma qo'shildi",
  duration : 5000,
  color : "primary"

})
}


</script>
<style></style>