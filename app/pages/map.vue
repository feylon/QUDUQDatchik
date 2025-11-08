<template>
 
  <div id="map" style="width: 100%; height: 400px;"></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
const { $loadYandex } = useNuxtApp();


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

        <div class="flex gap-4  mt-2 w-full flex-col">
        <button id="infoBtn" class="bg-blue-600 cursor-pointer hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Balandlik 
        </button>

           <button id="infoBtn" class="bg-blue-600 cursor-pointer hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Tempratura C 
        </button>


           <button id="infoBtn" class="bg-blue-600 cursor-pointer hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Akkulmuyator
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
</script>
