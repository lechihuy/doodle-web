<script lang="ts" setup>
const props = defineProps({
  fullSize: { type: Boolean, default: false, }
})
const currentCustomer = useCurrentCustomer()
const addresses = ref((await useIndexAddressApi()).data.data)
const selectedAddress = ref(currentCustomer.value.cart.address)
const cart = useCart()

async function setCartAddress(addressId: number) {
  await useEditCartApi({ address_id: addressId })
    .then((res) => {
      cart.initFromResponse(res.data.data)
      cart.changed()
    })
}
</script>

<template>
  <HeadlessListbox as="div" class="relative" v-model="selectedAddress" by="id">
    <HeadlessListboxButton
      class="cursor-pointer focus:outline-none bg-default-50 gap-2 px-2 w-full py-1 rounded-full ring-1 ring-default-500/10 text-default-700 flex items-center"
    >
      <div class="relative w-8 h-8 flex-none rounded-full bg-white ring-1 ring-default-500/10 flex items-center justify-center">
        <Icon name="twemoji:delivery-truck" class="w-5 h-5 transform -scale-x-100" />
        <span class="absolute right-0 top-0 flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div>

      <div class="flex flex-col gap-0.5 text-left">
        <p class="text-sm line-clamp-1"><span class="hidden xs:inline-block">Giao đến:</span> <strong>{{ selectedAddress?.name }}</strong></p>
        <p class="line-clamp-1 text-xs">{{ selectedAddress?.shortcut_full_address }}</p>
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
        class="absolute divide-y divide-default-100 mt-2 w-72 lg:w-full -left-1/2 xs:left-auto right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        :class="{ 'w-full !left-0': fullSize }"
      >
        <div class="py-1">
          <HeadlessListboxOption v-for="address in addresses" :key="address.id" v-slot="{ active, selected }" :value="address">
            <button
              type="button"
              :class="[
                active ? 'bg-default-100' : '',
                { '!bg-primary-500 !text-white': selected },
                'group flex w-full items-center px-2 py-2 gap-2 text-sm text-left',
              ]"
              @click="setCartAddress(address.id)"
            >
              <Icon :name="selected ? 'heroicons:check' : 'heroicons:map-pin'" class="w-5 h-5 flex-none" />
              <div class="flex flex-col">
                <p class="text-sm font-semibold">{{ address.name }}</p>
                <p class="text-xs">{{ address.shortcut_full_address }}</p>
              </div>
            </button>
          </HeadlessListboxOption>
        </div>
      </HeadlessListboxOptions>
    </transition>
  </HeadlessListbox>
</template>