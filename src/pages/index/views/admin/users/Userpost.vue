<template>
  <div class="userpost">
    <h1>增加新用户</h1>
    <el-row>
      <el-col :md="20">
        <el-form :model="register" :rules="rules" ref="register" label-width="130px" class="demo-ruleForm">
          <el-form-item label="身份证姓名" prop="trueName">
            <el-input type="text" v-model="register.trueName"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input type="text" v-model="register.nickName"></el-input>
          </el-form-item>

          <el-form-item label="手机号码">
            <el-input type="tel" v-model="register.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input type="email" v-model="register.email"></el-input>
          </el-form-item>

          <el-form-item label="初始密码">
            <el-input type="password" v-model="register.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码">
            <el-input type="password" v-model="register.confirmPassword"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="register.gender">
              <el-radio label="0" border>女</el-radio>
              <el-radio label="1" border>男</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="班级名称">
            <el-select v-model="register.classid" placeholder="请选择">
              <el-option v-for="item in optionClass" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户角色">
            <el-select v-model="register.roleid" placeholder="请选择">
              <el-option v-for="item in optionRole" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户身份">
            <el-radio-group v-model="register.status">
              <el-radio label="0" border>超级管理员</el-radio>
              <el-radio label="1" border>普通管理员</el-radio>
              <el-radio label="2" border>正式学生</el-radio>
              <el-radio label="3" border>训练营学生</el-radio>
              <el-radio label="9" border>试听学生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-checkbox v-model="register.state">{{
              register.state ? "异常" : "正常"
            }}</el-checkbox>
          </el-form-item>

          <el-input v-if="register.state" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" placeholder="请输入内容"
            v-model="register.stateMsg">
          </el-input>

          <el-form-item>
            <el-button type="primary" @click="submitForm('register')">
              增加新用户
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
      optionClass: [],
      optionRole: [],
      register: {
        trueName: "",
        nickName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "0",
        classid: "",
        roleid: "",
        status: "9",
        state: false,
        stateMsg: "",
      },
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
    this.getClass();
    this.getRole();
  },
  methods: {
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
            url: "/api/member.php?action=post",
            data: this.register,
          }).then((res) => {
            console.log(res);
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>