import serve from '../lib/index.js'
function add(table,data){
    return {
        $table:table,
        $method:'add',
        $insert:data
    }
}

function up(table,data,where={ids:data.ids,id:data.id}){
    where = {
        _id: data._id
    }
    !data.$where  || delete data._id
    return {
        $table:table,
        $method:'up',
        $where:where ,
        $set:data
    }
}
function get(table,data){
    return {
        $table:table,
        $method:'get',
        $where:data.$where,
        $link:data.$link,
        $orderBY:data.$orderBY,
        $like:data.$like,
        $or:data.$or,
        $groupBY:data.$groupBY
    }
}

function del(table,data){
    return{
        $table:table,
        $method:'del',
        $where: {_id: data._id},
    }
}
let user={}
let src='api' //当前接口文件夹

user.mysqlTable=function(data,callback) {
    serve(data,callback)
}
// table: 数据表名  data：请求参数  callback： 完成回调
user.add=function(table,data,callback) {
    serve(add(table,data),callback)
}
user.get=function(table,data,callback) {
    serve(get(table,data),callback)
}
user.del=function(table,data,callback) {
    serve(del(table,data),callback)
}
user.up=function(table,data,callback) {
    serve(up(table,data),callback)
}
export default user
