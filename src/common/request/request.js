import _ from 'lodash'
import {hashHistory} from 'react-router'
import { message } from 'antd'
import {local, session} from 'common/util/storage.js'

function request(option) {

    let opt = _.cloneDeep(option)

    // 需要完善这个处理
    let hasProtocol = /(http|https)\:\/\//i.test(opt.url)

    if (opt.url && !hasProtocol && process.env.NODE_ENV === 'development') {
        opt.url = '/api' + opt.url
    }

    // 设置默认 timeout 时间
    if (!opt.timeout) {
        opt.timeout = 1000 * 7.777
    }

    return Promise
        .resolve($.ajax.call($, opt))
        .then(res => {
            // 此处可以根据返回值做权限控制
            console.log(res)

            if (res.code === '401') {
                session.set('isLogin', false)
                hashHistory.push('/login')
            }

            if (res.code === '403') {
               message.error('没有权限')
            }

            return res
        })
        .catch(function (error) {
            console.log('global handle ajax error:', error)
            return error
        })
}

export default request
