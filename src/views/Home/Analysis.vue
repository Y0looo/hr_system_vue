<script lang="ts" setup>
import * as echarts from "echarts"
import { onMounted, ref, nextTick } from "vue";
import { getDept, getEducated, getJob, getRecords } from "../../api/analysis";
import { Echarts, RESPONSE_CODE, Response, DoubleEcharts } from "../../types/api"


onMounted(() => {

  const options1 = {
    title: {
      text: '各部门人数'
    },
    xAxis: {
      type: 'category',
      data: <string[]>[],
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: [
      {
        data: <number[]>[],
        type: 'bar',
        name: '人数'
      }
    ]
  }

  const getDeptNum = async () => {
    const res: Response<Echarts> = await getDept()
    if (res.code === RESPONSE_CODE.OK) {
      options1.xAxis.data.push(...res.data.categories)
      options1.series[0].data.push(...res.data.data)
    }
    echarts1()
  }

  getDeptNum()

  const echarts1 = () => {
    let chartInstance = echarts.init(document.querySelector('.chart1-box') as HTMLCanvasElement, 'dark');
    chartInstance.setOption(options1)
  }

  const options2 = {
    title: {
      text: '学历分布'
    },
    xAxis: {
      type: 'category',
      data: <string[]>[],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: <number[]>[],
        type: 'bar',
        name: '人数'
      }
    ]
  }
  const getEducatedData = async () => {
    const res: Response<Echarts> = await getEducated()
    if (res.code === RESPONSE_CODE.OK) {
      options2.xAxis.data.push(...res.data.categories)
      options2.series[0].data.push(...res.data.data)
    }
    echarts2()
  }

  getEducatedData()

  const echarts2 = () => {
    let chartInstance = echarts.init(document.querySelector('.chart2-box') as HTMLCanvasElement, 'dark');
    chartInstance.setOption(options2)
  }

  const options3 = {
    title: {
      text: '岗位人数'
    },
    xAxis: {
      type: 'category',
      data: <string[]>[],
      triggerEvent: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    axisLabel: {
      interval: 0
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: <number[]>[],
        type: 'bar',
        name: '人数'
      }
    ]
  }
  const getJobData = async () => {
    const res: Response<Echarts> = await getJob()
    if (res.code === RESPONSE_CODE.OK) {
      options3.xAxis.data.push(...res.data.categories)
      options3.series[0].data.push(...res.data.data)
    }
    echarts3()
  }

  getJobData()

  const echarts3 = () => {
    let chartInstance = echarts.init(document.querySelector('.chart3-box') as HTMLCanvasElement, 'dark');
    chartInstance.setOption(options3)
  }

  const options4 = {
    title: {
      text: '奖惩统计'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      name: ''
    },
    xAxis: {
      type: 'category',
      data: <string[]>[],
      triggerEvent: true,
    },
    axisLabel: {
      interval: 0
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: <number[]>[],
        type: 'bar',
        name: '奖金'
      },
      {
        data: <number[]>[],
        type: 'bar',
        name: '罚款'
      }
    ]
  }
  const getRecordsData = async () => {
    const res: Response<DoubleEcharts> = await getRecords()
    if (res.code === RESPONSE_CODE.OK) {
      options4.xAxis.data.push(...res.data.categories)
      options4.series[0].data.push(...res.data.data_first)
      options4.series[1].data.push(...res.data.data_second)
    }
    echarts4()
  }

  getRecordsData()

  const echarts4 = () => {
    let chartInstance = echarts.init(document.querySelector('.chart4-box') as HTMLCanvasElement, 'dark');
    chartInstance.setOption(options4)
  }
  
})



</script>

<template>
  <div style="display: flex; flex-wrap: wrap;">
    <div class="chart1-box" ref="chart"></div>
    <div class="chart2-box" ref="chart"></div>
    <div class="chart3-box" ref="chart"></div>
    <div class="chart4-box" ref="chart"></div>
  </div>
</template>

<style scoped>
.chart1-box,
.chart2-box,
.chart3-box,
.chart4-box {
  width: 600px;
  height: 400px;
  margin-left: 120px;
  margin-top: 10px;
}
</style>