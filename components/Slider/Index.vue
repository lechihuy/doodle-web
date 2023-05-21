<script lang="ts" setup>
import { duration } from "moment"

const props = defineProps({
  duration: { type: [Number, Boolean], default: 2000, },
  shownNavigate: { type: Boolean, default: true },
  shownDots: { type: Boolean, default: true },
})
const slots = useSlots()
const currentIndex = ref(0)
const slideCount = slots.default().length
provide('current-index', currentIndex)
let timer: any;

function moveToSlide(index: number) {
  currentIndex.value = index
  clearInterval(timer)

  if (props.duration) {
    timer = setInterval(autoMoveSlide, props.duration)
  }
}

function autoMoveSlide() {
  if (currentIndex.value == slideCount -1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++;
  }
}

if (props.duration) {
  timer = setInterval(autoMoveSlide, props.duration)
}
</script>

<template>
  <div class="rounded-lg relative overflow-hidden">
    <slot></slot>
    <div class="z-[1] inset-x-0 h-16 -bottom-6 flex justify-center items-start pt-4 bg-gradient-to-t pointer-events-none from-default-400 to-transparent gap-1.5 absolute">
      <div 
        v-for="(dot, index) in slideCount" :key="index" 
        class="w-3 h-3 rounded-full bg-transparent pointer-events-auto cursor-pointer ring-1 ring-offset-1 ring-white"
        :class="[
          { '!bg-primary-500': currentIndex === index }
        ]"
        @click="moveToSlide(index)"
      >
      </div>
    </div>
  </div>
</template>