<template>
  <div class="headerTop">
    <div class="top_heander">
      <div class="too_header_main">
        <div>
          <a :href="otherPath">{{otherName}}</a>
        </div>
        <div>
          <!-- <span class="help">
            <a href="javascript:;">
              <svg-icon icon-class="help" />帮助中心
            </a>
          </span> -->
          <span class="help" @click="messageFn">
            <el-badge :value="msgMun" class="item">
              <i class="message-icon el-icon-message"></i>
              <!-- <el-button type='text' class="el-icon-message"></el-button>  -->
            </el-badge>
          </span>
          <div class="login_header_desc">
            <div v-if="isLogin" class="isLogin">
              <img v-if="avatar" :src="adminURL + avatar" />
              <img v-else src="./img/header_img.png" />
              <el-dropdown>
                <span class="el-dropdown-link">
                  欢迎 {{realname}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu class="dropdown_wrap_user" slot="dropdown">
                  <el-dropdown-item>
                    <a style="display:block" @click="toUserCenter">个人中心</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a style="display:block" @click="open">退出登录</a>
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
    </div>
    <div class="login_header">
      <div class="login_header_main">
        <div class="title">
          <!-- <img src="./img/logo.png" alt /> -->
          数据资产管理系统
        </div>
        <div class="menu">
          <el-menu
            :default-active="activeMenu"
            class="navs_home"
            mode="horizontal"
            @select="handleSelect"
          >
            <template v-for="(item,index) in data">
              <template v-if="!item.children">
                <el-menu-item :index="item.url" :key="index">
                  <a :href="item.url + '?token=' + getToken()">{{item.name}}</a>
                </el-menu-item>
              </template>
              <template v-else>
                <el-submenu :index="item.path" :key="index">
                  <template slot="title">{{item.name}}</template>
                  <el-menu-item
                    v-for="(_item,index) in item.children"
                    :index="_item.path"
                    :key="index"
                  >
                    <a
                      style="display:block"
                      :href="_item.path + '?token=' + getToken()"
                    >{{_item.name}}</a>
                  </el-menu-item>
                </el-submenu>
              </template>
            </template>
          </el-menu>
          <div class="search">
            <el-form :inline="true">
              <el-form-item>
                <el-input style="width:245px" v-model="searchValue" placeholder="输入您想查找的信息进行搜索"></el-input>
              </el-form-item>
              <el-form-item class="searchBtn">
                <el-button class="el-icon-search" @click="searchFn" type="text" circle></el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="shine shine2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getToken } from "@/utils/auth";
import { removeToken } from '@/utils/auth';
import { getInfo } from '@/api/menhu.js';
import { buildMenus, msgStatus, getAvatar } from "@/api/menu";
const originURL  = window.location.origin
export default {
  name: "Header",
  props: {
    type: ""
  },
  data() {
    return {
      isLogin: true,
      otherName: "系统管理面板",
      activeMenu: this.$route.path,
      form: "",
      adminURL: originURL + "/menhu",
      searchValue: "",
      msgMun: 0,
      data: [],
      avatar: "",
      otherPath: "/admin/#/portal/system",
      user:'',
      realname:''
    };
  },
  mounted() {},
  computed: {
  },
  created(){
     this.getInfo();
  },
  mounted() {
    this.getInfo()
    buildMenus({ portal: 2, level: 1 }).then(res => {
      this.otherName = res[0].name;
    });
    buildMenus({ portal: 1, level: 2 }).then(res => {
      let menuData = [];
      let OriginData = this.data;
      res.forEach(item => {
        if (item.children.length > 1) {
          menuData.push({
            name: item.name,
            url: item.path,
            path: item.component,
            redirect: item.redirect,
            children: item.children ? item.children : []
          });
        } else {
          menuData.push({
            name: item.name,
            url: item.path,
            path: item.component,
            redirect: item.redirect
          });
        }
      });
      this.data = menuData;
    });
    this.menuActive();
  },
  methods: {
    open() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.logout();
      });
    },
    logout() {
      this.dialogVisible = false;
      removeToken();
      location.href = "/sjzl/#/login";
      /*this.$store.dispatch("LogOut").then(() => {
        location.href = "/admin/#/login";
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      });*/
    },
    messageFn() {
      location.href = "/admin/#/portal/messageCenter";
      // this.$router.push('/portal/messageCenter')
    },
    getToken() {
      return getToken();
    },
    handleSelect(a, b) {
      // console.log(a, b);
    },
    searchFn() {
      window.location = "/admin/#/portal/search?value=" + this.searchValue;
    },
    menuActive() {
      const currentMune =
        this.$route.query.type === "user"
          ? "/portal/index"
          : this.$route.meta.active
          ? this.$route.meta.active
          : "/portal/index";
      this.activeMenu = "/admin/#" + currentMune;
    },
    getAvatar() {
      getAvatar({id:this.user.id}).then(res => {
        this.avatar = res.avatar;
      });
    },
    getInfo(){
      getInfo().then(res=>{
        this.user = res
        this.realname = res.realName
        this.getAvatar()
    msgStatus({ msgStatus: 0 ,receiver:this.user.id}).then(res => {
      this.msgMun = res.total;
    });
      })
    },
    toUserCenter(){
      document.location.href = '/admin/#/portal/center'
    }
  },
  watch: {
    ["$route.path"](val) {
      this.menuActive();
    }
  }
};
</script>

