/** @format */
/*Vue全局指令*/
import Vue from 'vue';

/**
 * Vue 跳转指令'v-jump'，调整新页面或url，基于router.push方式
 * @param name/path 路由名或路径(必传)[eg:home或/home]
 * @param param 参数[eg:{id:123}]
 * @param type  按什么方式传递参数[1-按路由配置方式[eg:home/123]；2-按param方式[eg:{name/path:'',params:{id:123}}]；3-按query方式(默认)[eg:{name/path:'',query:{id:123}}]]
 * 例子：<div class="click-wrap" :data-id="item.id" v-jump="['home_detail', {id:123}, 2]">
 */
Vue.directive('jump', {
  // el: 指令绑定的元素
  // vm: 拥有该指令的上下文 ViewModel
  // expression: 指令的表达式，不包括参数和过滤器
  // arg: 指令的参数
  // raw: 未被解析的原始表达式
  // name: 不带前缀的指令名
  bind: function(el, binding, vnode) {
    // 做绑定的准备工作（比如添加事件监听器，或是其他只需要执行一次的复杂操作）

    // 若和v-for指令共用，由于v-for的就地重用机制，需要指定一个唯一的key属性(对应vnode.key)，若没指定，这里需要添加
    vnode.key = Math.round(Math.random() * 12568);

    el.handler = function(e) {
      e.stopPropagation();
      let data = binding.value || null;
      if (data) {
        let vm = vnode.context;
        let pathName = data[0] || null;
        let param = data[1] || null;
        let type = data[2] || 3;
        // console.log('v-jump数据：', el, pathName, param, type);
        if (pathName) {
          if (pathName.match(new RegExp('^(http|www)'))) {
            location.href = pathName;
          } else {
            let routeData = {};
            if (type === 1) {
              /*path类型单独处理参数格式*/
              let pStr = [];
              if (param) {
                for (let j in param) {
                  if (param.hasOwnProperty(j)) {
                    param[j] ? pStr.push(param[j]) : null;
                  }
                }
              }
              routeData = {
                path: '/' + pathName + (param ? '/' + pStr.join('/') : '')
              };
            }
            if (type === 2) {
              routeData = {
                name: pathName,
                params: param
              };
            }
            if (type === 3) {
              routeData = {
                path: '/' + pathName,
                query: param
              };
            } else {
              routeData =
                pathName.indexOf('/') > -1
                  ? {
                      path: pathName
                    }
                  : {
                      name: pathName
                    };
            }
            vm.$router.push(routeData);
          }
        } else {
          console.warn('好歹给个页面名啊！');
        }
      } else {
        console.error('v-jump似乎还需要点什么！');
      }
    };
    /*为Dom绑定事件*/
    el.addEventListener('click', el.handler, true);
  },
  update: function(newValue, oldValue) {
    // 根据获得的新值执行对应的更新（对于初始值也会被调用一次）
  },
  unbind: function(el) {
    // 做清理工作（比如移除在 bind() 中添加的事件监听器）
    /*为Dom移除事件*/
    el.removeEventListener('click', el.handler);
  }
});
/**
 * Vue 指令'v-open',打开新页面或url
 * @param name/path 路由名或路径(必传)[eg:home或/home]
 * @param param 参数[eg:{id:123}]
 * 例子：<div class="click-wrap" :data-id="item.id" v-open="['home_detail', {id:123}]">
 */
Vue.directive('open', {
  bind: function(el, binding, vnode) {
    vnode.key = new Date().getTime() * 3579;
    el.handler = function(e) {
      e.stopPropagation();
      let data = binding.value || null;
      if (data) {
        let vm = vnode.context;
        let pathName = data[0] || null;
        let param = data[1] || null;
        // console.log('v-open数据：', pathName, param);
        if (pathName) {
          let routeData = {};
          if (pathName.match(new RegExp('^(http|www)'))) {
            routeData.href = pathName;
          } else {
            routeData = vm.$router.resolve({
              name: '新页面打开',
              path: pathName,
              query: param
            });
          }
          window.open(routeData.href, '_blank');
        } else {
          console.warn('好歹给个页面名啊！');
        }
      } else {
        console.error('v-open似乎还需要点什么！');
      }
    };
    el.addEventListener('click', el.handler, true);
  },
  unbind: function(el) {
    el.removeEventListener('click', el.handler);
  }
});
/**
 * Vue input限制只能输入正整数（可控制最小最大值）
 * 例子：<input type="text" v-integer="{min:1, max:10}">
 */
