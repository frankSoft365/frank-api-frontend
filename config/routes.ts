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
      { path: '/admin', redirect: '/admin/console' },
      {
        path: '/admin/console',
        name: '控制台',
        component: './admin/console',
      },
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
    component: './interfaceInfoCenter',
  },
  {
    name: '接口信息',
    icon: 'api',
    path: '/interfaceInfo/:id',
    component: './interfaceInfo',
    hideInMenu: true,
  },
  {
    name: '工作台',
    icon: 'homeOutlined',
    path: '/workbench',
    component: './workbench',
  },
  {
    name: '个人中心',
    icon: 'user',
    path: '/userCenter',
    routes: [
      { path: '/userCenter', redirect: '/userCenter/profile' },
      {
        path: '/userCenter/profile',
        name: '个人信息',
        component: './userCenter/profile',
      },
      {
        path: '/userCenter/AccessKey',
        name: 'AccessKey',
        component: './userCenter/AccessKey',
      },
    ],
  },
  {
    name: '接口文档',
    icon: 'read',
    path: '/interfaceDoc',
    component: './interfaceDoc',
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
