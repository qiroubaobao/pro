<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
.ant-layout-sider{
  background: #1184f6 !important;
}
.ant-menu.ant-menu-dark{
  background: #1184f6 !important;
}
.ant-menu.ant-menu-dark .ant-menu-sub{
  background: #0049ab !important;
}
.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected{
  background: #003482 !important;
}
.ant-menu-submenu-inline{
  border-bottom: 1px solid;
}

</style>
