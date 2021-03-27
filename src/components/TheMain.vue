<template>
  <main class="the-main">
    <div class="the-main__container">
      <slot></slot>
    </div>
  </main>
</template>
<script>
export default {
  name: "TheMain",
  data() {
    return {
      // pass
    };
  },
};
</script>

<style lang="scss">
// 1rem - 10px

.the-main {
  &__container {
    margin: 0 auto;
    max-width: 1280px;

    margin-top: 3.2rem;
    padding: 0 2rem;
  }
}
</style>
