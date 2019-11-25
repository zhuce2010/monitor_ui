<template>
  <div class="container">

   <el-container>

<el-main >
  <el-button class="libutton" type="primary" @click="toKPI()">KPI监控</el-button>
  <el-button class="libutton" type="success" @click="toDaily()">大屏监控</el-button>
  <el-button class="libutton" type="danger" @click.native="toSchedual">排版计划</el-button>
</el-main>
   </el-container>
  </div>
</template>

<script>
    export default {
    methods: {
        toSchedual()
        {
            this.$router.push('/Schedual/Index')
        },
        toKPI(){
            window.open("https://133.96.9.70:8080/daily-monitor/KPIMonitor/KPIView")

            //this.$router.push('/daily-monitor/KPIMonitor/KPIView')
        },
        toDaily(){
            window.open("https://133.96.9.70:8080/daily-monitor/DailyMonitor/DailyView")
            //this.$router.push('/daily-monitor/DailyMonitor/DailyView')
        },
    },
    }
</script>

<style scoped lang="scss">

  .container {
    position:absolute;
    top: 100px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    // background: rgba(224, 234, 235, 0.1);
  }
  .libutton{
    width:200px;
    height:200px;
  }
</style>
