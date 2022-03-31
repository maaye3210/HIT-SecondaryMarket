<template>
  <el-row :gutter="10">
    <el-col :span="8" style="margin: 10px 0px 0px">
      <el-card style="height:400px">
        <div slot="header" class="header">
          <div class="category-header">
            <span>商品种类</span>
            <el-radio-group v-model="value">
              <el-radio-button label="出手" />
              <el-radio-button label="购买" />
            </el-radio-group>
          </div>
        </div>
        <div>
          <div ref="charts" class="charts" />
        </div>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin: 10px 0px 0px">
      <el-card style="height:400px">
        <div slot="header">
          热度趋势
        </div>
        <div>
          <div ref="chart2" class="charts" />
        </div>
      </el-card>
      <!-- <div class="grid-content bg-purple" /> -->
    </el-col>
  </el-row>

</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import { options } from 'runjs'
export default {
  name: '',
  data() {
    return {
      value: '出手',
      mychart: null
    }
  },
  computed: {
    ...mapGetters([
      'demandRank',
      'supplyRank'
    ]),
    option() {
      const list = []
      const rank = this.value === '出手' ? this.supplyRank : this.demandRank
      if (rank) {
        for (const item of rank) {
          list.push({ value: item.count, name: item.name })
        }
      } else {
        console.log('数据未返回')
      }
      return {
        title: {
          text: this.value,
          subtext: '',
          left: 'center',
          top: 'center',
          value: 'ss'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outsize'
            },
            labelLine: {
              show: true
            },
            data: list || '加载中'
          }
        ]
      }
    },
    option2() {
      const rank = this.value === '出手' ? this.supplyRank : this.demandRank
      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      if (rank) {
        data = rank[0].trend
      }
      return {
        xAxis: {
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {},
        series: [
          {
            data: data,
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  },
  watch: {
    option() {
      this.mychart.setOption(this.option)
      this.mychart2.setOption(this.option2)
    }
  },
  mounted() {
    // 饼图
    this.mychart = echarts.init(this.$refs.charts)
    this.mychart2 = echarts.init(this.$refs.chart2)
    this.mychart.setOption(this.option)
    this.mychart2.setOption(this.option2)
    // // 绑定事件
    this.mychart.on('mouseover', (params) => {
      // 获取鼠标移上去那条数据
      const { name, value } = params.data
      // 重新设置标题
      this.mychart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
    this.mychart.on('mouseout', () => {
      // 重新设置标题
      this.mychart.setOption({
        title: {
          text: this.value,
          subtext: ''
        }
      })
    })
    this.mychart.on('click', (params) => {
      // 重新设置标题
      console.log(params.data.name)
      const name = params.data.name
      const rank = this.value === '出手' ? this.supplyRank : this.demandRank
      let data = []
      for (const item of rank) {
        if (item.name === name) {
          data = item.trend
        }
      }
      console.log(data)
      this.mychart2.setOption({
        xAxis: {
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {},
        series: [
          {
            data: data,
            type: 'line',
            smooth: true
          }
        ]
      })
    })
  }
}
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.charts {
  width: 100%;
  height: 300px;
}
</style>
