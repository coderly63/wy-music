<!--  -->
<template>
  <div class="dialog">
    <el-dialog
      title="注册"
      v-model="isRegister"
      width="30%"
      center
      @close="close()"
    >
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="register"
        label-width="100px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" class="captcha">
          <el-input v-model="registerForm.captcha"></el-input>
          <el-button @click="getCaptcha">获取验证码</el-button>
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="registerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="register">注 册</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
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
    return {
      isRegister: false,
      registerForm: {
        phone: "",
        captcha: "",
        password: "",
        nickname: "",
      },
      registerRules: {
        phone: [
          { validator: validatePhone, trigger: "blur" },
          { required: true, trigger: "请输入手机号" },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  methods: {
    close() {
      if (this.$refs["register"] !== undefined) {
        this.$refs["register"].resetFields();
      }
    },
    register() {
      this.$refs["register"].validate(async (valid) => {
        if (valid) {
          const res = await this.$axios("/register/cellphone", {
            params: {
              phone: this.registerForm.phone,
              password: this.registerForm.password,
              captcha: this.registerForm.captcha,
              nickname: this.registerForm.nickname,
            },
          });
          if (res.code === 200) {
            this.$message.success("注册成功");
          }
        }
      });
      this.register = false;
    },
    //获取验证码
    getCaptcha() {
      this.$refs.register.validateField("phone", async (valid) => {
        if (valid === "") {
          const res = await this.$axios("/captcha/sent", {
            params: {
              phone: this.registerForm.phone,
            },
          });
          console.log(res);
        }
      });
    },
  },
};
</script>
<style scoped lang='less'>
.dialog {
  .captcha {
    .el-input {
      width: 130px;
    }
    .el-button {
      margin-left: 60px;
    }
  }
}
</style>