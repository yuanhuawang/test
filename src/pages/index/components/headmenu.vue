<template>
  <div>
    <ul>
      <li v-for="item in headerMenu" :key="item.name">
        <router-link :to="item.path">{{item.meta.navTitle}}</router-link>
      </li>
    </ul>
    <div class="row">
      <div class="col-sm-12">
        <!-- <el-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          内容请求失败!
        </el-alert> -->

        <template v-if="!showDismissibleAlert">
          <el-card v-for="item in blogs" :key="item.id" class="mb-12">
            <!-- <el-card-text> -->
              <el-image :src="item.img"></el-image>
              {{item.body}}
              <p class="footer">
                <span>发布人：{{item.author}}</span>
                <span>阅读数：{{item.views}}</span>
                <span>发布日期：{{item.now}}</span>
              </p>
            <!-- </el-card-text> -->

            <!-- <router-link :to="{name:'blogshow',params:{id:item.id}}">详细内容</router-link> -->
          </el-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../router/menu";
export default {
  name: "headerMenu",
  data() {
    return {
      showDismissibleAlert: false,
      blogs: [],
    };
  },
  computed: {
    headerMenu() {
      return Menu.filter((item) => {
        return item.meta.headermenu;    //menu.js的headermenu为true渲染
      });
    },
  },
  methods: {
    getBlog() {
      this.axios({
        url: "/bpi/blog/blog.php",
        method: "get",
        headers: {
          token: "123456",
        },
      }).then((res) => {
        if (res.data.isVerify) {
          this.blogs = res.data.users;
        } else {
          this.showDismissibleAlert = true;
          // alert(res.data.msg)
        }
      });
    },
  },
  created() {
    this.getBlog();
  },
};
</script>

<style lang="scss" scoped>
.el-card{
  width: 50%;
  margin-left: 25%;
  margin: 20px 25%;
  // height: 200px;
  span{
    margin: 5px;
  }
}
li{
  // float: left;
  margin-right: 30px;
  list-style:none;
}
.el-image{
  width: 100%;
}
</style>