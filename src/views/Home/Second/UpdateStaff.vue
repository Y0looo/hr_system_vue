<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef" class="ruleForm" :inline="true">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" style="width: 500px" readonly/>
    </el-form-item>
    <el-form-item label="工号" prop="s_id" >
      <el-input v-model="form.s_id" style="width: 500px" readonly/>
    </el-form-item>
    <el-form-item label="账号" prop="account" >
      <el-input v-model="form.account" style="width: 500px" readonly/>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="form.pwd" style="width: 500px" readonly/>
    </el-form-item>
    <el-form-item label="年龄" :rules="rules.age" prop="age">
      <el-input v-model="form.age" style="width: 500px"/>
    </el-form-item>
    <el-form-item label="手机号" :rules="rules.phone" prop="phone">
      <el-input v-model="form.phone" style="width: 500px"/>
    </el-form-item>
    <el-form-item label="教育程度" required prop="educated">
      <el-input v-model="form.educated" style="width: 500px"/>
    </el-form-item>
    <el-form-item label="身份证" required prop="code">
      <el-input v-model="form.code" style="width: 500px"/>
    </el-form-item>
    <el-form-item label="部门名称" required prop="dept_name">
      <el-input v-model="form.dept_name" style="width: 500px"/>
    </el-form-item>
    <el-form-item label="岗位名称" required prop="job_name">
      <el-input v-model="form.job_name" style="width: 500px"/>
    </el-form-item>
    <el-form-item label="详细地址" required prop="address">
      <el-input v-model="form.address" style="width: 1000px"/>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
  <el-button :plain="true" @click="open1" v-show="false">success</el-button>
  <el-button :plain="true" @click="open2" v-show="false">error</el-button>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { onMounted } from 'vue';
import { updateStaff, getStaffById } from '../../../api/staff'
import { Response, RESPONSE_CODE, UserModel } from '../../../types/api'

// do not use same name with ref
const form = reactive({
  s_id: '',
  account: '',
  pwd: '',
  name: '',
  age: '',
  phone: '',
  educated: '',
  code: '',
  address: '',
  dept_name: '',
  job_name: ''
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  age: [
    {required: true, message: '请输入年龄', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入手机号码', trigger: 'blur'},
    {min: 11, max: 11, message: '手机号不符合正确格式，请重新填写', trigger: 'blur'}
  ],
  educated: [
    {required: true, message: '请输入教育程度', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入身份证', trigger: 'blur'},
    {min: 18, max: 18, message: '身份证不符合正确格式，请重新填写', trigger:'blur'}
  ],
  dept_name: [
    {required: true, message: '请输入所属部门名称', trigger: 'blur'}
  ],
  job_name: [
    {required: true, message: '请输入所属岗位名称', trigger: 'blur'}
  ],
  address: [
    {required: true, message: '请输入地址', trigger: 'blur'}
  ],
})

onMounted(() => {
  getData(parseInt(localStorage.getItem("s_id")||''))
  
})

const getData = async (id: number) => {
  const res: Response<UserModel> = await getStaffById(id)
  if (res.code === RESPONSE_CODE.OK) {
    form.account = res.data.account,
    form.s_id = res.data.s_id.toString(),
    form.pwd = res.data.pwd,
    form.name = res.data.name,
    form.age = res.data.age,
    form.phone = res.data.phone,
    form.educated = res.data.educated,
    form.code = res.data.code,
    form.dept_name = res.data.dept_name,
    form.job_name = res.data.job_name,
    form.address = res.data.address
    console.log(res.data)
  }
}

const submitForm = (form1: FormInstance | undefined) => {
  if (!form1) return
  form1.validate(async (valid) => {
    if (valid) {
      const res: Response<UserModel> = await updateStaff(parseInt(form.s_id), form.phone, form.code, parseInt(form.age), form.address, form.dept_name, form.job_name, form.educated)
      console.log(res)
      if (res.code === RESPONSE_CODE.OK) {
        getData(parseInt(localStorage.getItem("s_id")||''))
        console.log("更新成功");
        open1()
      } else {
        console.log("更新失败")
        open2()
      }
    } else {
      return false
    }
  })
}

const resetForm = (form1: FormInstance | undefined) => {
  if (!form1) return
  form.address = ''
  form.age = ''
  form.code = ''
  form.dept_name = ''
  form.educated = ''
  form.job_name = ''
  form.phone = ''
}

const open1 = () => {
  ElMessage({
    showClose: true,
    message: '修改成功，请查看',
    type: 'success',
  })
}

const open2 = () => {
  ElMessage({
    showClose: true,
    message: '修改失败，请稍后重试',
    type: 'error',
  })
}
</script>