Vue.directive('integer', {
  bind: function(el, binding) {
    let attr = binding.value; //传入的参数
    /* let position = binding.modifiers; //获取对象数组，使用需要遍历
    let warning = binding.arg; //获取true属性 */
    el.children[0] && (el = el.children[0]);
    el.handler = function() {
      el.value = el.value.replace(/\D+/, '');
      //若有传参（最大最小值）
      if (attr) {
        attr.max !== undefined
          ? el.value > attr.max
            ? (el.value = attr.max)
            : null
          : null;
        attr.min !== undefined
          ? el.value < attr.min
            ? (el.value = attr.min)
            : null
          : null;
      }
    };
    el.addEventListener('input', el.handler);
  },
  unbind: function(el) {
    el.removeEventListener('input', el.handler);
  }
});
/**
 * Vue 页面返回
 * 例子：<div v-back>返回</div>
 */
Vue.directive('back', {
  bind: function(el, binding, vnode) {
    el.handler = function(e) {
      e.stopPropagation();
      history.go(-1);
    };
    el.addEventListener('click', el.handler, true);
  },
  unbind: function(el) {
    el.removeEventListener('click', el.handler);
  }
});
/**
 * Vue 页面显示input框时自动获取焦点
 * 例子：<input v-autofocus type="text" />
 */
Vue.directive('autofocus', {
  inserted: function(el, binding) {
    let myInput = el.children[0] ? el.querySelector('input') : el;
    myInput.focus();
  }
});
/* Vue.directive('blur', {
  bind: function(el, binding, vnode) {
    let mtinput = el.querySelector('input');
    mtinput.onfocus = function() {
      //如果要对节点的数据进行更改,且更改要映射到页面上,则更改可在vnode.context上进行,这样,改完之后,改变就会映射到页面
    };
    mtinput.onblur = function() {
      //同上理
    };
  },
  unbind: function(el) {
    el.removeEventListener('input', el.handler);
  }
}); */
/*防抖指令v-debounce
* <button v-debounce="testClick">click</button>
 // testClick
  testClick: {
     time: 1000,
     callback: () => {
        console.log('test')
      }
  }
* */
Vue.directive('debounce', {
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  /**
   * el 指令所绑定的元素，可以用来直接操作 DOM 。
   * binding 一个对象，包含绑定的值
   */
  inserted: function(el, binding) {
    const { callback, time } = binding.value;
    el.callback = callback;
    el.time = time;
    el.timeCall = null;
    el.addEventListener('click', () => {
      clearTimeout(el.timeCall);
      el.timeCall = setTimeout(() => {
        el.callback();
      }, el.time || 500);
    });
  },
  // 所在组件的 VNode 更新时调用
  update: function(el, binding) {
    const { callback, time } = binding.value;
    el.callback = callback;
    el.time = time;
  }
});
/*节流指令v-throttle
* <button v-throttle="testClick">click</button>
 // testClick
  testClick: {
     time: 1000,
     callback: () => {
        console.log('test')
      }
  }
* */
Vue.directive('throttle', {
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted: function(el, binding) {
    const { callback, time } = binding.value;
    el.callback = callback;
    el.time = time;
    el.addEventListener('click', () => {
      const nowTime = new Date().getTime();
      if (!el.preTime || nowTime - el.preTime > el.time) {
        el.preTime = nowTime;
        el.callback();
      }
    });
  },
  update: function(el, binding) {
    const { callback, time } = binding.value;
    el.callback = callback;
    el.time = time;
  }
});

/**
 * Vue 点击非当前元素外的元素 关闭弹窗或其他操作
 * 例子：
 */
Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    function clickHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler;
    document.addEventListener('click', clickHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
});
