<script lang="ts" setup>
const headerIsSticked = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    headerIsSticked.value = window.scrollY > 0;
  });
});

const route = useRoute();
const currentCustomer = useCurrentCustomer();
const accessToken = useCookie<string | undefined>("access_token");
const searchShown = ref(false)
const cart = useCart()

if (currentCustomer.value) {
  cart.fetch()
}

async function logout() {
  await useLogoutCustomerApi();

  currentCustomer.value = null;
  accessToken.value = undefined;

  return navigateTo({ name: "login" });
}
</script>

<template>
  <div
    v-if="route.name !== 'index'"
    class="absolute z-[1] inset-x-0 flex justify-center overflow-hidden pointer-events-none"
  >
    <div class="w-[108rem] flex-none flex justify-end">
      <img
        src="/images/beams-header.png"
        class="w-[71.75rem] flex-none max-w-none"
      />
    </div>
  </div>

  <header
    class="sticky backdrop-blur transition-colors duration-300 inset-0 h-16"
    :class="[
      headerIsSticked
        ? '!bg-white/95 !supports-backdrop-blur:bg-white/60 border-b border-default-900/10'
        : route.name === 'index'
          ? 'bg-transparent'
          : 'bg-white/60 supports-backdrop-blur:bg-white/60 border-b border-default-900/10',
    ]"
    :style="{ zIndex: zIndex.mainHeader }"
  >
    <div class="container mx-auto flex items-center h-full px-3">
      <div class="flex items-center gap-7">
        <NuxtLink
          :to="{ name: 'index' }"
          class="inline-flex items-center gap-2"
        >
          <Logo />
          <span class="text-xl hidden sm:inline-block font-mono font-semibold text-default-700">Doodle</span>
        </NuxtLink>

        <div class="relative hidden xl:block">
          <button type="button" class="btn py-2 btn-transparent text-default-500 gap-3" @click="searchShown = true">
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5" /> Tìm kiếm sản phẩm, thương hiệu...
          </button>
        </div>
      </div>

      <div class="ml-auto flex items-center justify-end gap-5 sm:gap-7">
        <div class="flex items-center gap-5 sm:gap-7">
          <a class="block xl:hidden cursor-pointer">
            <Icon name="heroicons:magnifying-glass" class="w-6 h-6 hover:text-primary-500" @click="searchShown = true" />
          </a>

          <NuxtLink
            class="cursor-pointer text-default-700 font-semibold hover:text-primary-500 hidden lg:block"
          >
            Về chúng tôi
          </NuxtLink>

          <NuxtLink
            :to="{ name: 'branches' }"
            exact-active-class="text-primary-500"
            class="cursor-pointer text-default-700 font-semibold hover:text-primary-500 hidden lg:block"
          >
            Cửa hàng
          </NuxtLink>
        </div>

        <div class="w-[1px] h-6 bg-default-300 hidden lg:block"></div>

        <div class="flex items-center gap-5 sm:gap-7">
          <FormSwitchAddressInput v-if="currentCustomer && currentCustomer?.cart.address_id && route.name !== 'cart'" class="w-32 xs:w-52 lg:w-72" />

          <NuxtLink
            v-if="currentCustomer && cart.data"
            :to="{ name: 'cart' }"
            :key="cart.count"
            class="cursor-pointer relative text-default-700 hover:text-primary-500"
            exact-active-class="text-primary-500"
            :class="{ 'animate-shake': cart.wasChanged }"
          >
            <span v-if="cart.count > 0" class="absolute font-bold min-w-[theme(space.5)] h-5 rounded-full bg-danger-500 text-white text-xs flex items-center justify-center -right-4 -top-2 px-1">
              {{ cart.count }}
            </span>
            <Icon name="heroicons:shopping-bag" class="w-6 h-6" />
          </NuxtLink>
            
          <a class="cursor-pointer relative text-default-700 hover:text-primary-500" @click="useMustBeLoginModal().open" v-else>
            <Icon name="heroicons:shopping-bag" class="w-6 h-6" />
          </a>
        
          <NuxtLink
            v-if="!currentCustomer"
            class="cursor-pointer text-default-700 hover:text-primary-500"
            :to="{ name: 'login' }"
          >
            <Icon name="heroicons:user-circle" class="w-7 h-7" />
          </NuxtLink>

          <HeadlessMenu
            as="div"
            class="relative"
            v-else
          >
            <HeadlessMenuButton
              class="cursor-pointer focus:outline-none text-default-700 flex items-center gap-1 hover:text-primary-500"
            >
              <span class="hidden lg:block">Chào {{ currentCustomer.last_name }}</span> <Icon name="heroicons:user-circle" class="w-7 h-7" />
            </HeadlessMenuButton>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <HeadlessMenuItems
                class="absolute divide-y divide-default-100 right-0 mt-4 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <HeadlessMenuItem v-slot="{ active }">
                    <button
                      type="button"
                      :class="[
                        active ? 'bg-default-100' : '',
                        'group flex w-full items-center px-2 py-2 gap-2 text-sm',
                      ]"
                      @click="navigateTo({ name: 'profile' })"
                    >
                      <Icon
                        name="heroicons:user-circle"
                        class="w-5 h-5 text-default-500"
                      />
                      Hồ sơ
                    </button>
                  </HeadlessMenuItem>

                  <HeadlessMenuItem v-slot="{ active }">
                    <button
                      type="button"
                      :class="[
                        active ? 'bg-default-100' : '',
                        'group flex w-full items-center px-2 py-2 gap-2 text-sm',
                      ]"
                      @click="navigateTo({ name: 'addresses' })"
                    >
                      <Icon
                        name="heroicons:map-pin"
                        class="w-5 h-5 text-default-500"
                      />
                      Sổ địa chỉ
                    </button>
                  </HeadlessMenuItem>

                  <HeadlessMenuItem v-slot="{ active }">
                    <button
                      type="button"
                      :class="[
                        active ? 'bg-default-100' : '',
                        'group flex w-full items-center px-2 py-2 gap-2 text-sm',
                      ]"
                      @click="navigateTo({ name: 'orders' })"
                    >
                      <Icon
                        name="heroicons:clipboard-document-list"
                        class="w-5 h-5 text-default-500"
                      />
                      Đơn hàng của tôi
                    </button>
                  </HeadlessMenuItem>
                </div>

                <div class="py-1">
                  <HeadlessMenuItem v-slot="{ active }">
                    <button
                      @click="logout"
                      type="button"
                      :class="[
                        active ? 'bg-default-100' : '',
                        'group flex w-full items-center px-2 py-2 gap-2 text-sm',
                      ]"
                    >
                      <Icon
                        name="heroicons:arrow-right-on-rectangle"
                        class="w-5 h-5 text-default-500"
                      />
                      Thoát
                    </button>
                  </HeadlessMenuItem>
                </div>
              </HeadlessMenuItems>
            </transition>
          </HeadlessMenu>

          <a class="block lg:hidden cursor-pointer">
            <Icon name="heroicons:bars-3" class="w-6 h-6 hover:text-primary-500" />
          </a>
        </div>
      </div>
    </div>
  </header>

  <SearchModal v-model:shown="searchShown" />
</template>