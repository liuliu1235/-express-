import {Service} from './axios.js'
import ConfigBaseURL from "./url";
import {Loading,Message} from "element-ui";
import overdue from './overdue'  /** 账号是否过期 */
import config from "./config";
import crypto from "./crypto";
import getData from "@/assets/util/lib/data";
let serve=function (options,callback) {
    let loadingInstance={}
    loadingInstance[`load${options.$method}'-'${options.$table}`]= Loading.service({
        background: 'rgba(0, 0, 0, 0)',
        lock: true,
        text: 'loading...'
    })

    /**
     * 配置options
     * */
    config(options)

    Service({
        url: 'api/?'+options.$method+'-'+options.$table,
        method: 'post',//请求方法
        data: options.$isCrypto ? crypto(options) : options,
        timeout: 5000, // 请求超时时间5s
        baseURL: ConfigBaseURL,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res=>{

        loadingInstance[`load${options.$method}'-'${options.$table}`].close()
        switch (options.$method) {
            //case 'add':Message.success('添加成功');break;
            // case 'up':Message.success('修改成功');break;
            //case 'del':Message.success('删除成功');break;
            case 'createTable':Message.success('创建表格'+options.$table);break;
            case 'deleteTable':Message.success('删除表格'+options.$table);break;
            case 'clearTable':Message.success('清空表格'+options.$table);break;
        }
        if(options.$method==='get'){
            callback(getData(res.data, options));
        }else{
            callback(res.data)
        }


    }).catch(err=>{
        loadingInstance[`load${options.$method}'-'${options.$table}`].close()
        switch (options.$method) {
            // case 'add':Message.info('添加失败');break;
            // case 'up':Message.info('修改失败');break;
            // case 'del':Message.info('删除失败');break;
            // case 'createTable':Message.info('创建表格失败');break;
            // case 'deleteTable':Message.info('删除表格失败');break;
            // case 'clearTable':Message.info('清空表格失败');break;
            default:break;
        }
        callback(false);
    })

        if(!(options.$method+'-'+options.$table==='get-user'||options.$method+'-'+options.$table==='get-admin')){
            overdue()
        }
}
export default serve
