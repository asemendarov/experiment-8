<template>
  <div class="modal-base">
    <div class="modal-base__mask">
      <div class="modal-base__wrapper">
        <div class="modal-base__container">
          <!-- /// -->
          <div class="modal-base__header">
            <slot name="header">default header</slot>
          </div>
          <!-- /// -->
          <div class="modal-base__body">
            <slot name="body">default body</slot>
          </div>
          <!-- /// -->
          <div class="modal-base__footer">
            <slot name="footer">default footer</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalBase",
  data() {
    return {
      // pass
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/variables";

// 1rem - 10px

.modal-base {
  &__mask {
    display: table;

    width: 100%;
    height: 100%;

    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.5);
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    max-width: 300px;
    margin: 0px auto;
    padding: 2rem 3rem;
    background-color: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0.2rem 0.8rem #000;
  }

  &__body {
    margin: 2rem 0;
  }
}
</style>