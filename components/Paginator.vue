<script setup lang="ts">
const props = defineProps({
  meta: Object,
  filter: Object,
})

const input = ref()

function nextPage() {
  if (props.filter!.page === props.meta!.last_page) return

  props.filter!.page++
}

function prevPage() {
  if (props.filter!.page === 1) return

  props.filter!.page--
}

function inputPage($event: any) {
  let page = $event.target.innerText.trim().replace(/\D/g, '').replace(/^0+/g, '1')
  page = page > props.meta!.last_page ? props.meta!.last_page : page

  input.value.innerText = page
  input.value.focus();
  window.getSelection()!.selectAllChildren(input.value)
  window.getSelection()!.collapseToEnd()
}

function blurInputPage() {
  let page = input.value.innerText > props.meta!.last_page ? props.meta!.last_page : input.value.innerText
  page = page == '' ? 1 : page

  input.value.innerText = page
}

function goToPage() {
  // if (props.filter!.page === props.meta!.current_page) return
  props.filter!.page = input.value.innerText
}
</script>
<template>
  <div class="flex items-center gap-5 select-none">
    <div class="flex items-center gap-2">
      <span>Trang</span>
      <span contenteditable="true" class="form-input text-sm" ref="input" @keydown.enter="goToPage" @blur="blurInputPage" @input="inputPage" @paste="inputPage">{{ filter.page }}</span>
      <button type="button" class="btn btn-default -ml-1" @click="goToPage">Đi</button>
      <span class="flex-none">trên tổng {{ meta.last_page }} trang.</span>
    </div>

    <div class="flex items-center gap-1">
      <button type="button"
        class="btn px-2.5 disabled:cursor-not-allowed"
        :class="[meta.current_page === 1 ? 'btn-disabled' : 'btn-default']"
        :disabled="meta.current_page === 1"
        @click="prevPage"
      >
        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
      </button>

      <button
        :disabled="meta.current_page === meta.last_page"
        class="btn px-2.5 disabled:cursor-not-allowed"
        :class="[meta.current_page === meta.last_page ? 'btn-disabled' : 'btn-default']"
        @click="nextPage"
      >
        <Icon name="heroicons:chevron-right" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>