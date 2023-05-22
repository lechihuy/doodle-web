<script lang="ts" setup>

</script>

<template>
  <div class="overflow-hidden relative">
    <div class="marquee h-full flex items-center"
    >
      <div class="marquee--inner flex whitespace-nowrap">
        <div v-for="i in 2" :key="i" class="track">
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