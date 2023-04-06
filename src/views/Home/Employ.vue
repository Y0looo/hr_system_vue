<template>
  <el-input v-model="input" placeholder="请输入招聘岗位名称" style="width: 20%" />
  <el-button type="primary" :icon="Search" style="margin-left: 10px;" @click="searchByName()">搜索</el-button>
  <el-button type="primary" :icon="Plus" style="float:right" @click="drawer2 = true">新增招聘信息</el-button>
  <el-table :data="tableData" style="width: 100%;margin-top: 20px" border="true">
    <el-table-column fixed prop="job_name" label="招聘岗位" width="200" />
    <el-table-column prop="number" label="招聘人数" width="120" />
    <el-table-column prop="job_require" label="岗位要求" width="400" />
    <el-table-column prop="job_work" label="岗位职责" width="400" />
    <el-table-column prop="dept_name" label="所属部门" width="150" />
    <el-table-column prop="e_id" label="序号" width="150" />
    <el-table-column prop="create_time" label="创建时间" width="250" />
    <el-table-column fixed="right" label="操作" width="160">
      <template #default="scope" >
        <el-button plain type="primary" size="small" @click="show(parseInt(scope.row.e_id))">编辑</el-button>
        <el-popconfirm
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="你确定要删除吗?"
          @confirm="deleteStaffFunction(parseInt(scope.row.e_id))"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button plain type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页条 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="handleCurrentChange" />
  </div>
  <!-- 修改信息弹框 -->
  <el-dialog v-model="centerDialogVisible" title="修改招聘信息" width="30%" center>
    <template #footer>
      <el-form :model="form" label-width="120px" class="ruleForm" >
        <el-form-item label="序号" prop="e_id">
          <el-input v-model="form.e_id" style="width: 200px" readonly/>
        </el-form-item>
        <el-form-item label="岗位名称" prop="job_name" >
          <el-input v-model="form.job_name" style="width: 200px" />
        </el-form-item>
        <el-form-item label="部门名称" prop="dept_name" >
          <el-select v-model="form.dept_name" clearable class="m-2" placeholder="请选择部门" style="width: 200px;">
            <el-option
              v-for="item in depts"
              :label="item.dept_name"
              :value="item.d_id"
              :key="item.d_id"
              style="width: 300px"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="招聘人数" prop="number" >
          <el-input v-model="form.number" style="width: 200px" />
        </el-form-item>
        <el-form-item label="岗位职责" prop="job_work" >
          <el-input v-model="form.job_work" style="width: 200px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
        </el-form-item>
        <el-form-item label="岗位要求" prop="job_require" >
          <el-input v-model="form.job_require" style="width: 200px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm()">清空</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <!-- 新增招聘信息 -->
  <el-drawer v-model="drawer2" :direction="direction" :with-header="true">
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">新增招聘信息</h4>
    </template>
    <el-form :model="Addform" label-width="120px" class="ruleForm">
      <el-form-item label="岗位名称" prop="job_name" >
          <el-input v-model="form.job_name" style="width: 300px" />
        </el-form-item>
        <el-form-item label="部门名称" prop="dept_name" >
          <el-select v-model="form.dept_name" clearable class="m-2" placeholder="请选择部门" style="width: 300px;">
            <el-option
              v-for="item in depts"
              :label="item.dept_name"
              :value="item.d_id"
              :key="item.d_id"
              style="width: 300px"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="招聘人数" prop="number" >
          <el-input v-model="form.number" style="width: 300px" />
        </el-form-item>
        <el-form-item label="岗位职责" prop="job_work" >
          <el-input v-model="form.job_work" style="width: 300px"  :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
        </el-form-item>
        <el-form-item label="岗位要求" prop="job_require" >
          <el-input v-model="form.job_require" style="width: 300px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
        </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick()" size="large">取消</el-button>
        <el-button type="primary" @click="confirmClick()" size="large">新增</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 消息提示 -->
  <el-button :plain="true" @click="openSuccess" v-show="false" close-delay="1000">success</el-button>
  <el-button :plain="true" @click="openError" v-show="false" close-delay="1000">error</el-button>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { getAllEmploy, getEmployById, deleteEmploy, addEmploy, updateEmploy } from '../../api/employ'
