<script lang="ts" setup>
import MainHeader from '~/layouts/partials/MainHeader.vue'

const route = useRoute()
const currentCustomer = useCurrentCustomer()

function navigate(to: any) {
  navigateTo(to)
}
</script>

<template>
  <MainHeader />

  <div class="relative min-h-[calc(100vh_-_theme(space.16))] flex flex-col">
    <div class="flex flex-col lg:flex-row container mx-auto min-h-full grow lg:divide-x divide-default-900/10">
      <div class="w-full lg:w-72 pt-3 lg:pt-7 px-3">
        <div class="lg:sticky lg:top-24 flex flex-col gap-5">
          <div class="flex items-center gap-5 border-b border-default-500/10 pb-3">
            <HeadlessMenu as="div" class="relative lg:hidden">
              <div class="flex flex-col gap-1">
                <HeadlessMenuButton
                  class="focus:outline-none btn btn-transparent"
                >
                  <Icon name="heroicons:bars-3" class="w-5 h-5" />
                </HeadlessMenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <HeadlessMenuItems
                  class="absolute divide-y divide-default-100 left-0 mt-2 w-52 origin-top-left rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  :style="{ zIndex: zIndex.dropdown }"
                >
                  <div class="py-1.5">
                    <HeadlessMenuItem v-slot="{ active }">
                      <button
                        type="button"
                        :class="[
                          active ? 'bg-default-100' : '',
                          'group flex w-full items-center px-3 py-2 gap-2',
                          { '!bg-primary-500 !text-white': route.name === 'profile' }
                        ]"
                        @click="navigate({ name: 'profile' })"
                      >
                        <Icon :name="route.name === 'profile' ? 'heroicons:user-circle-solid' : 'heroicons:user-circle'" class="w-5 h-5" />
                        Hồ sơ
                      </button>
                    </HeadlessMenuItem>

                    <HeadlessMenuItem v-slot="{ active }">
                      <button
                        type="button"
                        :class="[
                          active ? 'bg-default-100' : '',
                          'group flex w-full items-center px-3 py-2 gap-2',
                          { '!bg-primary-500 !text-white': route.name === 'change-password' }
                        ]"
                        @click="navigate({ name: 'change-password' })"
                      >
                        <Icon :name="route.name === 'change-password' ? 'heroicons:key-solid' : 'heroicons:key'" class="w-5 h-5" />
                        Đổi mật khẩu
                      </button>
                    </HeadlessMenuItem>

                    <HeadlessMenuItem v-slot="{ active }">
                      <button
                        type="button"
                        :class="[
                          active ? 'bg-default-100' : '',
                          'group flex w-full items-center px-3 py-2 gap-2',
                          { '!bg-primary-500 !text-white': route.name?.toString().includes('addresses') }
                        ]"
                        @click="navigate({ name: 'addresses'})"
                      >
                        <Icon :name="route.name?.toString().includes('addresses') ? 'heroicons:map-pin-solid' : 'heroicons:map-pin'" class="w-5 h-5" />
                        Sổ địa chỉ
                      </button>
                    </HeadlessMenuItem>

                    <HeadlessMenuItem v-slot="{ active }">
                      <button
                        type="button"
                        :class="[
                          active ? 'bg-default-100' : '',
                          'group flex w-full items-center px-3 py-2 gap-2',
                          { '!bg-primary-500 !text-white': route.name?.toString().includes('orders') }
                        ]"
                        @click="navigate({ name: 'orders'})"
                      >
                        <Icon :name="route.name?.toString().includes('orders') ? 'heroicons:clipboard-document-list-solid' : 'heroicons:clipboard-document-list'" class="w-5 h-5" />
                        Đơn hàng của tôi
                      </button>
                    </HeadlessMenuItem>
                  </div>

                </HeadlessMenuItems>
              </transition>
            </HeadlessMenu>

            <div class="flex flex-col">
              <h3 class="text-lg lg:text-xl font-semibold">{{ currentCustomer?.full_name }}</h3>
              <p class="text-sm lg:text-base">{{ currentCustomer?.user.email }}</p>
            </div>
          </div>

          <nav class="lg:flex-col gap-1 hidden lg:flex">
            <NuxtLink 
              class="px-3 py-2 hover:bg-default-100 rounded-md font-semibold flex items-center gap-2 cursor-pointer"
              :class="{ '!bg-primary-500 !text-white': route.name === 'profile' }"
              :to="{ name: 'profile' }"
            >
              <Icon :name="route.name === 'profile' ? 'heroicons:user-circle-solid' : 'heroicons:user-circle'" class="w-5 h-5" /> Hồ sơ
            </NuxtLink>

            <NuxtLink 
              class="px-3 py-2 hover:bg-default-100 rounded-md font-semibold flex items-center gap-2 cursor-pointer"
              :class="{ '!bg-primary-500 !text-white': route.name === 'change-password' }"
              :to="{ name: 'change-password' }"
            >
              <Icon :name="route.name === 'change-password' ? 'heroicons:key-solid' : 'heroicons:key'" class="w-5 h-5" /> Đổi mật khẩu
            </NuxtLink>

            <NuxtLink 
              class="px-3 py-2 hover:bg-default-100 rounded-md font-semibold flex items-center gap-2 cursor-pointer"
              :class="{ '!bg-primary-500 !text-white': route.name?.toString().includes('addresses') }"
              :to="{ name: 'addresses' }"
            >
              <Icon :name="route.name?.toString().includes('addresses') ? 'heroicons:map-pin-solid' : 'heroicons:map-pin'" class="w-5 h-5" /> Sổ địa chỉ
            </NuxtLink>

            <NuxtLink 
              class="px-3 py-2 hover:bg-default-100 rounded-md font-semibold flex items-center gap-2 cursor-pointer"
              :class="{ '!bg-primary-500 !text-white': route.name?.toString().includes('orders') }"
              :to="{ name: 'orders' }"
            >
              <Icon :name="route.name?.toString().includes('orders') ? 'heroicons:clipboard-document-list-solid' : 'heroicons:clipboard-document-list'" class="w-5 h-5" /> Đơn hàng của tôi
            </NuxtLink>
          </nav>
        </div>
      </div>
      <div class="bg-white grow py-7 px-3">
        <slot />        
      </div>
    </div>


    <MainFooter />
  </div>
</template>