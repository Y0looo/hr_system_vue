<template>
  <div class="block" >
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
  <el-table :data="tableData" stripe style="width: 100%; margin-top: 30px;" border="true" >
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
import { getSelf } from '../../api/records'
import { ElMessage } from 'element-plus'
import { Response, RESPONSE_CODE, RecordList, Record } from '../../types/api'


// 时间选择
const date = ref([])
// 分页数据
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)

const tableData = ref([{}])

onMounted(() => {
  getSelfData(curPage.value, pageSize.value, parseInt(localStorage.getItem("s_id") || ""), '', '')
})

const getSelfData = async (curPage: number, pageSize: number, id: number, date1: string, date2: string) => {
  const res: Response<RecordList> = await getSelf(curPage, pageSize, id, date1, date2)
  console.log(res);
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.record
    total.value = res.data.count
    console.log(tableData.value)
  }
}

// 分页
const handleCurrentChange = (val: number) => {
  curPage.value = val
  console.log(val);
  const i = (val-1)*5
  curPage.value = i
  getSelfData(curPage.value, pageSize.value, parseInt(localStorage.getItem("s_id") || ""), date.value[0] || '', date.value[1] || '')
}

// 返回日期
const calendarChange = (date: string) => {
  console.log(date[0], date[1]) 
  getSelfData(curPage.value, pageSize.value, parseInt(localStorage.getItem("s_id") || ""), date[0] || '', date[1] || '')
  // return date[0], date[1]
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