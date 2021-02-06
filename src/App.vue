<!-- @format -->

<template>
  <router-view />
</template>

<script>
export default {
  created() {
    /**
     * 页面自适应方法 使用rem单位
     * 需要根据布局视口的尺寸动态设置font-size的值
     * 无论在什么设备下，我们页面的总宽度都是7.5rem，所以我们直接在设计图上测量px单位的尺寸，然后除以100转换成rem单位后直接使用就可以了
     * 比如，在设计图中测量一个元素的尺寸为200px，那么转换成rem单位就是 200 / 100 = 2rem
     */
    changeRem();
    window.addEventListener('resize', changeRem);

    function changeRem() {
      document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 7.5 + 'px';
    }
  }
};
</script>
<style lang="less">
@import url('./assets/styles/base.less');
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
