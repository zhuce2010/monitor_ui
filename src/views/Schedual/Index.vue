<template>
  <div class="boxShadow"style="margin-top: 30px;margin-left: 20px">
    <template>
    <div class="block" align="left" >
      <span class="demonstration1">值班月</span>
      <el-date-picker
        @change="setMonthChange"
        v-model="month"
        type="month"
        placeholder="选择月">
      </el-date-picker>
      <el-button class="saveButton" type="primary"size="medium" style="margin-left: 10px" @click="saveTable" >保 存</el-button>
      <span class="demonstration2" style="margin-left: 20px">前一天提醒时间</span>
      <el-time-select style="margin-left: 10px"
        v-model="setTime1"
        :picker-options="{
          start: '06:00',
          step: '00:10',
          end: '22:59'
          }"
        placeholder="选择时间">
      </el-time-select>
      <el-button class="saveButton" type="primary"size="medium" style="margin-left: 10px" @click="saveYesterTime" >保 存</el-button>

      <span class="demonstration2" style="margin-left: 20px">当天任务提前提醒时间</span>
      <el-time-select style="margin-left: 10px"
                      v-model="setTime2"
                      :picker-options="{
                      start: '00:00',
                      step: '00:01',
                      end: '00:50'
          }"
                      placeholder="选择时间">
      </el-time-select>
      <el-button class="saveButton" type="primary"size="medium" style="margin-left: 10px" @click="saveThisTime" >保 存</el-button>
    </div>
    </template>

    <div style="margin-top: 20px">

      <el-table id="table" class="tt"
        :data="tables"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        :element-loading-text="$t('action.loading')"
        render-header="changeLabel"
       >
        <el-table-column label="序号" width="62px" type="index" fixed>
        </el-table-column>
        <el-table-column label="姓名" width="82px" align="center" prop="realName" fixed>
        </el-table-column>
        <template v-for='(col) in columnList'>
          <el-table-column
            :prop = "String(col)"
            :label= "String(col)+'号'"
            align="center"
            width = "104px">
            <template slot-scope="scope">
              <el-button size="medium" v-for="item in monitorTypeOptions" :key="item.key"  v-if="scope.row[col]=== item.key" @click="changeStatus(scope,col)"   :type="buttonType(item.key)" >
                {{item.display_name}}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
    export default {

        props: {
            sup_this: {
                type: Object,
                default: null
            },
            sup1: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                tt:"",
                table:"",
                setTime1:'',
                setTime2:'',
                month:'',
                monthString:'',
                loading:false,
                monitorTypeOptions: [
                    {key:1, display_name: '值班'},
                    {key:0, display_name: '休息'}
                ],
                columnList:[],
                delLoading: false,
                pageRequest: {pageNum: 1, pageSize: 10},
                pageResult: {},
                filterColumns: [],
                query: {
                    value: '',
                    enabled: ''
                },
                tables: [],
            }
        },
        created() {
            this.loading = false
        },
        methods: {
            buttonType(key){
                if (key==1) return "danger"

            },
            saveYesterTime:function(){
                var params = {id:1,time:this.setTime1,taskId:1}
                this.$api.timeSchedule.save(params).then(res=>{
                    console.log(res)
                })

            },
            saveThisTime:function(){
                var params = {id:2,time:this.setTime2,taskId:2}
                this.$api.timeSchedule.save(params).then(res=>{
                    console.log(res)
                })
            },
            saveTable:function(){
            var tableSave =[]
                console.log("savetable")
               console.log(this.tables.toString())
                this.tables.forEach(table=>{
                    var duty =''
                    Object.getOwnPropertyNames(table).forEach(function(val, idx, array) {
                        var paramslist =[]
                        for (var i =0;i<=31;i++){
                            paramslist.push(i)
                        }
                        if (val in paramslist)
                        {
                            duty=duty+table[val]+","
                        }
                    });
                    duty =duty.substr(0,duty.length-1)
                    console.log("duty")
                    console.log(duty);
                    if (this.monthString == null|| this.monthString=='')
                    {
                        if(this.month == null|| this.month==''){
                            this.month =new Date()
                        }
                        //获取当前年月，拼接成字符串
                        this.monthString =this.getYearAndMonth(this.month)
                    }
                    console.log(table.name)
                    console.log("年月为："+this.monthString)
                    const tableTem = {name:table.name,realName:table.realName,duty:duty,month:this.monthString}
                    console.log("tableTem:"+tableTem.name)
                    tableSave.push(tableTem)
                    this.monthString =''
                })
                this.$api.duty.save(tableSave).then((res)=>{
                    console.log(res)
                })

            },
            changeLabel:function(h, { column, $index }){
                console.log(column);

            },
            setMonthChange:function(){
                console.log("选择月："+this.month)
               console.log(this.getYearAndMonth(this.month))
                this.getDayList(this.month)
                this.getTables(this.month)
                console.log("after:"+this.getYearAndMonth(this.month))

            },
            changeStatus:function(scope,col){
                console.log("改变之前的tables数")
                console.log(this.tables[scope.$index][col])
                if (scope.row[col] ==0){
                    scope.row[col] = 1
                }else {
                    scope.row[col] = 0
                }
                console.log("改变之后的tables数")
                console.log( this.tables[scope.$index][col] )
                /**
                 * 重新加载数据
                 */
                this.$set(this.tables,scope.$index,this.tables[scope.$index]);
                console.log("last tables")
                console.log(this.tables)
            },
            getYearAndMonth:function(date) {
                console.log("date:"+date)
                var newyear = date.getFullYear(); //得到当前日期年份
                var newmonth = date.getMonth() + 1; //得到当前日期月份（注意： getMonth()方法一月为 0, 二月为 1, 以此类推。）
                var day = date.getDate(); //得到当前某日日期（1-31）
                newmonth = (newmonth < 10 ? "0" + newmonth : newmonth); //10月以下的月份自动加0
              //  var newdate = newyear + "-" + newmonth;
                return newyear + "-" + newmonth;
    },
             mGetDate:function(date){
                if (date==null)
                {
                     date = new Date();
                }
              var year = date.getFullYear();
              var month = date.getMonth()+1;
              var d = new Date(year, month, 0);
              console.log(d.getDate())
              return d.getDate();
            },
            getDayList:function(data){
            //    this.columnList =[]
                var column =[]
               var day = this.mGetDate(data);
                for ( var i = 1; i < day+1; i++) {
                    column[i-1] = i
                }
                this.columnList = column
                console.log(this.columnList)
            },
            getTables :function(data){
              if(data ==null||data =='')
              {
                 var mm= this.getYearAndMonth(new Date())
              }
              else {
                  mm = this.getYearAndMonth(data)
              }
            //根据data从数据库获取tables数据
                var duty ={month:mm}
                console.log("duty"+duty)
                var tablet =[]
                this.$api.duty.list(duty).then((res) => {
                    console.log(res)
                   res.forEach(ele=>{
                       var tablest ={}
                       Object.getOwnPropertyNames(ele).forEach(function(e, idx, array) {
                //       ele.forEach(e=>{
                           if (e == "duty"){

                               var dt = ele[e].split(",")
                               Object.getOwnPropertyNames(dt).forEach(function(dtd, idx, array) {
                  //                 dt.forEach(dtd=>{
                                   tablest[(parseInt(dtd)+1)] =parseInt(dt[dtd])
                            //       tablest.add(dtd,dt[dtd])
                               })
                               console.log(dt)
                           }else {
                               tablest[e] =ele[e]
                    //           tablest.add(e,ele[e])
                           }
                       })
                       console.log("tablest"+tablest)
                      tablet.push(tablest)
                   })
                    console.log(tablet)
                    this.tables = tablet
                    //格式化数据库数据
                    //如果数据库中数据不存在，则生成相应数据
                    if (res ==null ||res == '')
                    {
                        this.$api.monitoruser.list().then((res) => {
                            console.log(res.length)
                            for (var i = 0;i<res.length;i++){
                                var name ={"realName" : res[i].realName,"name" : res[i].name}
                                this.tables.push(name)
                                console.log(this.tables)
                            }
                            console.log("table")
                            console.log(this.tables[0].realName)
                            console.log(this.tables)
                            console.log(this.tables.length)
                            console.log(this.columnList.length)
                            for (var j=0;j<this.tables.length;j++){
                                for (var i=1; i<this.columnList.length+1;i++)
                                {
                                    this.tables[j][i] = 0
                                }
                            }
                            console.log("生成的table:"+this.tables)

                        })
                    }
                })
            },
            getHeight: function () {
                this.height = window.innerHeight - 280;
            },

        },
        mounted() {
            this.getDayList()
            this.getTables()
        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        }
    }



</script>
