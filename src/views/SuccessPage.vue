<template>
  <div class="success-page">
    <div class="success-page__head">
      <h1 class="success-page__title">Заявка отправлена</h1>
    </div>
    <div class="success-page__body">
      <div class="img-wrap">
        <img src="@/assets/img/success_img.png" alt="success" />
      </div>
    </div>
    <div class="success-page__controls btn-controls d-flex flex-center">
      <input class="btn btn-back" type="button" value="Вернуться" @click="handlerEventClickBack" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessPage",
  created() {
    console.log("WAAAAAAAAAAAAAAAAAAAAAAAAAAT");
  },
  methods: {
    handlerEventClickBack() {
      this.redirectToHomePage();
    },

    /**
     * Перебрасывает на страницу Home Page
     * @returns void
     */
    redirectToHomePage() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss">
.success-page {
  &__body {
    margin-top: 2rem;
  }

  &__title {
    text-align: center;
  }

  &__controls {
    margin-top: 2rem;
  }

  & .img-wrap {
    margin: auto;
    max-width: 400px;
  }

  & .btn {
    height: 4rem;
  }

  & .btn-back {
    max-width: 300px;
    background: rgb(247, 194, 129);
  }
}
</style>