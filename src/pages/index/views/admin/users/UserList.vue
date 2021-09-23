<template>
  <div class="userlist">
    <el-table :data="users" border style="width: 100%">
      <el-table-column fixed type="index" label="ID" width="50">
      </el-table-column>
      <el-table-column fixed prop="trueName" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120">
      </el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="180">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="50"> </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <template>
            <el-button type="text" @click="open(scope.$index,scope.row)">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "userlist",
  data() {
    return {
      visible: false,
      users: [],
    };
  },
  methods: {
    open(index, row) {
      this.$confirm("是否删除" + row.trueName + "用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.remove(index, row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getUsers() {
      this.axios.get("/api/member.php?action=check").then((res) => {
        console.log(res.data.users);
        this.users = res.data.users;
      });
    },
    handleClick(row) {
      console.log(row);
      this.$router.push({ name: "userProfile", params: { userId: row.id } });
    },
    remove(index, row) {
      this.axios({
        method: "get",
        url: "/api/member.php",
        params: {
          action: "remove",
          id: row.id,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.verify) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.users.splice(index, 1);
        } 
        else {
          this.$message({
            type: "info",
            message: res.data.msg,
          });
        }
      });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>
