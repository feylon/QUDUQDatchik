<template>
  <div class="text-black">
   <span class="text-[25px] font-bold"> Mavjud qurilmalar</span>


    <div class="mt-2 flex items-center justify-center mb-2 gap-2">
      <UInput color="secondary" v-model="searchValue" class="w-[400px]" />
      <UButton color="secondary" icon="i-lucide-search" size="md" variant="solid" />
    </div>
    <!-- <div class="mx-auto" id="map" style="width: 100%; height: 400px;"></div> -->
  </div>



  <div class="flex items-center mt-3 gap-3 flex-col">
    <div @dblclick="navigateTo('/info/1')" v-for="value in FakeDataArray" :key="value.id" class="relative mb-4 w-full max-w-[700px] rounded-xl px-4 py-5 shadow-lg backdrop-blur-md
          border border-white/20 flex flex-col gap-4" :class="[StatusWell(value.status)]">
      <!-- Header -->
      <div class="flex justify-between items-start">
        <div class="text-[22px] font-bold text-white">
          {{ value.name }}
        </div>

        <div class="flex items-center gap-4 me-12">
          <Signal :value="Math.trunc(Math.random() * 4)" />

          <charger :is-charger="value.isCharger" :value="value.chargerValue" />
        </div>

        <!-- Dropdown -->
        <div class="absolute right-3 top-3">
          <UDropdownMenu :items="items" @select="onSelect">
            <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
          </UDropdownMenu>
        </div>
      </div>

      <!-- Info rows -->
      <div class="space-y-1 text-white text-[13px]">
        <div class="flex justify-between">
          <span class="font-bold">IMEI</span>
          <span>{{ value.imei }}</span>
        </div>

        <div class="flex justify-between">
          <span class="font-bold">Telefon</span>
          <span>+{{ value.phone }}</span>
        </div>

        <div class="flex justify-between">
          <span class="font-bold">Joriy balandlik</span>
          <span>{{ value.height }} MM</span>
        </div>
      </div>
    </div>
    <UPagination v-model:page="page" :total="total" class="mb-5" color="secondary" active-color="secondary" />



  </div>


  <div class="w-[50px] h-[50px] flex items-center justify-center rounded-full fixed right-5 bg-blue-600 bottom-5">
    <font-awesome-icon class="h-[15px] text-white" icon="fa-solid fa-plus" />
  </div>




  <div class="mt-6">
salom
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "dashboard"
});

import { select } from "#build/ui";
import { onMounted } from "vue";
const { $loadYandex } = useNuxtApp();

const searchValue = ref<string>('')
const page = ref(5)
const total = ref(100)


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

onMounted(async () => {
  const ymaps = await $loadYandex();

  const BalloonLayout = ymaps.templateLayoutFactory.createClass(`
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
  `, {
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
    }
  });

  const map = new ymaps.Map("map", {
    center: [41.3112, 69.2797],
    zoom: 12,
  });

  // ✅ BIR NECHTA MARKER QO‘SHISH
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

// ✅ BUTTON CLICK HANDLER
const buttonClicked = (id: string, action: string) => {
  console.log(`${action} tugma bosildi. ID = ${id}`);
};

const items = ref([
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

const StatusWell = (random: number): string => {
  // const random = Math.trunc(Math.random() * 3);
  if (random == 2) return "bg-green-600";
  if (random == 1) return "bg-red-700";
  if (random == 0) return "bg-gray-600";
  // return "bg-green-600"

  return ""
}




const FakeDataArray: {
  id: number,
  name: string,
  status: number,
  isCharger: boolean,
  chargerValue: number,
  imei: string,
  phone: string,
  height: number
}[] = [
    {
      id: 1,
      name: "Quduq 1",
      status: 2,
      isCharger: true,
      chargerValue: 87,
      imei: "867530900112233",
      phone: "+998901234567",
      height: 3200
    },
    {
      id: 2,
      name: "Quduq 2",
      status: 1,
      isCharger: false,
      chargerValue: 22,
      imei: "352099008877665",
      phone: "+998907778899",
      height: 1850
    },
    {
      id: 3,
      name: "Quduq 3",
      status: 2,
      isCharger: true,
      chargerValue: 64,
      imei: "490154203237518",
      phone: "+998912223344",
      height: 7430
    },
    {
      id: 4,
      name: "Quduq 4",
      status: 0,
      isCharger: false,
      chargerValue: 15,
      imei: "356938035643809",
      phone: "+998933003322",
      height: 540
    },
    {
      id: 5,
      name: "Quduq 5",
      status: 2,
      isCharger: true,
      chargerValue: 98,
      imei: "353490089654123",
      phone: "+998935556677",
      height: 9020
    },
    {
      id: 6,
      name: "Quduq 6",
      status: 1,
      isCharger: false,
      chargerValue: 41,
      imei: "356876109876543",
      phone: "+998938889900",
      height: 1200
    },
    {
      id: 7,
      name: "Quduq 7",
      status: 2,
      isCharger: true,
      chargerValue: 73,
      imei: "355678903452189",
      phone: "+998931112233",
      height: 6500
    },
    {
      id: 8,
      name: "Quduq 8",
      status: 0,
      isCharger: false,
      chargerValue: 5,
      imei: "354789012345678",
      phone: "+998934445566",
      height: 280
    },
    {
      id: 9,
      name: "Quduq 9",
      status: 1,
      isCharger: true,
      chargerValue: 57,
      imei: "351234567890123",
      phone: "+998939998877",
      height: 3340
    },
    {
      id: 10,
      name: "Quduq 10",
      status: 2,
      isCharger: false,
      chargerValue: 33,
      imei: "359876543210987",
      phone: "+998936661122",
      height: 4800
    }
  ];
</script>



<style scoped>
div {
  /* font-family: 'Times New Roman', Times, serif; */
  font-family: Roboto, sans-serif;
}
</style>
