export const asyncRoutes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index')
    },
    {
        path: '/userManage',
        name: 'userManage',
        component: () => import('../views/user/userManage')
    },
    {
        path: '/roleManage',
        name: 'roleManage',
        component: () => import('../views/user/roleManage')
    },
    {
        path: '/found',
        name: 'found',
        component: () => import('../views/found')
    },
    {
        path: '/person',
        name: 'person',
        component: () => import('../views/person')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home')
    },
    {
        path: '/chart',
        name: 'chart',
        component: () => import('../views/echart')
    }
]