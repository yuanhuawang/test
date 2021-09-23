<template>
  <div class="post container">
    <h1>发布文章</h1>
    <el-row>
      <el-col :md="18">
        <el-form @submit.prevent="onSubmit">
          <el-form-item label="文章标题">
            <el-input type="text" v-model="blog.title" required placeholder="请输入您的博客标题"></el-input>
          </el-form-item>

          <el-form-item label="发布人">
            <el-input type="text" v-model="blog.author" required placeholder="发布人"></el-input>
          </el-form-item>

          <el-form-item label="网络图片路径">
            <el-input type="text" v-model="blog.img" required placeholder="请引入网络图片路径"></el-input>
          </el-form-item>

          <el-form-item label="文章内容">
            <el-input type="textarea" v-model="blog.body" placeholder="请输入您的博客内容" rows="5" max-rows="10"></el-input>
          </el-form-item>

          <el-button type="primary" variant="primary" @click="onSubmit(blog)">提交</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: {
        title: "",
        author: "",
        img: "https://picsum.photos/600/300/?image=25",        
        body: "",
      },
    };
  },
  methods: {
    onSubmit(blog) {
      console.log(blog);
      // var formdata = this.$qs.stringify(this.blog);
      // console.log(this.blog.body);
      // console.log(formdata);
      // formdata = formdata +""
      this.axios({
        url: "/bpi/blog/post.php",
        method: "post",
        data: blog,
        headers: {
          token: "123456",
        },
      }).then((res) => {
        console.log(res);
        // this.tip = res.data;
        if (res.data.isVerify) {
          this.$router.push("/");
        } else {
          console.log("wrong");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  h1 {
    padding: 15px 0;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    margin-top: 15px;
  }
}
.el-col{
  margin-left: 80px;
}
</style>