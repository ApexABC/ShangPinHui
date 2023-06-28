<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartList in cartInfoList" :key="cartList.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartList.isChecked" @change="changeCheck($event,cartList)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartList.imgUrl">
            <div class="item-msg">{{cartList.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartList.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('min',-1,cartList)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cartList.skuNum"
              @change="handler('change',$event.target.value*1,cartList)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cartList)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartList.skuNum*cartList.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="DeleteCart(cartList.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length!=0" @change="changeAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['cartList']),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算产品总价
    totalPrice() {
      return this.cartInfoList.filter(item => item.isChecked == 1).reduce((pre, item) => (pre += item.skuNum * item.skuPrice), 0)
    },
    // 判断底部复选框是否全部勾选
    isAllCheck() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('getShopCartList')
    },
    handler: throttle(async function(type, disNum, cart) {
      if (type == 'add') {
        disNum = 1
      } else if (type == 'min') {
        disNum = cart.skuNum > 1 ? -1 : 0
      } else {
        if (isNaN(disNum) || disNum < 1) {
          disNum = 0
        } else {
          disNum = parseInt(disNum) - cart.skuNum
        }
      }
      try {
        await this.$store.dispatch('getAddToCart', { skuId: cart.skuId, skuNum: disNum })
        this.getData()
      } catch (error) {}
    }, 1000),
    // 删除商品
    async DeleteCart(skuId) {
      try {
        await this.$store.dispatch('getDeleteCart', skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 切换商品选中状态
    async changeCheck(event, cart) {
      try {
        let checked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('getChangeCheck', { skuId: cart.skuId, isChecked: checked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除所有选中的商品
    async deleteCheckAll() {
      try {
        await this.$store.dispatch('deleteCheckAll')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 更改所有Checked
    async changeAllChecked(event) {
      let checked = event.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('changeAllChecked', checked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>