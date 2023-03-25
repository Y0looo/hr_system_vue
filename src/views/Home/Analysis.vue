<script lang="ts" setup>
import * as echarts from "echarts"
import { onMounted } from "vue";


const echarts1 = () => {
  let chartInstance = echarts.init(document.querySelector('.chart1-box') as HTMLCanvasElement, 'dark');
  chartInstance.setOption(options1)
}

const options1: echarts.EChartsOption = {
  title: {
    text: '各部门人数'
  },
  legend: {
    data: ['num']
  },
  xAxis: {
    type: 'category',
    data: ['研发部', '人事部', '行政部', '财务部', '销售部', '产品部', '运营部']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [5, 1, 1, 1, 2, 1, 1],
      type: 'bar',
      name: 'num'
    }
  ]
}

const echarts2 = () => {
  let chartInstance = echarts.init(document.querySelector('.chart2-box') as HTMLCanvasElement, 'dark');
  chartInstance.setOption(options2)
}

const options2: echarts.EChartsOption = {
  title: {
    text: '各部门人数'
  },
  legend: {
    data: ['num']
  },
  xAxis: {
    type: 'category',
    data: ['研发部', '人事部', '行政部', '财务部', '销售部', '产品部', '运营部']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [5, 1, 1, 1, 2, 1, 1],
      type: 'bar',
      name: 'num'
    }
  ]
}

const data = {
  echarts1,
  echarts2
}

onMounted(echarts1)
</script>

<template>
  <div class="chart1-box"  ref="chart"></div>
  <div class="chart2-box"  ref="chart"></div>
</template>

<style scoped>
.chart1-box {
  width: 30%;
  height: 400px;
  margin-left: 20px;
}

.chart2-box {
  width: 30%;
  height: 400px;
  margin-left: 20px;
}

</style>