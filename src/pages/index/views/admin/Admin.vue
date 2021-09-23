<template>
  <el-container>
    <el-aside v-elHeight>
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true" background-color="#545c64" text-color="#fff">
        <template v-for="item in adminNav">
          <!-- 仪表台，无二级菜单 -->
          <el-menu-item :index="item.path" :key="item.name" v-if="!item.children" @click="push()">
            <i class="el-icon-setting"></i>
            <span slot="title">
              {{ item.meta.navTitle }}
            </span>
          </el-menu-item>

          <!-- 有二级菜单部分 -->
          <el-submenu v-else :index="item.path" :key="item.name">
            <!-- 二级菜单头 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title" @click="push()">{{ item.meta.navTitle }}</span>
            </template>
            <!-- 二级菜单下具体内容 -->
            <template v-for="childrenItem in item.children">
              <el-menu-item-group v-if="childrenItem.meta.header_menu" :key="childrenItem.name">
                <el-menu-item :index="childrenItem.path" @click="push()">
                  {{ childrenItem.meta.navTitle }}
                </el-menu-item>
              </el-menu-item-group>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-main>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" :to="{ path: item.path }">{{item.meta.navTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import adminNav from "../../router/admin";
export default {
  data() {
    return {
      isCollapse: false,
      breadcrumb: [],
    };
  },
  computed: {
    adminNav() {
      return adminNav.filter((item) => {
        return item.meta.header_menu;
      });
    },
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.push();
      }
    },
  },
  created() {
    this.push();
  },
  methods: {
    handleOpen(key) {
      this.$router.push(key);
    },
    handleClose(key) {
      // this.$router.push(key);
      console.log(key);
    },
    push() {
      this.breadcrumb = this.$route.matched;  // 一个数组，包含当前路由的所有嵌套路径片段的路由记录
    },
  },
};
</script>

<style lang="scss">
$color: #545c64;
.el-aside {
  background-color: #545c64;
  color: #333;
  width: 220px !important;
  .el-menu {
    border-right: none;
  }
}

.el-breadcrumb {
  background-color: $color;
  height: 56px;
  line-height: 56px;
}

.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #fff;
}

.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: #fff;
  cursor: pointer;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}
</style>
