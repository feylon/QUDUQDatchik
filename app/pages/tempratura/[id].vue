<template>
    <span class="text-[25px] justify-between mt-3 font-bold flex items-center gap-4">
        <div class="flex items-center w-full justify-between gap-2">
            <span class="flex items-center gap-4">
                <font-awesome-icon @click="router.go(-1)" icon="fa-solid fa-arrow-left" class="h-6" />
                Qurilma haqida ma'lumot</span>
            <UButton @click="logListDrawer = true" color="secondary">Loglar</UButton>
        </div>
    </span>
    <Loading v-if="pending" />
    <div v-else>
        <div class="w-full mt-4 mb-4">
            <YandexPicker :points="devicePoints" />


        </div>


        <div class="w-full mt-6">
            <UCard class="flex gap-4 justify-center flex-col w-full">
                <div class="flex w-full items-center mt-4 gap-2 text-xl mb-4">
                    Qurilma  temperaturasi haqida ma'lumot
                </div>

                <!-- <UForm> -->
                <div class="md:flex-row flex flex-col items-center justify-center w-full h-full">
                    <UFormField class="me-4" label="Boshlanish vaqti">
                        <UInput v-model="startDateTime" type="datetime-local" />
                    </UFormField>

                    <UFormField class="me-4" label="Tugash vaqti">
                        <UInput v-model="endDateTime" type="datetime-local" />
                    </UFormField>

                    <UButton class="me-4 mt-5" icon="i-lucide-search" size="md" color="secondary" variant="solid" />
                </div>
                <!-- </UForm> -->

                <div class="flex mt-5 justify-around">
                    <linechart :monthlyData="data" label="Oylik temperaturasi  darajasi" color="blue"
                        backgroundColor="rgba(255, 140, 0, 0.4)" yText="Temperaturasi miqdori (C&deg;)" xText="Kun tartibi" />
                </div>
            </UCard>

        </div>





        <div class="w-full mt-6">
            <UCard class="flex gap-4 justify-center flex-col w-full">
                <div class="flex w-full items-center mt-4 gap-2 text-xl mb-4">
                    Qurilmaning namgarchillik  haqida ma'lumot
                </div>

                <UForm>
                    <div class="md:flex-row flex flex-col items-center justify-center w-full h-full">
                        <UFormField class="me-4" label="Boshlanish vaqti">
                            <UInput v-model="startDateTime1" type="datetime-local" />
                        </UFormField>

                        <UFormField class="me-4" label="Tugash vaqti">
                            <UInput v-model="endDateTime1" type="datetime-local" />
                        </UFormField>

                        <UButton class="me-4 mt-5" icon="i-lucide-search" size="md" color="secondary" variant="solid" />
                    </div>
                </UForm>

                <div class="flex mt-5 justify-around">
                    <linechart :monthlyData="data1" label="Oylik battariyasi namgarchillik darajasi" color="blue"
                        backgroundColor="rgba(255, 200, 120,0.2)" yText="Namgarchillik  miqdori (%)" xText="Kun tartibi" />
                </div>
            </UCard>

        </div>
    </div>



    <UDrawer v-model:open="logListDrawer" direction="right" inset>

        <template #content>
            <div class="w-full overflow-y-auto">
        <LogsTable :logs="logs" />
      </div>
        </template>
    </UDrawer>
</template>
<script lang="ts" setup>
import LineChartBattery from '~/components/linechartbattery.vue';

definePageMeta({
    layout: "dashboard"
});
const router = useRouter();
const route = useRoute();


const logListDrawer = ref<boolean>(false);
const { data: backData, pending, error, status } = useApi(`devices/batteryinfo/${route.params.id}`)




