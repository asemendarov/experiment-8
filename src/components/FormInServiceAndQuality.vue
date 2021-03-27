<template>
  <div class="form-in-service-and-quality">
    <h1 class="form-in-service-and-quality__title">
      Форма подачи заявки в отдел сервиса и качества
    </h1>
    <form class="form-in-service-and-quality__form form" @submit.prevent="handlerEventSubmitForm">
      <!-- Флиал -->
      <div class="form__group">
        <h4 class="form__title-item nowrap">Ваш филиал <span class="color-warn">*</span></h4>
        <div class="form__item">
          <div class="select-wrap">
            <loader v-if="citiesLoader" class="form__loader" :size="30" />
            <select
              v-else
              class="select"
              name="branch"
              v-model="form.branch.city"
              :disabled="form.branch.online"
            >
              <option :value="null" disabled hidden>Выберите город</option>
              <template v-for="city in cities">
                <option :value="city.title" :key="city.id" v-text="city.title"></option>
              </template>
            </select>
          </div>
          <div class="checkbox-wrap d-flex items-center">
            <input
              class="checkbox"
              type="checkbox"
              name="online"
              v-model="form.branch.online"
              :disabled="citiesLoader"
            />
            <label class="ml-1">Онлайн</label>
          </div>
        </div>
      </div>
      <!-- Тема обращения -->
      <div class="form__group">
        <h4 class="form__title-item nowrap">Тема обращения <span class="color-warn">*</span></h4>
        <div class="form__item">
          <template v-for="(value, idx) in themeOptions.values">
            <div class="radio-wrap d-flex items-center" :key="idx">
              <input
                class="radio-btn"
                type="radio"
                name="theme"
                :value="value"
                v-model="form.theme.selected"
                :id="idx"
              />
              <label class="ml-1" v-text="value"></label>
            </div>
          </template>
          <div v-show="themeOptions.other" class="other-text d-flex">
            <input
              class="inupt"
              type="text"
              name="other-theme"
              placeholder="Другое"
              v-model.trim="form.theme.other"
            />
          </div>
        </div>
      </div>
      <!-- Описание -->
      <div class="form__group">
        <h4 class="form__title-item nowrap">Описание проблемы <span class="color-warn">*</span></h4>
        <div class="form__item">
          <div class="textarea-wrap">
            <textarea
              name="desc-problem"
              v-model.trim="form.descProblem"
              placeholder="Введите текст"
              cols="40"
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>
      <!-- Документы -->
      <div class="form__group">
        <h4 class="form__title-item nowrap">Загрузка документов</h4>
        <p class="form__desc-item mt-1 lighten-1">
          Приложите, пожалйста, полноэкранный скриншот.<br />Это поможет быстрее решить проблему.
        </p>
        <div class="form__item">
          <div class="file-wrap d-flex items-center">
            <input type="file" name="files-doc" multiple @change="handlerEventFileChange" />
          </div>
        </div>
      </div>
      <!-- Controls -->
      <div class="form__group">
        <input class="form__submit" type="submit" value="Отправить" :disabled="isInvalidForm" />
      </div>
    </form>
  </div>
</template>

<script>
// Import JS
import { cloneDeep } from "lodash";
// Import Basic Components
import Loader from "@/components/Loader";
// Import X Store
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FormInServiceAndQuality",
  components: {
    Loader,
  },
  data: () => ({
    // Состояние загрузки городов
    citiesLoader: null,

    themeOptions: {
      values: [
        "Недоволен качеством услуг",
        "Расторжение договора",
        "Не приходит письмо активации на почту",
        "Не работает личный кабинет",
      ],
      other: true,
    },

    form: {
      branch: {
        city: null,
        online: false,
      },
      theme: {
        selected: null,
        other: null,
      },
      descProblem: null,
      files: null,
    },
  }),

  mounted() {
    this.loadСities();
  },

  computed: {
    ...mapGetters(["cities"]),

    isInvalidForm() {
      if (!this.form.branch.city && !this.form.branch.online) return true;
      if (!this.form.theme.selected && !this.form.theme.other) return true;
      if (!this.form.descProblem) return true;

      return false;
    },
  },

  watch: {
    citiesLoader(status) {
      this.form.branch.online = !!status;
    },

    "form.theme.other"(value) {
      if (/^[\s]*$/.test(value ?? "")) return;

      this.form.theme.selected = null;
    },

    "form.theme.selected"(value) {
      if (/^[\s]*$/.test(value ?? "")) return;

      this.form.theme.other = null;
    },
  },

  methods: {
    ...mapActions(["fetchСityList"]),

    loadСities() {
      this.citiesLoader++;

      this.sleep()
        .then(() => this.fetchСityList())
        .catch((ex) => {
          console.exception(ex);
          this.showExeption(ex.name, ex.message);
        })
        .finally(() => {
          this.citiesLoader--;
        });
    },

    /**
     * Обработчик события изменения выбранных файлов
     * @returns void
     */
    handlerEventFileChange(event) {
      this.form.files = event.target.files;
    },

    /**
     * Обработчик события отправки формы
     * @returns void
     */
    handlerEventSubmitForm() {
      this.submitFormToServer();
    },

    showExeption(name, message) {
      this.$emit("exeption", name, message);
    },

    showModalWindow(title, message) {
      this.$emit("modal", title, message);
    },

    submitFormToServer() {
      this.$emit("submit", cloneDeep(this.form));
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

<style lang="scss">
@import "~@/assets/scss/variables";

// 1rem - 10px

.form-in-service-and-quality {
  &__form {
    border: 1px solid $color-border;
    border-radius: $border-radius;
  }

  & .form {
    margin-top: 3rem;

    &__item {
      margin: -1rem;
      margin-top: 0;

      & > div {
        margin: 1rem;
      }
    }

    &__group {
      margin: 3rem;
    }

    &__submit {
      max-width: 15rem;
    }

    &__loader {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  & .select-wrap {
    border: 1px solid $color-border;

    & .select {
      border: none;
    }
  }
}
</style>