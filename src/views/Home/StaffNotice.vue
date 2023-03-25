<template>
  <el-input v-model="input" placeholder="请输入公告标题" style="width: 20%" />
  <el-button type="primary" :icon="Search" style="margin-left: 10px;" @click="searchByName(input)">搜索</el-button>
  <el-table :data="tableData" style="width: 100%;margin-top: 20px" border="true" class="table">
    <el-table-column fixed prop="title" label="标题" width="250" :show-overflow-tooltip="true"/>
    <el-table-column prop="n_id" label="序号" width="250" />
    <el-table-column prop="content" label="内容" width="450" :show-overflow-tooltip="true"/>
    <el-table-column prop="publisher" label="发布者" width="300" />
    <el-table-column prop="create_time" label="发布时间" width="300" />
    <el-table-column prop="update_time" label="最新修改时间" width="300" />
  </el-table>
  <!-- 分页 -->
  <div class="example-pagination-block" style="float:right">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change="handleCurrentChange" />
  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref,  } from 'vue';
import { Response, RESPONSE_CODE, NoticeList, Notice } from '../../types/api'
import { getAllNotice, getNoticeByName,  } from '../../api/notice'
import { Search, } from '@element-plus/icons-vue'

// 分页
const total = ref(0)
const curPage = ref(0)
const pageSize = ref(5)
// 搜索输入框
const input = ref('')

const tableData = ref([{}])

const getData = async (curPage: number, pageSize: number) => {
  const res: Response<NoticeList> = await getAllNotice(curPage, pageSize)
  console.log(res);
  if (res.code === RESPONSE_CODE.OK) {
    tableData.value = res.data.notice
    total.value = res.data.count
    console.log(tableData)
  }
}

onMounted(() => {
  getData(curPage.value, pageSize.value)
  
})

// 根据公告名称搜索
const searchByName = async (name: string) => {
  const res: Response<NoticeList> = await getNoticeByName(curPage.value, pageSize.value, name)
  console.log(res);
  if (res.code === RESPONSE_CODE.OK) {
    console.log(tableData)
    // tableData.shift()
    tableData.value = res.data.notice
    total.value = res.data.count
    console.log(tableData)
  }
}

const handleCurrentChange = (val: number) => {
  curPage.value = val
  console.log(val);
  const i = (val-1)*5
  curPage.value = i
  getData(curPage.value, pageSize.value)
}
</script>