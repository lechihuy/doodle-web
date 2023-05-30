<script lang="ts" setup>
const currentCustomer = useCurrentCustomer()
const cart = useCart()
const branches = ref(cart.data.available_branches)
const { $lodash } = useNuxtApp()

const selectedBranch = ref(cart.data.branch)

branches.value = branches.value.map((branch) => {
  branch.distance = cart.data.address.meta.branch_distances.find((branchDistance) => branchDistance.branch_id === branch.id).distance
  return branch
})

branches.value = $lodash.sortBy(branches.value, 'distance')

async function setCartBranch(branchId: number) {
  await useEditCartApi({ branch_id: branchId })
    .then(() => {
      useCart().fetch()
      useNotEnoughStockModal().close()
    })
}

watch (cart, () => {
  selectedBranch.value = cart.data.branch

  branches.value = branches.value.map((branch) => {
    branch.distance = cart.data.address.meta.branch_distances.find((branchDistance) => branchDistance.branch_id === branch.id).distance
    return branch
  })

  branches.value = $lodash.sortBy(branches.value, 'distance')
}, { deep: true })
</script>

<template>
  <HeadlessListbox as="div" class="relative inline-block text-default-700" v-model="selectedBranch" by="id">
    <HeadlessListboxButton
      class="cursor-pointer focus:outline-none gap-2 px-2 bg-default-50 w-full py-1 rounded-full text-sm ring-1 ring-default-200 text-default-700 flex items-center"
    >
      <div class="w-8 h-8 flex-none rounded-full bg-white ring-1 ring-default-500/10 flex items-center justify-center">
        <Icon name="noto-v1:convenience-store" class="w-5 h-5" />
      </div>

      <div class="flex flex-col gap-0.5 text-left">
        <p class="text-sm line-clamp-1"><span class="hidden xs:inline-block">Chi nhánh:</span> <strong>{{ selectedBranch?.name }}</strong></p>
        <p class="line-clamp-1 text-xs">{{ selectedBranch?.address.shortcut_full_address }}</p>
      </div>
    </HeadlessListboxButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <HeadlessListboxOptions
        class="absolute divide-y divide-default-100 mt-2 w-80 left-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        :style="{ zIndex: zIndex.dropdown }"
      >
        <div class="py-1">
          <HeadlessListboxOption v-for="branch in branches" :key="branch.id" v-slot="{ active, selected }" :value="branch">
            <button
              type="button"
              :class="[
                active ? 'bg-default-100' : '',
                { '!bg-primary-500 !text-white': selected },
                'group flex w-full items-center px-2 py-2 gap-2 text-sm text-left',
              ]"
              @click="setCartBranch(branch.id)"
            >
              <Icon :name="selected ? 'heroicons:check' : 'heroicons:map-pin'" class="w-5 h-5 flex-none" />
              <div class="flex flex-col">
                <p class="text-sm font-semibold">{{ branch.name }} <span>(cách {{ distance(branch.distance) }})</span></p> 
              </div>
              <Icon v-show="!branch.available_for_cart" name="heroicons:exclamation-triangle" class="w-5 h-5 flex-none ml-auto text-warning-500" :class="{ '!text-white': selected }" />
            </button>
          </HeadlessListboxOption>
        </div>
      </HeadlessListboxOptions>
    </transition>
  </HeadlessListbox>
</template>