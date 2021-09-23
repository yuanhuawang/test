import user from './user'
import news from './news'
export default [
    {
        path: '/admin/index',
        name: 'adminIndex',
        component: () => import('@/pages/index/views/admin/adminIndex.vue'),
        meta: {
            title: "后台默认首页",
            navTitle:"仪表台",
            header_menu:true,
        }
    },
    user,
    news
]