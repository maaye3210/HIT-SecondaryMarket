<template>

  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="成交数" name="sale" />
        <el-tab-pane label="访问量" name="visite" />
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <a href="javascript:void(0)" @click="setDay">今日</a>
        <a href="javascript:void(0)" @click="setWeek">本周</a>
        <a href="javascript:void(0)" @click="setMonth">本月</a>
        <a href="javascript:void(0)" @click="setYear">本年</a>
        <!--    v-model="value1" -->
        <el-date-picker v-model="date" class="date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="mini" />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div ref="charts" class="charts" />
        </el-col>
        <el-col :span="6" class="right">
          <h3>商品热度{{ title }}排名</h3>
          <ul>
            <li>
              <span class="rindex righttops">1</span>
              <span>课本</span>
              <span class="rvalue">123456</span>
            </li>
            <!-- <li>
              <span class="rindex righttops">2</span>
              <span>代收快递</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex righttops">3</span>
              <span>零食</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">4</span>
              <span>会员租赁</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">5</span>
              <span>自行车</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">6</span>
              <span>电子配件</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex ">7</span>
              <span>服装</span>
              <span class="rvalue">123456</span>
            </li> -->
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
// 引入echarts
import echarts from 'echarts'
import dayjs from 'dayjs'
import { mapState, mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      activeName: 'sale',
      mycharts: null,
      // 收集日历数据
      date: []
    }
  },
  computed: {
    // 计算属性-标题
    title() {
      // 重新设置配置项
      return this.activeName === 'sale' ? '成交数' : '访问量'
    },
    ...mapState({
      listState: (state) => state.home.list
    }),
    ...mapGetters(['supplyAndDemand'])
  },
  // 监听属性
  watch: {
    title() {
      // 重新修改图标的配置数据
      // 图标配置数据可以再次修改，如果有新的数值，新的数值，没有新的数值，还是用以前的
      this.mycharts.setOption({
        title: {
          text: this.title
        },
        xAxis: {
          data: this.title === '销售额' ? this.listState.orderFullYearAxis : this.listState.userFullYearAxis
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.title === '销售额' ? this.listState.orderFullYear : this.listState.userFullYear,
            color: 'yellowgreen'
          }
        ]
      })
    },
    listState() {
      this.mycharts.setOption({
        title: {
          text: this.title + '趋势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.listState.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.listState.orderFullYear,
            color: '#3399CC'
          }
        ]
      })
    }
  },
  mounted() {
    // 初始化echarts实例
    this.mycharts = echarts.init(this.$refs.charts)
    // 配置数据
    this.mycharts.setOption({
      title: {
        text: this.title + '趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [],
          color: 'yellowgreen'
        }
      ]
    })

    // 顶部是mounted：为什么第一次没有数据，没有数据因此不显示
  },

  methods: {
    // 本天
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    // 本周
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本月
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本年
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }

}
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 250px;
  margin: 0px 20px;
}
.right a {
  margin: 0px 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
.rindex {
  float: left;
  line-height: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
}
.righttops {
  background: black;
  color: white;
}
.rvalue {
  float: right;
}
</style>
