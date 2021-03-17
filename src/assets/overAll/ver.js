export default function (refFormName) {
    return new Promise((rs,rj)=>{
        refFormName.validate((valid) => {
            if (valid) {
                rs(true)
            } else {
                rj(false)
            }
        })
    })
}
