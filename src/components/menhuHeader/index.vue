<template>
  <div class="headerTop">
    <div class="top_heander">
      <div class="top_header_main">
        <div class="title">
          <div class="title_logo">
            <!--<img src="./img/logo.png" alt /> -->
             <div class="title_logo_desc">
              <p>数据治理系统</p>
              <!--<p>数据资产管理系统</p>-->
            </div>
          </div>
        </div>
        <div style="width:100%; text-align: right!important;">
          <a href="/admin/#/portal/appDown" class="app_down_wrap">
            <img src="./img/app_down.png" alt="APP下载" />
          </a>
          <a :href="otherPath">{{otherName}}</a>
          <span class="help">
            <a href="/mockData/data.json" target="_blank">
              <!-- <svg-icon icon-class="help" /> -->
              帮助中心
            </a>
          </span>

          <span class="msgMun_wrap" @click="messageFn">
            信息中心
            <span class="item">
              <el-badge :value="msgMun">
                <i class="message-icon el-icon-message" style="font-size:24px"></i>
                <!-- <el-button type='text' class="el-icon-message"></el-button> -->
              </el-badge>
            </span>
          </span>
          <div class="login_header_desc">
            <div v-if="isLogin" class="isLogin">
              <img v-if="user.avatar" :src="adminURL + user.avatar" :onerror="defaultImg" />
              <img v-else src="./img/header_img.jpg" />
              <el-dropdown>
                <span class="el-dropdown-link">
                  欢迎 {{realname}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu class="dropdown_wrap_user" slot="dropdown">
                  <el-dropdown-item>
                    <a style="display:block" href="/admin/#/portal/center">个人中心</a>
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
                  <a style="font-size:18px" :href="item.url + '?token=' + getToken()">{{item.name}}</a>
                </el-menu-item>
              </template>
              <template v-else>
                <el-submenu :index="item.path" :key="index">
                  <template slot="title">{{item.name}}</template>
                  <el-menu-item
                    v-for="(_item,index) in item.children"
                    :index="_item.path"
                    :key="index"
                    class="el-menu_sub_wrap"
                  >
                    <a style="display:block;" :href="_item.path">{{_item.name}}</a>
                  </el-menu-item>
                </el-submenu>
              </template>
            </template>
          </el-menu>
          <!-- <div class="search">
            <el-form :inline="true">
              <el-form-item>
                <el-input style="width:245px" v-model="searchValue" placeholder="输入您想查找的信息进行搜索"></el-input>
              </el-form-item>
              <el-form-item class="searchBtn">
                <el-button class="el-icon-search" @click="searchFn" type="text" circle></el-button>
              </el-form-item>
            </el-form>
          </div>-->
        </div>
        <!-- <div class="shine shine2"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getToken } from "@/utils/auth";
