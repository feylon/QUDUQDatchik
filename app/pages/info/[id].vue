<template>
  <span class="text-[25px] justify-between font-bold flex items-center gap-4">
    <div class="flex items-center gap-2">
      <font-awesome-icon @click="router.go(-1)" icon="fa-solid fa-arrow-left" class="h-6" />
      Qurilma haqida ma'lumot
    </div>

    <UButton
      @click="modalDrawer = true"
      label="Loglar"
      color="neutral"
      variant="subtle"
    />
  </span>

  <div class="mt-6 lg:w-[80%] mx-auto">
    <div id="map" class="w-full h-[400px] mx-auto"></div>

    <span class="text-[20px] font-bold flex items-center gap-4 mt-6">
      Suv sathi
    </span>
    <LineChart :monthlyData="chartData" color="red" class="h-[300px] w-full" />

    <span class="text-[20px] font-bold flex items-center gap-4 mt-6">
      Qurilma quvvati haqida ma'lumot
    </span>
    <LineChartBattery
      :hourlyData="batteryDaily"
      color="green"
      class="h-[300px] w-full"
    />
  </div>

  <!-- DRAWER -->
  <UDrawer v-model:open="modalDrawer" direction="right" inset>
    <template #content>
      <div class="w-full overflow-y-auto">
        <LogsTable :logs="logs" />
      </div>
    </template>
  </UDrawer>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

const modalDrawer = ref(false);
const { $loadYandex } = useNuxtApp();
const locations = [
  {
    id: "1",
    coords: [41.3112, 69.2797],
    title: "Toshkent markazi",
    phone: "+998 90 123 45 67",
    address: "Amir Temur ko‘chasi 1",
  },
];
const route = useRoute();
const router = useRouter();

console.log(route.params.id);

onMounted(async () => {
  const ymaps = await $loadYandex();

  const BalloonLayout = ymaps.templateLayoutFactory.createClass(
    `
    <div class="w-[300px] p-3 shadow-md">
      <h4 class="m-0 mb-1 font-bold"><span class="text-[16]">$[properties.title]</span></h4>
      <div><b>Telefon:</b> $[properties.phone]</div>
      <div><b>Manzil:</b> $[properties.address]</div>
      <br/>
      <div class="w-full flex justify-around">

  
        <button id="editBtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Tahrirlash
        </button>

     
        <button id="infoBtn" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Ma'lumot
        </button>

      </div>
    </div>
  `,
    {
      build: function () {
        BalloonLayout.superclass.build.call(this);

        const editBtn = document.getElementById("editBtn");
        const infoBtn = document.getElementById("infoBtn");

        if (editBtn) {
          editBtn.addEventListener("click", () => {
            const id = this.getData().properties.get("id");
            buttonClicked(id, "edit");
          });
        }

        if (infoBtn) {
          infoBtn.addEventListener("click", () => {
            const id = this.getData().properties.get("id");
            buttonClicked(id, "info");
          });
        }
      },
    }
  );

  const map = new ymaps.Map("map", {
    center: [41.3112, 69.2797],
    zoom: 12,
  });

  locations.forEach((loc) => {
    const placemark = new ymaps.Placemark(
      loc.coords,
      {
        id: loc.id,
        title: loc.title,
        phone: loc.phone,
        address: loc.address,
      },
      {
        balloonContentLayout: BalloonLayout,
      }
    );

    map.geoObjects.add(placemark);
  });
});

const chartData = [
  { day: 1, level: 120 },
  { day: 2, level: 118 },
  { day: 3, level: 121 },
  { day: 4, level: 119 },
  { day: 5, level: 122 },
  { day: 6, level: 123 },
  { day: 7, level: 119 },
  { day: 8, level: 117 },
  { day: 9, level: 118 },
  { day: 10, level: 121 },
  { day: 11, level: 124 },
  { day: 12, level: 122 },
  { day: 13, level: 120 },
  { day: 14, level: 119 },
  { day: 15, level: 118 },
  { day: 16, level: 121 },
  { day: 17, level: 123 },
  { day: 18, level: 125 },
  { day: 19, level: 122 },
  { day: 20, level: 121 },
  { day: 21, level: 119 },
  { day: 22, level: 118 },
  { day: 23, level: 117 },
  { day: 24, level: 118 },
  { day: 25, level: 120 },
  { day: 26, level: 122 },
  { day: 27, level: 124 },
  { day: 28, level: 123 },
  { day: 29, level: 121 },
  { day: 30, level: 119 },
];

const batteryDaily = [
  { hour: "00:00", percent: 98 },
  { hour: "01:00", percent: 97 },
  { hour: "02:00", percent: 96 },
  { hour: "03:00", percent: 96 },
  { hour: "04:00", percent: 35 },
  { hour: "05:00", percent: 95 },
  { hour: "06:00", percent: 44 },
  { hour: "07:00", percent: 93 },
  { hour: "08:00", percent: 92 },
  { hour: "09:00", percent: 91 },
  { hour: "10:00", percent: 90 },
  { hour: "11:00", percent: 39 },
  { hour: "12:00", percent: 68 },
  { hour: "13:00", percent: 87 },
  { hour: "14:00", percent: 26 },
  { hour: "15:00", percent: 85 },
  { hour: "16:00", percent: 84 },
  { hour: "17:00", percent: 83 },
  { hour: "18:00", percent: 82 },
  { hour: "19:00", percent: 81 },
  { hour: "20:00", percent: 40 },
  { hour: "21:00", percent: 19 },
  { hour: "22:00", percent: 78 },
  { hour: "23:00", percent: 77 },
];

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
