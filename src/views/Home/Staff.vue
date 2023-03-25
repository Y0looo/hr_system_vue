<template>
  <el-input v-model="input" placeholder="请输入想搜索的员工姓名" style="width: 20%" />
  <el-button type="primary" :icon="Search" style="margin-left: 10px;" @click="searchByName(input)">搜索</el-button>
  <el-button type="primary" :icon="Plus" style="float:right" @click="drawer2 = true">新增员工</el-button>
  <el-table 
    :data="tableData" 
    style="width: 100%;margin-top: 20px" border="true"
    id="table"
    >
    <el-table-column fixed prop="name" label="姓名" width="120" />
    <el-table-column prop="s_id" label="工号" width="120" />
    <el-table-column prop="account" label="账号" width="120" />
    <el-table-column prop="code" label="身份证" width="200" />
    <el-table-column prop="phone" label="手机号" width="150" />
    <el-table-column prop="address" label="地址" width="300" />
    <el-table-column prop="educated" label="教育程度" width="120" />
    <el-table-column prop="age" label="年龄" width="120" />
    <el-table-column prop="dept_name" label="部门" width="120" />
    <el-table-column prop="job_name" label="岗位" width="140" />
    <el-table-column prop="create_time" label="创建时间" width="240" />
    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope" >
        <el-button plain type="primary" size="small" @click="show(parseInt(scope.row.s_id))">编辑</el-button>
        <el-popconfirm
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="你确定要删除吗?"
          @confirm="deleteStaffFunction(parseInt(scope.row.s_id))"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button plain type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button plain v-if="user.role == '人事管理员'" type="info" size="small" @click="openSalary(parseInt(scope.row.s_id))">登记工资</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页条 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="handleCurrentChange"/>
  </div>
  <!-- 修改信息弹框 -->
  <el-dialog v-model="centerDialogVisible" title="修改员工信息" width="50%" center>
    <template #footer>
      <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef" class="ruleForm" :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" style="width: 230px" readonly/>
        </el-form-item>
        <el-form-item label="工号" prop="s_id" >
          <el-input v-model="form.s_id" style="width: 230px" readonly/>
        </el-form-item>
        <el-form-item label="账号" prop="account" >
          <el-input v-model="form.account" style="width: 230px" readonly/>
        </el-form-item>
        <el-form-item label="密码" required prop="pwd">
          <el-input v-model="form.pwd" style="width: 230px" />
        </el-form-item>
        <el-form-item label="年龄" :rules="rules.age" prop="age">
          <el-input v-model="form.age" style="width: 230px"/>
        </el-form-item>
        <el-form-item label="手机号" :rules="rules.phone" prop="phone">
          <el-input v-model="form.phone" style="width: 230px"/>
        </el-form-item>
        <el-form-item label="教育程度" required prop="educated">
          <el-input v-model="form.educated" style="width: 230px"/>
        </el-form-item>
        <el-form-item label="身份证" required prop="code">
          <el-input v-model="form.code" style="width: 230px"/>
        </el-form-item>
        <el-form-item label="部门名称" required prop="dept_name">
          <el-select v-model="form.dept_name" clearable class="m-2" placeholder="请选择部门" style="width: 230px">
            <el-option
              v-for="item in depts"
              :label="item.dept_name"
              :value="item.d_id"
              :key="item.d_id"
              
            />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位名称" required prop="job_name">
          <el-select v-model="form.job_name" clearable class="m-2" placeholder="请选择岗位" style="width: 230px">
            <el-option
              v-for="item in jobs"
              :label="item.job_name"
              :value="item.job_id"
              :key="item.job_id"
              
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" required prop="address">
          <el-input v-model="form.address" style="width: 620px"/>
        </el-form-item>
        <div style="width: 100%; text-align: center;">
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
        <el-button @click="resetForm(ruleFormRef)">清空</el-button>
        </div>
      </el-form>
    </template>
  </el-dialog>
  <!-- 新增员工 -->
  <el-drawer v-model="drawer2" :direction="direction" :with-header="true">
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">新增员工</h4>
    </template>
    <el-form :model="Addform" label-width="120px" class="ruleForm">
      <el-form-item label="姓名"  prop="name">
        <el-input v-model="Addform.name" style="width: 215px"/>
      </el-form-item>
      <el-form-item label="账号"  prop="account" >
        <el-input v-model="Addform.account" style="width: 215px"/>
      </el-form-item>
      <el-form-item label="密码"  prop="pwd">
        <el-input v-model="Addform.pwd" style="width: 215px"/>
      </el-form-item>
      <el-form-item label="手机号"  prop="phone">
        <el-input v-model="Addform.phone" style="width: 215px"/>
      </el-form-item>
      <el-form-item label="角色类型"  prop="role">
        <el-select v-model="Addform.role" clearable class="m-2" placeholder="请选择角色类型">
            <el-option
              v-for="item in optionsRole"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick()" size="large">取消</el-button>
        <el-button type="primary" @click="confirmClick()" size="large">新增</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 登记工资 -->
  <el-dialog v-model="dialog" title="登记工资"  width="20%" center>
    <template #footer>
      <el-form :model="salaryForm" label-width="120px"  style="text-align: center;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="salaryForm.name" style="width: 215px" readonly/>
        </el-form-item>
        <el-form-item label="工号" prop="s_id" >
          <el-input v-model="salaryForm.s_id" style="width: 215px" readonly/>
        </el-form-item>
        <el-form-item label="年月" prop="time" >
          <el-input v-model="salaryForm.time" style="width: 215px" @blur="getRewardAndPunish(parseInt(salaryForm.s_id), salaryForm.time)"/>
        </el-form-item>
        <el-form-item label="出勤天数" prop="cqts">
          <el-input v-model="salaryForm.cqts" style="width: 215px"/>
        </el-form-item>
        <el-form-item label="工作日总天数" prop="jtts">
          <el-input v-model="salaryForm.jtts" style="width: 215px"/>
        </el-form-item>
        <el-form-item label="基础工资" prop="jcgz" >
          <el-input v-model="salaryForm.jcgz" style="width: 215px"/>
        </el-form-item>
        <el-form-item label="绩效工资" prop="jxgz">
          <el-input v-model="salaryForm.jxgz" style="width: 215px" />
        </el-form-item>
        <el-form-item label="绩效等级" prop="jxdj">
          <el-select v-model="salaryForm.jxdj" clearable class="m-2" placeholder="请选择等级">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="其他酬金" prop="qtjj">
          <el-input v-model="salaryForm.qtjj" style="width: 215px" readonly/>
        </el-form-item>
        <el-form-item label="其他扣款" prop="qtkk">
          <el-input v-model="salaryForm.qtkk" style="width: 215px" readonly/>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitSalaryForm()">保存</el-button>
          <el-button @click="resetSalaryForm()">清空</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <!-- 消息提示 -->
  <el-button :plain="true" @click="openSuccess" v-show="false" close-delay="1000">success</el-button>
  <el-button :plain="true" @click="openError" v-show="false" close-delay="1000">error</el-button>
 

