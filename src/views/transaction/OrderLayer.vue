<template>
  <div>
    <BasePopup :show="orderLayer"
               :width=470
               :height=282>
      <div class="order-layer">
        <ul>
          <li class="clearfix"><span>{{titleType[type-1]}}单价</span><b>{{price}} CNY</b></li>
          <li class="clearfix"><span>{{titleType[type-1]}}数量</span><b>{{currency}} {{coinType}}</b></li>
          <li class="clearfix"><span>{{titleType[type-1]}}金额</span><b>{{money}} CNY</b></li>
        </ul>
        <p>提醒：请确认价格后立即下单</p>
        <p>下单后此订单的比特币将托管锁定，请放心{{titleType[type-1]}}</p>
        <div class="btn-group clearfix">
          <em @click="closeOrderLayer">取消</em>
          <i @click="firmOrder" ref="btnOk">确认{{titleType[type-1]}}</i>
        </div>
      </div>
    </BasePopup>
    <!--
    <BasePopup class="remind-layer" :show="remindLayer" @click.native="remindLayer=false">
      <span v-html="remindText"></span>
    </BasePopup>
    -->
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
  import BasePopup from '@/components/common/BasePopup' // 引入弹窗
  import Alert from "@/views/common/widget/Alert"
  import getErrorMsg from "@/js/ErrorCode"

  export default {
    name: "order-layer",
    props: ['orderLayerShow', 'id', 'price', 'currency', 'money', 'type', 'coinType'], // 1: 购买 2: 出售
    data() {
      return {
        titleType: ['购买', '出售'],
        orderLayer: this.orderLayerShow,
        //remindLayer: false,
        //remindText: ''
      }
    },
    components: {
      BasePopup,
      Alert,
    },
    watch: {
      orderLayerShow(state) {
        this.orderLayer = state === true ? true : false
      }
    },
    methods: {
      closeOrderLayer() {
        this.$emit('offOrderLayer', false);
      },
      firmOrder() {
        // 禁用按钮
        let $btnOk=this.$refs.btnOk;
        $btnOk.style.pointerEvents="none";
        $btnOk.style.opacity=0.6;
        //
        this.WsProxy.send('otc','new_order',{
          id: this.id,
          price: this.price,
          currency: this.currency * 1,
          money: this.money * 1,
          update_time: Math.floor(new Date().getTime() / 1000)
        }).then((data)=>{
          this.$store.state.newOrder = (this.type == 1 ? true : false);
          this.$router.push({ path: '/order', query: {id: this.JsonBig.stringify(data.id)}});
        }).catch((msg)=>{
          // 解除禁用
          $btnOk.style.pointerEvents="all";
          $btnOk.style.opacity=1;
          //
          this.closeOrderLayer();
          this.$refs.alert.showAlert({content:getErrorMsg(msg.ret)});
          /*
          this.remindLayer = true;
          switch (msg.ret) {
            case 13:
              this.remindText = '卖家(对方)有订单未完成';
              break;
            case 14:
              this.remindText = '当天取消订单超过5次，请明天再下单';
              break;
            case 15:
            case 19:
              this.remindText = '广告已下架';
              break;
            case 17:
              this.remindText = `可用余额不足，<a href="#/wallet/charge?coin=${this.coinType}" style="text-decoration: underline; color: #FFB422">去充币</a>`;
              break;
            case 18:
              this.remindText = '买家(您)有订单未完成';
              break;
            case 43:
              this.remindText = '订单未完成';
              break;
            case 55:
              this.remindText = '状态不匹配';
              break;
            case 81:
              this.remindText = '请先创建钱包';
              break;
            case 82:
              this.remindText = '创建钱包失败';
              break;
            default:
              this.remindText= '下单出错';
              break;
          }
         */
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../stylus/base.styl"
  .order-layer
    padding 35px 60px 0 60px
    ul
      li
        margin-bottom 15px
        span
          float left
          font-size 20px
          color #333
          letter-spacing 0.41px
        b
          float right
    p
      margin-bottom 10px
      font-size 12px
      color #FF794C
      letter-spacing 0.23px
    .btn-group
      margin-top 20px
      em, i
        display inline-block
        width 160px
        height 40px
        text-align center
        line-height 40px
        cursor pointer
      em
        float left
        border 1px solid #FFB422
        border-radius 2px
        color #FFB422
      i
        float right
        background #FFB422
        border-radius 2px
        color #FFF

  .remind-layer
    text-align center
    line-height 94px

</style>

