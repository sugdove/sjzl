<template>
  <div class="top_heander">
    <div>
      <a :href="`${baseURL}/portal/system`" target="_blank">{{otherName}}</a>
    </div>
    <div>
      <span class="help">
        <a href="javascript:;">
          <svg-icon icon-class="help" />帮助中心
        </a>
      </span>
      <span class="help" @click="messageFn">
        <el-badge :value="msgNum" class="item">
          <el-button circle class="el-icon-message" style="padding:10px;"></el-button>
          <!--  <a :href="`${baseURL}/portal/messageCenter`" target="_blank">
            <el-button circle class="el-icon-message" style="padding:10px;"></el-button>
          </a>-->
        </el-badge>
      </span>
      <div class="login_header_desc">
        <div v-if="isLogin" class="isLogin">
          <img
            src="https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d4c9df02d7b44aed464eb8e4831d876a/bf096b63f6246b605ee26e3ce6f81a4c500fa28e.jpg"
          />
          <el-dropdown>
            <span class="el-dropdown-link">
              欢迎 {{realname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button @click="userCenter" type="text">个人中心</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <a @click="open">退出登录</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else class="unLogin">
          <span>登录</span>
          <span>注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { msgStatus,getInfo } from '@/api/menhu.js';
import { removeToken } from '@/utils/auth';
import { mapGetters } from 'vuex';
import { goHref } from '@/utils/index';
export default {
  name: 'tops',
  data() {
    return {
      isLogin: true,
      otherName: '系统管理面板',
      baseURL: `${window.location.origin}/admin/#`,
      otherPath: '',
      msgNum: 0,
      realname:''
      // user:""
    };
  },
  computed: {
    // ...mapGetters(['realname'])
  },
  mounted() {
    msgStatus({ msgStatus: 0 }).then(res => {
      this.msgNum = res.total;
    });
  },
  methods: {
    open() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout();
      });
    },
    logout() {
      this.dialogVisible = false;
      removeToken();
      goHref(this.baseURL + '/login');
    },
    userCenter() {
      goHref(this.baseURL + '/portal/center/mannger');
    },
    messageFn() {
      goHref(this.baseURL + '/portal/messageCenter');
    },
    getInfo(){
      getInfo().then(res=>{
        this.realname = res.realName
      })
    }
  },
  mounted(){
    this.getInfo()
  }
};
</script>

<style lang="scss" scoped>
.top_heander {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
  color: #666666;
  font-size: 12px;
  a {
    color: #666666;
    text-decoration: none;
  }
  .loginout {
    padding-left: 10px;
  }
  .help {
    padding: 0 10px;
    a {
      color: #666666;
      text-decoration: none;
    }
  }
  .item {
    display: inline;
  }
  .login_header_desc {
    float: right;
    margin: 0 20px;
    color: #666;
    .isLogin {
      font-size: 20px;
      cursor: pointer;
      img {
        width: 40px;
        vertical-align: middle;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
        cursor: pointer;
      }
      .el-dropdown-link {
        display: inline;
        color: #666;
      }
      .el-dropdown {
        display: inline;
      }
    }
    .unLogin {
      span {
        font-size: 20px;
        padding: 10px 20px;
        cursor: pointer;
        border: 1px solid #a0c8f9;
      }
    }
  }
}
</style>
