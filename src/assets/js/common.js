/** @format */
import Vue from 'vue';
import IconSvg from '@/components/ui/icon-svg';
Vue.component('IconSvg', IconSvg);

const svgFiles = require.context('../images/svg', true, /\.svg$/);
const iconList = svgFiles.keys().map(item => svgFiles(item));

export default {
  // 获取图标icon-(*).svg名称列表, 例如[shouye, xitong, zhedie, ...]
  getNameList() {
    return iconList.map(item => item.default.id.split('-')[1]);
  }
};