const devicePoints = ref([
    {
        id: 1, lat: 39.6714, lon: 67.0025, data: {
            id: "8B", signal: 2, BatteryValue: 77, IsCharger: true, SignalType: 2, name: "Tracker H8",
            Imei: "867452001112307", phone: "+998901112240", lastheight: 21, status: "unknown",
            coords: [41.3330, 69.2545],
            bat: [
                {
                    "day": 1,
                    "level": 86
                },
                {
                    "day": 2,
                    "level": 93
                },
                {
                    "day": 3,
                    "level": 8
                },
                {
                    "day": 4,
                    "level": 91
                },
                {
                    "day": 5,
                    "level": 4
                },
                {
                    "day": 6,
                    "level": 6
                },
                {
                    "day": 7,
                    "level": 29
                },
                {
                    "day": 8,
                    "level": 99
                },
                {
                    "day": 9,
                    "level": 18
                },
                {
                    "day": 10,
                    "level": 19
                }
            ]
        }
    },

]);

const data = ref([]);


const data1 = ref([

]);
import { ref } from "vue"
import { stat } from 'fs';

const startDateTime = ref("")
const endDateTime = ref("")

const onSearch = () => {
    console.log("Start:", startDateTime.value)
    console.log("End:", endDateTime.value)
}





const startDateTime1 = ref("")
const endDateTime1 = ref("")

const onSearch1 = () => {
    console.log("Start:", startDateTime.value)
    console.log("End:", endDateTime.value)
}


watch(backData, () => {
    if (status.value == 'success') {
        console.log(backData.value);
        data.value = backData?.value?.data?.batteryinfo;
        data1.value = backData.value?.data?.power
        console.log(data.value);
        // devicePoints.value.push(data.value)
    }
})

const logs = [
  { id: 1, text: "Qurilma ishga tushdi", time: "00:12:45", date: "2025-01-20" },
  {
    id: 2,
    text: "Suv balandligi o'lchandi: 118 sm",
    time: "00:30:10",
    date: "2025-01-20",
  },
  { id: 3, text: "Zaryad darajasi: 97%", time: "01:05:21", date: "2025-01-20" },
  { id: 4, text: "Signal kuchi tekshirildi", time: "01:45:02", date: "2025-01-20" },
  { id: 5, text: "Yangi o'lchov yuborildi", time: "02:15:33", date: "2025-01-20" },
  { id: 6, text: "GPS joylashuvi yangilandi", time: "03:02:55", date: "2025-01-20" },
  {
    id: 7,
    text: "Suv balandligi o'lchandi: 120 sm",
    time: "04:14:20",
    date: "2025-01-20",
  },
  { id: 8, text: "Internetga ulanish tiklandi", time: "05:00:12", date: "2025-01-20" },
  { id: 9, text: "Zaryad darajasi: 94%", time: "05:45:39", date: "2025-01-20" },
  {
    id: 10,
    text: "Suv balandligi o'lchandi: 119 sm",
    time: "06:20:17",
    date: "2025-01-20",
  },
  { id: 11, text: "Sensor kalibrovka qilindi", time: "08:05:41", date: "2025-01-20" },
  { id: 12, text: "Signal kuchi past: 30%", time: "09:14:09", date: "2025-01-20" },
  { id: 13, text: "Yangi konfiguratsiya yuklandi", time: "10:32:58", date: "2025-01-20" },
  { id: 14, text: "Zaryad darajasi: 88%", time: "11:44:50", date: "2025-01-20" },
  {
    id: 15,
    text: "Suv balandligi o'lchandi: 117 sm",
    time: "12:11:34",
    date: "2025-01-20",
  },
  { id: 16, text: "Qurilma qayta ishga tushdi", time: "13:20:20", date: "2025-01-20" },
  { id: 17, text: "Foydalanuvchi panelga kirdi", time: "14:45:13", date: "2025-01-20" },
  { id: 18, text: "Suv balandligi oshdi: 121 sm", time: "15:33:05", date: "2025-01-20" },
  { id: 19, text: "Zaryad darajasi: 82%", time: "16:22:41", date: "2025-01-20" },
  { id: 20, text: "Sensorlar holati normal", time: "17:14:59", date: "2025-01-20" },
];
</script>