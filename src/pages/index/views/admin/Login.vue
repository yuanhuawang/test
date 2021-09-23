<template>
  <div class="login" v-elHeight>
    <div class="wrap">
      <el-row>
        <el-col :md="12" :offset="6">
          <h1>
            后台管理系统
          </h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="6" :offset="9">
          <div class="grid-content bg-purple-light">
            <el-form :model="login" ref="form" :rules="rules" label-width="120px">
              <el-form-item label="登陆邮箱">
                <el-input type="email" name="account" v-model="login.account"></el-input>
              </el-form-item>
              <el-form-item label="帐号密码">
                <el-input type="password" name="password" v-model="login.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">登陆后台</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login: {
        account: "yyx219@qq.com",
        password: "123456",
      },
      rules: {},
    };
  },
  methods: {
    onSubmit() {
      this.$API.login(this.login).then((res) => {
        //   console.log(this.login);
        console.log(res);
        // if (res.data.isVerify) {
        //   //把后端返回的密码信息字段删除
        //   delete res.data.user.password
        //   //把获取到的数据存入临时本地sessionStorage 浏览器关闭就清除
        //   sessionStorage.setItem('userinfo',JSON.stringify(res.data))
        //   //本地持久保存
        //   // localStorage.setItem('userinfo',JSON.stringify(res.data))
        //   //执行同步事件直接commit.把获取到的用户信息存入VUEX
        //   this.$store.commit('setUserinfo',res.data)
          this.$router.push('/admin')
        // }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding: 0 0px;
  &--header {
    background: url(../../assets/login_bg.jpg) center no-repeat;
    background-size: 100%;
    text-align: center;
    border-bottom: 1px solid #ddd;
    display: flex;
    color: #fff;
    height: 200px;
    text-shadow: 2px 2px 2px #888;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 5px;
    .ty--logo {
      padding: 10px;
      border-radius: 5px;
      box-shadow: 2px 2px 5px #eee;
      align-self: flex-start;
      img {
        width: 80%;
      }
    }
    small {
      font-size: 32px;
      padding: 10px;
    }
    
  }
  h1{
    text-align: center;
    margin-bottom: 100px;
  }

  .el-col {
    background: #fff;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 50vh;
  }
}
</style>
