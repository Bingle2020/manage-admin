import layout from '@/page/layout';
import { asyncRoutes } from '@/router/async';
import { nets } from '@/router/error';

export const constantRoutes = [
    {
        path: '/',
        name: 'layout',
        component: layout,
        children: asyncRoutes
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login')
    },
    {
        path: '/refresh',
        name: 'refresh',
        component: () => import('@/page/errors/refresh')
    },
    {
        path: '/errors',
        name: 'errors',
        component: () => import('../page/errors/index'),
        children: nets
    }
]