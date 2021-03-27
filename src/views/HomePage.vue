<template>
  <div class="home-page">
    <msg-exception ref="exception" />
    <loader v-if="statusLoad" :size="80" />
    <FormInServiceAndQuality
      v-else
      @submit="handlerEventSubmitForm"
      @modal="handlerEventShowModalWindows"
      @exeption="handlerEventShowMsgException"
    />
    <!-- Modal Window -->
    <div class="modal-window">
      <modal-warning ref="modal" />
    </div>
  </div>
</template>

<script>
// Import Form Components
import FormInServiceAndQuality from "@/components/FormInServiceAndQuality";
// Import Basic Components
import Loader from "@/components/Loader";
import MsgException from "@/components/MsgException";
import ModalWarning from "@/components/modals/ModalWarning";

export default {
  name: "Home",

  components: {
    Loader,
    MsgException,
    ModalWarning,
    FormInServiceAndQuality,
  },

  data: () => ({
    statusLoad: null,
  }),

  methods: {
    /**
     * Обработчик события отображения сообщения об ошибке
     * @returns void
     */
    handlerEventShowMsgException(name, message) {
      this.showMsgException(name, message);
    },

    /**
     * Обработчик события отображения модального окна
     * @returns void
     */
    handlerEventShowModalWindows() {
      // pass
    },

    handlerEventSubmitForm(data) {
      this.statusLoad++;

      this.sleep()
        .then(() =>
          fetch("https://60254fac36244d001797bfe8.mockapi.io/api/v1/send-form", {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: data,
          })
        )
        .then((responce) => responce.json())
        .then((data) => {
          this.processingResponseData(data);
        })
        .catch((ex) => {
          console.exception(ex);
          this.showMsgException(ex.name, ex.message);
        })
        .finally(() => {
          this.statusLoad--;
        });
    },

    processingResponseData(data) {
      if (!data) throw new Error("Сервер вернул пустое сообщение.");

      if (data?.success) {
        this.showModalWindow("Успех", "Заявка подана успешно!");
      } else {
        this.showMsgException("Неудача", "Ошибка отправки заявки!");
      }
    },

    /**
     * Открывает модальное окно
     * @param {String} title - заголовок
     * @param {String} message - тело сообщения
     * @returns {Promise} new Promise
     */
    showModalWindow(title, message) {
      return this.$refs.modal.show(title, message);
    },

    showMsgException(name, message) {
      this.$refs.exception.show(name, message);
    },

    /**
     * Создает эмуляцию задержки взаимодействия с сервером
     * @param {Number} ms - задержка
     * @returns {Promise} new Promise
     */
    sleep(ms = 3000) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    },
  },
};
</script>
