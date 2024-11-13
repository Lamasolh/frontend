<template>
  <div>
    <b-row>
      <b-col cols="5">
        <echart-doughnut />
      </b-col>
      <b-col md="7">
        <chartjs-horizontal-bar-chart />
      </b-col>
    </b-row>

  </div>
</template>
<script>
import ChartjsHorizontalBarChart from './ChartjsHorizontalBarChart.vue'
import EchartDoughnut from './EchartDoughnut.vue'

export default {
  components: {
    ChartjsHorizontalBarChart,
    EchartDoughnut,
  },
}
</script>
