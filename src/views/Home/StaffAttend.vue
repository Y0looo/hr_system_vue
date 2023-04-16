<template>
  <div class="block" >
    <el-button type="primary" plain size="large" @click="arrive">上班签到</el-button>
    <el-button type="success" plain size="large" @click="leave">下班签退</el-button>
    <div style="float: right; margin-bottom: 20px;">
    <el-button type="primary" size="large" @click="refresh" style="margin-right: 20px; margin-bottom: 5px;">刷新</el-button>
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
      
    />
    </div>
  </div>
  <el-table :data="tableData" stripe style="width: 100%; margin-top: 30px;" border="true" >
    <el-table-column fixed prop="name" label="姓名" width="300" />
    <el-table-column prop="s_id" label="工号" width="300"/>
    <el-table-column prop="date" label="日期" width="300" />
    <el-table-column prop="attend_status" label="打卡状态"  width="300"> 
      <template #default="scope">
        <el-tag class="mx-1" effect="dark" :type="scope.row.attend_status=='正常'?'success':scope.row.attend_status=='异常'?'danger':'warning'">{{ scope.row.attend_status }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="arrive_time" label="上班打卡时间" width="300"/>
    <el-table-column prop="leave_time" label="下班打卡时间" width="300"/>
  </el-table>
  <!-- 分页条 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="handleCurrentChange"/>
  </div>
  <el-button :plain="true" @click="openSuccess" v-show="false" close-delay="1000">success</el-button>
  <el-button :plain="true" @click="openError" v-show="false" close-delay="1000">error</el-button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getSelf, workArrive, workLeave } from '../../api/attend'
import { ElMessage } from 'element-plus'
import { Response, RESPONSE_CODE, AttendList, Attend } from '../../types/api'


// 时间选择
const date = ref([])
// 分页数据
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)

const tableData = ref([{}])

onMounted(() => {
  getSelfData(curPage.value, pageSize.value, '', '', parseInt(localStorage.getItem("s_id") || ""))
})

const refresh = async () => {
  date.value = []
  getSelfData(curPage.value, pageSize.value, '', '', parseInt(localStorage.getItem("s_id") || ""))
} 

// 获取打卡记录
const getSelfData = async (curPage: number, pageSize: number, date1: string, date2: string, id: number) => {
  const res: Response<AttendList> = await getSelf(curPage, pageSize, date1, date2, id)
  console.log(res);
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.attend
    total.value = res.data.count
    console.log(tableData.value)
  }
}

// 分页
const handleCurrentChange = (val: number) => {
  console.log(val);
  const i = (val-1)*5
  curPage.value = i
  getSelfData(curPage.value, pageSize.value, date.value[0] || '', date.value[1] || '', parseInt(localStorage.getItem("s_id") || ""))
}

// 返回日期
const calendarChange = (datex: string[]) => {
  console.log('date[0], date[1]', date.value) 
  getSelfData(curPage.value, pageSize.value, datex[0], datex[1], parseInt(localStorage.getItem("s_id") || ""))
  // return date[0], date[1]
}

// 获取当天日期
const getCurrentDay = () => {
  var year = new Date().getFullYear();
  var month = (new Date().getMonth()+1).toString();
  var day = (new Date().getDate()).toString();
  if(parseInt(month) >= 1 && parseInt(month) <= 9) {
    month = "0" + month;
  }
  if(parseInt(day) >= 0 && parseInt(day) <= 9) {
    day = "0" + day;
  }
  let date = year + '-' + month + '-' + day;
  console.log(date);
  return date;
}

// 上班打卡
const arrive = async () => {
  const res: Response<AttendList> = await workArrive(parseInt(localStorage.getItem("s_id")||''), getCurrentDay())
  console.log(res);
  if (res.code === RESPONSE_CODE.ATTEND) {
    openError(res.message)
  } else {
    if (res.code === RESPONSE_CODE.OK) {
      openSuccess("签到成功！")
      getSelfData(curPage.value, pageSize.value,  date.value[0] || '', date.value[1] || '',  parseInt(localStorage.getItem("s_id") || ""))
      console.log(tableData)
    }
  }
}

// 下班签退
const leave = async () => {
  const res: Response<AttendList> = await workLeave(parseInt(localStorage.getItem("s_id")||''), getCurrentDay())
  console.log(res);
  if (res.code === RESPONSE_CODE.ATTEND) {
    openError(res.message)
  } else {
    if (res.code === RESPONSE_CODE.OK) {
      openSuccess("签退成功！")
      getSelfData(curPage.value, pageSize.value,  date.value[0] || '', date.value[1] || '', parseInt(localStorage.getItem("s_id") || ""))
      console.log(tableData)
    }
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
</script>