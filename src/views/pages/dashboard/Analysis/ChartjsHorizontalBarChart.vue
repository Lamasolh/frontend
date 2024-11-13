<template>
  <b-card no-body>
    <b-card-header>
      <div>
        <b-card-sub-title class="mb-25">
          Cases Delivery
        </b-card-sub-title>
        <b-card-title>74,123</b-card-title>
      </div>
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <feather-icon
          icon="CalendarIcon"
          size="16"
        />
        <flat-pickr
          v-model="rangePicker"
          :config="{ mode: 'range'}"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <chartjs-component-horizontal-bar-chart
        :height="400"
        :data="data"
        :options="options"
      />
    </b-card-body>
  </b-card>
</template>

<script>

import flatPickr from 'vue-flatpickr-component'
import { $themeColors } from '@themeConfig'
import ChartjsComponentHorizontalBarChart from './charts-components/ChartjsComponentHorizontalBarChart.vue'

export default {
  components: {
    flatPickr,
    ChartjsComponentHorizontalBarChart,
  },
  data() {
    return {
      options: {
        elements: {
          rectangle: {
            borderWidth: 2,
            borderSkipped: 'top',
          },
        },
        tooltips: {
        // Updated default tooltip UI
          shadowOffsetX: 1,
          shadowOffsetY: 1,
          shadowBlur: 8,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          backgroundColor: $themeColors.light,
          titleFontColor: $themeColors.dark,
          bodyFontColor: $themeColors.dark,
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                zeroLineColor: 'rgba(200, 200, 200, 0.2)',
                borderColor: 'transparent',
                color: 'rgba(200, 200, 200, 0.2)',
                drawTicks: false,
              },
              scaleLabel: {
                display: true,
              },
              ticks: {
                min: 0,
                fontColor: '#6e6b7b',
              },
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
              },
              ticks: {
                fontColor: '#6e6b7b',
              },
            },
          ],
        },
      },
      data: {
        labels: ['JAN', 'FEB', 'MAR ', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          {
            data: [710, 350, 470, 580, 230, 460, 120, 232, 500, 340, 340, 630],
            backgroundColor: $themeColors.info,
            borderColor: 'transparent',
            barThickness: 15,
          },
        ],
      },
      rangePicker: ['2019-05-01', '2019-05-10'],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';

</style>
