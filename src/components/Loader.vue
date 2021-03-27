<template>
  <div class="loader">
    <div class="loader__wrap">
      <div class="loader__spin" :style="[width, height, borderWidth]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    size: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      // pass
    };
  },
  computed: {
    width() {
      return { width: `${this.size}px` };
    },
    height() {
      return { height: `${this.size}px` };
    },
    borderWidth() {
      return { "border-width": `${(this.size / 6) ^ 0}px` };
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/variables";

// 1rem = 10px

.loader {
  &__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__spin {
    width: 60px;
    height: 60px;

    border: 6px solid lighten($color-loader, 40);
    border-top-color: $color-loader;

    border-radius: 50%;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>