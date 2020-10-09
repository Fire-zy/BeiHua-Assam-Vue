<template>
  <!-- 区域左边 -->
  <div class="main-left">
    <!-- 数据试图表单 -->
    <el-card class="dataForm" shadow="hover">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-input placeholder="人员信息" v-model="form.name"></el-input>
          <el-input
            placeholder="演示人员信息"
            v-model="form.showname"
          ></el-input>
          <el-select
            style="width: 100%"
            v-model="form.region"
            placeholder="选择数据库"
            @change="chooseCore($event)"
          >
            <el-option
              v-for="role in optionList"
              :key="role.id"
              :label="role.sourceName"
              :value="role.id"
            ></el-option>
          </el-select>
        </el-form>
      </div>
    </el-card>

    <!-- 数据源信息 -->
    <el-card class="dataInformation" shadow="hover">
      <div>
        <el-input
          placeholder="搜索表/字段名称"
          prefix-icon="el-icon-search"
          v-model="dataSourceConfigId"
        >
        </el-input>
      </div>
      <div class="showList">
        <el-scrollbar style="height: 100%">
          <el-tree
            :data="dataList"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-scrollbar>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSourceList, querysource } from "@/api/user";

export default {
  data() {
    return {
      optionList: [],
      // 获取列表传值
      dataSourceConfigId: "",
      // 左边渲染的列表数组
      dataList: [],
      //   调用sql测试的id
      tenantDatasourceConfigId: "1003",//暂时默认
      // 提交表单
      form: {
        name: "",
        showname: "",
        region: "",
      },
      defaultProps: {
        label: "label",
        children: "children",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
    },
    //   获取选择数据库的id
    chooseCore(event) {
      this.getSource({ dataSourceConfigId: event });
      this.$emit('infolistMsg',event)
      
    },
    // 获取数据库名
    getList() {
      querysource().then((resp) => {
        if (resp.code == 200) {
          for (var i = 0; i < resp.data.length; i++) {
            this.optionList.push({
              sourceName: resp.data[i].sourceName,
              id: resp.data[i].id,
            });
          }
        }
      });
    },
    // 获取数据库表
    getSource(id) {
      //   var _this=this;
      getSourceList(id).then((res) => {
        let data = res.data;
        let tableInfo = new Array();
        for (var i = 0; i < data.length; i++) {
          var parm1;
          var parm2;
          var item;
          for (var j in data[i]) {
            parm1 = j;
            parm2 = data[i][j];

            //    console.log(parm1,parm2)
            item = this.generation(parm1, parm2);
          }
          tableInfo.push(item);
        }
        this.dataList = tableInfo;
      });
    },
    generation(parm1, parm2) {
      let ele = {};
      (ele.label = parm1), (ele.children = new Array());

      for (var i = 0; i < parm2.length; i++) {
        ele.children[i] = {};
        ele.children[i].label = parm2[i].COLUMN_NAME;
      }
      return ele;
    },
  },
};
</script>

<style lang="scss" scoped>
/* 左边样式 */
.main-left {
  width: 20%;
  height: 550px;
  margin: 5px;
}

.dataForm {
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  background-color: #eaedf1;
}

.dataInformation {
  width: 100%;
  height: 380px;
  background-color: #eaedf1;
}

.showList {
  height: 300px;
}

/* 修改input框 */
.el-input {
  margin-bottom: 15px;
}
</style>