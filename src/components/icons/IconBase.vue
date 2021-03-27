<template>
  <div class="icon-base" :name="name">
    <svg
      class="icon-base__icon"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 18 18"
      :aria-labelledby="name"
      role="presentation"
    >
      <title lang="en">{{ name }} icon</title>
      <g :fill="color">
        <slot />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "IconBase",
  props: {
    name: {
      type: String,
      default: "box",
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>
