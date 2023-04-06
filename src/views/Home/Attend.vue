<template>
  <div class="block">
    <el-input v-model="input" placeholder="请输入想搜索的员工姓名" style="width: 20%" />
    <el-button type="primary" :icon="Search" style="margin-left: 10px;" @click="searchByName()">搜索</el-button>
    <el-date-picker v-model="date" format="YYYY-MM-DD" type="daterange" range-separator="至" start-placeholder="开始日期"
      end-placeholder="结束日期" size="large" value-format="YYYY-MM-DD" @change="calendarChange"
      style="float: right; margin-bottom: 20px;" />
  </div>
  <el-table :data="tableData" stripe style="width: 100%; margin-top: 30px;" border>
    <el-table-column fixed prop="name" label="姓名" width="300" />
    <el-table-column prop="s_id" label="工号" width="300" />
    <el-table-column prop="date" label="日期" width="300" />
    <el-table-column prop="attend_status" label="考勤状态" width="300">
      <template #default="scope">
        <el-tag class="mx-1" effect="dark" :type="scope.row.attend_status == '正常' ? 'success' : 'danger'">{{
          scope.row.attend_status }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="arrive_time" label="上班打卡" width="300" />
    <el-table-column prop="leave_time" label="下班打卡" width="300" />
  </el-table>
  <!-- 分页条 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
      @current-change="handleCurrentChange" />
  </div>
  <el-button :plain="true" @click="openSuccess" v-show="false" close-delay="1000">success</el-button>
  <el-button :plain="true" @click="openError" v-show="false" close-delay="1000">error</el-button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { getAll } from '../../api/attend'
import { Response, RESPONSE_CODE, AttendList, } from '../../types/api'
import { Search, } from '@element-plus/icons-vue'

// 时间选择
const date = ref([])
// 分页数据
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)
// 搜索输入框
const input = ref('')

const tableData = ref([{}])

onMounted(() => {
  getData(curPage.value, pageSize.value, '', '', input.value)
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

// 分页
const handleCurrentChange = (val: number) => {
  curPage.value = val
  const i = (val - 1) * 5
  curPage.value = i
  getData(curPage.value, pageSize.value, date.value[0] || '', date.value[1] || '', input.value)

}

// 全数据
const getData = async (curPage: number, pageSize: number, date1: string, date2: string, name: string) => {
  const res: Response<AttendList> = await getAll(curPage, pageSize, date1, date2, name)
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.attend
    total.value = res.data.count
    console.log(res)
    console.log(tableData)
  }
}

// 搜索名称
const searchByName = async () => {
  getData(curPage.value, pageSize.value, date.value[0] || '', date.value[1] || '', input.value)
}

// 时间筛选
const calendarChange = (date: string) => {
  console.log(date[0], date[1])
  getData(curPage.value, pageSize.value, date[0], date[1], input.value)
  // return date[0], date[1]
}


</script>