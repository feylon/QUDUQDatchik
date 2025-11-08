<template>
  <div ref="mapRef" class="w-full h-[400px] border rounded-md"></div>
</template>

<script setup>
  import { ref, onMounted, nextTick, watch } from "vue";


  const props = defineProps({
    points: {
      type: Array,
      default: () => []
    }
  });

  const emit = defineEmits(["change", "action"]);

  const mapRef = ref(null);
  let myMap = null;
  let placemarkCollection = null;

  const { $loadYandex } = useNuxtApp();

  // Global handler for buttons inside Yandex balloon
  window.__YMAP_CLICK = (btn, id, data) => {
   
    emit("action", { button: btn, id, data : data });
  };

  function buildBalloonHtml(point) {
    // Use both Tailwind classes and inline styles as fallback.
    // SVG icons included inline (small, unobtrusive).
    return `
    <div class="flex flex-col gap-2 min-w-[220px]" style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111;">
      <div class="text-sm font-semibold mb-1" style="margin-bottom:6px; color:#0f172a;">
        Qurilma nomi : ${point?.data?.name}
        <br>
        Joylashuvi : [${point.lat}, ${point.lon}]
      </div>

      <div class="flex flex-col gap-2">
        <button
          onclick="window.__YMAP_CLICK('high', ${point.id})"
          class="flex cursor-pointer items-center gap-2 w-full px-3 py-2 text-sm rounded-lg border transition-shadow hover:shadow-sm"
          style="background:#fff; border:1px solid rgba(15,23,42,0.08);"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path fill="currentColor" d="m12 18.5l4-4l-1.4-1.4l-1.6 1.6V9.3l1.6 1.6L16 9.5l-4-4l-4 4l1.4 1.4L11 9.3v5.4l-1.6-1.6L8 14.5zm0 3.5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
	</svg>
          <span class="truncate">Balandlik</span>
        </button>

        <button
          onclick="window.__YMAP_CLICK('temp', ${point.id})"
          class="flex cursor-pointer items-center gap-2 w-full px-3 py-2 text-sm rounded-lg border transition-shadow hover:shadow-sm"
          style="background:linear-gradient(180deg,#fffbeb,#fff7ed); border:1px solid rgba(245,158,11,0.12);"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path fill="currentColor" d="M12 21q-2.075 0-3.537-1.463T7 16q0-1.2.525-2.238T9 12V6q0-1.25.875-2.125T12 3t2.125.875T15 6v6q.95.725 1.475 1.763T17 16q0 2.075-1.463 3.538T12 21m-1-11h2V6q0-.425-.288-.712T12 5t-.712.288T11 6z" />
	</svg>
          <span class="truncate">Temperatura</span>
        </button>

        <button
          onclick="window.__YMAP_CLICK('battery', ${point.id})"
          class="flex cursor-pointer items-center gap-2 w-full px-3 py-2 text-sm rounded-lg border transition-shadow hover:shadow-sm"
          style="background:linear-gradient(180deg,#ecfeff,#f0f9ff); border:1px solid rgba(14,165,233,0.12);"
        >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path fill="currentColor" d="M11 14h2V8h-2zm1 4q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-4 4q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22z" />
	</svg>
          <span class="truncate">Akkumlulyator</span>
        </button>
      </div>

      <div class="text-xs text-gray-400 mt-2" style="margin-top:8px; color:#64748b;">
        Ko'proq ma'lumot uchun tugmalardan birini bosing
      </div>
    </div>
  `;
  }

  function updateMarkers(ymaps, points) {
    if (!placemarkCollection) return;

    placemarkCollection.removeAll();

    points.forEach((point) => {
      const placemark = new ymaps.Placemark(
        [point.lat, point.lon],
        {
          balloonContentHeader: `ID: ${point.id}`,
          balloonContentBody: buildBalloonHtml(point)
        },
        {
          preset: "islands#icon",
          iconColor: "#ef4444",
          draggable: false
        }
      );

      placemark.events.add("click", () => {
        emit("change", [point.lat, point.lon]);
      });

      placemarkCollection.add(placemark);
    });
  }

  onMounted(async () => {
    await nextTick();

    const ymaps = await $loadYandex();
    await ymaps.ready();

    if (!mapRef.value) return;

    myMap = new ymaps.Map(
      mapRef.value,
      {
        center: [41.325,
          69.2399],
        zoom: 5
      }
    );

    placemarkCollection = new ymaps.GeoObjectCollection();
    myMap.geoObjects.add(placemarkCollection);

    updateMarkers(ymaps, props.points);

    setTimeout(() => myMap.container.fitToViewport(), 300);

    watch(
      () => props.points,
      (newVal) => updateMarkers(ymaps, newVal),
      { deep: true }
    );
  });
</script>