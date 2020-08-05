<template>
  <div class="headerTop">
    <div class="top_heander">
      <div>
        <a :href="otherPath">{{otherName}}</a>
      </div>
      <div>
        <span class="help">
          <a href="javascript:;">
            <svg-icon icon-class="help" />帮助中心
          </a>
        </span>
        <span class="help" @click="messageFn">
          <el-badge :value="msgMun" class="item">
            <el-button circle class="el-icon-message"></el-button>
          </el-badge>
        </span>
        <div class="login_header_desc">
          <div v-if="isLogin" class="isLogin">
            <img v-if="avatar" :src="adminURL + avatar" />
            <img
              v-else
              src="https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d4c9df02d7b44aed464eb8e4831d876a/bf096b63f6246b605ee26e3ce6f81a4c500fa28e.jpg"
            />
            <el-dropdown>
              <span class="el-dropdown-link">
                欢迎 {{user.realname}}
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
    <div class="login_header">
      <div class="login_header_main">
        <div class="title">数据资产管理系统</div>
        <div class="menu">
          <!-- <el-menu ref="elMenu" :default-active="activeMenu" class="navs_home" mode="horizontal">
            <el-menu-item v-for="(item,index) in data" :key="index">
              <template v-if="item.redirect === 'redirect'">
                <el-menu-item>
                  <a :href="item.url + '?token=' + getToken()" target="_blank">{{item.name}}</a>
                </el-menu-item>
              </template>
              <template v-else>
                <el-menu-item :index="item.url">
                  <router-link :to="item.url">{{item.name}}</router-link>
                </el-menu-item>
              </template>
            </el-menu-item>
          </el-menu>-->
          <el-menu class="navs_home" mode="horizontal" @select="handleSelect">
            <template v-for="(item,index) in data">
              <template v-if="!item.children">
                <el-menu-item
                  index="/portal/dataMenu/theme"
                  :key="index"
                  :class="{'activeMenu':setActiveMenu(item.url)}"
                >
                  <a
                    v-if="item.name === '首页'"
                    :href="item.url + '?token=' + getToken()"
                  >{{item.name}}</a>
                  <a v-else :href="item.url + '?token=' + getToken()" target="_blank">{{item.name}}</a>
                </el-menu-item>
              </template>
              <template v-else>
                <el-submenu
                  :index="item.path"
                  :key="index"
                  :class="{'is-active' : type === 'theme'}"
                >
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
                <!-- <a href="javascript:;">
                  <i class="el-icon-search"></i>
                  搜索
                </a>-->
                <el-button class="el-icon-search" @click="searchFn" circle></el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getToken } from "@/utils/auth";
import { removeToken } from '@/utils/auth';
import { buildMenus, msgStatus, getAvatar } from "@/api/menu";
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
      adminURL: originUrl + "/menhu",
      searchValue: "",
      msgMun: 0,
      avatar: "",
      data: [
        // {
        //   name: "首页",
        //   url: "/admin/#/portal/index",
        //   path: "/portal/index",
        //   index: 0
        // },
        // {
        //   name: "信息填报",
        //   open: true,
        //   url: "",
        //   index: 1
        // },
        // {
        //   name: "数据治理",
        //   open: true,
        //   url: "",
        //   index: 2
        // },
        // {
        //   name: "数据目录",
        //   url: "dataMenu"
        // },
        // {
        //   name: "专题分析",
        //   url: 4
        // },
        // {
        //   name: "数据服务",
        //   url: 5
        // }
      ],
      otherPath: "/admin/#/portal/system"
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  mounted() {
    this.getAvatar();
    buildMenus({ portal: 2, level: 1 }).then(res => {
      this.otherName = res[0].name;
      // this.otherPath = res[0].path;
    });
    buildMenus({ portal: 1, level: 2 }).then(res => {
      const menuData = [];
      const OriginData = this.data;
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
      // OriginData = OriginData.concat(menuData);
      this.data = menuData;
      console.log(menuData);
    });
    const currentMune = this.$route.path;
    msgStatus({ msgStatus: 0 }).then(res => {
      this.msgMun = res.total;
    });
    // this.activeMenu = currentMune;
  },
  methods: {
    // 计算菜单是否高亮(高亮专题分析)
    setActiveMenu(url) {
      return (
        url.includes("/subjectmsa") && this.activeMenu.includes("/subjectmsa")
      );
    },
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
       location.reload()
      /* this.$store.dispatch('LogOut').then(() => {
        location.href = '/sjzl/#/login';
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      }); */
    },
    messageFn() {
      location.href = "/admin/#/portal/messageCenter";
      // this.$router.push('/portal/messageCenter')
    },
    getToken() {
      return getToken();
    },
    handleSelect(a, b) {
      console.log(a, b);
    },
    searchFn() {
      window.location = "/admin/#/portal/search?value=" + this.searchValue;
      // this.$router.push("/admin/#/portal/search");
    },
    getAvatar() {
      getAvatar().then(res => {
        this.avatar = res.avatar;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #909399;
}
.top_heander {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
  color: #666666;
  font-size: 12px;
  .loginout {
    padding-left: 10px;
  }
  .help {
    padding: 0 10px;
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
      .dropdown_wrap_user {
        .el-dropdown-menu__item {
          padding: 0 0px;
        }
      }

      .el-dropdown-link {
        display: inline;
        color: #666;
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
/deep/ .login_header {
  height: 80px;
  line-height: 80px;
  background-color: #409eff;
  overflow: hidden;

  .login_header_main {
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    .title {
      color: #fff;
      font-size: 22px;
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
          &.activeMenu a {
            color: rgb(0, 0, 255);
          }
          .is-active {
            color: rgb(0, 0, 255);
            /* border-bottom: 2px solid #1890ff; */
          }
        }
        .is-active {
          color: rgb(0, 0, 255);
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
        color: rgb(0, 0, 255);
      }
      .el-menu-item a {
        display: block;
      }
      .el-menu--horizontal > .el-submenu.is-active .el-submenu__title i {
        color: rgb(0, 0, 255);
      }
      .el-menu--horizontal > .el-submenu .el-submenu__title {
        border-bottom: none;
      }
      /deep/ .el-menu-item a {
        display: block !important;
        color: #fff;
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
      .searchBtn {
        color: #fff;
      }
    }
    .el-form--inline .el-form-item {
      margin-bottom: 0px;
    }
    .el-form--inline .el-form-item__content {
      vertical-align: middle;
    }
  }
}
/deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):hover a,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus a {
  color: #303133;
}
</style>
