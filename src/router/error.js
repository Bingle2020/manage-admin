export const nets = [
    {
        path: '401',
        name: '401',
        component: () => import('../page/errors/401')
    },
    {
        path: '403',
        name: '403',
        component: () => import('../page/errors/403')
    },
    {
        path: '404',
        name: '404',
        component: () => import('../page/errors/404')
    },
    {
        path: 'error',
        name: 'error',
        component: () => import('../page/errors/error')
    },
    {
        path: 'netsplit',
        name: 'netsplit',
        component: () => import('../page/errors/netsplit')
    }
]