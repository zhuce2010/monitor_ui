<template>
  <div class="boxShadow"style="margin-top: 30px;margin-left: 5px">
    <template>
    <div class="block" align="left" >
      <span class="demonstration1">值班月</span>
      <el-date-picker
        @change="setMonthChange"
        v-model="month"
        type="month"
        placeholder="选择月">
      </el-date-picker>
      <el-button class="saveButton" type="primary"size="medium" style="margin-left: 5px" @click="saveTable" >保 存</el-button>
      <span class="demonstration2" style="margin-left: 5px">前一天提醒时间</span>
      <el-time-select style="margin-left: 5px"
        v-model="setTime1"
        :picker-options="{
          start: '06:00',
          step: '00:10',
          end: '22:59'
          }"
        placeholder="选择时间">
      </el-time-select>
      <el-button class="saveButton" type="primary"size="medium" style="margin-left: 5px" @click="saveYesterTime" >保 存</el-button>

      <span class="demonstration2" style="margin-left: 5px">当天任务提前提醒时间</span>
      <el-time-select style="margin-left: 10px"
                      v-model="setTime2"
                      :picker-options="{
                      start: '00:00',
                      step: '00:01',
                      end: '00:50'
          }"
                      placeholder="选择时间">
      </el-time-select>
      <el-button class="saveButton" type="primary"size="medium" style="margin-left: 5px" @click="saveThisTime" >保 存</el-button>
      <el-button class="backToHome" type="primary"size="medium" style="margin-left: 5px" @click="backToHome" >返回首页</el-button>
      <el-button class="backToHome" type="primary"size="medium" style="margin-left: 5px" @click="toDownload" >导出excel</el-button>


    </div>
    </template>

    <div style="margin-top: 20px">

      <el-table
        id="table"
        v-loading.fullscreen.lock="loading"
        class="tt"
        :data="tables"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        :element-loading-text="$t('action.loading')"
        render-header="changeLabel"
       >
        <el-table-column label="序号" width="52px" type="index" fixed>
        </el-table-column>
        <el-table-column label="姓名" width="82px" align="center" prop="realName" fixed style="margin-left: 4px" >
        </el-table-column>
        <template v-for='(col) in showColumnList'>
          <el-table-column
            :prop = "String(col)"
            :label= "String(col)+'号'+weekList[col-1]"
            align="center"
            width = "85px"
            column-rule-width="0px"
          >
            <template slot-scope="scope">
              <el-button size="small" :disabled="buttonable()" v-for="item in monitorTypeOptions" :key="item.key"  v-if="scope.row[col]=== item.key" @click="changeStatus(scope,col)"   :type="buttonType(item.key)" >
                {{item.display_name}}
              </el-button>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="值班合计" width="82px" align="center" prop="total"  style="margin-left: 4px" >
        </el-table-column>
      </el-table>

    </div>
    <div style="margin-top: 20px">
      <el-button id="toFront"  type="primary"size="medium"  style="margin-left:150px"  @click="getFrontDay" >1-15日</el-button>
      <el-button id="toBack" type="primary"size="medium"  @click="getBackDay" >16-31日</el-button>

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
                showColumnList:[],
                nowdate:'',
                dayCount:1,
                delLoading: false,
                pageRequest: {pageNum: 1, pageSize: 10},
                pageResult: {},
                filterColumns: [],
                query: {
                    value: '',
                    enabled: ''
                },
                tables: [],
                weekList:[],
            }
        },
        created() {
            this.loading = false
        },
        methods: {
            /**
             *
             */
            buttonable(){
                let user=sessionStorage.getItem("user")
              /*  // console.log("user")
                // console.log(user)*/
                if (user == "lujh1"||user =="15531610100"){
                    return false
                }else {
                    return true
                }
            },

            // 导出
            toDownload() {
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.export2Excel()
                }).catch(() => {
                });
            },
            export2Excel() {
                require.ensure([], () => {
                    const {export_json_to_excel} = require('@/utils/Export2Excel');
                    let monthString =''
                    let date
                    if (this.month!=''){
                        monthString = this.getYearAndMonth(this.month)
                        date =this.month
                    }else {
                        monthString = this.getYearAndMonth(new Date())
                        date=new Date()
                    }
                    var day = this.mGetDate(date);
                    let tHeader = ['姓名'];
                    let filterVal = ['realName'];
                    for(let i=1;i<=day;i++)
                    {
                        filterVal.push(i)
                        tHeader.push(i+"号"+this.weekList[i-1])
                    }
                   // tHeader.push(headerlist);
                    tHeader.push('值班合计');

                    // 上面设置Excel的表格第一行的标题
                  //  filterVal.push(columnlist);
                    filterVal.push('total')
                    // 上面的index、nickName、name是tableData里对象的属性
                    const list = this.tables;  //把data里的tableData存到list
           //         console.log(list)
                    const data = this.formatJson(filterVal, list);

                    export_json_to_excel(tHeader, data, monthString+'值班表');
                })
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

            /**
             * 获取日期对应的星期
             * @param now
             * @returns {string}
             */
           getWeekDate(now) {
        //  var now = new Date();
            var day = now.getDay();
            var weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
            var week = weeks[day];
            return week;
    },

            /**
             * 获取月对应的星期列表
             */
            getMonthWeekList(){
                var day =new Date()
                if (this.month != '')
                {
                    day = this.month
                }
                var year = day.getFullYear();
                var month = day.getMonth()+1;
                var now = new Date(year,month,0);//日为0使日期变成上个月最后一天，所以这里的month会变成month-1，由于value值是1-12，所以month-1是当前月份。
                // alert(now)
               var dayCount = now.getDate();//获取月份的天数
                var weekList =[]
                for (var i=0;i<dayCount;i++)
                {
                   var listDay = new Date(year,month-1,i+1);//所选月份第一天
                    weekList.push(this.getWeekDate(listDay))
                }
           /*     console.log("星期列表")*/
                this.weekList =weekList
            },
            /**
             * 设置前15天的表头
             */
            setFrontDayColumn: function () {
                this.showColumnList = new Array(15)
                for (var i = 1; i <= 15; i++) {
                    this.showColumnList[i - 1] = i
                }
            },
            //按钮设置前15天表头
            getFrontDay(){

                if (this.dayCount ==2)
                {
                    this.setFrontDayColumn();
                }
                this.dayCount =1
            },
            //按钮设置15天以后的表头
            getBackDay(){
                if (this.dayCount ==1)
                {
                    var day = this.mGetDate(this.nowdate);
                    this.showColumnList =new Array(day-15)
                    for ( var i = 16; i < day+1; i++) {
                        this.showColumnList[i-16] = i
                //        console.log(this.showColumnList)
                    }
                    this.dayCount =2
                }
            },

            /**
             * 返回主页
             */
            backToHome(){
                this.$router.push("/Home")

            },
            /**
             * 设置列表按钮属性
             * @param key
             * @returns {string}
             */
            buttonType(key){
                if (key==1) return "danger"
            },
            saveTimeToDataBase: function (params) {
                this.$api.timeSchedule.save(params).then(res => {
                    if (res != "ok") {
                        alert("保存失败，请重新尝试")
                    }else {
                        alert("保存成功")
                    }
                })
            },
            /**
             * 保存前一天提醒的时间到数据库
             */
            saveYesterTime:function(){
                var params = {id:1,time:this.setTime1,taskId:1}
                this.saveTimeToDataBase(params);
            },
            /**
             * 保存当天提醒时间到数据库
             */
            saveThisTime:function(){
                var params = {id:2,time:this.setTime2,taskId:2}
                this.saveTimeToDataBase(params);
            },
            /**
             * 保存值班表到数据库
             */
            saveTable:function(){
            var tableSave =[]
               /* console.log("savetable")
               console.log(this.tables)*/
                this.tables.forEach(table=>{
                    var duty =''
                    var paramslist =[]
                    for (var i =0;i<=31;i++){
                        paramslist.push(i)
                    }
                    Object.getOwnPropertyNames(table).forEach(function(val, idx, array) {
                        if (val in paramslist)
                        {
                            duty=duty+table[val]+","
                        }
                    });
                    duty =duty.substr(0,duty.length-1)
                    if (this.monthString=='')
                    {
                        if(this.month==''){
                            this.month =new Date()
                        }
                        //获取当前年月，拼接成字符串
                        this.monthString =this.getYearAndMonth(this.month)
                    }
                   var  tableTem = {name:table.name,realName:table.realName,duty:duty,month:this.monthString,total:table.total}
                  tableSave.push(tableTem)
                })
                this.monthString =''
                this.$api.duty.save(tableSave).then((res)=>{
                    if (res != "ok") {
                        alert("保存失败，请重新尝试")
                    }
                })
            },
            /**
             * 该函数应该没有使用
             * @param h
             * @param column
             * @param $index
             */
            changeLabel:function(h, { column, $index }){
        //        console.log(column);
            },
            /**
             * 设置显示月份
             */
            setMonthChange:function(){
                if (this.month=='')
                {
                    this.month =new Date()
                }
         /*       console.log("选择月："+this.month)
               console.log(this.getYearAndMonth(this.month))*/
                this.loading = true
                this.dayCount =1
                this.getDayList(this.month)
                this.getTables(this.month)
                this.loading = false
              //  console.log("after:"+this.getYearAndMonth(this.month))

            },
            /**
             * 设置是否值班
             **/
            changeStatus:function(scope,col){

         /*       console.log("改变之前的tables数")
                console.log(scope)
                console.log(this.tables[scope.$index][col])*/
                if (scope.row[col] ==0){
                    scope.row[col] = 1
                    scope.row["total"]+=1
                }else {
                    scope.row[col] = 0
                    scope.row["total"]-=1
                }
             /*   console.log("改变之后的tables数")
                console.log( this.tables[scope.$index][col] )*/
                /**
                 * 重新加载数据
                 */
                this.$set(this.tables,scope.$index,this.tables[scope.$index]);
             /*   console.log("last tables")
                console.log(this.tables)*/
            },
            /**
             * 获取日期的年月字符串如2019-10
             * @param date
             * @returns {string}
             */
            getYearAndMonth:function(date) {
                var newyear = date.getFullYear(); //得到当前日期年份
                var newmonth = date.getMonth() + 1; //得到当前日期月份（注意： getMonth()方法一月为 0, 二月为 1, 以此类推。）
               // var day = date.getDate(); //得到当前某日日期（1-31）
                newmonth = (newmonth < 10 ? "0" + newmonth : newmonth); //10月以下的月份自动加0
                return newyear + "-" + newmonth;
            },
            //获取月天数
             mGetDate:function(date){
                if (date==null||date =='')
                {
                     date = new Date();
                }
                 this.nowdate =date
              var year = date.getFullYear();
              var month = date.getMonth()+1;
              var d = new Date(year, month, 0);
         /*     console.log(d)
              console.log("月天数")
              console.log(d.getDate())
                 console.log(d.getDay())*/
              return d.getDate();
            },

            getDayList:function(data){
            //    this.columnList =[]
                this.getMonthWeekList()
                var column =[]
               var day = this.mGetDate(data);
                for ( var i = 1; i < day+1; i++) {
                    column[i-1] = i
                }
                var toFront = document.getElementById("toFront");
                var toBack = document.getElementById("toBack");
                var toBackButtonString = '16-'+ day +'日'
                toBack.innerHTML = toBackButtonString;
                this.columnList = column
                this.setFrontDayColumn()
            },
            /**
             * 获取数据表内容
             * @param data
             */
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
           //     console.log("duty"+duty)
                var tablet =[]
                this.$api.duty.list(duty).then((res) => {
              //      console.log(res)
                   res.forEach(ele=>{
                       var tablest ={}
                       Object.getOwnPropertyNames(ele).forEach(function(e, idx, array) {
                //       ele.forEach(e=>{

                           //对duty属性的列进行拆分
                           if (e == "duty"){

                               var dt = ele[e].split(",")
                               Object.getOwnPropertyNames(dt).forEach(function(dtd, idx, array) {
                  //                 dt.forEach(dtd=>{
                                   tablest[(parseInt(dtd)+1)] =parseInt(dt[dtd])
                            //       tablest.add(dtd,dt[dtd])
                               })
                 //              console.log(dt)
                           }else {
                               tablest[e] =ele[e]
                    //           tablest.add(e,ele[e])
                           }
                       })
                 //      console.log("tablest"+tablest)
                      tablet.push(tablest)
                   })
             //       console.log(tablet)
                    this.tables = tablet
                    //格式化数据库数据
                    //如果数据库中数据不存在，则查询用户表生成相应数据
                    if (res ==null ||res == '')
                    {
                        this.$api.monitoruser.list().then((res) => {
                      //      console.log(res.length)
                            for (var i = 0;i<res.length;i++){
                                var name ={"realName" : res[i].realName,"name" : res[i].name,"total":0}
                                this.tables.push(name)
                          //      var total ={"total" : 0}
                          //      this.tables.push(total)

                                //         console.log(this.tables)
                            }
                       /*     console.log("table")
                            console.log(this.tables[0].realName)
                            console.log(this.tables)
                            console.log(this.tables.length)
                            console.log(this.columnList.length)*/
                            for (var j=0;j<this.tables.length;j++){
                                for (var i=1; i<this.columnList.length+1;i++)
                                {
                                    this.tables[j][i] = 0
                                }
                            }
                           // console.log("生成的table:"+this.tables)

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
