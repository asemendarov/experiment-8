<template>
  <header class="the-header">
    <div class="the-header__container d-flex">
      <slot></slot>
    </div>
  </header>
</template>
<script>
export default {
  name: "TheHeader",
  data() {
    return {
      // pass
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/variables";

// 1rem = 10px
.the-header {
  color: $color-header;
  background: $bg-color-header;
  box-shadow: 0 0 10px 1px $bg-color-header;

  &__container {
    margin: 0 auto;
    max-width: 1280px;

    height: 5rem;

    padding: 0 2rem;
  }
}
</style>
