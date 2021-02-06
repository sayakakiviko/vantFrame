/** @format */

/** @format */
const getPage = name => () => import('@/components/pages/' + name + '.vue');
/*const TEACHER = [
  /!**老师*!/
  {
    path: '/teacherLog',
    name: 'teacherLog',
    desc: '老师-我的日志',
    components: {
      default: getPage('teacher/my_log')
    }
  },
  {
    path: '/addTeacherLog',
    name: 'addTeacherLog',
    desc: '老师-新增日志',
    components: {
      default: getPage('teacher/add_log')
    }
  },
  {
    path: '/editTeacherLog',
    name: 'editTeacherLog',
    desc: '老师-修改日志',
    components: {
      default: getPage('teacher/edit_log')
    }
  }
];

const DIRECTOR = [
  /!**主任*!/
  {
    path: '/directorRecord',
    name: 'directorRecord',
    desc: '主任-巡查记录',
    components: {
      default: getPage('director/director_record')
    }
  },
  {
    path: '/addRecord',
    name: 'addRecord',
    desc: '主任-新增记录',
    components: {
      default: getPage('director/add_record')
    }
  },
  {
    path: '/editRecord',
    name: 'editRecord',
    desc: '主任-修改记录',
    components: {
      default: getPage('director/edit_record')
    }
  }
];

/!**
 * setRoutes 根据权限返回新的路由表
 * @data {Object} 权限对象
 * @returns {Array} 处理完毕的新的路由表
 * *!/
export function setRoutes(data) {
  let routers = [],
    name = ''; // 根目录默认跳转路由组件名

  if (data.isTeacher) {
    name = 'teacherLog';
  } else if (data.isDirector) {
    name = 'directorRecord';
  }
  // 添加根目录默认跳转
  routers.push({
    path: '/',
    redirect: { name: name }
  });

  // 添加具体权限路由
  if (data.isTeacher) {
    // 添加老师的路由
    routers = routers.concat(TEACHER);
  }
  if (data.isDirector) {
    // 添加主任的路由
    routers = routers.concat(DIRECTOR);
  }

  return routers;
}*/
export default [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    desc: '首页',
    components: {
      default: getPage('home')
    }
  }
];
