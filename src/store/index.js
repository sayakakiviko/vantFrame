/** @format */

import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

import { VUEX_DEFAULT_CONFIG } from '@/config';

Vue.use(Vuex);
let { state, mutations, actions } = user;
export default new Vuex.Store({
  ...VUEX_DEFAULT_CONFIG,
  state,
  mutations,
  actions
});
