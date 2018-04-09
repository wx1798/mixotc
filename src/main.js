// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import jsonBig from 'json-bigint';
import { DatePicker } from "element-ui";
import '@/stylus/rest.styl'

import BaseFunction from '@/js/BaseFunction'//引入自定义插件
import BasePrototype from '@/js/BasePrototype'//引入自定义原型方法

import RouterConfig from "@/config/RouterConfig"//引入路由设置
import ServerConfig from '@/config/ServerConfig' //引入服务器设置
import HttpConfig from "@/config/HttpConfig";//引入HttpConfig设置
import StorageConfig from "@/config/StorageConfig";//引入StorageConfig设置
import PrototypeConfig from '@/config/PrototypeConfig'//引入prototype设置
import LoopTaskConfig from '@/config/LoopTaskConfig'//引入轮循任务设置

import {RUN_APP} from './core'

//注册自定义原型方法
PrototypeConfig.base && BasePrototype.install(PrototypeConfig.base)

RUN_APP(
  App,
  {
    RouterConfig,
    ServerConfig,
    StorageConfig,
    HttpConfig,
    PrototypeConfig: PrototypeConfig.core,
    LoopTaskConfig
  },
  [DatePicker]
);



Vue.config.productionTip = false;


/* eslint-disable no-new */



