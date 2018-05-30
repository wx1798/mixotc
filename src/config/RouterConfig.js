const ROUTES = [
  {
    path: "/",
    name: "index",
    component: resolve => require(["@/views/transaction/Transaction"], resolve), // 交易中心
    meta: {
      title: "交易中心"
    }
  },
  {
    path: "/transaction",
    name: "transaction",
    component: resolve => require(["@/views/transaction/Transaction"], resolve), // 交易中心
    meta: {
      title: "交易中心"
    }
  },
  {
    path: "/transaction/order",
    name: "order",
    component: resolve => require(["@/views/transaction/Order"], resolve), // 交易中心购买BTC
    meta: {
      title: "订单"
    }
  },
  {
    path: "/helpcenter",
    name: "helpCenter",
    component: resolve => require(["@/views/transaction/HelpCenter"], resolve), // 帮助中心
    meta: {
      title: "帮助中心"
    }
  },
  {
    path: "/coinData",
    name: "coinData",
    component: resolve => require(["@/views/transaction/CoinData"], resolve), // 币种资料
    meta: {
      title: "币种资料"
    }
  },
  {
    path: "/order",
    name: "MyOrder",
    component: resolve => require(["@/views/myOrder/MyOrder"], resolve), // 我的订单
    meta: {
      title: "我的订单"
    }
  },
  {
    path: "/order/evaluate",
    name: "MyOrderEvaluate",
    component: resolve => require(["@/views/myOrder/MyOrderEvaluate"], resolve), // 我的订单评价
    meta: {
      title: "我的订单"
    }
  },
  {
    path: "/homepage", //?uid=xxx
    name: "homepage",
    component: resolve => require(["@/views/homepage/Home"], resolve), // 买卖家个人中心-他的发布
    meta: {
      title: "个人中心"
    }
  },
  {
    path: "/advertisement/release", // 发广告
    name: "ReleaseAd",
    redirect: "/advertisement/release/buy",
    component: resolve => require(["@/views/advertisement/ReleaseAd"], resolve), // 发广告
    meta: {
      title: "发广告"
    },
    children: [
      // 购买广告
      {
        path: "/advertisement/release/buy",
        name: "releaseBuy",
        component: resolve =>
          require(["@/views/advertisement/child/ReleaseAdBuy"], resolve), // 购买广告
        meta: {
          title: "发广告"
        }
      },
      // 出售广告
      {
        path: "/advertisement/release/sale",
        name: "releaseSale",
        component: resolve =>
          require(["@/views/advertisement/child/ReleaseAdSale"], resolve), // 购买广告
        meta: {
          title: "发广告"
        }
      }
    ]
  },
  {
    path: "/advertisement", // 我的广告
    name: "MyAd",
    component: resolve => require(["@/views/advertisement/MyAd"], resolve), // 我的广告
    meta: {
      title: "我的广告"
    }
  },
  {
    path: "/verify",
    name: "verify",
    redirect: "/verify/identifyAuth", // 审核中心
    meta: {
      title: "我的广告"
    }
  },
  {
    path: "/personal",
    name: "personal",
    redirect: "/personal/account",
    component: resolve =>
      require(["@/views/personalCenter/personalCenter"], resolve), // 个人中心
    meta: {
      title: "个人中心"
    },
    children: [
      //我的评价
      {
        path: "evaluate",
        name: "personal-evaluate",
        component: resolve =>
          require([
            "@/views/personalCenter/children/evaluate/Evaluate"
          ], resolve),
        meta: {
          title: "个人中心"
        }
      },
      //账户设置
      {
        path: "account",
        name: "personal-account",
        redirect: "/personal/account/baseInfo",
        component: resolve =>
          require(["@/views/personalCenter/children/account"], resolve),
        meta: {
          title: "个人中心"
        },
        children: [
          {
            path: "baseInfo",
            name: "personal-baseInfo",
            component: resolve =>
              require([
                "@/views/personalCenter/children/account/BaseInfo"
              ], resolve),
            meta: {
              title: "个人中心"
            }
          },
          {
            path: "apply",
            name: "personal-apply",
            component: resolve =>
              require([
                "@/views/personalCenter/children/account/Apply"
              ], resolve),
            meta: {
              title: "个人中心"
            }
          },
          {
            path: "auth",
            name: "personal-auth",
            component: resolve =>
              require([
                "@/views/personalCenter/children/account/Auth"
              ], resolve),
            meta: {
              title: "个人中心"
            }
          }
        ]
      },
      //安全设置
      {
        path: "safe",
        name: "safe",
        component: resolve =>
          require(["@/views/personalCenter/children/safe"], resolve),
        meta: {
          title: "个人中心"
        }
      }
    ]
  },
  {
    path: "/verify/identifyAuth",
    name: "identifyAuth",
    component: resolve => require(["@/views/verify/Idcard"], resolve), // 审核中心-身份审核
    meta: {
      title: "审核中心"
    }
  },
  {
    path: "/verify/largeTransaction",
    name: "largeTransaction",
    component: resolve => require(["@/views/verify/LgTran"], resolve), // 审核中心-大额交易审核
    meta: {
      title: "审核中心"
    }
  },
  {
    path: "/verify/arbitrationRecord",
    name: "arbitrationRecord",
    component: resolve => require(["@/views/verify/ArbiRec"], resolve), // 审核中心-仲裁记录
    meta: {
      title: "审核中心"
    }
  },
  {
    path: "/verify/service",
    name: "Service",
    component: resolve => require(["@/views/kefu/Dialog"], resolve), // 客服交易对话框
    meta: {
      title: "对话"
    }
  },
  // 钱包
  {
    path: "/wallet",
    redirect: "/wallet/account" // 钱包
  },
  {
    path: "/wallet/account",
    component: resolve => require(["@/views/wallet/Account"], resolve), // 账户余额
    meta: {
      title: "钱包"
    }
  },
  {
    path: "/wallet/charge",
    component: resolve => require(["@/views/wallet/Charge"], resolve), // 充币
    meta: {
      title: "钱包"
    }
  },
  {
    path: "/wallet/withdraw",
    component: resolve => require(["@/views/wallet/Withdraw"], resolve), // 提币
    meta: {
      title: "钱包"
    }
  },
  {
    path: "/wallet/conversion",
    component: resolve => require(["@/views/wallet/Conversion"], resolve), // 资产互转
    meta: {
      title: "钱包"
    }
  },
  {
    path: "/wallet/history",
    component: resolve => require(["@/views/wallet/History"], resolve), // 账单明细
    meta: {
      title: "钱包"
    }
  },
  {
    path: "/wallet/address",
    component: resolve => require(["@/views/wallet/Address"], resolve), // 地址管理
    meta: {
      title: "钱包"
    }
  }
];

export default {
  routes: ROUTES
};

