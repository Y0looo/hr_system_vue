<template>
  <div class="common-layout">
    <el-container>
      <!-- 导航栏部分 -->
      <el-aside width="300px">
        <el-row class="tac" >
          <el-col :span="24">
            <h3 class="mb-2" style="text-align: center; font-size: 30px;">人事管理系统</h3>
            <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-menu-item index="1" v-if="user.role == '人事管理员' || user.role == '系统管理员'" >
                <el-icon>
                  <Avatar />
                </el-icon>
                <span><router-link to="/home/staff"
                    style="text-decoration: none; color: black; font-size: 20px;" >员工管理</router-link></span>
              </el-menu-item>
              <el-menu-item index="2" v-if="user.role == '人事管理员' || user.role == '系统管理员'">
                <el-icon>
                  <House />
                </el-icon>
                <span><router-link to="/home/dept"
                    style="text-decoration: none; color: black; font-size: 20px;">部门管理</router-link></span>
              </el-menu-item>
              <el-menu-item index="3" v-if="user.role == '人事管理员' || user.role == '系统管理员'">
                <el-icon>
                  <document />
                </el-icon>
                <span><router-link to="/home/salary"
                    style="text-decoration: none; color: black; font-size: 20px;">薪资管理</router-link></span>
              </el-menu-item>
              <el-menu-item index="4" v-if="user.role == '人事管理员' || user.role == '系统管理员'">
                <el-icon><icon-menu /></el-icon>
                <span><router-link to="/home/job"
                    style="text-decoration: none; color: black; font-size: 20px;">岗位管理</router-link></span>
              </el-menu-item>
              <el-menu-item index="5" v-if="user.role == '人事管理员' || user.role == '系统管理员'">
                <el-icon>
                  <DocumentCopy />
                </el-icon>
                <span><router-link to="/home/attend"
                    style="text-decoration: none; color: black; font-size: 20px;">考勤管理</router-link></span>
              </el-menu-item>
              <el-menu-item index="6" v-if="user.role == '人事管理员' || user.role == '系统管理员'">
                <el-icon>
                  <ChatDotSquare />
                </el-icon>
                <span><router-link to="/home/employ"
                    style="text-decoration: none; color: black; font-size: 20px;">招聘管理</router-link></span>
              </el-menu-item>
              <el-menu-item index="7" v-if="user.role == '人事管理员' || user.role == '系统管理员'">
                <el-icon>
                  <Bell />
                </el-icon>
                <span><router-link to="/home/notice"
                    style="text-decoration: none; color: black; font-size: 20px;">公告管理</router-link></span>
              </el-menu-item>
              <el-menu-item index="8" v-if="user.role == '人事管理员' || user.role == '系统管理员'">
                <el-icon>
                  <Memo />
                </el-icon>
                <span><router-link to="/home/records"
                    style="text-decoration: none; color: black; font-size: 20px;">奖惩管理</router-link></span>
              </el-menu-item>
              <el-menu-item index="9" v-if="user.role == '人事管理员' || user.role == '系统管理员'">
                <el-icon>
                  <Histogram />
                </el-icon>
                <span><router-link to="/home/analysis"
                    style="text-decoration: none; color: black; font-size: 20px;">统计分析</router-link></span>
              </el-menu-item>
              
              <el-menu-item index="10" v-if="user.role == '员工'">
                <el-icon>
                  <EditPen />
                </el-icon>
                <span><router-link to="/home/staffAttend"
                    style="text-decoration: none; color: black; font-size: 20px;">打卡考勤</router-link></span>
              </el-menu-item>
              <el-menu-item index="11" v-if="user.role == '员工'">
                <el-icon>
                  <Bell />
                </el-icon>
                <span><router-link to="/home/staffNotice"
                    style="text-decoration: none; color: black; font-size: 20px;">查看公告</router-link></span>
              </el-menu-item>
              <el-menu-item index="12" v-if="user.role == '员工'">
                <el-icon>
                  <Wallet />
                </el-icon>
                <span><router-link to="/home/staffSalary"
                    style="text-decoration: none; color: black; font-size: 20px;">查看薪资</router-link></span>
              </el-menu-item>
              <el-menu-item index="13" v-if="user.role == '员工'">
                <el-icon>
                  <Memo />
                </el-icon>
                <span><router-link to="/home/staffRecords"
                    style="text-decoration: none; color: black; font-size: 20px;">奖惩记录</router-link></span>
              </el-menu-item>
              <el-menu-item index="14">
                <el-icon>
                  <setting />
                </el-icon>
                <span><router-link to="/home/personal"
                    style="text-decoration: none; color: black; font-size: 20px;">个人信息</router-link></span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 主体部分 -->
      <el-container style="margin-top: 20px; margin-right: 20px;">
        <!-- 顶部 -->
        <el-header>
          <div class="demo-type">
            <div>
              <el-dropdown style="float: right;">
                <el-avatar size="large" style="background-color: deepskyblue;"> {{ user.name }} </el-avatar>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                    <!-- <el-dropdown-item>Action 2</el-dropdown-item> -->
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-divider />
        <!-- 正文 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router'
import {
  Document,
  Menu as IconMenu,
  Setting,
  DocumentCopy,
  House,
  Bell,
  Avatar,
  ChatDotSquare,
  Histogram,
  EditPen,
  Wallet,
  Memo
} from '@element-plus/icons-vue'
import { onMounted } from 'vue';

const router = useRouter()

const user = {
  name: localStorage.getItem("name"),
  role: localStorage.getItem("role"),
  s_id: localStorage.getItem("s_id")
}

onMounted(() => {
  if(user.role == '员工') {
    router.push("/home/staffAttend")
  } else if(user.role == '人事管理员') {
    router.push("/home/analysis")
  } else {

  }
  
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const logOut = () => {
  localStorage.clear()
  window.location.href = "/"
}

</script>

<style>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>