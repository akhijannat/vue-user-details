<script setup>
import { useAuth } from "../stores/auth";
import BarChartComponent from "./chart/BarChartComponent.vue";
import PieChartComponent from "./chart/PieChartComponent.vue";
import LineChartComponent from "./chart/LineChartComponent.vue";
import DoughnutChartComponent from "./chart/DoughnutChartComponent.vue";

const auth = useAuth();
</script>

<template>


  <div id="main" class="grid grid-rows-2 grid-flow-col">
    <div>
      <BarChartComponent/>
    </div>
    <div>
      <LineChartComponent/>
    </div>
    <div>
      <PieChartComponent/>

    </div>
    <div>
      <DoughnutChartComponent/>
    </div>

  </div>


</template>

<style scoped></style>
