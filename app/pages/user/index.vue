<template>
  <div class="text-black">
    <span class="text-[25px] font-bold"> Mavjud qurilmalar</span>

    <div class="w-full mt-4 mb-4">
      <YandexPicker :points="devicePoints" @change="handleSelect" @action="handleBalloon" />


    </div>

  </div>

  <Loading v-if="pending" />
  <div v-else>
    <div class="mt-2 flex items-center justify-center mb-2 gap-2">
      <UInput color="secondary" v-model="searchValue" class="w-[400px]" />
      <UButton color="secondary" icon="i-lucide-search" size="md" variant="solid" />
    </div>



    <div class="flex items-center mt-3 gap-3 flex-wrap justify-center">
      <div @dblclick="navigateTo('/info/1')" v-for="value in devices" :key="value.id" class="relative mb-4 w-full max-w-[400px] rounded-xl px-4 py-5 shadow-lg backdrop-blur-md
          border border-white/20 flex flex-col gap-4" :class="[StatusWell(value.status)]">
        <!-- Header -->
        <div class="flex justify-between items-start">
          <div class="text-[22px] font-bold text-white">
            {{ value.name }}
          </div>

          <div class="flex items-center gap-4 me-12">
<Icon 
  class="text-white text-[20px]"
  :name="
    value.waterLevel == 'rise'
      ? 'material-symbols:arrow-shape-up-rounded'
      : value.waterLevel == 'fall'
      ? 'material-symbols:arrow-downward-rounded'
      : value.waterLevel == 'stable'
      ? 'material-symbols:chips-outline'
      : ''
  "
  width="24"
  height="24"
/>

            <Signal :signal="value.SignalType" :value="value.signal" />

            <charger :is-charger="value.IsCharger" :value="value.BatteryValue" />
          </div>

          <!-- Dropdown -->
          <div class="absolute right-3 top-3">
            <UDropdownMenu :items="value.item" @select="onSelect">
              <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
            </UDropdownMenu>
          </div>
        </div>

        <!-- Info rows -->
        <div class="space-y-1 text-white text-[13px]">
          <div class="flex justify-between">
            <span class="font-bold">IMEI</span>
            <span>{{ value.Imei }}</span>
          </div>

          <div class="flex justify-between">
            <span class="font-bold">Telefon</span>
            <span>{{ value.phone }}</span>
          </div>

          <div class="flex justify-between">
            <span class="font-bold">Joriy balandlik</span>
            <span>{{ value.lastheight }} MM</span>
          </div>

          
        </div>
      </div>



    </div>
    <div class="mb-5 justify-center flex pb-4">
      <UPagination v-model:page="page" :total="total" class="mb-5 mx-auto block mt-7" color="secondary"
        active-color="secondary" />
    </div>


    <div @click="navigateTo('/superadmin/adddevice')"
      class="w-[50px] h-[50px] flex items-center justify-center rounded-full fixed right-5 bg-blue-600 bottom-5">
      <font-awesome-icon class="h-[15px] text-white" icon="fa-solid fa-plus" />
    </div>
  </div>



  <div class="mt-6">
  </div>




</template>
<script lang="ts" setup>
import { select } from "#build/ui";
import type { deviceType } from "~/types/types";
const { $loadYandex } = useNuxtApp();
definePageMeta({
  layout: "userdashboard"
});




const devicePoints = ref<{
  id: string | number;
  lat: number | string;
  lon: number | string,
  data?: any
}[]>([
  { id: 1, lat: 39.6714, lon: 67.0025, },
  { id: 2, lat: 39.68, lon: 67.0101, },
  { id: 3, lat: 39.66, lon: 67.02, }
]);


const route = useRoute()
const router = useRouter();

const searchValue = ref<string>('')
const page = ref(Number(route.query.page) || 1)
const total = ref(100);

const query = computed(() => `devices?page=${page.value}` + (searchValue.value ? `&search=${encodeURIComponent(searchValue.value)}` : ''));
const { data, pending, error, status, refresh } = useApi(query.value);

console.log(pending.value)




const locations = [
  {
    id: "1",
    coords: [41.3112, 69.2797],
    title: "Toshkent markazi",
    phone: "+998 90 123 45 67",
    address: "Amir Temur ko‘chasi 1",
  },
  {
    id: "2",
    coords: [41.3251, 69.2402],
    title: "Chilonzor",
    phone: "+998 90 998 77 66",
    address: "Chilonzor 3-daha",
  },
  {
    id: "3",
    coords: [41.3505, 69.2076],
    title: "Shayxontohur",
    phone: "+998 91 555 00 22",
    address: "Eski shahar",
  },
];



