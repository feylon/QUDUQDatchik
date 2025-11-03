<template>
  <span class="text-[25px] justify-between font-bold flex items-center gap-4">
    <div class="flex items-center gap-2">
      <font-awesome-icon @click="router.go(-1)" icon="fa-solid fa-arrow-left" class="h-6" />
      Yangi qurilma qo'shish
    </div>

   
  </span>


  <div>
    <div class="max-w-[700px] mx-auto">
    <YandexPicker @change="onPicked" />
    </div>

    <div class="mt-4 p-3 bg-gray-100 mx-auto rounded max-w-[700px]">
      <span class="font-bold">Tanlangan joylashuv:</span> {{ picked }}
    </div>
  </div>

  <div>
   <form @submit.prevent="onSubmit" class="space-y-4 max-w-[700px] mx-auto">
  <div>
    <label class="block text-sm font-medium">IMEI</label>
    <UInput color="secondary" v-model="form.imei" type="text" inputmode="numeric" maxlength="20" class="mt-1 w-full" />
    <p v-if="errors.imei" class="text-red-600 text-sm mt-1">{{ errors.imei }}</p>
  </div>

  <div>
    <label class="block text-sm font-medium">Name</label>
    <UInput color="secondary" v-model="form.name" type="text" class="mt-1 w-full" />
    <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
  </div>

  <div>
    <label class="block text-sm font-medium">Phone</label>
    <UInput color="secondary" v-model="form.phone" type="tel" inputmode="tel" class="mt-1 w-full" />
    <p v-if="errors.phone" class="text-red-600 text-sm mt-1">{{ errors.phone }}</p>
  </div>

  <div>
    <label class="block text-sm font-medium">Time interval (seconds)</label>
    <UInput color="secondary" v-model.number="form.time_interval" type="number" min="0" class="mt-1 w-full" />
    <p v-if="errors.time_interval" class="text-red-600 text-sm mt-1">{{ errors.time_interval }}</p>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium">web1</label>
      <UInput color="secondary" v-model="form.web1" type="url" placeholder="https://..." class="mt-1 w-full" />
      <p v-if="errors.web1" class="text-red-600 text-sm mt-1">{{ errors.web1 }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium">web2</label>
      <UInput color="secondary" v-model="form.web2" type="url" placeholder="https://..." class="mt-1 w-full" />
      <p v-if="errors.web2" class="text-red-600 text-sm mt-1">{{ errors.web2 }}</p>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium">engpastnuqta (latitude)</label>
      <UInput color="secondary" v-model.number="form.engpastnuqta" type="number" step="any" class="mt-1 w-full" />
      <p v-if="errors.engpastnuqta" class="text-red-600 text-sm mt-1">{{ errors.engpastnuqta }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium">enyuqorinuqta (longitude)</label>
      <UInput color="secondary" v-model.number="form.enyuqorinuqta" type="number" step="any" class="mt-1 w-full" />
      <p v-if="errors.enyuqorinuqta" class="text-red-600 text-sm mt-1">{{ errors.enyuqorinuqta }}</p>
    </div>
  </div>

  <div class="flex items-center gap-3 justify-end">
    <UButton color="neutral" variant="soft" type="button" @click="onReset">
      Tozalash
    </UButton>

    <UButton  color="secondary" type="submit">
      Saqlash
    </UButton>
  </div>
</form>
</div>
    <div class="h-[200px]">
    </div>
</template>

<script lang="ts" setup>
import YandexPicker from "@/components/YandexPicker.vue";
definePageMeta({
  layout : "dashboard"
})
const picked = ref([]);
const router = useRouter();


const onPicked = (coords :any) => {
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

function validate() {
  errors.imei = !form.imei ? 'IMEI kerak.' : null
  errors.name = !form.name ? 'Name kerak.' : null
  errors.phone = !form.phone ? 'Phone kerak.' : null
  errors.time_interval = (form.time_interval == null || form.time_interval < 0) ? 'Time interval musbat son bolishi kerak.' : null
  errors.web1 = form.web1 && !isValidUrl(form.web1) ? 'web1 notogri URL.' : null
  errors.web2 = form.web2 && !isValidUrl(form.web2) ? 'web2 notogri URL.' : null
  errors.engpastnuqta = (form.engpastnuqta == null) ? 'Latitude kerak.' : null
  errors.enyuqorinuqta = (form.enyuqorinuqta == null) ? 'Longitude kerak.' : null

  return Object.values(errors).every(v => v === null)
}

function isValidUrl(str: string) {
  try {
    // Basic URL validation
    new URL(str)
    return true
  } catch {
    return false
  }
}

function onSubmit() {
  if (!validate()) return
  // Emit the form data to parent
  emit('submit', { ...form })
}

function onReset() {
  form.imei = ''
  form.name = ''
  form.phone = ''
  form.time_interval = 60
  form.web1 = ''
  form.web2 = ''
  form.engpastnuqta = null
  form.enyuqorinuqta = null
  Object.keys(errors).forEach(k => (errors[k] = null))
  emit('reset')
}
</script>
<style>
</style>