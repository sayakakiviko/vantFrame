<!-- @format -->
<template>
  <svg
    :style="{
      fill: 'currentColor',
      overflow: 'hidden',
      'vertical-align': 'middle'
    }"
    :class="getClassName"
    aria-hidden="true"
  >
    <use :xlink:href="getName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  computed: {
    getName() {
      return `#icon-${this.name}`;
    },
    getClassName() {
      return [
        'icon-svg',
        `icon-svg__${this.name}`,
        this.className && /\S/.test(this.className) ? `${this.className}` : ''
      ];
    }
  }
};
</script>

<style lang="less">
.icon-svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
.el-input__icon {
  display: inline-block;
  .icon-svg {
    vertical-align: top;
  }
}
</style>
