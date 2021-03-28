<template>
  <div id="app">
    <the-header></the-header>
    <the-main>
      <router-view />
    </the-main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import TheMain from "@/components/TheMain";

export default {
  name: "App",
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
};
</script>

<style lang="scss">
// Import Fonts
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
// Import Normalize
@import "~@/assets/scss/normalize";
@import "~@/assets/scss/tw-normalize";
@import "~@/assets/scss/my-normalize";
// Import Other
@import "~@/assets/scss/variables";
@import "~@/assets/scss/global-class";

#app {
  min-height: inherit;

  font-family: "Roboto", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.6rem;
  line-height: 1.6rem;
  font-style: normal;
  font-weight: 400;
  color: $color-base;
}

input[type="checkbox"],
input[type="radio"] {
  height: 2rem;
  width: 2rem;
}

input[type="text"],
input[type="submit"],
select {
  height: 4rem;
}

select,
textarea,
input {
  width: 100%;
}

input[type="text"],
textarea,
select {
  border: 1px solid $color-border;
  border-radius: $border-radius;
}

input[type="submit"],
input[type="button"] {
  color: $color-cta;
  background: $bg-color-cta;
  border-radius: $border-radius;
  text-transform: uppercase;

  &:enabled {
    cursor: pointer;
  }

  &:disabled {
    filter: contrast(50%);
  }

  &:hover:not(:disabled) {
    background: lighten($bg-color-cta, 10);
  }
}

input[type="text"],
input[type="number"],
select,
textarea {
  padding-left: 1.1rem;
  padding-right: 1.1rem;
}

textarea {
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
}
</style>
