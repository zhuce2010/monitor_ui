<template>
  <div class="boxShadow">
    <div style="margin-top: 20px">

      <el-table
        :data="tables"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading" :element-loading-text="$t('action.loading')"
       >
        <el-table-column label="序号" width="62px" type="index">
        </el-table-column>
        <el-table-column label="姓名" width="82px" align="center" prop="realName">
        </el-table-column>
        <template v-for='(col) in columnList'>
          <el-table-column
            :prop = "String(col)"
            :label= "String(col)+'号'"
            align="center"
            width = "104px">
            <template slot-scope="scope">
              <el-button  v-for="item in monitorTypeOptions" :key="item.key"  v-if="scope.row[col].toString() === item.key" @click="changeStatus(scope,col)">
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
            dictId: {
                type: Number,
                required: true
            },
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
                loading:false,
                monitorTypeOptions: [
                    {key:"1", display_name: '值班'},
                    {key:"0", display_name: '休息'}
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
                tableData: [{
                    dataItem: 'xiaoxue',
                    dataName: '小学'
                }, {
                    dataItem: 'chuzhong',
                    dataName: '初中'
                }, {
                    dataItem: 'gaozhong',
                    dataName: '高中'
                }, {
                    dataItem: 'daxue',
                    dataName: '大学'
                }, {
                    dataItem: 'yanjiusheng',
                    dataName: '研究生'
                }, {
                    dataItem: 'shangban',
                    dataName: '上班'
                }]
            }
        },
        created() {
            this.loading = false
        },
        methods: {
            changeStatus:function(scope,col){
                console.log(scope.row)
                console.log(col)
               var changenum = scope.row[col]
                console.log(changenum)
                if (changenum ==0){
                    changenum = 1
                }else {
                    changenum =0
                }
                console.log("改变之前的tables数")
                console.log(this.tables[scope.$index][col])
                this.tables[scope.$index][col] =changenum
                console.log("改变之后的tables数")
                console.log( this.tables[scope.$index][col] )
                /**
                 * 重新加载数据
                 */
               var  zanshi =this.tables
                this.tables =zanshi
           //     this.$set(this.$refs.elTable.$data.tables,index,row)

                this.loading =true
                console.log("last tables")
                console.log(this.tables)
                this.loading =false
            },
             mGetDate:function(){
              var date = new Date();
              var year = date.getFullYear();
              var month = date.getMonth()+1;
              var d = new Date(year, month, 0);
              return d.getDate();
            },
            getDayList:function(){
               var day = this.mGetDate();

                for ( var i = 1; i < day+1; i++) {
                    this.columnList[i-1] = i
                }
                console.log(this.columnList)
            },
            getTables :function(){
            this.$api.monitoruser.list().then((res) => {
                console.log(res.length)
                for (var i = 0;i<res.length;i++){
                    console.log("循环")
                    console.log(res[i])
                    console.log(res[i].realName)
                    var realName ={"realName" : res[i].realName}
                    this.tables.push(realName)
                    console.log(this.tables)
                }
                console.log("table")
                console.log(this.tables[0].realName)
                console.log(this.tables.length)
                console.log(this.columnList.length)
                for (var j=0;j<this.tables.length;j++){
                    for (var i=1; i<this.columnList.length+1;i++)
                    {
                        this.tables[j][i] = 0
                    }
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
