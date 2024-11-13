<template>
  <b-card title="Total Casses">
    <div class="pie-text text-center">
      <h2 class="font-weight-bolder">
        230,994
      </h2>
      <span class="font-weight-bold">Total Cases</span>
    </div>
    <!-- echart -->
    <app-echart-doughnut
      class="chart"
      :series="series"
    />
  </b-card>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import AppEchartDoughnut from '@core/components/charts/echart/AppEchartDoughnut.vue'

export default {
  components: {
    BCard,
    AppEchartDoughnut,
  },
  data() {
    return {
      series: [
        {
          name: 'Cases',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          width: '100%',
          height: '100%',
          top: -30,
          left: 20,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 335, name: 'Delivery' },
            { value: 30, name: 'Not Delivery' },
            { value: 234, name: 'Pending' },
            { value: 435, name: 'Pending Delivery' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.card-body {
    position: relative;
    .pie-text {
        width: 105px;
        position: absolute;
        margin: auto;
        left: 0;
        right: 32px;
        top: 145px;
        bottom: 0;
    }
}
.chart{
  height: 300px;
  width: 300px;
}
</style>
