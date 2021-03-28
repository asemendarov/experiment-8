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
    handlerEventShowModalWindows(title, message) {
      this.showModalWindow(title, message);
    },

    /**
     * Обработчик события отправки формы
     * @returns void
     */
    handlerEventSubmitForm(data) {
      // Отправляем данные
      this.sleep()
        .then(() => {
          // Включаем визуальное представление загрузки
          this.statusLoad++;
        })
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
          // Обрабатывает данные ответа полученного с сервера в случаи успеха
          this.processingResponseData(data);
        })
        .catch((ex) => {
          // Выводим сообщение об ошибке в случаи отказа
          console.exception(ex);
          this.showMsgException(ex.name, ex.message);
        })
        .finally(() => {
          // Отключаем визуальное представление загрузки
          this.statusLoad--;
        });
    },

    /**
     * Обрабатывает данные ответа полученного с сервера
     * @param {String} data - объект данных
     * @returns void
     */
    processingResponseData(data) {
      if (!data) throw new Error("Сервер вернул пустое сообщение.");

      if (data?.success) {
        // Сообщить об успешной отправке через модальное окно
        // this.showModalWindow("Успех", "Заявка подана успешно!");

        // Сообщить об успешной отправке через Success Page
        this.redirectToSuccessPage();
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

    /**
     * Открывает визуального представления об ошибке
     * @param {String} name - имя ошибки
     * @param {String} message - текст ошибки
     * @returns void
     */
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

    /**
     * Перебрасывает на страницу Success Page
     * @returns void
     */
    redirectToSuccessPage() {
      this.$router.push({ name: "Success" });
    },
  },
};
</script>
