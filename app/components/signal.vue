<template>
    <div class="flex gap-2 text-white items-center">
        <div class="relative w-max-[10px] overflow-hidden bg-gray">
            <font-awesome-icon class="text-white static h-[15px]" :icon="['fas', 'signal']" />
            
        </div>
        
        {{internetType}}
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

// defineProps-ning to'g'ri ishlatilishi
const props = defineProps<{
    value: string | number;
}>();

const internetType = computed<string>(() => {
    if (props.value == 4) return "LTE"
    if (props.value == 3) return "3G"
    return "2G"
})
</script>
