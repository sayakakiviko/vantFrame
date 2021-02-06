/** @format */
import store from '@/store';
export function routerBeforeEachFunc(to, from, next) {
  // 什么时候要请求who接口
  next();
  // if (store.state.user.id) {
  //   next();
  // } else {
  //   store
  //     .dispatch('getUserInfo', {})
  //     .then(data => {
  //       //router.addRoutes是异步的，同时使用 next({ ...to, replace: true })重新载入。
  //       next({ ...to, replace: true });
  //     })
  //     .catch(() => {});
  // }
}

export function routerAfterEachFunc(to, from) {}