<style lang="scss" scoped>
.top_heander {
  padding: 0 20px;

  background: url("./img/top_bg.png") no-repeat;
  background-size: cover;
  .too_header_main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    color: #fff;
    width: 90%;
    font-size: 12px;
    margin: 0 auto;
    a {
      color: #fff;
      text-decoration: none;
    }
    .loginout {
      padding-left: 10px;
    }
    .help {
      padding: 0 10px;
      .message-icon {
        font-size: 33px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
    .item {
      display: inline;
    }
    .login_header_desc {
      float: right;
      margin: 0 20px;
      color: #fff;
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
        .dropdown_wrap_user {
          .el-dropdown-menu__item {
            padding: 0 0px;
          }
        }

        .el-dropdown-link {
          display: inline;
          color: #fff;
        }
        .el-dropdown {
          display: inline;
        }
        span {
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
}
/deep/ .login_header {
  height: 80px;
  line-height: 80px;
  /* background-color: #409eff; */
  background: url("./img/header_bg.png") no-repeat;
  background-size: cover;
  overflow: hidden;

  .login_header_main {
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 90%;
    margin: 0 auto;
    padding: 0 20px;
    .title {
      color: #fff;
      font-size: 22px;
      font-weight: bold;

      img {
        width: 50px;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
    .menu {
      display: flex;
      justify-content: center;
      align-items: center;
      .navs_home {
        .el-menu-item {
          /* width: 170px; */
          width: 90px;
          text-align: center;
          /* height: 61px; */
          color: #fff;
          /* line-height: 61px; */
          .is-active {
            a {
               color: #a0c8f9;
            }
            /* border-bottom: 2px solid #1890ff; */
          }
        }
        .is-active {
          color: #a0c8f9;
          border-bottom: none;
        }
        .el-menu--horizontal > .el-menu-item.is-active {
          border-bottom: none;
        }
      }
      .el-menu-item:hover,
      .el-menu-item:focus {
        background-color: transparent;
      }
      .el-menu {
        background: transparent;
      }
      .el-menu.el-menu--horizontal {
        border-bottom: none;
      }
      .el-menu--horizontal > .el-submenu .el-submenu__title {
        color: #fff;
      }
      .el-submenu__title i {
        color: #fff;
      }
      .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
        background-color: transparent;
      }
      .el-menu--horizontal > .el-menu-item {
        border-bottom: none;
        padding: 0;
      }
      .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
        border-bottom: none;
        color: #a0c8f9;
      }
      .el-menu-item a {
        display: block;
      }
      .el-menu--horizontal > .el-submenu.is-active .el-submenu__title i {
        color: #a0c8f9;
      }
      .el-menu--horizontal > .el-submenu .el-submenu__title {
        border-bottom: none;
      }
      /* ul {
        list-style: none;
        overflow: hidden;
        margin: 0;
        padding: 0;
        li {
          float: left;
          color: #fff;
          margin-left: 30px;
        }
        .active {
          color: #f8f8f8;
          border-bottom: 3px solid #f8f8f8;
          display: inline-block;
          height: 63px;
        }
      } */
    }
    .search {
      margin-left: 40px;
      position: relative;
      .searchBtn {
        position: absolute;
        right: 0px;
        top: 0px;
        color: #fff;
      }
    }
    .el-form--inline .el-form-item {
      margin-bottom: 0px;
      margin-right: 0;
    }
    .el-form--inline .el-form-item__content {
      vertical-align: middle;
    }
    .shine {
      background-image: url("./img/shine.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 77px;
      height: 33px;
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      top: -2px;
      animation: opacity-change 1s ease-in-out infinite;
      -webkit-animation: opacity-change 1s ease-in-out infinite;
      -moz-animation: opacity-change 1s ease-in-out infinite;
      -o-animation: opacity-change 1s ease-in-out infinite;
    }
    .shine2 {
      animation: opacity-change 1.75s ease-in-out infinite;
      -webkit-animation: opacity-change 1.75s ease-in-out infinite;
      -moz-animation: opacity-change 1.75s ease-in-out infinite;
      -o-animation: opacity-change 1.75s ease-in-out infinite;
    }
    @keyframes opacity-change {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
}
</style>