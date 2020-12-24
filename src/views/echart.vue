<template>
  <div class="wrap">
    <div>
      <div ref="p1"></div>
      <div ref="p2"></div>
    </div>
    <div>
      <div ref="p3"></div>
      <div ref="p4"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option_1: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      },
      option_2: {
        angleAxis: {
          max: 2,
          startAngle: 30,
          splitLine: {
            show: false,
          },
        },
        radiusAxis: {
          type: "category",
          data: ["v", "w", "x", "y", "z"],
          z: 10,
        },
        polar: {},
        series: [
          {
            type: "bar",
            data: [4, 3, 2, 1, 0],
            coordinateSystem: "polar",
            name: "Without Round Cap",
            color: "rgba(200, 0, 0, 0.5)",
            itemStyle: {
              borderColor: "red",
              borderWidth: 1,
            },
          },
          {
            type: "bar",
            data: [4, 3, 2, 1, 0],
            coordinateSystem: "polar",
            name: "With Round Cap",
            roundCap: true,
            color: "rgba(0, 200, 0, 0.5)",
            itemStyle: {
              borderColor: "green",
              borderWidth: 1,
            },
          },
        ],
        legend: {
          show: true,
          data: ["Without Round Cap", "With Round Cap"],
        },
      },
      option_3: {
        title: {
          text: "基础雷达图",
        },
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "销售（sales）", max: 6500 },
            { name: "管理（Administration）", max: 16000 },
            { name: "信息技术（Information Techology）", max: 30000 },
            { name: "客服（Customer Support）", max: 38000 },
            { name: "研发（Development）", max: 52000 },
            { name: "市场（Marketing）", max: 25000 },
          ],
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）",
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销（Actual Spending）",
              },
            ],
          },
        ],
      },
      option_4: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }],
          },
        ],
      },
      time: null
    };
  },
  mounted() {
    const self = this;
    let myChart_1 = this.$echarts.init(this.$refs.p1);
    let myChart_2 = this.$echarts.init(this.$refs.p2);
    let myChart_3 = this.$echarts.init(this.$refs.p3);
    let myChart_4 = this.$echarts.init(this.$refs.p4);
    myChart_1.setOption(this.option_1);
    myChart_2.setOption(this.option_2);
    myChart_3.setOption(this.option_3);
    myChart_4.setOption(this.option_4);

    this.time = setInterval(function () {
      self.option_4.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      myChart_4.setOption(self.option_4, true);
    }, 2000);
  },
  beforeDestroy() {
      clearInterval(this.time);
      this.time = null;
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: auto 1;
  div {
    height: 50%;
    display: flex;
    flex-direction: row;
    flex: 1 0;
    div {
      width: 50%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>