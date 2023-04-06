<template>
  <el-input v-model="input" placeholder="请输入公告标题" style="width: 20%" />
  <el-button type="primary" :icon="Search" style="margin-left: 10px;" @click="searchByName()">搜索</el-button>
  <el-button type="primary" :icon="Plus" style="float:right" @click="drawer2 = true">新增公告</el-button>
  <el-table :data="tableData" style="width: 100%;margin-top: 20px" border="true" >
    <el-table-column fixed prop="title" label="标题" width="250" />
    <el-table-column prop="n_id" label="序号" width="250" />
    <el-table-column prop="content" label="内容" width="450" :show-overflow-tooltip="true"/>
    <el-table-column prop="publisher" label="发布者" width="200" />
    <el-table-column prop="create_time" label="发布时间" width="200" />
    <el-table-column prop="update_time" label="修改时间" width="200" />
    <el-table-column fixed="right" label="操作" width="222">
      <template #default="scope" >
        <el-button plain type="primary" size="small" @click="show(parseInt(scope.row.n_id))">编辑</el-button>
        <el-popconfirm
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="你确定要删除吗?"
          @confirm="deleteStaffFunction(parseInt(scope.row.n_id))"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button plain type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="handleCurrentChange" />
  </div>
  <!-- 修改公告信息弹框 -->
  <el-dialog v-model="centerDialogVisible" title="修改公告信息" width="30%" center>
    <template #footer>
      <el-form :model="form" label-width="120px" class="ruleForm">
        <el-form-item label="公告编号"  prop="n_id">
        <el-input v-model="form.n_id" style="width: 200px" readonly/>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" style="width: 200px" :autosize="{ minRows: 1, maxRows: 2 }" type="textarea"/>
        </el-form-item>
        <el-form-item label="内容" prop="content" >
          <el-input v-model="form.content" style="width: 200px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
        </el-form-item>
        <el-form-item label="发布者" prop="publisher" >
          <el-input v-model="form.publisher" style="width: 200px"/>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm()">清空</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <!-- 新增公告 -->
  <el-drawer v-model="drawer2" :direction="direction" :with-header="true">
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">新增公告</h4>
    </template>
    <el-form :model="Addform" label-width="120px" class="ruleForm">
      <el-form-item label="标题"  prop="title">
        <el-input v-model="Addform.title" style="width: 300px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
      </el-form-item>
      <el-form-item label="内容"  prop="content" >
        <el-input v-model="Addform.content" style="width: 300px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
      </el-form-item>
      <el-form-item label="发布者"  prop="publisher">
        <el-input v-model="Addform.publisher" style="width: 300px" />
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
import { getAllNotice, addNotice, updateNotice, deleteNotice, getNoticeById } from '../../api/notice'
import { Response, RESPONSE_CODE, NoticeList, Notice } from '../../types/api'
import { Search, Plus, InfoFilled, } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'


// 分页
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)

// 弹出框
const centerDialogVisible = ref(false)
// 抽屉
const drawer2 = ref(false)
const direction = ref('rtl')
// 搜索输入框
const input = ref('')

const tableData = ref([{}])

// 修改信息表单
const form = reactive({
  n_id: '',
  title: '',
  content: '',
  publisher: '',
})


// 添加公告表单
const Addform = reactive({
  title: '',
  content: '',
  publisher: '',
})

const getData = async (curPage: number, pageSize: number, name: string) => {
  const res: Response<NoticeList> = await getAllNotice(curPage, pageSize, name)
  console.log(res);
  
  if (res.code === RESPONSE_CODE.OK) {
    
    tableData.value = res.data.notice
    total.value = res.data.count
    console.log(tableData)
  }
}

onMounted(() => {
  getData(curPage.value, pageSize.value, input.value)
  
})

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

// 根据公告名称搜索
const searchByName = async () => {
  getData(curPage.value, pageSize.value, input.value)
}

const handleClick = () => {
  console.log('click')
}


// 添加公告
const confirmClick = async() => {
  if(Addform.title == '' || Addform.publisher == '' || Addform.content == '') {
    console.log("请补全信息")
  } else {
    const res: Response<Notice> = await addNotice(Addform.title, Addform.content, Addform.publisher)
    console.log(res);
    if(res.code === RESPONSE_CODE.OK) {
      console.log('添加成功')
      drawer2.value = false
      openSuccess("添加成功！")
      getData(curPage.value, pageSize.value, input.value)
      // window.setTimeout(function () {
      //   window.location.reload();
      // },1000)
    } else {
      openError("添加失败，请稍后重试！")
      console.log("添加失败");
    }
  }
}

const cancelClick = () => {
  console.log("取消添加公告");
  drawer2.value = false
}

// 修改公告
const submitForm = async () => {
  if(form.title == '' || form.publisher == '' || form.content == '') {
    console.log("请补全信息")
  } else {
    console.log(parseInt(form.n_id), form.title, form.content, form.publisher)
    const res: Response<Notice> = await updateNotice(parseInt(form.n_id), form.title, form.content, form.publisher)
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
  form.title = ''
  form.content = ''
  form.publisher = ''
}

// 弹出框根据公告id获取公告
const show = async (id: number) => {
  centerDialogVisible.value = true
  const res: Response<Notice> = await getNoticeById(id)
  if(res.code === RESPONSE_CODE.OK) {
    form.n_id = res.data.n_id.toString(),
    form.title = res.data.title,
    form.content = res.data.content,
    form.publisher = res.data.publisher
  } 
}

// 删除公告
const deleteStaffFunction = async (id: number) => {
  const res: Response<Notice> = await deleteNotice(id)
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

// 删除的取消事件
const cancelEvent = () => {
  console.log("取消删除")
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