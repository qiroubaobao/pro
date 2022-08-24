<template>
    <div class="header">
      <div :style="{ width: '240px' }" align="left">
        <img class="logo" :src="Logo" /> <span class="ft12" style="margin-left:20px;">免费版</span>
      </div>
      <top-menu class="top-menu"></top-menu>
      <user-menu></user-menu>
    </div>
</template>

<script>
import { defineComponent } from "vue"
const Logo = require("@/assets/logo.png")
import TopMenu from "./TopMenu"
import UserMenu from "./UserMenu"

export default defineComponent({
  name: "Header",
  components: {
    TopMenu,
    UserMenu
  },
  setup() {
    return {
      Logo
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 1200px;
  height: 64px;
  margin: 0 auto;
  // & .logo {
  //   width: 60px;
  //   height: 60px;
  // }
  & .top-menu{
    flex: auto;
  }
}
</style>
