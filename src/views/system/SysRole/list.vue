<template>
  <div class="app-container">
    角色列表

    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input style="width: 100%" v-model="searchObj.roleName" placeholder="角色名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>

    <!-- 工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add">添 加</el-button>
      <el-button class="btn-add" size="mini" @click="batchRemove()">批量删除</el-button>
    </div>
    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" title="修改" />
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper" @current-change="fetchData" />
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="sysRole" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api/system/role'
export default {
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      limit: 3,
      searchObj: {},
      listLoading: true,
      sysRole: {},
      dialogVisible: false,
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    batchRemove() {
      var idList = []
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择要删除的角色!'
        })
      } else {
        for (const element in this.multipleSelection) {
          idList.push(this.multipleSelection[element].id)
        }
        api.batchRemove(idList)
        this.fetchData()
      }
    },
    edit(id) {
      api.getRoleById(id).then(response => {
        this.sysRole = response.data
        this.dialogVisible = true
      })
    },
    saveOrUpdate() {
      if (this.sysRole.id) {
        this.updateRole()
      } else {
        this.saveRole()
      }
    },
    saveRole() {
      api.save(this.sysRole).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.dialogVisible = false
        this.fetchData()

      })
    },
    updateRole() {
      api.updateRole(this.sysRole).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.dialogVisible = false
        this.fetchData()
      })
    },
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    fetchData(pageNumb = 1) {
      this.page = pageNumb
      api
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.total = response.data.total
          this.list = response.data.records
          this.listLoading = false
        })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.removeById(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchData()
      })
    },
    add() {
      this.dialogVisible = true
      this.sysRole = {}
    }
  }

}
</script>
