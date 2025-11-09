<template>
    <div class="flex font-bold text-[25px] items-center gap-2">Suv hajmi</div>
    <div class="h-auto mx-auto bg-white shadow-md w-full">
        <div class="w-full mx-auto gap-4 max-w-[700px] grid grid-cols-1 md:grid-cols-2 ">
            <div class="flex flex-col  gap-3">
                <label for="">Boshlanish vaqti</label>
                <div>
                    <UInput type="datetime-local" class="w-[200px]" />
                </div>
            </div>


            <div class="flex flex-col justify-center gap-2 max-w-[100px] w-full ">
                <label for="">Tugash vaqti </label>
                <div>
                    <UInput type="datetime-local" class="w-[200px]" />

                </div>
            </div>


        </div>


        <div class="w-full mx-auto max-w-[700px] grid grid-cols-2 mt-5">
            <UButton class="w-10 ms-4 pt-1" color="secondary" :class="'cursor-pointer'">
                <Icon name="material-symbols:search" class="text-[20px]" width="24" height="24" />
            </UButton>



            <UButton @click="download()" class="w-10 ms-4 pt-1" color="secondary" :class="'cursor-pointer'">
                <Icon name="material-symbols:download-for-offline" class="text-[20px]" width="24" height="24" />
            </UButton>

        </div>


        <div>


            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Tartib raqam
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Suv sathi
                            </th>
                            <th scope="col" class="px-6 py-3">
                                0
                            </th>

                            <th scope="col" class="px-6 py-3">
                                1
                            </th>

                            <th scope="col" class="px-6 py-3">
                                2
                            </th>

                            <th scope="col" class="px-6 py-3">
                                3
                            </th>

                            <th scope="col" class="px-6 py-3">
                                4
                            </th>

                            <th scope="col" class="px-6 py-3">
                                5
                            </th>
                            <th scope="col" class="px-6 py-3">
                                6
                            </th>
                            <th scope="col" class="px-6 py-3">
                                7
                            </th>
                            <th scope="col" class="px-6 py-3">
                                8
                            </th>
                            <th scope="col" class="px-6 py-3">
                                9
                            </th>


                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(value, index) in data" :key="index"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ index + 1 }}
                            </th>
                            <td v-for="numbers in value" class="px-6 py-4">
                                {{ numbers }}
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>



        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "userdashboard"
});

const { $exportToExcel } = useNuxtApp()

const data = ref<number[][]>([
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],
    [
        Number((Math.random() * 45).toFixed(2)),

        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),
        Number((Math.random() * 10).toFixed(2)),

    ],

]);
console.log(data.value);

const header = [
    "Tartib raqam",
    "Suv sathi",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
]

const download = () => {
    const rows = data.value.map((row, i) => [
        i + 1,
        row[0],
        ...row.slice(1)
    ])

    $exportToExcel(header, rows, `${crypto.randomUUID()}.xlsx`)
}



</script>
