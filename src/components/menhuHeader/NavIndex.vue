<template>
  <div class="login_header">
    <div class="login_header_main">
      <div class="title">数据资产管理系统</div>
      <div class="menu">
        <el-menu :default-active="activeMenu" class="navs_home" mode="horizontal">
          <template v-for="(item,index) in data">
            <template v-if="!item.children">
              <el-menu-item index="/portal/dataMenu/theme" :key="index">
                <a
                  :href="item.url + '?token=' + getToken()"
                  :style="{'color':single == item.path ? 'rgb(0, 0, 255)' : '#fff'} "
                  target="_blank"
                >{{item.name}}</a>
              </el-menu-item>
            </template>
            <template v-else>
              <el-submenu :index="item.path" :key="index" :class="{'is-active' :type === 'theme'}">
                <template slot="title">{{item.name}}</template>
                <el-menu-item
                  v-for="(_item,index) in item.children"
                  :index="_item.path"
                  :key="index"
                >
                  <a
                    style="display:block;color: #909399;text-decoration: none;"
                    :href="_item.path + '?token=' + getToken()"
                    target="_blank"
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
</template>

<script>
import { homeHeader } from '@/api/menhu.js';
import { GetUrlParam, goHref } from '@/utils';
import { getToken } from '@/utils/auth'
export default {
  name: 'header',
  data() {
    return {
      activeMenu: '1',
      single: '',
      searchValue: '',
      type: '',
      data: []
    };
  },
  created() {
    homeHeader({ portal: 1, level: 2 }).then(res => {
      const menuData = [];
      res.forEach(item => {
        if (item.name === '数据目录' || item.name === '数据服务') {
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

        // }
      });
      // OriginData = OriginData.concat(menuData);
      this.data = menuData;
      console.log(menuData);
    });
    this.single = GetUrlParam().type;
    console.log(this.single);
    const currentMune = this.$route.path;
    this.activeMenu = currentMune;
    // const currentItem = this.data.filter(
    //   (item, index) => item.url === currentMune
    // );
    // this.changeMenu(currentItem[0].index);
  },
  methods: {
    getToken() {
      return getToken();
    },
    handleSelect(a, b) {
      console.log(a, b);
    },
    searchFn() {
      goHref('/admin/#/portal/search?value=' + this.searchValue);
    }
  }
};
</script>

<style lang="scss">
.login_header {
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
    box-sizing: border-box;
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
      .el-menu-item a {
        display: block;
        color: #fff;
        text-decoration: none;
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
</style>
