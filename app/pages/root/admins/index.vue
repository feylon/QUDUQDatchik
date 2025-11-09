<template>
    <span class="text-[25px] justify-between font-semibold mb-5 mb-5 flex items-center gap-4">
        <div class="flex items-center gap-2">
            Adminlar ro'yxati
        </div>


    </span>

    <div class="w-full">


        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            #
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Admin F.O
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Activligi
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tahrirlash
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, count) in users" :key="user.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ count + 1 }}
                        </th>

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ user.lastname }} {{ user.firstname }}
                        </th>
                        <td class="px-6 py-4">
                            {{ user.username }}
                        </td>
                        <td class="px-6 py-4">
                            <USwitch @change="changeActivityAdmin(user.id)" color="secondary" v-model="user.active" />

                        </td>
                        <td class="px-6 py-4">
                            <UButton @click="EditUser(user.id)" color="secondary">
                                <Icon name="material-symbols:edit-outline-rounded" width="24" height="24" />
                            </UButton>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
          <div class="flex justify-center">
    <UPagination v-model:page="page" :total="total" class="mb-5 mx-auto mt-4" color="secondary"
      active-color="secondary" />
  </div>
    </div>




    <UModal v-model:open="AddUserMOdal" :ui="{ content: 'max-w-[600px] ' }">

        <template #content>
            <form @submit.prevent="AddAdminFunction()" class=" w-full">
                <UCard class="w-[600px]">

                    <div class="grid gap-8 md:grid-cols-2 grid-cols-1">

                        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
                            <label for=""><span class="font-semibold">Admin ismi</span></label>
                            <UInput v-model="admin.firstname" :required="true" class="w-[250px]" color="secondary" />
                        </div>


                        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
                            <label for=""><span class="font-semibold">Admin familiyasi</span></label>
                            <UInput v-model="admin.lastname" :required="true" class="w-[250px]" color="secondary" />
                        </div>




                        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
                            <label for=""><span class="font-semibold">Admin logini</span></label>
                            <UInput v-model="admin.login" :required="true" class="w-[250px]" color="secondary" />
                        </div>



                        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
                            <label for=""><span class="font-semibold">Admin paroli</span></label>
                            <UInput v-model="admin.password" type="password" :required="true" class="w-[250px]"
                                color="secondary" />
                        </div>



                    </div>


                    <div class="w-full mb-4 mt-4 md:justify-end justify-center flex">
                        <UButton type="submit" color="secondary">Saqlash</UButton>
                    </div>

                </UCard>
            </form>
        </template>
    </UModal>


    <!-- editadminmodal -->
    <UModal v-model:open="editAdminModal" :ui="{ content: 'max-w-[600px] ' }">

        <template #content>
            <form @submit.prevent="editAdminFunction()" class=" w-full">
                <UCard class="w-[600px]">

                    <div class="grid gap-8 md:grid-cols-2 grid-cols-1">

                        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
                            <label for=""><span class="font-semibold">Admin ismi</span></label>
                            <UInput v-model="editadmin.firstname" :required="true" class="w-[250px]"
                                color="secondary" />
                        </div>


                        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
                            <label for=""><span class="font-semibold">Admin familiyasi</span></label>
                            <UInput v-model="editadmin.lastname" :required="true" class="w-[250px]" color="secondary" />
                        </div>




                        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
                            <label for=""><span class="font-semibold">Admin logini</span></label>
                            <UInput v-model="editadmin.username" :required="true" class="w-[250px]" color="secondary" />
                        </div>



                        <div class="flex max-w-[350px] gap-4 items-center justify-between mt-4">
                            <label for=""><span class="font-semibold">Admin paroli</span></label>
                            <USwitch color="secondary" v-model="editadmin.active" />

                        </div>



                    </div>


                    <div class="w-full mb-4 mt-4 md:justify-end justify-center flex">
                        <UButton type="submit" color="secondary">Saqlash</UButton>
                    </div>
                </UCard>
            </form>
        </template>
    </UModal>


    <div @click="AddUserMOdal = true"
        class="w-[50px] h-[50px] flex items-center justify-center rounded-full fixed right-5 bg-blue-600 bottom-5">
        <font-awesome-icon class="h-[15px] text-white" icon="fa-solid fa-plus" />
    </div>

</template>

<script lang="ts" setup>

definePageMeta({
    layout: "root"
});


const router = useRouter();
const AddUserMOdal = ref<boolean>(false)
const page = ref(5)
const total = ref(100)

const users = ref<{
    id: number | string,
    firstname: string,
    lastname: string,
    username: string,
    active: boolean
}[]>([
    { id: 1, firstname: "Jamshid", lastname: "Ergashev", username: "j.ergashev", active: true },
    { id: 2, firstname: "Akmal", lastname: "Mamadaliev", username: "a.mamadaliev", active: false },
    { id: 3, firstname: "Laziz", lastname: "Qodirov", username: "l.qodirov", active: true },
    { id: 4, firstname: "Olim", lastname: "Tursunov", username: "o.tursunov", active: true },
    { id: 5, firstname: "Muhammad", lastname: "Sattorov", username: "m.sattorov", active: false },
    { id: 6, firstname: "Sardor", lastname: "Rasulov", username: "s.rasulov", active: true },
    { id: 7, firstname: "Bekzod", lastname: "Nazarov", username: "b.nazarov", active: false },
    { id: "U-008", firstname: "Shahzod", lastname: "Karimov", username: "sh.karimov", active: true },
    { id: "U-009", firstname: "Dilshod", lastname: "Abdullayev", username: "d.abdullayev", active: true },
    { id: "U-010", firstname: "Komil", lastname: "Yo‘ldoshev", username: "k.yoldoshev", active: false }
]);

const editadmin = ref<{
    id: number | string,
    firstname: string,
    lastname: string,
    username: string,
    active: boolean
}>({
    id: '',
    active: true,
    firstname: '',
    lastname: '',
    username: ''
});


const editAdminModal = ref<boolean>(false)
const EditUser = async (id: number | string) => {
    const found = users.value.find((el) => el.id == id);

    if (found) {
        editadmin.value = found;
        editAdminModal.value = true;
    }
};




const admin = ref<{
    firstname: string;
    lastname: string;
    login: string;
    password: string
}>({
    firstname: '',
    lastname: "",
    login: "",
    password: ""
});



const AddAdminFunction = async () => {
    console.log(admin.value)
}

const changeActivityAdmin = async (id: any) => {
    console.log(id)

}

const editAdminFunction = async ()=>{
    console.log(editadmin.value)
}
</script>