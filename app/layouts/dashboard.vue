<template>
    <div class="w-full overflow-hidden h-screen bg-white relative">
        <nav
            class="h-[70px] max-w-full sticky top-0 bg-white shadow-lg w-full flex justify-between ps-4 pe-4 items-center">
            <div>
                <font-awesome-icon @click="menuBar = true" icon="fa-solid fa-bars"
                    class="h-5 cursor-pointer text-[14px] hover:bg-gray-100" />
            </div>


            <div>
                <img class="w-[50px] h-[50px] rounded-full" src="/pics/user.webp" alt="">
            </div>
        </nav>

        <div class="h-full flex flex-col overflow-y-auto ps-4 pe-4 pb-4 mb-2 w-full max-w-full">
            <slot />
            <div class="min-h-20">
            </div>
        </div>


        <div class="fixed top-0 left-0 h-full duration-300 z-501 w-[300px] bg-white shadow-lg border-r border-gray-200"
            :class="menuBar ? 'translate-x-0' : '-translate-x-full'">

            <div class="w-full h-[130px] border-gray-100 border-b-2"></div>
            <div class="w-full flex flex-col ms-5 gap-3">

                <NuxtLink active-class="text-[#465ffe]" v-for="value in menus" :key="value.id" :to="value.to"
                    class="flex gap-2 items-center duration-100  font-semibold mt-3 px-3 py-2 rounded-md hover:text-[#465ffe] cursor-pointer"
                    :class="[value.to== '/login' ? 'text-red-600 hover:text-red-700' : '']"
                    >
                    <font-awesome-icon class="h-4" :icon="value.icon" />
                    <span>{{value.title}}</span>
                </NuxtLink>



            </div>

        </div>
        <div v-if="menuBar" @click="menuBar = false;"
            class="w-screen inset-0 bg-black/5 backdrop-blur-sm top-0 left-0 h-screen fixed  z-500">

        </div>

    </div>



</template>
<script setup lang="ts">
import { Auth } from '~/store/Auth.main';
const menuBar = ref<boolean>(false);
const auth = Auth();
console.log(auth.User)

const menus = computed<{
    id: string,
    to: string,
    title: string,
    icon: string
}[]>(() => [
    {
        id: "1",
        to: '/',
        title: "Qurilma",
        icon: 'fa-solid fa-house'
    },
    {
        id: "2",
        to: '/map',
        title: "MSR ro'yxati",
        icon: "fa-solid fa-list"
    },
    {
        id: "3",
        to: '/map',
        title: "Ro'yxat",
        icon: "fa-solid fa-list"

    },
    {
        id: "4",
        to: '/superadmin/users',
        title: "Foydalanuvchilar",
        icon: "fa-solid fa-users"

    },
    {
        id: "5",
        to: '/map',
        title: "Qurilma foydalanuvchilari",
        icon: "fa-solid fa-bridge-water"
    },
    {
        id: "6",
        to: '/map',
        title: "Profil",
        icon: 'fa-solid fa-address-card'
    },
    {
        id: "7",
        to: '/login',
        title: "Chiqish",
        icon: 'fa-solid fa-right-from-bracket'
    },

])
</script>
