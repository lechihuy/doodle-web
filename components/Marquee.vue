<script lang="ts" setup>
import defaultTheme from 'tailwindcss/defaultTheme'

const props = defineProps({
  reverse: { type: Boolean, default: false, },
  itemWidth: { type: [String], },
  itemHeight: { type: [String], default: 36 },
  itemGap: { type: [String, Number] },
  itemLength: Number
})

// @ts-ignore
const itemHeight = defaultTheme.spacing[props.itemHeight]
// @ts-ignore
const itemWidth = defaultTheme.spacing[props.itemWidth]
// @ts-ignore
const itemGap = defaultTheme.spacing[props.itemGap]
</script>

<template>
  <div class="overflow-hidden relative"
    style="
      mask-image: linear-gradient(to left, transparent, white, white, white, white, white, transparent);
      -webkit-mask-image: linear-gradient(to left, transparent, white, white, white, white, white, transparent)
    "
  >
    <div class="marquee"
      :style="{
        height: itemHeight,
        width: `calc((${itemWidth} + ${itemGap}) * ${itemLength})`
      }"
    >
      <div :class="[reverse ? 'marquee-reverse--inner' : 'marquee--inner']">
        <div v-for="i in 2" :key="i" class="track" :style="{ gap: itemGap }">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

.marquee .item {
  display: inline-block;
  transition: all .2s ease-out;
}
  
.marquee--inner {
  display: block;
  width: 200%;
  position: absolute;
  animation: marquee 20s linear infinite;
}

.marquee-reverse--inner {
  display: block;
  width: 200%;
  position: absolute;
  animation: marquee-reverse 20s linear infinite;
}
  
.marquee--inner:hover {
  animation-play-state: paused;
}

.marquee-reverse--inner:hover {
  animation-play-state: paused;
}
  /*.half {
    float: left;
    width: 10%;
  }*/
  
.marquee .track {
  display: flex;
  align-items: center;
  float: left;
  width: 50%;
}
  
@keyframes marquee {
  0% { left: 0; }
  100% { left: -100%; }
}

@keyframes marquee-reverse {
  0% { left: -100%; }
  100% { left: -0%; }
}
</style>