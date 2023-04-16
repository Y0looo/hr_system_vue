<template>
  <el-input v-model="input" placeholder="请输入部门名称" style="width: 20%" />
  <el-button type="primary" :icon="Search" style="margin-left: 10px;" @click="searchByName()">搜索</el-button>
  <el-button type="primary" :icon="Plus" style="float:right" @click="drawer2 = true">新增部门</el-button>
  <el-table :data="tableData" style="width: 100%;margin-top: 20px" border="true" >
    <el-table-column fixed prop="dept_name" label="部门名称" width="400" />
    <el-table-column prop="d_id" label="部门序号" width="200" />
    <el-table-column prop="dept_introduce" label="部门介绍" width="600" />
    <el-table-column prop="create_time" label="创建时间" width="398" />
    <el-table-column fixed="right" label="操作" width="175" >
      <template #default="scope" >
        <el-button plain type="primary" size="small" @click="show(parseInt(scope.row.d_id))">编辑</el-button>
        <el-popconfirm
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="你确定要删除吗?"
          @confirm="deleteStaffFunction(parseInt(scope.row.d_id))"
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
  <el-dialog v-model="centerDialogVisible" title="修改部门信息" width="30%" center>
    <template #footer>
      <el-form :model="form" label-width="120px" class="ruleForm" >
        <el-form-item label="部门id" prop="d_id">
          <el-input v-model="form.d_id" style="width: 200px" readonly/>
        </el-form-item>
        <el-form-item label="部门名称" prop="dept_name" >
          <el-input v-model="form.dept_name" style="width: 200px" />
        </el-form-item>
        <el-form-item label="部门介绍" prop="dept_introduce" >
          <el-input v-model="form.dept_introduce" style="width: 200px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm()">清空</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <!-- 新增部门 -->
  <el-drawer v-model="drawer2" :direction="direction" :with-header="true">
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">新增部门</h4>
    </template>
    <el-form :model="Addform" label-width="120px" class="ruleForm">
      <el-form-item label="部门名称"  prop="dept_name">
        <el-input v-model="Addform.dept_name" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="部门介绍"  prop="dept_introduce" >
        <el-input v-model="Addform.dept_introduce" style="width: 300px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
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
import { getAllDept, getDeptById, updateDept, addDept, deleteDept } from '../../api/dept'
import { Response, Dept, RESPONSE_CODE, DeptList } from '../../types/api'
import { Search, Plus, InfoFilled, } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 分页
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)
//表格数据
const tableData = ref([{}])
// 弹出框
const centerDialogVisible = ref(false)
// 抽屉
const drawer2 = ref(false)
const direction = ref('rtl')
// 搜索输入框
const input = ref('')
// 修改部门表单
const form = reactive({
  d_id: '',
  dept_name: '',
  dept_introduce: ''
})

// 添加部门表单
const Addform = reactive({
  dept_name: '',
  dept_introduce: ''
})

// 初次访问获取数据
const getData = async (curPage: number, pageSize: number, name: string) => {
  const res: Response<DeptList> = await getAllDept(curPage, pageSize, name)
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.dept
    total.value = res.data.count
    console.log(tableData)
  }
}

// 生命周期函数
onMounted(() => {
  getData(curPage.value, pageSize.value, input.value)
  
})

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

// 弹出框根据部门id获取部门信息
const show = async (id: number) => {
  centerDialogVisible.value = true
  const res: Response<Dept> = await getDeptById(id)
  if(res.code === RESPONSE_CODE.OK) {
    form.d_id = res.data.d_id.toString(),
    form.dept_name = res.data.dept_name,
    form.dept_introduce = res.data.dept_introduce,
    console.log(res.data)
  }
}

// 删除部门
const deleteStaffFunction = async (id: number) => {
  const res: Response<Dept> = await deleteDept(id)
  console.log(res)
  if (res.code === RESPONSE_CODE.DEPT) {
    openError(res.message)
  } else {
    if (res.code === RESPONSE_CODE.OK) {
      console.log("删除成功")
      getData(curPage.value, pageSize.value, input.value)
      openSuccess("删除成功!")

    } else {
      openError("删除失败，请稍后重试！")
    }
  }
}
const cancelEvent = () => {
  console.log("取消删除")
}

// 修改部门信息
const submitForm = async () => {
  if(form.dept_name == '' || form.dept_introduce == '') {
    console.log("请补全信息")
  } else {
    const res: Response<Dept> = await updateDept(parseInt(form.d_id), form.dept_name, form.dept_introduce)
    console.log(res)
    if (res.code === RESPONSE_CODE.OK) {
      console.log("更新成功");
      openSuccess("修改成功！")
      centerDialogVisible.value= false
      getData(curPage.value, pageSize.value, input.value)
    } else {
      console.log("更新失败")
      openError("修改失败，请稍后重试！")
    }  
  }
}
// 清空修改表单
const resetForm = () => {
  form.dept_name = ''
  form.dept_introduce = ''
}

// 添加部门
const confirmClick = async() => {
  if(Addform.dept_name == '' || Addform.dept_introduce == '') {
    console.log("请补全信息")
  } else {
    const res: Response<Dept> = await addDept(Addform.dept_name, Addform.dept_introduce)
    console.log(res);
    if(res.code === RESPONSE_CODE.OK) {
      console.log('添加成功')
      drawer2.value = false
      openSuccess("添加成功！")
      getData(curPage.value, pageSize.value, input.value)
    } else {
      openError("添加失败，请稍后重试！")
      console.log("添加失败");
    }
  }
}
const cancelClick = () => {
  console.log("取消添加部门");
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