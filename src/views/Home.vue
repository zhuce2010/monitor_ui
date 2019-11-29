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
    import {Decrypt,Encrypt} from '@/utils/crypto'

    export default {
    methods: {
        toSchedual()
        {
            let session =sessionStorage.getItem("session")
            this.$api.login.checkSession(session).then((res)=>{
               let enSession = Encrypt(session)
                if (enSession == res)
                {
                    this.$router.push('/Schedual/Index')
                }else {
                    alert("session不正确")
                }


            })

        },
        toKPI(){
            let session =sessionStorage.getItem("session")
            this.$api.login.checkSession(session).then((res)=>{
                let enSession = Encrypt(session)
                if (enSession == res)
                {
                    window.open("https://133.96.9.70:8080/daily-monitor/KPIMonitor/KPIView")
                }else {
                    alert("session不正确")
                }
            })
            //this.$router.push('/daily-monitor/KPIMonitor/KPIView')
        },
        toDaily(){
            let session =sessionStorage.getItem("session")
            this.$api.login.checkSession(session).then((res)=>{
                let enSession = Encrypt(session)
                if (enSession == res)
                {
                    window.open("https://133.96.9.70:8080/daily-monitor/DailyMonitor/DailyView")
                }else {
                    alert("session不正确")
                }
            })
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
