<template>
  <div class="block" >
    <el-input v-model="input" placeholder="请输入想搜索的员工姓名" style="width: 20%" />
    <el-button type="primary" :icon="Search" style="margin-left: 10px;" @click="searchByName()">搜索</el-button>
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
    <el-table-column fixed prop="name" label="姓名" width="200" />
    <el-table-column prop="s_id" label="工号" width="120" />
    <el-table-column prop="time" label="年月" width="200" />
    <el-table-column prop="dept_name" label="部门" width="150" />
    <el-table-column prop="job_name" label="岗位" width="200" />
    <el-table-column prop="jcgz" label="基础工资" width="200" />
    <el-table-column prop="jxgz" label="绩效工资" width="200" />
    <el-table-column prop="jxdj" label="绩效等级" width="200" />
    <el-table-column prop="real_salary" label="实发工资" width="200" />
    <el-table-column fixed="right" label="操作" width="160">
      <template #default="scope" >
        <el-button primary plain type="primary" size="small" @click="show(parseInt(scope.row.id))">查看明细</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 工资明细 -->
  <el-dialog v-model="centerDialogVisible" title="" width="50%" center>
    <el-descriptions
      class="margin-top"
      title="薪资明细"
      :column="3"
      size="large"
      border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            姓名
          </div>
        </template>
        {{ info.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            工号
          </div>
        </template>
        {{ info.s_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            年月
          </div>
        </template>
        {{ info.time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            基础工资
          </div>
        </template>
        {{ info.jcgz }}
        
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            绩效工资
          </div>
        </template>
        {{ info.jxgz }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            绩效等级
          </div>
        </template>
        <el-tag size="default">{{ info.jxdj }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            其他酬金
          </div>
        </template>
        {{ info.qtjj }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            其他扣款
          </div>
        </template>
        {{ info.qtkk }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            社保扣款
          </div>
        </template>
        {{ info.sbkk }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            公积金扣款
          </div>
        </template>
        {{ info.gjjkk }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            应扣税额
          </div>
        </template>
        {{ info.yksj }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            实发工资
          </div>
        </template>
        {{ info.real_salary }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
  <!-- 分页条 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="handleCurrentChange"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, } from 'vue'
import { getAll,  getById } from '../../api/salary'
import { Response, RESPONSE_CODE, SalaryList, Salary } from '../../types/api'
import { Search, } from '@element-plus/icons-vue'

// 分页数据
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)
// 搜索框
const input = ref('')
// 时间选择器数据
const month = ref([])
// 表格数据
const tableData = ref([{}])
// 弹出框
const centerDialogVisible = ref(false)
// 
const info = ref({
  name: '',
  s_id: 0,
  time: '',
  cqts: 0,
  jtts: 0,
  jcgz: 0,
  jxgz: 0,
  jxdj: '',
  qtjj: 0,
  qtkk: 0,
  sbkk: 0,
  gjjkk: 0,
  yksj: 0,
  real_salary: 0
})

const getData = async (curPage: number, pageSize: number, date1: string, date2: string, name: string) => {
  const res: Response<SalaryList> = await getAll(curPage, pageSize, date1, date2, name)
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.salary
    total.value = res.data.count
    console.log(res.data.count)
    console.log(tableData)
  }
}

onMounted(() => {
  getData(curPage.value, pageSize.value, '', '', input.value)
})

//分页
const handleCurrentChange = (val: number) => {
  console.log(val);
  const i = (val-1)*5
  curPage.value = i
  getData(curPage.value, pageSize.value, month.value[0] || '', month.value[1] || '', input.value)
}

// 时间筛选
const calendarChange = (date: string) => {
  console.log(date[0], date[1]) 
  getData(curPage.value, pageSize.value, date[0] || '', date[1] || '', input.value)
  // return date[0], date[1]
}


// 搜索名称
const searchByName = async () => {
  const res: Response<SalaryList> = await getAll(curPage.value, pageSize.value, month.value[0] || '', month.value[1] || '', input.value)
  console.log(res);
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.salary
    total.value = res.data.count
    console.log(tableData)
  }
}

// 明细
const show = async(id: number) => {
  centerDialogVisible.value = true
  const res: Response<Salary> = await getById(id)
  console.log(res);
  if (res.code === RESPONSE_CODE.OK) {
    info.value.name = res.data.name,
    info.value.s_id = res.data.s_id,
    info.value.time = res.data.time
    info.value.cqts = res.data.cqts,
    info.value.jtts = res.data.jtts,
    info.value.jcgz = res.data.jcgz,
    info.value.jxgz = res.data.jxgz,
    info.value.jxdj = res.data.jxdj,
    info.value.qtjj = res.data.qtjj,
    info.value.qtkk = res.data.qtkk,
    info.value.sbkk = res.data.sbkk,
    info.value.gjjkk = res.data.gjjkk,
    info.value.yksj = res.data.yksj,
    info.value.real_salary = res.data.real_salary
  }
}
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>