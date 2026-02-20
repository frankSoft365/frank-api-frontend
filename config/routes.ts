export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/login' },
      { name: '注册', path: '/user/register', component: './user/register' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '用户管理', component: './admin/list' },
      {
        path: '/admin/sub-page1',
        name: '批量导入用户',
        component: './admin/batchImportUser',
      },
      {
        path: '/admin/sub-page2',
        name: '接口管理',
        component: './admin/interfaceManagement',
      },
    ],
  },
  { name: '个人中心', icon: 'user', path: '/profile', component: './profile' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
