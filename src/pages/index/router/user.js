export default {
    path: '/admin/users',
    name: 'users',
    redirect: '/admin/userList',
    component: () => import('@/pages/index/views/admin/users/Index.vue'),
    meta: {
        title: "查看用户信息",
        navTitle: "用户中心",
        header_menu:true,
    },
    children: [
        {
            path: '/admin/UserList',
            name: 'userList',
            component: () => import('@/pages/index/views/admin/users/UserList.vue'),
            meta: {
                title: "查看用户",
                navTitle: "查看用户",
                header_menu:true,
            }
        },
        {
            path: '/admin/userspost',
            name: 'userspost',
            component: () => import('@/pages/index/views/admin/users/Userpost.vue'),
            meta: {
                title: "增加新用户",
                navTitle: "增加新用户",
                header_menu:true,
            }
        },
        {
            path: '/admin/Profile/:userId',
            name: 'userProfile',
            props:true,
            component: () => import('@/pages/index/views/admin/users/UserProfile.vue'),
            meta: {
                title: "用户详情",
                navTitle: "用户详情"
            }
        },
        {
            path: '/admin/usersrole',
            name: 'userrole',
            component: () => import('@/pages/index/views/admin/users/Userrole.vue'),
            meta: {
                title: "角色管理",
                navTitle: "角色管理",
                header_menu:true,
            }
        }
    ]
}