</template>

<script lang="ts" setup>
import { onMounted,reactive,ref, } from 'vue'
import { getAllStaff, getStaffById, deleteStaff, getStaffByName, addStaff, updateStaffByAdmin } from '../../api/staff'
import { getMonthReward, getMonthPunish } from '../../api/records'
import { Response, RESPONSE_CODE, SalaryList, UserList, UserModel, Record, DepartList, JobInfoList } from '../../types/api'
import { addSalary } from '../../api/salary'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Search, Plus, InfoFilled, } from '@element-plus/icons-vue'
import { getDeptsList } from '../../api/dept'
import { getJobsList } from '../../api/job'


const user = {
  name: localStorage.getItem("name"),
  role: localStorage.getItem("role"),
  s_id: localStorage.getItem("s_id")
}

// 修改员工弹出框
const centerDialogVisible = ref(false)
// 登记工资弹出框
const dialog = ref(false)
// 抽屉
const drawer2 = ref(false)
const direction = ref('rtl')
// 搜索输入框
const input = ref('')

// 分页数据
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(10)
// 绩效等级
const options = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'B',
    label: 'B',
  },
  {
    value: 'C',
    label: 'C',
  },
  {
    value: 'D',
    label: 'D',
  },
  {
    value: 'E',
    label: 'E',
  },
]
// 角色类型
const optionsRole = [
  {
    value: '员工',
    label: '员工',
  },
  {
    value: '人事管理员',
    label: '人事管理员',
  },
]
// 表格数据
const tableData = ref([{}])
// 岗位列表
const jobs = ref<any[]>([])
// 部门列表
const depts = ref<any[]>([])


