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
      { path: '/admin', redirect: '/admin/userManagement' },
      {
        path: '/admin/userManagement',
        name: '用户管理',
        component: './admin/list',
      },
      {
        path: '/admin/userBatchImport',
        name: '批量导入用户',
        component: './admin/batchImportUser',
      },
      {
        path: '/admin/interfaceManagement',
        name: '接口管理',
        component: './admin/interfaceManagement',
      },
    ],
  },
  {
    name: '接口中心',
    icon: 'api',
    path: '/interfaceInfoCenter',
    component: './interfaceInfo',
  },
  {
    name: '接口文档',
    icon: 'read',
    path: '/interfaceDoc',
    component: './interfaceDoc',
  },
  { name: '个人中心', icon: 'user', path: '/profile', component: './profile' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
