<template>
  <div>
    <el-date-picker
        v-model="month"
        type="monthrange"
        format="YYYY-MM"
        value-format="YYYY-MM"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        size="large"
        @change="calendarChange"
        style="float: right; margin-bottom: 20px;"
      />
  </div>
  <el-table 
    :data="tableData" 
    style="width: 100%;margin-top: 20px" border="true"
    id="table"
    >
    <el-table-column fixed prop="name" label="姓名" width="120" />
    <el-table-column prop="time" label="年月" width="140" />
    <el-table-column prop="dept_name" label="部门" width="120" />
    <el-table-column prop="job_name" label="岗位" width="140" />
    <el-table-column prop="jcgz" label="基础工资" width="140" />
    <el-table-column prop="jxgz" label="绩效工资" width="140" />
    <el-table-column prop="jxdj" label="绩效等级" width="140" />
    <el-table-column prop="qtcj" label="其他酬金" width="140" />
    <el-table-column prop="qtkk" label="其他扣款" width="140" />
    <el-table-column prop="sbkk" label="社保扣款" width="140" />
    <el-table-column prop="gjjkk" label="公积金扣款" width="140" />
    <el-table-column prop="yksk" label="应扣税额" width="140" />
    <el-table-column prop="real_salary" label="实发工资" width="140" />
  </el-table>
  <!-- 分页条 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="handleCurrentChange"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, } from 'vue'
import { getSelf } from '../../api/salary'
import { Response, RESPONSE_CODE, SalaryList, Salary } from '../../types/api'

// 分页数据
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(10)
// 月份选择器
const month = ref([])
// 表格数据
const tableData = ref([{}])

const getData = async (curPage: number, pageSize: number, date1: string, date2: string) => {
  const res: Response<SalaryList> = await getSelf(curPage, pageSize, parseInt(localStorage.getItem("s_id")||''), date1, date2)
  if (res.code === RESPONSE_CODE.OK) {
    // tableData.shift()
    // tableData.splice(0, tableData.length)
    // tableData.push(...res.data.staff)
    tableData.value = res.data.salary
    total.value = res.data.count
    console.log(res.data.count)
    console.log(tableData)
  }
}

onMounted(() => {
  getData(curPage.value, pageSize.value, '', '')
})

// 返回日期
const calendarChange = (date: string) => {
  console.log(date[0], date[1]) 
  getData(curPage.value, pageSize.value, date[0], date[1])
  // return date[0], date[1]
}

// 分页
const handleCurrentChange = (val: number) => {
  curPage.value = val
  console.log(val);
  const i = (val-1)*5
  curPage.value = i
  getData(curPage.value, pageSize.value, month.value[0] || '', month.value[1] || '')
}

</script>