// 校验表单 修改信息用
const ruleFormRef = ref<FormInstance>()
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

// 添加员工表单
const Addform = reactive({
  account: '',
  pwd: '',
  name: '',
  phone: '',
  role: '',
})

// 登记工资表单
const salaryForm = reactive({
  s_id: '',
  name: '',
  time: '',
  cqts: '',
  jtts: '',
  jcgz: '',
  jxgz: '',
  jxdj: '',
  qtjj: '',
  qtkk: '',
})

//校验规则
const rules = reactive<FormRules>({
  age: [
    {required: true, message: '请输入年龄', trigger: 'blur'}
  ],
  pwd: [
    {required: true, message: '请输入密码', trigger: 'blur'}
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

// 初次访问获取全部员工数据
const getData = async (curPage: number, pageSize: number) => {
  const res: Response<UserList> = await getAllStaff(curPage, pageSize)
  if (res.code === RESPONSE_CODE.OK) {
    // tableData.shift()
    // tableData.splice(0, tableData.length)
    // tableData.push(...res.data.staff)
    tableData.value = res.data.staff
    total.value = res.data.count
    console.log(res.data.count)
    console.log(tableData)
  }
}

onMounted(() => {
  getData(curPage.value, pageSize.value)
  getDepts()
  getJobs()
})

// 删除员工
const deleteStaffFunction = async (id: number) => {
  const res: Response<UserModel> = await deleteStaff(id)
  console.log(res)
  if (res.code === RESPONSE_CODE.OK) {
    console.log("删除成功")
    getData(curPage.value, pageSize.value)
    openSuccess("删除成功!")
    window.setTimeout(function () {
      window.location.reload();
    },1000)
  } else {
    openError("删除失败，请稍后重试！")
  }
}

// 消息提示
const openSuccess = (msg: string) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: 'success',
  })
}
const openError = (msg: string) => {
  ElMessage({
    showClose: true,
    message: msg,
    type: 'error',
  })
}

const handleClick = () => {
  console.log('click')
}

