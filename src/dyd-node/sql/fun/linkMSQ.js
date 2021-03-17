let linkSql =require('../mysql')

class Lmsq{
    constructor(){

    }
    add(body){
        let $table=body.$table
        let $insert=body.$insert

        return new Promise((rs,rj)=>{
            let sql=`INSERT INTO tbl_${$table}(`
            for (let i in $insert){
                sql+=i+','
            }
            sql=sql.substr(0,sql.length-1)+') values( '
            for (let i in $insert){
                if(typeof $insert[i]==='string'){
                    sql+=` "${$insert[i]}" ,`
                }else{
                    sql+=` ${$insert[i]} ,`
                }
            }
            sql=sql.substr(0,sql.length-1)+')'
            linkSql(sql,body.$configDB).then(r=>{
                rs(r)
            }).catch(err=>{
                rj(err)
            })
        })
    }
    get(body){
        let $table=body.$table
        let $where=body.$where
        let $like=body.$like
        let $orderBY=body.$orderBY
        let $link=body.$link
        let $groupBY=body.$groupBY
        return new Promise((rs,rj)=>{
        let sql=`select * from tbl_${$table}`

        //条件查询
        if($where){
            sql+=' where '
            for (let i in $where){
                if(typeof $where[i]==='string'){
                    sql+=` ${i} = "${$where[i]}" and`
                }else{
                    sql+=` ${i} = ${$where[i]} and`
                }
            }
            sql=sql.substr(0,sql.length-3)
        }

        //相似查询
            if($like){
                if($where){
                    sql+=' and '
                }else{
                    sql+=' where '
                }
                for (let i in $like){
                    if(typeof $like[i]==='string'){
                        sql+=` ${i} like "${$like[i]}" and`
                    }else{
                        sql+=` ${i} like ${$like[i]} and`
                    }
                }
                sql=sql.substr(0,sql.length-3)
            }

         //连接表
         if($link){
             if(Array.isArray($link)){
                 $link.map((item,index)=>{
                     let linkMethods=item.methods||'left join'
                     let linkTable='tbl_'+item.table
                     let leftCol=item.left
                     let rightCol=item.right
                     let rightWhere=item.where|| '*'
                     sql=`SELECT * FROM (${sql}) as a${index} ${linkMethods} (SELECT ${rightWhere} from ${linkTable}) as b${index} on a${index}.${leftCol} = b${index}.${rightCol}`
                 })
             }else{
                 let linkMethods=$link.methods||'left join'
                 let linkTable='tbl_'+$link.table
                 let leftCol=$link.left
                 let rightCol=$link.right
                 let rightWhere=$link.where|| '*'
                 sql=`SELECT * FROM (${sql}) as a ${linkMethods} (SELECT ${rightWhere} from ${linkTable}) as b on a.${leftCol} = b.${rightCol}`
             }
         }

            if($groupBY){
                sql+=` GROUP BY '${$groupBY}'`
            }
            //排序
            if($orderBY){
                sql+=` ORDER BY ${$orderBY.col} ${$orderBY.methods||'DESC'}`
            }

        linkSql(sql,body.$configDB).then(r=>{
            rs(r)
        }).catch(err=>{
            rj(err)
        })
    })}

    up(body){
        let $table=body.$table
        let $set=body.$set
        let $where=body.$where
        return new Promise((rs,rj)=>{
        let sql=`UPDATE tbl_${$table} set `
        for (let i in $set){
            if(typeof $set[i]==='string'){
                sql+=` ${i} = "${$set[i]}" ,`
            }else{
                sql+=` ${i} = ${$set[i]} ,`
            }
        }
        sql=sql.substr(0,sql.length-1)+ ' where '
        for (let w in $where){
            if(typeof $where[w]==='string'){
                sql+=` ${w} = "${$where[w]}" and`
            }else{
                sql+=` ${w} = ${$where[w]} and`
            }
        }
        sql=sql.substr(0,sql.length-3)
        linkSql(sql,body.$configDB).then(r=>{
            rs(r)
        }).catch(err=>{
            rj(err)
        })
        })
    }

    del(body){
        let $table=body.$table
        let $where=body.$where
        return new Promise((rs,rj)=>{
        let sql=`delete from tbl_${$table} `
        if($where){
            sql +=' where '
            for (let i in $where){
                if(typeof $where[i]==='string'){
                    sql+=` ${i} = "${$where[i]}" and`
                }else{
                    sql+=` ${i} = ${$where[i]} and`
                }
            }
            sql=sql.substr(0,sql.length-3)
            linkSql(sql,body.$configDB).then(r=>{
                rs(r)
            }).catch(err=>{
                rj(err)
            })
        }})
    }
    //创建表
    createTable(body){
        return new Promise((rs,rj)=> {
            let $table = body.$table
            let $col = body.$col
            let sql = 'create table tbl_' + $table + '('
            for (let i in $col) {
                sql += i + ' ' + $col[i].split('-')[0] + ','
            }
            sql = sql.substr(0, sql.length - 1) + ')'
            linkSql(sql,body.$configDB).then(r => {
                rs(r)
            }).catch(err=>{
                rj(err)
            })
        })
    }

    //删除表
    deleteTable(body){
        return new Promise((rs,rj)=> {
            let $table = body.$table
            let sql = 'DROP TABLE tbl_'+$table
            linkSql(sql,body.$configDB).then(r => {
                rs(r)
            }).catch(err=>{
                rj(err)
            })
        })
    }

    // 清空表
    clearTable(body){
        return new Promise((rs,rj)=> {
            let $table = body.$table
            let sql = 'delete from tbl_'+$table
            linkSql(sql,body.$configDB).then(r => {
                rs(r)
            }).catch(err=>{
                rj(err)
            })
        })
    }
}

module.exports= new Lmsq()
