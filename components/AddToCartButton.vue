<script lang="ts" setup>
const props = defineProps({
  productId: { type: Number, required: true },
  size: { type: String, default: "normal" },
  inStock: { type: Boolean, default: true }
});
const cart = useCart();
const cartItem = ref(cart.itemByProductId(props.productId));
const currentCustomer = useCurrentCustomer();
const addToCartLoading = ref(false);
const decrementLoading = ref(false);
const removeLoading = ref(false);

watch(
  cart,
  () => {
    cartItem.value = cart.itemByProductId(props.productId);
  },
  { deep: true }
);

async function addToCart() {
  if (!currentCustomer.value) {
    useMustBeLoginModal().open();
    return;
  }

  addToCartLoading.value = true;

  await cart
    .add(props.productId)
    .then(() => {
      cartItem.value = cart.itemByProductId(props.productId);
    })
    .catch((err) => {
      if (err.response.status === 503) {
        useNotEnoughStockModal().open();
      } else if (err.response.status === 404) {
        useNotEnoughStockModal().open('OUT_OF_STOCK');
      }
    })
    .finally(() => (addToCartLoading.value = false));
}

async function decrement() {
  decrementLoading.value = true;

  await cart
    .decrementItemQtyByProductId(props.productId)
    .then(() => {
      cartItem.value = cart.itemByProductId(props.productId);
    })
    .catch(() => {})
    .finally(() => (decrementLoading.value = false));
}

async function remove() {
  removeLoading.value = true;

  await cart
    .removeItemByProductId(props.productId)
    .then(() => {
      cartItem.value = null;
    })
    .finally(() => (removeLoading.value = false));
}
</script>

<template>
  <template v-if="inStock">
    <button
      v-if="!cartItem"
      @click="addToCart"
      type="button"
      :disabled="addToCartLoading"
      class="btn btn-primary btn-block"
      :class="[
        {
          'btn-large !text-xl': size === 'large',
          'btn-sm !text-sm': size === 'small',
        },
      ]"
    >
      <IconLoading
        :class="[
          {
            'w-6 h-6': size === 'large',
            'w-4 h-4': size === 'normal',
            'w-2 h-2': size === 'small',
          },
        ]"
        v-show="addToCartLoading"
      />
      Chọn mua
    </button>

    <div class="flex items-center gap-2" v-else>
      <div
        class="flex grow justify-between items-center rounded-full"
        :class="[cartItem.available ? 'bg-default-50' : 'bg-warning-50']"
      >
        <button
          type="button"
          @click="decrement"
          :disabled="decrementLoading"
          class="btn p-0 bg-white rounded-full btn-transparent"
          :class="[
            {
              'w-12 h-12': size === 'large',
              'w-10 h-10': size === 'normal',
              'w-8 h-8': size === 'small',
            },
          ]"
        >
          <Icon
            v-show="!decrementLoading"
            name="heroicons:minus"
            class="text-primary-500"
            :class="[
              {
                'w-8 h-8': size === 'large',
                'w-6 h-6': size === 'normal',
                'w-4 h-4': size === 'small',
              },
            ]"
          />
          <IconLoading
            class="text-primary-300"
            v-show="decrementLoading"
            :class="[
              {
                'w-6 h-6': size === 'large',
                'w-4 h-4': size === 'normal',
                'w-2 h-2': size === 'small',
              },
            ]"
          />
        </button>
        <span
          class="px-3 flex items-center gap-2"
          :class="[
            {
              'text-xl': size === 'large',
              'text-sm': size === 'small',
            },
          ]"
        >
          <Tooltip
            v-if="!cartItem.available"
            :value="`Số lượng vượt quá tồn kho của chi nhánh hiện tại`"
          >
            <Icon
              name="heroicons:exclamation-triangle"
              class="text-warning-900"
              :class="[
                {
                  'w-6 h-6': size === 'large',
                  'w-4 h-4': size === 'normal' || size === 'small',
                },
              ]"
            />
          </Tooltip>
          {{ cartItem.qty }}
        </span>
        <button
          @click="addToCart"
          type="button"
          :disabled="addToCartLoading"
          class="btn p-0 bg-white rounded-full btn-transparent"
          :class="[
            {
              'w-12 h-12': size === 'large',
              'w-10 h-10': size === 'normal',
              'w-8 h-8': size === 'small',
            },
          ]"
        >
          <Icon
            v-show="!addToCartLoading"
            name="heroicons:plus"
            class="text-primary-500"
            :class="[
              {
                'w-8 h-8': size === 'large',
                'w-6 h-6': size === 'normal',
                'w-4 h-4': size === 'small',
              },
            ]"
          />
          <IconLoading
            class="text-primary-300"
            v-show="addToCartLoading"
            :class="[
              {
                'w-6 h-6': size === 'large',
                'w-4 h-4': size === 'normal',
                'w-2 h-2': size === 'small',
              },
            ]"
          />
        </button>
      </div>
      <Tooltip value="Gỡ bỏ">
        <button
          type="button"
          :disabled="removeLoading"
          @click="remove"
          class="btn p-0 bg-white rounded-full btn-transparent"
          :class="[
            {
              'w-12 h-12': size === 'large',
              'w-10 h-10': size === 'normal',
              'w-8 h-8': size === 'small',
            },
          ]"
        >
          <Icon
            v-show="!removeLoading"
            name="heroicons:trash"
            class="text-default-500"
            :class="[
              {
                'w-8 h-8': size === 'large',
                'w-6 h-6': size === 'normal',
                'w-4 h-4': size === 'small',
              },
            ]"
          />
          <IconLoading
            class="text-default-300"
            v-show="removeLoading"
            :class="[
              {
                'w-6 h-6': size === 'large',
                'w-4 h-4': size === 'normal',
                'w-2 h-2': size === 'small',
              },
            ]"
          />
        </button>
      </Tooltip>
    </div>
  </template>
  <template v-else>
    <div class="bg-default-700 text-white cursor-not-allowed" :class="[
      {
        'btn-large !text-xl': size === 'large',
        'btn-sm !text-sm': size === 'small',
      },
    ]">
      Hết hàng
    </div>
  </template>
</template>