/**
 * router.ts - 路由配置文件
 * @returns {array} config - 路由配置
 */
const config: object[] = [
  {
    path: '/home',
    key: '/home',
    icon: 'HomeOutlined',
    title: '首页',
    isPublic: true,
    component: () => import('../pages/Home'),
  },
  {
    path: '/product',
    key: '/product',
    icon: 'AppstoreOutlined',
    title: '商品',
    children: [
      {
        path: '/product/category',
        key: '/product/category',
        icon: 'BarsOutlined',
        title: '品类管理',
        component: () => import('../pages/Category'),
      },
      {
        path: '/product/product',
        key: '/product/product',
        icon: 'CreditCardOutlined',
        title: '商品管理',
        component: () => import('../pages/Product'),
      },
      {
        path: '/product/product-detail',
        key: '/product/product-detail',
        icon: 'CreditCardOutlined',
        title: '商品管理-详情',
        hideMenu: true,
        component: () => import('../pages/Product/Detail'),
      }
    ]
  },
  {
    path: '/user',
    key: '/user',
    icon: 'UserOutlined',
    title: '用户管理',
    component: () => import('../pages/User'),
  },
  {
    path: '/role',
    key: '/role',
    icon: 'SolutionOutlined',
    title: '角色管理',
    component: () => import('../pages/Role'),
  },
  {
    path: '/customer',
    key: '/customer',
    icon: 'UsergroupAddOutlined',
    title: '客户管理',
    component: () => import('../pages/Customer'),
  },
  {
    path: '/chart',
    key: '/chart',
    icon: 'AreaChartOutlined',
    title: '图形图表',
    children: [
      {
        path: '/chart/bar',
        key: '/chart/bar',
        icon: 'BarChartOutlined',
        title: '柱形图',
        component: () => import('../pages/Chart/Bar'),
      },
      {
        path: '/chart/line',
        key: '/chart/line',
        icon: 'LineChartOutlined',
        title: '折线图',
        component: () => import('../pages/Chart/Line'),
      },
      {
        path: '/chart/pie',
        key: '/chart/pie',
        icon: 'PieChartOutlined',
        title: '饼图',
        component: () => import('../pages/Chart/Pie'),
      }
    ]
  },
  {
    path: '/learn',
    key: '/learn',
    icon: 'PlusOutlined',
    title: '学习工具',
    children: [
      {
        path: '/learn/mind',
        key: '/learn/mind',
        icon: 'RetweetOutlined',
        title: '思维导图',
        component: () => import('../pages/Learn/Mind'),
      },
      {
        path: '/learn/mind-detail',
        key: '/learn/mind-detail',
        icon: 'RetweetOutlined',
        title: '思维导图-详情',
        hideMenu: true,
        component: () => import('../pages/Learn/Mind/Detail'),
      },
      {
        path: '/learn/flow',
        key: '/learn/flow',
        icon: 'RetweetOutlined',
        title: '流程图',
        component: () => import('../pages/Learn/Flow'),
      },
      {
        path: '/learn/flow-detail',
        key: '/learn/flow-detail',
        icon: 'RetweetOutlined',
        title: '流程图-详情',
        hideMenu: true,
        component: () => import('../pages/Learn/Flow/Detail'),
      },
      {
        path: '/learn/koni',
        key: '/learn/koni',
        icon: 'RetweetOutlined',
        title: '拓扑图',
        component: () => import('../pages/Learn/Koni'),
      },
      {
        path: '/learn/koni-detail',
        key: '/learn/koni-detail',
        icon: 'RetweetOutlined',
        title: '拓扑图-详情',
        hideMenu: true,
        component: () => import('../pages/Learn/Koni/Detail'),
      }
    ]
  },
  {
    path: '/apiStudy',
    key: '/apiStudy',
    icon: 'QuestionOutlined',
    title: 'API学习',
    children: [
      {
        path: '/apiStudy/html',
        key: '/apiStudy/html',
        icon: 'Html5Outlined',
        title: 'HTML',
        component: () => import('../pages/ApiStudy/Html'),
      },
      {
        path: '/apiStudy/css',
        key: '/apiStudy/css',
        icon: 'Html5Outlined',
        title: 'CSS',
        component: () => import('../pages/ApiStudy/Css'),
      },
      {
        path: '/apiStudy/js',
        key: '/apiStudy/js',
        icon: 'Html5Outlined',
        title: 'JS',
        component: () => import('../pages/ApiStudy/Js'),
      },
    ],
  },
];
export default config;
