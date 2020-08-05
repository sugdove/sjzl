<template>
  <div id="app">
    <router-view>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      </router-view>
    </div>
  </div>
</template>

<style lang="less">
@import "../static/css/main.css";
@import "../static/css/fontIcons/fonts.css";
</style>
