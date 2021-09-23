<template>
  <div class="userpost">
    <h1>用户信息修改</h1>
    <el-row>
      <el-col :md="20">
        <el-form :model="user" :rules="rules" ref="user" label-width="130px" class="demo-ruleForm">
          <el-form-item label="身份证姓名" prop="trueName">
            <el-input type="text" v-model="user.trueName"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input type="text" v-model="user.nickName"></el-input>
          </el-form-item>

          <el-form-item label="手机号码">
            
            <span>{{user.phone}}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{user.email}}</span>
          </el-form-item>

          <el-form-item label="初始密码">
            <el-input type="password" v-model="user.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码">
            <el-input type="password" v-model="user.confirmPassword"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="user.gender">
              <el-radio label="0" border>女</el-radio>
              <el-radio label="1" border>男</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="班级名称">
            <el-select v-model="user.classid" placeholder="请选择">
              <el-option v-for="item in optionClass" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户角色">
            <el-select v-model="user.roleid" placeholder="请选择">
              <el-option v-for="item in optionRole" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户身份">
            <el-radio-group v-model="user.status">
              <el-radio label="0" border>超级管理员</el-radio>
              <el-radio label="1" border>普通管理员</el-radio>
              <el-radio label="2" border>正式学生</el-radio>
              <el-radio label="3" border>训练营学生</el-radio>
              <el-radio label="9" border>试听学生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-checkbox v-model="user.state">{{
              Number(user.state) ? "异常" : "正常"
            }}</el-checkbox>
          </el-form-item>

          <el-input v-if="Number(user.state)" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" placeholder="请输入内容"
            v-model="user.stateMsg">
          </el-input>
          <el-input type="hidden" :readonly="true" v-model="user.id"></el-input>
          <el-input type="hidden" :readonly="true" v-model="user.phone"></el-input>
          <el-input type="hidden" :readonly="true" v-model="user.email"></el-input>

          <el-form-item>
            <el-button type="primary" @click="submitForm('user')">
              修改用户
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "userpost",
  props: {
    userId: {
      type: String,
    },
  },
  data() {
    var verify_trueName = (rule, value, callback) => {
      let reg = /^[\u2E80-\u9FFF]{2,}$/; //Unicode编码中的汉字范围
      if (value && value.length > 0) {
        if (!reg.test(value)) {
          callback([new Error("姓名输入不合法")]);
        } else {
          callback();
        }
      } else if (value.length == 0) {
        callback();
      } else {
        callback(new Error("姓名输入不合法"));
      }
    };
    var verify_nickName = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/; //Unicode编码中的汉字范围
      if (value && value.length > 0) {
        if (!reg.test(value)) {
          callback([new Error("匹配中文，英文字母和数字及_")]);
        } else {
          callback();
        }
      } else if (value.length == 0) {
        callback(new Error("用户昵称不能为空"));
      } else {
        callback(new Error("匹配中文，英文字母和数字及_"));
      }
    };
    return {
      user: {},
      optionClass: [],
      optionRole: [],
      rules: {
        trueName: [
          { validator: verify_trueName, required: false, trigger: "blur" },
        ],
        nickName: [
          { validator: verify_nickName, required: true, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getuser();
    this.getClass();
    this.getRole();
  },
  methods: {
    getuser(){
          this.axios.get("/api/member.php?action=check&userid="+this.userId)
          .then((res)=>{
              console.log(res.data.users);
              res.data.users[0].password='';
              res.data.users[0].confirmPassword='';
              this.user=res.data.users[0]
          })
      },
    getClass() {
      this.axios.get("/data/class.json").then((res) => {
        this.optionClass = res.data;
      });
    },
    getRole() {
      this.axios.get("/data/role.json").then((res) => {
        this.optionRole = res.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/api/member.php?action=modify",
            data: this.user,
          }).then((res) => {
            console.log(res);
            this.$message({
            type: "success",
            message: res.data.msg,
          });
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>