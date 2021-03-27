<template>
  <div class="msg-exception" v-show="enabled">
    <div class="msg-exception__body">
      <strong class="msg-exception__message" v-text="msg"></strong>
      <div class="msg-exception__control icon-control icon-wrap">
        <icon-x-circle class="icon-close" @click.native="handlerClickClose" />
      </div>
    </div>
  </div>
</template>

<script>
import IconXCircle from "@/components/icons/IconXCircle";

export default {
  components: { IconXCircle },
  name: "MsgException",
  data() {
    return {
      // Состояние сообщения
      enabled: false,
      // Тип ошибки.
      name: "",
      // Текстовое сообщение о деталях ошибки.
      message: "",
    };
  },
  computed: {
    // Вычисляет итоговое содержание текста ошибки
    msg() {
      return `${this.name} | ${this.message}`;
    },
  },
  methods: {
    // Отображает визульное представление об ошибке
    show(name, message) {
      (this.enabled = true), (this.name = name), (this.message = message);
    },

    // Прячет визульное представление об ошибке
    hide() {
      this.enabled = false;
    },

    // Обрабатывает события Click на кнопке Close
    handlerClickClose() {
      this.hide();
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/variables";

.msg-exception {
  margin-bottom: 1rem;

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.8rem;
    border: 0.1rem solid $color-exception;
  }

  &__control {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .icon-close {
    color: $color-exception;
  }
}
</style>