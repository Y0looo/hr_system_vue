<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef" class="ruleForm" :inline="true">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" style="width: 600px" readonly />
    </el-form-item>
    <el-form-item label="工号" prop="s_id">
      <el-input v-model="form.s_id" style="width: 600px" readonly />
    </el-form-item>
    <el-form-item label="账号" prop="account">
      <el-input v-model="form.account" style="width: 600px" readonly />
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="form.pwd" style="width: 600px" readonly show-password type="password"/>
    </el-form-item>
    <el-form-item label="年龄" :rules="rules.age" prop="age">
      <el-input v-model="form.age" style="width: 600px" />
    </el-form-item>
    <el-form-item label="手机号" :rules="rules.phone" prop="phone">
      <el-input v-model="form.phone" style="width: 600px" />
    </el-form-item>
    <el-form-item label="教育程度" required prop="educated">
      <el-input v-model="form.educated" style="width: 600px" />
    </el-form-item>
    <el-form-item label="身份证" required prop="code">
      <el-input v-model="form.code" style="width: 600px" />
    </el-form-item>
    <el-form-item label="部门名称" required prop="dept_name">
      <el-select v-model="form.dept_name" clearable class="m-2" placeholder="请选择部门" style="width: 600px">
        <el-option
          v-for="item in depts"
          :label="item.dept_name"
          :value="item.d_id"
          :key="item.d_id"
          style="width: 300px"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="岗位名称" required prop="job_name">
      <el-select v-model="form.job_name" clearable class="m-2" placeholder="请选择岗位" style="width: 600px">
        <el-option
          v-for="item in jobs"
          :label="item.job_name"
          :value="item.job_id"
          :key="item.job_id"
          style="width: 300px"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="详细地址" required prop="address">
      <el-input v-model="form.address" style="width: 1352px" />
    </el-form-item>
    <el-form-item style="width: 300px; margin-left:  600px;" >
      <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
  <el-form></el-form>
  <el-button :plain="true" @click="open1" v-show="false">success</el-button>
  <el-button :plain="true" @click="open2" v-show="false">error</el-button>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { reactive, ref, } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { onMounted } from 'vue';
import { updateStaff, getStaffById } from '../../api/staff'
import { getDeptsList } from '../../api/dept'
import { getJobsList } from '../../api/job'
import { Response, RESPONSE_CODE, UserModel,  DepartList, JobInfoList } from '../../types/api'


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
  job_name: '',
  d_id: ''
})
// 岗位列表
const jobs = ref<any[]>([])
// 部门列表
const depts = ref<any[]>([])

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号不符合正确格式，请重新填写', trigger: 'blur' }
  ],
  educated: [
    { required: true, message: '请输入教育程度', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入身份证', trigger: 'blur' },
    { min: 18, max: 18, message: '身份证不符合正确格式，请重新填写', trigger: 'blur' }
  ],
  d_id: [
    { required: true, message: '请选择所属部门名称', trigger: 'blur' }
  ],
  job_id: [
    { required: true, message: '请选择所属岗位名称', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ],
})

onMounted(() => {
  getData(parseInt(localStorage.getItem("s_id") || ''))
  getDepts()
  getJobs()
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

// 获取部门列表
const getDepts = async () => {
  const res: Response<DepartList> = await getDeptsList()
  if(res.code === RESPONSE_CODE.OK) {
    depts.value = res.data.dept
  }
}
// 获取岗位列表
const getJobs = async () => {
  const res: Response<JobInfoList> = await getJobsList()
  if(res.code === RESPONSE_CODE.OK) {
    jobs.value = res.data.job
  }
}

const submitForm = (form1: FormInstance | undefined) => {
  if (!form1) return
  form1.validate(async (valid) => {
    if (valid) {
      console.log("res", parseInt(form.dept_name));
      
      const res: Response<UserModel> = await updateStaff(parseInt(form.s_id), form.phone, form.code, parseInt(form.age), form.address, parseInt(form.dept_name), parseInt(form.job_name), form.educated)
      console.log(res)
      if (res.code === RESPONSE_CODE.OK) {
        getData(parseInt(localStorage.getItem("s_id") || ''))
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
    message: '更新成功，请查看',
    type: 'success',
  })
}

const open2 = () => {
  ElMessage({
    showClose: true,
    message: '更新失败，请稍后重试',
    type: 'error',
  })
}

</script>
