<template>
  <el-card class="table-box">
    <div class="table-list">
      <el-form :model="query" inline style="margin-bottom:15px">
        <el-form-item label="姓名">
          <el-input v-model="query.keyword" placeholder="搜索" style="width:200px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="table-item">
        <el-table 
          :data="list" 
          border 
          v-loading="loading"
          style="width:100%"
        >
          <el-table-column type="index" label="序号" width="70" />
          <el-table-column prop="gcBH" label="招标项目编号" />
          <el-table-column prop="gcName" label="招标项目名称" />
          <el-table-column prop="gcLeiBie" label="公共资源交易行业分类"/>
          <el-table-column prop="gcLeiXing" label="工程专业类型" />
          <el-table-column prop="currentStage" label="当前交易环节" />
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button
                v-buttonPermission="'project-table-edit'"
                size="small" 
                type="primary" 
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                v-buttonPermission="'project-table-view'"
                size="small" 
                type="danger" 
                @click="handleDelete(scope.row.gcBH)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <div class="page-item">
      <el-pagination
        v-model:current-page="pageInfo.page"
        v-model:page-size="pageInfo.size"
        :total="500"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="getList"
        @current-change="getList"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 查询条件
const query = ref({
  keyword: ''
})

// 分页
const pageInfo = ref({
  page: 1,
  size: 10
})

const list = ref([])
const loading = ref(false)

// 获取列表
const getList = () => {
  loading.value = true
  // 模拟接口
  setTimeout(() => {
    const arr = []
    for (let i = 1; i <= 20; i++) {
      arr.push({
        gcBH: '招标项目编号' + i,
        gcName: '招标项目名称' + i,
        gcLeiBie: '市政工程',
        gcLeiXing: '施工',
        currentStage: '开标'
      })
    }
    list.value = arr
    loading.value = false
  }, 300)
}

// 重置
const resetQuery = () => {
  query.value.keyword = ''
  getList()
}

// 编辑
const handleEdit = (row) => {
  ElMessage.info('编辑：' + row.gcName)
}

// 删除
const handleDelete = (gcBH) => {
  ElMessage.warning('删除 ID：' + gcBH)
}

onMounted(() => {
  getList()
})
</script>
<style scoped>
.table-box {
  height: 100%;
  overflow: hidden;
}
.table-list {
  height: calc(100% - 60px - 15px);
  overflow-y: scroll;

}
.table-item {
  /* max-height: calc(100% - 100px - 100px);
  overflow: scroll; */
}
.page-item {
  height: 60px;
  margin-top:15px;
  /* text-align:right; */
}
</style>