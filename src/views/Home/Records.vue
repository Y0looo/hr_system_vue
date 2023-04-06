<template>
  <div class="block" >
  <el-input v-model="input" placeholder="请输入想搜索的员工姓名" style="width: 20%" />
  <el-button type="primary" :icon="Search" style="margin-left: 10px;" @click="searchByName()">搜索</el-button>
  <el-button type="primary" :icon="Plus" @click="drawer2 = true">新增奖惩</el-button>
    <el-date-picker
      v-model="date"
      format="YYYY-MM-DD"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      size="large"
      value-format="YYYY-MM-DD"
      @change="calendarChange"
      style="float: right; margin-bottom: 20px;"
    />
  </div>
  <el-table :data="tableData" stripe style="width: 100%; margin-top: 30px;" border >
    <el-table-column fixed prop="name" label="姓名" width="300" />
    <el-table-column prop="s_id" label="工号" width="300"/>
    <el-table-column prop="time" label="日期" width="300" />
    <el-table-column prop="type" label="奖惩类型"  width="300"> 
      <template #default="scope">
        <el-tag class="mx-1" effect="dark" :type="scope.row.type=='奖金'?'success':'danger'">{{ scope.row.type }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="money" label="金额" width="300"/>
    <el-table-column prop="content" label="备注" width="300"/>
    <el-table-column fixed="right" label="操作" width="160">
      <template #default="scope" >
        <el-button plain type="primary" size="small" @click="show(parseInt(scope.row.id))">编辑</el-button>
        <el-popconfirm
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="你确定要删除吗?"
          @confirm="deleteRecordsFunction(parseInt(scope.row.id))"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button plain type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 修改奖惩 -->
  <el-dialog v-model="centerDialogVisible" title="修改奖惩信息" width="50%" center>
    <template #footer>
      <el-form :model="form" label-width="120px"  >
        <el-form-item label="序号" prop="id">
          <el-input v-model="form.id" style="width: 200px" readonly/>
        </el-form-item>
        <el-form-item label="工号" prop="s_id" >
          <el-input v-model="form.s_id" style="width: 200px" readonly/>
        </el-form-item>
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="form.name" style="width: 200px" readonly/>
        </el-form-item>
        <el-form-item label="奖惩类型" prop="type" >
          <el-input v-model="form.type" style="width: 200px" readonly/>
        </el-form-item>
        <el-form-item label="金额" required prop="money">
          <el-input v-model="form.money" style="width: 200px" />
        </el-form-item>
        <el-form-item label="备注" required prop="content">
          <el-input v-model="form.content" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="日期" required prop="time">
          <el-input v-model="form.time" style="width: 200px"/>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm()">清空</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <!-- 新增奖惩 -->
  <el-drawer v-model="drawer2" :direction="direction" :with-header="true">
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">新增奖惩记录</h4>
    </template>
    <el-form :model="Addform" label-width="120px" class="ruleForm">
      <el-form-item label="姓名"  prop="name">
        <el-input v-model="Addform.s_id" style="width: 215px"/>
      </el-form-item>
      <el-form-item label="奖惩类型"  prop="type" >
        <el-select v-model="Addform.type" clearable class="m-2" placeholder="请选择类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 300px"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="金额"  prop="money">
        <el-input v-model="Addform.money" style="width: 215px"/>
      </el-form-item>
      <el-form-item label="备注"  prop="content">
        <el-input v-model="Addform.content" style="width: 215px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
      </el-form-item>
      <el-form-item label="日期"  prop="time">
        <el-input v-model="Addform.time" style="width: 215px"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick()" size="large">取消</el-button>
        <el-button type="primary" @click="confirmClick()" size="large">新增</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 分页条 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="handleCurrentChange"/>
  </div>
  <el-button :plain="true" @click="openSuccess" v-show="false" close-delay="1000">success</el-button>
  <el-button :plain="true" @click="openError" v-show="false" close-delay="1000">error</el-button>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import { getAll, getById, addRecord, deleteRecord, updateRecord } from '../../api/records'
import { Response, RESPONSE_CODE, RecordList, Record  } from '../../types/api'
import { Search, Plus, InfoFilled } from '@element-plus/icons-vue'

// 时间选择
const date = ref([])
// 分页数据
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)
// 搜索输入框
const input = ref('')
// 抽屉
const drawer2 = ref(false)
const direction = ref('rtl')
// 表格数据
const tableData = ref([{}])
// 添加奖惩表单
const Addform = reactive({
  s_id: '',
  type: '',
  money: '',
  content: '',
  time: '',
})
// 修改奖惩记录弹出框
const centerDialogVisible = ref(false)
// 修改奖惩记录使用的表单
const form = reactive({
  id: '',
  s_id: '',
  name: '',
  type: '',
  content: '',
  money: '',
  time: '',
})
// 奖惩类型
const options = [
  {
    value: '1',
    label: '奖金',
  },
  {
    value: '2',
    label: '扣款',
  },
]

