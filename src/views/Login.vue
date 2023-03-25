<template>
  <div class="login-container" >
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="ruleForm">
      <h1 style="text-align: center;">人事管理系统</h1>
      <el-form-item label="账号" prop="account" size="large">
        <el-input v-model="ruleForm.account" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd" size="large">
        <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)" size="large">登录</el-button>
        <el-button class="login-btn" @click="resetForm(ruleFormRef)" size="large">清空</el-button>
      </el-form-item>
    </el-form>
    <el-button :plain="true" @click="open4" v-show="false">error</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '../api/user'
import { Response, UserModel, RESPONSE_CODE } from '../types/api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import store from '../store'

const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  account: '',
  pwd: '',
})

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入您的账号', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: '请输入您的密码', trigger: 'blur' },
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const res: Response<UserModel> = await login(ruleForm.account, ruleForm.pwd)
      console.log(res)
      if (res.code === RESPONSE_CODE.OK) {
        router.push('/home')
        store.state.name = res.data.name,
          store.state.role = res.data.role,
          store.state.s_id = res.data.s_id.toString(),
          localStorage.setItem("name", res.data.name),
          localStorage.setItem("role", res.data.role),
          localStorage.setItem("s_id", res.data.s_id.toString()),
          console.log(localStorage.getItem("name")),
          console.log(localStorage.getItem("role")),
          console.log(localStorage.getItem("s_id"))
      } else {
        open4()
      }
    } else {
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const open4 = () => {
  ElMessage({
    showClose: true,
    message: '登录失败，请稍后重试！',
    type: 'error',
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: grid;
  place-content: center; 
  
  width: 100%;
  height: 100%;
  background-image: url("../assets/login.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  text-align: center;
  // padding: 1px;
  .ruleForm {
    width: 500px;
    margin: 200px auto;
    background: #ffffff;
    padding: 40px;
    border-radius: 5px;
  }
  .login-btn {
    width: 48%;
  }
  h2 {
    margin-bottom: 20px;
  }
}

.login-container .ruleForm {
  width: 600px;
}


</style>
