/*
 *  本地存储封装，项目中其他地方不要直接使用localStorage和sessionStorage，统一使用封装。
 *  简化接口，字符串json转换。
 * */

const SALT = '__yt__admin__'

export default {
    local: {
        get(key) {
            let strValue = localStorage.getItem(SALT + key)
            return JSON.parse(strValue)
        },
        set(key, jsonValue) {
            var strValue = JSON.stringify(jsonValue)
            localStorage.setItem(SALT + key, strValue)
        },
        remove(key) {
            localStorage.removeItem(SALT + key)
        },
        removeAll() {
            localStorage.clear()
        }
    },
    session: {
        get(key) {
            let strValue = sessionStorage.getItem(SALT + key)
            return JSON.parse(strValue)
        },
        set(key, jsonValue) {
            var strValue = JSON.stringify(jsonValue)
            sessionStorage.setItem(SALT + key, strValue)
        },
        remove(key) {
            sessionStorage.removeItem(SALT + key)
        },
        removeAll() {
            sessionStorage.clear()
        }
    }

}