// 弹出框根据员工id获取员工信息
const show = async (id: number) => {
  centerDialogVisible.value = true
  const res: Response<UserModel> = await getStaffById(id)
  if(res.code === RESPONSE_CODE.OK) {
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

// 修改员工函数
const submitForm = (form1: FormInstance | undefined) => {
  if (!form1) return
  form1.validate(async (valid) => {
    if (valid) {
      const res: Response<UserModel> = await updateStaffByAdmin(parseInt(form.s_id), form.pwd, form.phone, form.code, parseInt(form.age), form.address, parseInt(form.dept_name), parseInt(form.job_name), form.educated)
      console.log(res)
      if (res.code === RESPONSE_CODE.OK) {
        console.log("更新成功");
        openSuccess("修改成功！")
        centerDialogVisible.value= false
        getData(curPage.value, pageSize.value)
        // window.setTimeout(function () {
        //   window.location.reload();
        // },1000)
      } else {
        console.log("更新失败")
        openError("修改失败，请稍后重试！")
      }
    } else {
      return false
    }
  })
}

// 清空表单
const resetForm = (form1: FormInstance | undefined) => {
  if (!form1) return
  form.address = ''
  form.pwd = ''
  form.age = ''
  form.code = ''
  form.dept_name = ''
  form.educated = ''
  form.job_name = ''
  form.phone = ''
}

// 根据员工名称搜索
const searchByName = async (name: string) => {
  const res: Response<UserList> = await getStaffByName(curPage.value, pageSize.value, name)
  console.log(res);
  // for(var i = 0; i <= tableData.length; ++i) {
  //   delete tableData[i]
  // }
  if (res.code === RESPONSE_CODE.OK) {
    console.log(tableData)
    // // tableData.shift()
    // tableData.push(...res.data.staff)
    tableData.value = res.data.staff
    console.log(tableData)
  }
}

const cancelEvent = () => {
  console.log("取消删除")
}

// 添加员工
const confirmClick = async() => {
  if(Addform.name == '' || Addform.account == '' || Addform.pwd == '' || Addform.phone == '' || Addform.role == '') {
    console.log("请补全信息")
    openError("请补全信息")
  } else {
    const res: Response<UserModel> = await addStaff(Addform.name, Addform.account, Addform.pwd, Addform.phone, Addform.role)
    console.log(res);
    if(res.code === RESPONSE_CODE.USEREXIST) {
      openError("添加失败，该账户已存在！")
    } else {
      if(res.code === RESPONSE_CODE.OK) {
        console.log('添加成功')
        drawer2.value = false
        openSuccess("添加成功！")
        getData(curPage.value, pageSize.value)
        // window.setTimeout(function () {
        //   window.location.reload();
        // },1000)
      } else {
        openError("添加失败，请稍后重试！")
        console.log("添加失败");
      }
    }
  }
}

const cancelClick = () => {
  console.log("取消添加员工");
  drawer2.value = false
}

// 分页
// const handleSizeChange = (val: number) => {
//   pageSize.value = val
//   console.log(val)
//   getData(curPage.value, pageSize.value)
// }
const handleCurrentChange = (val: number) => {
  curPage.value = val
  console.log(val);
  const i = (val-1)*5
  curPage.value = i
  getData(curPage.value, pageSize.value)
}

// 登记工资弹窗
const openSalary = async (id: number) => {
  dialog.value = true
  const res: Response<UserModel> = await getStaffById(id)
  if(res.code === RESPONSE_CODE.OK) {
    salaryForm.s_id = res.data.s_id.toString(),
    salaryForm.name = res.data.name
  }
}


// 登记工资
const submitSalaryForm = async () => {
  if(salaryForm.time == '' || salaryForm.cqts == '' || salaryForm.jtts == '' || salaryForm.jcgz == '' || salaryForm.jxgz == '' || salaryForm.jxdj == '' || salaryForm.qtjj == '' || salaryForm.qtkk == '' ) {
    openError("请补全所有信息")
  } else {
    const res: Response<SalaryList> = await addSalary(parseInt(salaryForm.s_id), salaryForm.time, parseInt(salaryForm.cqts), parseInt(salaryForm.jtts), parseInt(salaryForm.jcgz), parseInt(salaryForm.jxgz), salaryForm.jxdj, parseInt(salaryForm.qtjj), parseInt(salaryForm.qtkk))
    console.log(res);
    if(res.code === RESPONSE_CODE.SALARY) {
      openError("登记失败，此员工已登记！")
    } else {
      if(res.code === RESPONSE_CODE.OK) {
        console.log('登记成功')
        dialog.value = false
        openSuccess("登记成功")
        resetSalaryForm()
        getData(curPage.value, pageSize.value)
        // window.setTimeout(function () {
        //   window.location.reload();
        // },1000)
      } else {
        openError("登记失败，请稍后重试！")
        console.log("登记失败");
      }
    }
  }
}
const resetSalaryForm = () => {
  salaryForm.time = '',
  salaryForm.cqts = '',
  salaryForm.jtts = '',
  salaryForm.jcgz = '',
  salaryForm.jxgz = '',
  salaryForm.jxdj = '',
  salaryForm.qtjj = '',
  salaryForm.qtkk = '' 
}

// 获取当月奖金和罚款
const getRewardAndPunish = async (s_id: number, time: string) => {
  const res1: Response<Record> = await getMonthReward(s_id, time)
  if(res1.code === RESPONSE_CODE.OK) {
    salaryForm.qtjj = res1.data.toString()
  } else {
    salaryForm.qtjj = '0'
  }
  const res2: Response<Record> = await getMonthPunish(s_id, time)
    if(res2.code === RESPONSE_CODE.OK) {
    salaryForm.qtkk = res2.data.toString()
  } else {
    salaryForm.qtkk = '0'
  }
}
</script>

<style>
.example-pagination-block {
  margin-bottom: 16px;
  
}
body {
  margin: 0;
}
</style>