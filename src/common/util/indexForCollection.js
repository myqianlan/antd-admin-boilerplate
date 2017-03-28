//@arr 构造的原始数据
//@start 开始的index值 默认为0
//@index 构造index的键名 默认为index
function indexForCollection(arr, start = 0, index = 'index') {

    return arr.map((v, i)=>{
        v[index] = start + i
        return v

    })

}

export default indexForCollection
