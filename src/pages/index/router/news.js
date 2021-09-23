export default {
    path: '/admin/news',
    name: 'news',
    redirect: '/admin/newspost',
    component: () => import('@/pages/index/views/admin/news/Index.vue'),
    meta: {
        title: "文章管理",
        navTitle:"文章管理",
        header_menu:true,
    },
    children:[
        {
            path: '/admin/newspost',
            name: 'newspost',
            component: () => import('@/pages/index/views/admin/news/newspost.vue'),
            meta: {
                title: "写文章",
                navTitle:"写文章",
                header_menu:true,
            }
        },
        {
            path: '/admin/newsclass',
            name: 'newsclass',
            component: () => import('@/pages/index/views/admin/news/newsclass.vue'),
            meta: {
                title: "文章分类",
                navTitle:"文章分类",
                header_menu:true,
            }
        }
    ]
}