<template>
  <div>
    <!-- 头部 -->
    <Header></Header>
    <!-- 路由展示区 -->
    <router-view></router-view>
    <!-- 底部 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style></style>
