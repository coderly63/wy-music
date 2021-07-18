<!--  -->
<template>
  <div class="dialog">
    <el-dialog
      title="登录"
      v-model="isLoading"
      width="30%"
      center
      @close="close()"
    >
      <div class="style">
        <span
          :class="['phoneLogin', loginStyle == 0 ? 'active' : '']"
          @click="loginStyle = 0"
          >手机号登录</span
        >
        <span
          :class="['emailLogin', loginStyle == 1 ? 'active' : '']"
          @click="loginStyle = 1"
          >邮箱登录</span
        >
      </div>
      <!-- phone login -->
      <el-form
        :model="loadForm1"
        :rules="loadRules1"
        ref="phoneLogin"
        label-width="100px"
        v-show="loginStyle == 0"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="loadForm1.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loadForm1.password"></el-input>
        </el-form-item>
      </el-form>
      <!-- email login -->
      <el-form
        :model="loadForm2"
        :rules="loadRules2"
        ref="emailLogin"
        label-width="100px"
        v-show="loginStyle == 1"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loadForm2.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loadForm2.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="login('phoneLogin', 'emailLogin')"
            >登 录</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
export default {
  setup(props) {
    const isLoading = ref(false);
    const loginStyle = ref(0);
    return {
      isLoading,
      loginStyle,
    };
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let reg_tel =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!reg_tel.test(value)) {
          callback(new Error("请输入正确的手机号"));
        }
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        let reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg_email.test(value)) {
          callback(new Error("请输入正确的邮箱"));
        }
        callback();
      }
    };
    return {
      loadForm1: {
        phone: "",
        password: "",
      },
      loadRules1: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loadForm2: {
        email: "",
        password: "",
      },
      loadRules2: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login(loadForm1, loadForm2) {
      if (this.loginStyle == 0) {
        this.$refs[loadForm1].validate(async (valid) => {
          if (valid) {
            const res = await this.$axios("/login/cellphone", {
              params: {
                phone: this.loadForm1.phone,
                password: this.loadForm1.password,
              },
            });
            console.log(res);
            if (res.code == 200) {
              this.$message.success("登陆成功");
              window.localStorage.setItem("phone", this.loadForm1.phone);
              window.localStorage.setItem("password", this.loadForm1.password);
              this.isLoading = false;
              this.$store.commit("setLogin", "true");
              this.$store.commit("setAvatarUrlL", res.profile.avatarUrl);
              this.$store.commit("setUserId", res.account.id);
            } else {
              this.$message.error("密码错误 请重试");
            }
          }
        });
      } else {
        //邮箱必须为163邮箱
        this.$refs[loadForm2].validate(async (valid) => {
          if (valid) {
            // const res = await this.$axios("/login", {
            //   params: {
            //     email: this.loadForm2.email,
            //     password: this.loadForm2.password,
            //   },
            // });
            this.$message.error("密码错误");
            // if (res.code == 200) {
            //   this.$message.success("登陆成功");
            // } else {
            //   this.$message.error("密码错误 请重试");
            // }
          }
        });
      }
    },
    close() {
      if (
        this.$refs["phoneLogin"] !== undefined &&
        this.$refs["emailLogin"] !== undefined
      ) {
        this.$refs["phoneLogin"].resetFields();
        this.$refs["emailLogin"].resetFields();
      }
    },
  },
};
</script>
<style scoped lang="less">
.style {
  width: 45%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 20px;
  .phoneLogin,
  .emailLogin {
    margin-left: 10px;
    cursor: pointer;
  }
  .active {
    color: yellowgreen;
  }
  .phoneLogin,
  .emailLogin {
    cursor: pointer;
  }
}
:deep(.el-dialog) {
  width: 500px !important;
}
</style>