onMounted(() => {
  getData(curPage.value, pageSize.value, '', '', input.value)
})

// 全数据
const getData = async (curPage: number, pageSize: number, date1: string, date2: string, name: string) => {
  const res: Response<RecordList> = await getAll(curPage, pageSize, date1, date2, name)
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.record
    total.value = res.data.count
    console.log(res.data.count)
    console.log(tableData)
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

// 分页
const handleCurrentChange = (val: number) => {
  curPage.value = val
  console.log(val);
  const i = (val-1)*5
  curPage.value = i
  getData(curPage.value, pageSize.value, date.value[0] || '', date.value[1] || '', input.value)
}

// 时间筛选
const calendarChange = (date: string) => {
  console.log(date[0], date[1]) 
  getData(curPage.value, pageSize.value, date[0], date[1], input.value)
  // return date[0], date[1]
}

// 搜索名称
const searchByName = async () => {
  getData(curPage.value, pageSize.value, date.value[0] || '', date.value[1] || '', input.value)
}

// 删除奖惩
const deleteRecordsFunction = async (id: number) => {
  const res: Response<Record> = await deleteRecord(id)
  console.log(res)
  if (res.code === RESPONSE_CODE.OK) {
    console.log("删除成功")
    getData(curPage.value, pageSize.value, date.value[0] || '', date.value[1] || '', input.value)
    openSuccess("删除成功!")
    // window.setTimeout(function () {
    //   window.location.reload();
    // },1000)
  } else {
    openError("删除失败，请稍后重试！")
  }
}
const cancelEvent = () => {
  console.log("取消删除")
}

// 弹出框根据奖惩记录id获取奖惩记录信息
const show = async (id: number) => {
  centerDialogVisible.value = true
  const res: Response<Record> = await getById(id)
  if(res.code === RESPONSE_CODE.OK) {
    form.id = res.data.id.toString(),
    form.s_id = res.data.s_id.toString(),
    form.name = res.data.name,
    form.type = res.data.type
    form.money = res.data.money.toString(),
    form.content = res.data.content,
    form.time = res.data.time,
    console.log(res.data)
  }
}

// 修改奖惩记录
const submitForm = async () => {
  if(form.time == '' || form.money == '' || form.content == '' ) {
    openError("请补全所有信息")
  } else {
    const res: Response<Record> = await updateRecord(parseInt(form.s_id), form.time, parseInt(form.money), form.content)
    console.log(res);
    if(res.code === RESPONSE_CODE.OK) {
      console.log('修改成功')
      centerDialogVisible.value = false
      openSuccess("修改成功")
    } else {
      openError("修改失败，请稍后重试！")
    }
  }
}
// 清空修改表单
const resetForm = () => {
  form.content = ''
  form.time = ''
  form.money = ''
}

// 添加奖惩
const confirmClick = async() => {
  if(Addform.s_id == '' || Addform.type == '' || Addform.money == '' || Addform.content == '' || Addform.time == '') {
    openError("请补全信息")
  } else {
    const res: Response<Record> = await addRecord(parseInt(Addform.s_id), parseInt(Addform.type), parseInt(Addform.money), Addform.content, Addform.time)
    console.log(res);
    if(res.code === RESPONSE_CODE.OK) {
      console.log('添加成功')
      drawer2.value = false
      openSuccess("添加成功！")
    } else {
      openError("添加失败，请稍后重试！")
      console.log("添加失败");
    }
    
  }
}

const cancelClick = () => {
  console.log("取消添加员工");
  drawer2.value = false
}

</script>