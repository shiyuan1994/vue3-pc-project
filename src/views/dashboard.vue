<template>
  <div class="dashboard-container">
    <!-- 数据卡片概览 -->
    <el-row :gutter="20" style="margin-bottom:20px">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <span class="stat-label">今日新增项目</span>
            <span class="stat-value">{{ stats.newProjectNumber }}</span>
          </div>
          <div class="stat-trend">
            <el-icon><Top style="color:#f56c6c" /></el-icon>
            <span>12% 较昨日</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <span class="stat-label">今日开标项目数</span>
            <span class="stat-value">{{ stats.openBidNumber }}</span>
          </div>
          <div class="stat-trend">
            <el-icon><Bottom style="color:#67c23a" /></el-icon>
            <span>5% 较昨日</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <span class="stat-label">待处理任务</span>
            <span class="stat-value">{{ stats.pendingTask }}</span>
          </div>
          <div class="stat-trend">
            <el-icon><Top style="color:#f56c6c" /></el-icon>
            <span>8% 较昨日</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <span class="stat-label">本月总项目数</span>
            <span class="stat-value">{{ stats.totalNumber }}</span>
          </div>
          <div class="stat-trend">
            <el-icon><Top style="color:#f56c6c" /></el-icon>
            <span>18% 较上月</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- ECharts图表区域 -->
    <el-row :gutter="20" style="margin-bottom:20px">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="card-header">
            <span>公共资源交易行业分类</span>
          </div>
          <div ref="gcLeiBieChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="gc-item">
          <div slot="header" class="card-header">
            <span>工程专业类型</span>
          </div>
          <div ref="gcLeiXingChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Top, Bottom } from '@element-plus/icons-vue'
// 引入ECharts
import * as echarts from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册ECharts组件
echarts.use([
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer
])

// 模拟统计数据
const stats = ref({
  newProjectNumber: 128,
  openBidNumber: 56,
  pendingTask: 23,
  totalNumber: 215
})

// 图表容器Ref
const gcLeiBieChartRef = ref(null)
const gcLeiXingChartRef = ref(null)
// 图表实例（用于销毁）
let gcLeiBieChart = null
let gcLeiXingChart = null

// 初始化图表
const initCharts = () => {
  // 1. 公共资源交易行业分类
  gcLeiBieChart = echarts.init(gcLeiBieChartRef.value)
  gcLeiBieChart.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: '{b}：{c}个'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['市政工程', '房屋建筑工程', '水运', '民航', '公路工程', '电路工程', '铁路']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: [300, 12, 5, 129, 45, 245, 23],
        smooth: true,
        itemStyle: {
          color: '#409eff'
        }
      }
    ]
  })

  // 2. 工程专业类型
  gcLeiXingChart = echarts.init(gcLeiXingChartRef.value)
  gcLeiXingChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{b}：{d}%'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center'
    },
    series: [
      {
        name: '工程专业类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        data: [
          { value: 120, name: '设计' },
          { value: 80, name: '施工' },
          { value: 50, name: '设备采购' },
          { value: 10, name: '监理' },
          { value: 234, name: '勘察' },
          { value: 6, name: '设计施工总承包' },
          { value: 30, name: '其他' }
        ],
        itemStyle: {
          color: function(params) {
            // 自定义颜色
            const colorList = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#ffccff', '#c1dfff', '#f6d7ff']
            return colorList[params.dataIndex]
          }
        }
      }
    ]
  })
}

// 自适应窗口大小
const resizeCharts = () => {
  gcLeiBieChart && gcLeiBieChart.resize()
  gcLeiXingChart && gcLeiXingChart.resize()
}

onMounted(() => {
  // 初始化图表
  initCharts()
  // 监听窗口大小变化
  window.addEventListener('resize', resizeCharts)
})

onUnmounted(() => {
  // 销毁图表
  gcLeiBieChart && gcLeiBieChart.dispose()
  gcLeiXingChart && gcLeiXingChart.dispose()
  window.removeEventListener('resize', resizeCharts)
})
</script>

<style scoped>
.dashboard-container {
  padding: 0;
}

.stat-card {
  height: 120px;
  box-sizing: border-box;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.stat-trend {
  font-size: 12px;
  color: #999;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shortcut-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px 0;
}

.shortcut-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: all 0.2s;
}

.shortcut-item:hover {
  background-color: #f5f7fa;
}

.shortcut-item i {
  font-size: 24px;
  color: #409eff;
  margin-bottom: 5px;
}

.shortcut-item span {
  font-size: 12px;
  color: #666;
}

/* 图表容器样式 */
.chart-container {
  width: 100%;
  height: 300px;
}
.gc-item {
  margin-top: 20px;
}
</style>