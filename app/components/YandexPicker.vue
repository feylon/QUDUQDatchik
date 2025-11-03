<template>
  <div ref="mapRef" class="w-full h-[400px] rounded-md border"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const mapRef = ref(null);
const emit = defineEmits(["change"]); // ✅ parentga [lat, lon] qaytaradi

const { $loadYandex } = useNuxtApp();

onMounted(async () => {
  await nextTick();

  const ymaps = await $loadYandex();
  await ymaps.ready();

  if (!mapRef.value) return;

  // ✅ Map yaratish
  const myMap = new ymaps.Map(
    mapRef.value,
    {
      center: [39.6714, 67.0025], // default: Uglich 39.6714, 67.0025
      zoom: 11,
    },
    {
      balloonMaxWidth: 200,
      searchControlProvider: "yandex#search",
    }
  );

  // ✅ Modal ichida ochilganda map o‘lchamini tiklash
  setTimeout(() => myMap.container.fitToViewport(), 300);

  // ✅ Chap bosish → balloon + emit
  myMap.events.add("click", function (e) {
    const coords = e.get("coords");

    // Parentga emit → [lat, lon]
    emit("change", coords);

    if (!myMap.balloon.isOpen()) {
      myMap.balloon.open(coords, {
        contentHeader: "Tanlandi!",
        contentBody:
          "<p>Xaritadan joyni tanlang</p>" +
          "<p>Tanlangan koordinata: " +
          [
            coords[0].toPrecision(6),
            coords[1].toPrecision(6),
          ].join(", ") +
          "</p>",
        contentFooter: "<sup> ... </sup>",
      });
    } else {
      myMap.balloon.close();
    }
  });

  // ✅ O‘ng bosish → hint
  myMap.events.add("contextmenu", function (e) {
    myMap.hint.open(e.get("coords"), "Someone right-clicked");
  });

  // ✅ Balloon ochilganda hint yopiladi
  myMap.events.add("balloonopen", function () {
    myMap.hint.close();
  });
});
</script>
