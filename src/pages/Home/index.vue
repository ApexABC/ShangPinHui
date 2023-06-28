<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Foolr v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer'
import Recommend from '@/pages/Home/Recommend/Recommend.vue'
import Rank from '@/pages/Home/Rank/Rank.vue'
import Like from '@/pages/Home/Like/Like.vue'
import Foolr from '@/pages/Home/Foolr/Foolr.vue'
import Brand from '@/pages/Home/Brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  created() {
    this.$store.dispatch('getFloorList')
    //获取用户信息
    this.$store.dispatch('getUserInfo')
  },
  mounted() {},
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Foolr,
    Brand
  },
  computed: {
    ...mapState({ floorList: state => state.home.floorList })
  }
}
</script>

<style></style>
