<script lang="ts" setup>
const props = defineProps({
  productId: { type: Number, required: true },
  size: { type: String, default: "normal" },
});
const cart = useCart();
const cartItem = ref(cart.itemByProductId(props.productId));
const currentCustomer = useCurrentCustomer();

watch(cart, () => {
  cartItem.value = cart.itemByProductId(props.productId)
}, { deep: true })

async function addToCart() {
  if (!currentCustomer.value) {
    useMustBeLoginModal().open();
    return;
  }

  await cart
    .add(props.productId)
    .then(() => {
      cartItem.value = cart.itemByProductId(props.productId);
    })
    .catch((err) => {
      if (err.response.status === 503) {
        useNotEnoughStockModal().open()
      }
    });
}

async function decrement() {
  await cart
    .decrementItemQtyByProductId(props.productId)
    .then(() => {
      cartItem.value = cart.itemByProductId(props.productId);
    })
    .catch(() => {});
}

async function remove() {
  await cart.removeItemByProductId(props.productId).then(() => {
    cartItem.value = null;
  });
}
</script>

<template>
  <MagicButton @click="addToCart" v-if="!cartItem">
    <button
      type="button"
      class="btn btn-transparent border-primary-500 text-primary-500 btn-block"
    >
      Chọn mua
    </button>
  </MagicButton>
  <div class="flex items-center gap-2" v-else>
    <div
      class="flex grow justify-between items-center rounded-full"
      :class="[
        cartItem.available ? 'bg-default-50' : 'bg-warning-50'
      ]"
    >
      <button
        type="button"
        @click="decrement"
        class="btn p-0 bg-white rounded-full btn-transparent"
        :class="[size === 'normal' ? 'w-10 h-10' : 'w-8 h-8']"
      >
        <Icon
          name="heroicons:minus"
          class="text-primary-500"
          :class="[size === 'normal' ? 'w-6 h-6' : 'w-4 h-4']"
        />
      </button>
      <span
        class="px-3 flex items-center gap-2"
        :class="[size === 'normal' ? 'text-xl' : 'text-base']"
        >
        <Tooltip v-if="!cartItem.available" :value="`Số lượng vượt quá tồn kho của chi nhánh hiện tại`">
          <Icon name="heroicons:exclamation-triangle" class="text-warning-900" :class="[size === 'normal' ? 'w-6 h-6' : 'w-5 h-5']" />
        </Tooltip> {{ cartItem.qty }}
      </span>
      <button
        @click="addToCart"
        type="button"
        class="btn w-10 h-10 p-0 bg-white rounded-full btn-transparent"
        :class="[size === 'normal' ? 'w-10 h-10' : 'w-8 h-8']"
      >
        <Icon
          name="heroicons:plus"
          class="text-primary-500"
          :class="[size === 'normal' ? 'w-6 h-6' : 'w-4 h-4']"
        />
      </button>
    </div>
    <Tooltip value="Gỡ bỏ">
      <button
        type="button"
        @click="remove"
        class="btn w-10 h-10 p-0 bg-white rounded-full btn-transparent"
        :class="[size === 'normal' ? 'w-10 h-10' : 'w-8 h-8']"
      >
        <Icon
          name="heroicons:trash"
          class="text-default-500"
          :class="[size === 'normal' ? 'w-6 h-6' : 'w-4 h-4']"
        />
      </button>
    </Tooltip>
  </div>
</template>