import { removeToken } from "@/utils/auth";
import { getInfo } from "@/api/menhu.js";
import { buildMenus, msgStatus, getAvatar } from "@/api/menu";
const originURL = window.location.origin;
export default {
  name: "Header",
  props: {
    type: "",
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
      user: "",
      realname: "",
    };
  },
  mounted() {},
  computed: {},
  created() {
    this.getInfo();
  },
  mounted() {
    this.getInfo();
    buildMenus({ portal: 2, level: 1 }).then((res) => {
      this.otherName = res[0].name;
    });
    buildMenus({ portal: 1, level: 2 }).then((res) => {
      let menuData = [];
      let OriginData = this.data;
      res.forEach((item) => {
        if (item.children.length > 1) {
          menuData.push({
            name: item.name,
            url: item.path,
            path: item.component,
            redirect: item.redirect,
            children: item.children ? item.children : [],
          });
        } else {
          menuData.push({
            name: item.name,
            url: item.path,
            path: item.component,
            redirect: item.redirect,
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
        type: "warning",
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
      getAvatar({ id: this.user.id }).then((res) => {
        this.avatar = res.avatar;
      });
    },
    getInfo() {
      getInfo().then((res) => {
        this.user = res;
        this.realname = res.realName;
        this.getAvatar();
        msgStatus({ msgStatus: 0, receiver: this.user.id }).then((res) => {
          this.msgMun = res.total;
        });
      });
    },
    toUserCenter() {
      document.location.href = "/admin/#/portal/center";
    },
  },
  watch: {
    ["$route.path"](val) {
      this.menuActive();
    },
  },
};
</script>

<style lang="scss" scoped>
.headerTop {
  background: url("./img/top_bg1.png") no-repeat;
  background-size: 100% 100%;
  height: 153px;
}
.top_heander {
  padding: 0 20px;
  height: 50px;
  padding-top: 10px;
  .top_header_main {
    display: flex;
    justify-content: space-between;
    text-align: right !important;
    align-items: center;
    line-height: 50px;
    color: #fff;
    width: 90%;
    font-size: 14px;
    position: relative;
    margin: 0 auto;
    .title {
      color: #fff;
      font-size: 23px;
      font-weight: bold;
      position: absolute;
      top: 5px;
      text-align: left;
      .title_logo {
        display: flex;
        img {
          width: 96px;
          height: 96px;
          margin-right: 10px;
          margin-top: 15px;
          vertical-align: middle;
        }
        .title_logo_desc {
          position: relative;
          padding-top: 33px;
          padding-left: 12px;
          p {
            margin: 0;
            padding: 0;
            line-height: 1.5;
            &:nth-of-type(1) {
              width: 400px;
              letter-spacing: 3px;
            }
            &:nth-of-type(2) {
              font-size: 20px;
              font-weight: 500;
              letter-spacing: 10px;
            }
          }
          /* span {
            position: absolute;
            bottom: 0px;
            left: 104px;
            font-size: 20px;
            font-weight: 500;
            letter-spacing: 10px;
          } */
        }
      }

      /* position: relative; */
      /* top: -15px;
      */
    }
    a {
      color: #fff;
    }
    .app_down_wrap {
      margin-right: 26px;
      margin-top: 10px;
      position: relative;
      display: inline-block;
      width: 70px;
      img {
        position: absolute;
        left: 0px;
        top: -14px;
      }
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
    .msgMun_wrap {
      cursor: pointer;
      position: relative;
      display: inline-block;
      width: 93px;
      text-align: left;
    }
    .item {
      display: inline;
      font-size: 13px;
      margin-left: 10px;
      position: absolute;
      top: 4px;
      /deep/ .el-badge__content.is-fixed {
        top: 8px;
      }
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
          border: 1px solid #fff;
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
  height: 100px;
  line-height: 100px;
  background-color: transparent;
  // background: url("./img/header_bg.png") no-repeat;
  // background-size: 100% 100%;
  overflow: hidden;

  .login_header_main {
    overflow: hidden;
    width: 100%;
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    padding: 0 20px;

    .menu {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      float: right;
      top: 18px;
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
              color: #f8893e;
            }
            /* border-bottom: 2px solid #1890ff; */
          }
        }
        .is-active {
          color: #f8893e;
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
      .el-menu--horizontal a:focus {
        color: #f8893e;
      }
      .el-menu {
        background: transparent;
      }
      .el-menu.el-menu--horizontal {
        border-bottom: none;
      }
      .el-menu--horizontal > .el-submenu .el-submenu__title {
        color: #fff;
        font-size: 18px;
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
        color: #f8893e;
        font-size: 18px;
      }
      .el-menu-item a {
        display: block;
      }
      .el-menu--horizontal > .el-submenu.is-active .el-submenu__title i {
        color: #f8893e;
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
<style lang="scss">
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  /* background-color: rgba(217,226,238, 0.9); */
  background-color: transparent;
  font-size: 18px;
}
.el-menu--popup-bottom-start {
  background: url("./img/sub_title.png") no-repeat;
  background-size: 100%;
  /* background-color: rgba(255, 255, 255, 0.7); */
  padding: 20px 0;
  min-width: 150px;
  text-align: center;
  overflow: hidden;
  border-radius: 7px;
  /* box-shadow: -5px 5px 10px #507092, 5px 5px 10px #507092,5px 5px 10px #507092; */

  /* box-shadow: 10px 10px 10px #000; */
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover a {
  color: #f8893e;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  color: #f8893e;
}
/* .el-menu--horizontal a:focus,
a:hover {
  color: #0e4a93;
} */
.el-menu--horizontal a {
  color: #0e4a93;
}
</style>