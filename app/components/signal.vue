<template>
    <div class="flex gap-2 text-white items-center">
        <div class="relative w-max-[10px] overflow-hidden bg-gray">
            <Icon :name="singalIconNAme" width="24" height="24" />
        </div>
        <Icon :name="internetType" class="text-[30px]" width="24" height="24" />

    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
    value: {
        type: [String, Number],
        required: true
    },
    signal: {
        type: Number,
        
    }
});

const internetType = computed<string>(() => {
    if (props.value == 4) return "material-symbols:4g-mobiledata"
    if (props.value == 3) return "material-symbols:3g-mobiledata"
    return "material-symbols:e-mobiledata-badge"
})

const singalIconNAme = computed<string>(() => {
    if (props.signal == 1) return 'material-symbols:signal-cellular-1-bar-rounded';
    if (props.signal == 2) return 'material-symbols:signal-cellular-2-bar-rounded';
    if (props.signal == 3) return 'material-symbols:signal-cellular-3-bar';
     return 'material-symbols:signal-cellular-4-bar';

})

/*
<Icon icon="material-symbols:4g-mobiledata" width="24" height="24" />
<Icon icon="material-symbols:4g-mobiledata" width="24" height="24" />
*/
</script>
