<template>
<div class="flex  font-bold text-[18px] items-center gap-2">
    <font-awesome-icon @click="router.go(-1)" icon="fa-solid fa-arrow-left" class="h-6" />
    Foydalanuvchiga tegish qurilmalar
  </div>    

  <div>
    <div class="flex  items-start mt-3 gap-3 flex-wrap">
    <div @dblclick="navigateTo('/info/1')" v-for="value in FakeDataArray" :key="value.id" class="relative mb-4 w-full max-w-[400px] rounded-xl px-4 py-5 shadow-lg backdrop-blur-md
          border border-white/20 flex flex-col gap-4" :class="[StatusWell(value.status)]">
      <!-- Header -->
      <div class="flex justify-between items-start">
        <div class="text-[16px] font-bold text-white">
          {{ value.name }}
        </div>

        <div class="flex items-center gap-4 me-12">
          <Signal :value="Math.trunc(Math.random() * 4)" />

          <charger :is-charger="value.isCharger" :value="value.chargerValue" />
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



  </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
    layout : "dashboard"
});
const router = useRouter();




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
    }
  ];
</script>