const items =
  ref([
    [
      {
        label: 'Tahrirlash',
        icon: 'i-lucide-pencil',
        onSelect() {
          console.log('Tahrirlash bosildi')
        }
      },
      {
        label: "Qurilma haqida ma'lumot",
        icon: 'i-lucide-info',
        onSelect() {
          console.log("Info bosildi");
          navigateTo("/info/1")
        }
      },
      {
        label: "Balandlik haqida ma'lumot",
        icon: 'i-lucide-info',
        onSelect() {
          console.log("Balandlik bosildi");
          navigateTo("/info/1")
        }
      },


      {
        label: "Temperatura haqida ma'lumot",
        icon: 'material-symbols:thermometer',
        onSelect() {
          console.log("Temperatura bosildi");
          navigateTo("/info/1")
        }
      },
      {
        label: "Akkulmuyator haqida ma'lumot",
        icon: 'material-symbols:battery-alert',
        onSelect() {
          console.log("Akkulmuyator bosildi");
          navigateTo("/info/1")
        }
      },
      {
        label: "O'chirish",
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect() {
          console.log("O'chirish bosildi")
        }
      }
    ]
  ])



const onSelect = (item: any) => {
  console.log("Event")
  console.log("Bosilgan item:", item)

  if (item.label === 'Profile') {
    console.log("Profile bosildi")
  }

  if (item.label === 'Billing') {
    console.log("Billing bosildi")
  }
}

const StatusWell = (random: string): string => {
  if (random == 'good') return "bg-green-600";
  if (random == 'unknown') return "bg-red-700";
  if (random == 'broken') return "bg-gray-600";
  // return "bg-green-600"

  return "bg-black"
}




const devices = ref<deviceType[]>([])

// Devices data o‘zgarganda marker qo‘shish

watch(data, (newVal) => {
  console.log(data.value);
  devices.value = [];
  if (!newVal) return

  devices.value = [];
  devicePoints.value = [];

  (newVal as deviceType[]).forEach((el) => {
    el.item = ref([
      [
        {
          label: 'Tahrirlash',
          icon: 'i-lucide-pencil',
          onSelect() {
            console.log('Tahrirlash bosildi', el.id)
          }
        },
        // {
        //   label: "Qurilma haqida ma'lumot",
        //   icon: 'i-lucide-info',
        //   onSelect() {
        //     console.log("Info bosildi", el.id);
        //     // navigateTo("/info/1")
        //   }
        // },
        {
          label: "Balandlik haqida ma'lumot",
          icon: 'i-lucide-info',
          onSelect() {
            console.log("Balandlik bosildi", el.id);
            navigateTo(`/balandlik/${el.id}`)
          }
        },


        {
          label: "Temperatura haqida ma'lumot",
          icon: 'material-symbols:thermometer',
          onSelect() {
            console.log("Temperatura bosildi", el.id);
            navigateTo(`/tempratura/${el.id}`)
          }
        },
        {
          label: "Akkulmuyator haqida ma'lumot",
          icon: 'material-symbols:battery-alert',
          onSelect() {
            console.log("Akkulmuyator bosildi", el.id);
            navigateTo(`/battery/${el.id}`)
          }
        },
        {
          label: "O'chirish",
          icon: 'i-lucide-trash',
          color: 'error',
          onSelect() {
            console.log("O'chirish bosildi", el.id)
          }
        }
      ]
    ])
    devices.value.push(el);
    devicePoints.value.push(
      {
        id: el.id,
        lat: el.coords[0],
        lon: el.coords[1],
        data: el
      }
    )

  });
  console.log(devicePoints.value)
});

watch(page, (newPage) => {
  router.replace({
    query: { ...route.query, page: newPage.toString() }

  });
  refresh();
});


let searchTimeout: ReturnType<typeof setTimeout>

watch(searchValue, (newVal) => {
  if (searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(() => {
    refresh()
  }, 3000)
});

// 


function handleSelect(coords: any) {
  console.log("Bosilgan joy:", coords);
}

// ✅ Masalan backenddan 3 sekundda yangilanadi
// setInterval(() => {
//   devicePoints.value = [
//     { id: 1, lat: 39.6714 + Math.random() / 100, lon: 67.0025 },
//     { id: 2, lat: 39.6800, lon: 67.0100 + Math.random() / 100 },
//     { id: 3, lat: 39.6600, lon: 67.0200 }
//   ];
// }, 3000);




function handleBalloon(ff: { button: string, id: string | number, data: any }) {
  console.log("Tugma bosildi:", ff, "ID:");
  if (ff.button == "battery") return navigateTo(`/battery/${ff.id}`);
  if (ff.button == "temp") return navigateTo(`/tempratura/${ff.id}`);
  if (ff.button == "high") return navigateTo(`/balandlik/${ff.id}`);



}

</script>



<style scoped>
div {
  /* font-family: 'Times New Roman', Times, serif; */
  font-family: Roboto, sans-serif;
}
</style>
