<template>
    <UCard class="w-full mx-auto max-w-[1000px] mt-6 overflow-y-auto ">
        <div class="flex flex-col">
            <span class="text-[20px] font-bold text-gray-800">Profile sahifasi</span>
            <div class="w-full mx-auto flex flex-col gap-4 items-center relative">





                <div class="w-full my-auto py-6 flex flex-col justify-center gap-2">
                    <div class="w-full flex sm:flex-row flex-col gap-2 justify-center">
                        <div class="w-full">
                            <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                <div class="flex flex-col pb-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Ismi</dt>
                                    <dd class="text-lg font-semibold">Jamshid</dd>
                                </div>
                                <div class="flex flex-col py-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Familiyasi</dt>
                                    <dd class="text-lg font-semibold">Ergashev</dd>
                                </div>
                                <div class="flex flex-col py-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Tug'ilgan kuni</dt>
                                    <dd class="text-lg font-semibold">14/09/2002</dd>
                                </div>

                            </dl>
                        </div>
                        <div class="w-full">
                            <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">

                                <div class="flex flex-col pt-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Telefon raqami</dt>
                                    <dd class="text-lg font-semibold">+ 998 94 156 90</dd>
                                </div>
                                <div class="flex flex-col pt-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                    <dd class="text-lg font-semibold">test@example.com</dd>
                                </div>
                                <div class="flex flex-col pt-3">
                                    <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400"></dt>
                                    <dd class="text-lg font-semibold"></dd>
                                </div>


                            </dl>
                        </div>
                    </div>


                </div>



                <div class="pt-6 border-t space-y-4 w-full">
                    <h3 class="text-xl font-semibold text-gray-800">Parolni almashtirish</h3>
                    <div class="flex flex-col gap-4 md:flex-row justify-around">
                        <div class="w-full  max-w-[400px]">
                            <UInput class="w-full" name="oldpassword" color="secondary" v-model="form.lastPassword" type="password"
                                label="Last Password" placeholder="Oldingi parol" />
                        </div>
                        <div class="w-full max-w-[400px]">
                            <UInput class="w-full" name="newpassword" color="secondary" v-model="form.newPassword" type="password"
                                label="New Password" placeholder="Yangi parol" />
                        </div>


                        <div class="w-full max-w-[400px]">
                            <UInput class="w-full" name="newconfirmpassword" color="secondary" v-model="form.newConfirmPassword"
                                type="password" label="Confirm New Password" placeholder="Yangi parol qayta" />
                        </div>

                    </div>


                    <div class="flex flex-col md:flex-row justify-end">
                        <UButton color="secondary">
                            O'zgartirish
                        </UButton>

                    </div>
                </div>
            </div>
        </div>
    </UCard>






</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
    layout: "root"
})


const form = ref({
    login: '',
    firstname: '',
    lastname: '',
    role: '',
    lastPassword: '',
    newPassword: '',
    newOldPassword: ''
})

const saveUser = () => {
    console.log('Saved:', form.value)
}
</script>

<style scoped></style>
