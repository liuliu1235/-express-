class DydArray{
    /** 数组相减  前-后 */
    reduce(big,small){
        return big.filter((item) => !(small.some((i) => DydArray.equalObject(i,item))))
    }

    /** 数组去重 */
    repeat(arrs){
        let arr=JSON.parse(JSON.stringify(arrs))
        for(let i=0;i<arr.length-1;i++){
            for(let m=i+1;m<arr.length;m++){
                DydArray.equalObject(arr[i],arr[m])
                    ?arr.splice(m,1)
                    :''
            }
        }
        return arr
    }

    /** 判断对象是否相等 */
    static equalObject(a,b){
        if(typeof a==='object'&&typeof b==='object'){
            let aProps = Object.getOwnPropertyNames(a);
            let bProps = Object.getOwnPropertyNames(b);

            if (aProps.length !== bProps.length) {
                return false;
            }

            for (let i = 0; i < aProps.length; i++) {
                let propName = aProps[i];
                let propA = a[propName];
                let propB = b[propName];
                if ( propA !== propB) {
                    return false;
                }
            }
            return true;
        }else{
            return a===b
        }
    }
}

export default new DydArray()