import { Response, RESPONSE_CODE, EmployList, Employ, DepartList } from '../../types/api'
import { Search, Plus, InfoFilled, } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getDeptsList } from '../../api/dept'
// 分页条
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)
// 表格数据
const tableData = ref([{}])
// 弹出框
const centerDialogVisible = ref(false)
// 抽屉
const drawer2 = ref(false)
const direction = ref('rtl')
// 搜索输入框
const input = ref('')
// 修改招聘信息表单
const form = reactive({
  e_id: '',
  job_name: '',
  dept_name: '',
  number: '',
  job_require: '',
  job_work: '',
})

// 添加招聘信息表单
const Addform = reactive({
  job_name: '',
  dept_name: '',
  number: '',
  job_require: '',
  job_work: '',
})

// 部门列表
const depts = ref<any[]>([])

const getData = async (curPage: number, pageSize: number, name: string) => {
  const res: Response<EmployList> = await getAllEmploy(curPage, pageSize, name)
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.employ
    total.value = res.data.count
    console.log(tableData)
  }
}

onMounted(() => {
  getData(curPage.value, pageSize.value, input.value)
  getDepts()
})

// 获取部门列表
const getDepts = async () => {
  const res: Response<DepartList> = await getDeptsList()
  if(res.code === RESPONSE_CODE.OK) {
    depts.value = res.data.dept
  }
}

const handleClick = () => {
  console.log('click')
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

// 弹出框根据招聘id获取招聘信息
const show = async (id: number) => {
  centerDialogVisible.value = true
  const res: Response<Employ> = await getEmployById(id)
  if(res.code === RESPONSE_CODE.OK) {
    form.e_id = res.data.e_id.toString(),
    form.job_name = res.data.job_name,
    form.dept_name = res.data.dept_name,
    form.number = res.data.number.toString(),
    form.job_work = res.data.job_work,
    form.job_require = res.data.job_require
    console.log(res.data)
  }
}

// 删除招聘信息
const deleteStaffFunction = async (id: number) => {
  const res: Response<Employ> = await deleteEmploy(id)
  console.log(res)
  if (res.code === RESPONSE_CODE.OK) {
    console.log("删除成功")
    getData(curPage.value, pageSize.value, input.value)
    openSuccess("删除成功!")
    window.setTimeout(function () {
      window.location.reload();
    },1000)
  } else {
    openError("删除失败，请稍后重试！")
  }
}
const cancelEvent = () => {
  console.log("取消删除")
}

// 修改招聘信息
const submitForm = async () => {
  if(form.job_name == '' || form.dept_name == '' || form.number == '' || form.job_work == '' || form.job_require == '') {
    console.log("请补全信息")
  } else {
    const res: Response<Employ> = await updateEmploy(parseInt(form.e_id), form.dept_name, form.job_name, parseInt(form.number), form.job_work, form.job_require)
    console.log(res)
    if (res.code === RESPONSE_CODE.OK) {
      console.log("更新成功");
      openSuccess("修改成功！")
      centerDialogVisible.value= false
      getData(curPage.value, pageSize.value, input.value)
      window.setTimeout(function () {
        window.location.reload();
      },1000)
    } else {
      console.log("更新失败")
      openError("修改失败，请稍后重试！")
    }  
  }
}
// 清空修改表单
const resetForm = () => {
  form.job_name = ''
  form.dept_name = ''
  form.number = ''
  form.job_work = ''
  form.job_require = ''
}

// 添加招聘信息
const confirmClick = async() => {
  if(Addform.job_name == '' || Addform.dept_name == '' || Addform.number == '' || Addform.job_work == '' || Addform.job_require == '') {
    console.log("请补全信息")
  } else {
    const res: Response<Employ> = await addEmploy(Addform.dept_name, Addform.job_name, parseInt(Addform.number), Addform.job_work, Addform.job_require)
    console.log(res);
    if(res.code === RESPONSE_CODE.OK) {
      console.log('添加成功')
      drawer2.value = false
      openSuccess("添加成功！")
      getData(curPage.value, pageSize.value, input.value)
      window.setTimeout(function () {
        window.location.reload();
      },1000)
    } else {
      openError("添加失败，请稍后重试！")
      console.log("添加失败");
    }
  }
}
const cancelClick = () => {
  console.log("取消添加招聘信息");
  drawer2.value = false
}

// 根据部门名称搜索
const searchByName = async () => {
  getData(curPage.value, pageSize.value, input.value)
}

// 分页
const handleCurrentChange = (val: number) => {
  curPage.value = val
  console.log(val);
  const i = (val-1)*5
  curPage.value = i
  getData(curPage.value, pageSize.value, input.value)
}

</script>

<style>
.example-pagination-block {
  margin-bottom: 16px;
  
}
</style>