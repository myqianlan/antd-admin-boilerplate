import React from 'react'
import {Form, Input, Button, Checkbox, Spin, message} from 'antd'
const FormItem = Form.Item;
const createForm = Form.create;
import DocumentTitle from 'react-document-title'
import './index.scss'
import {hashHistory} from 'react-router'
import request from 'common/request/request.js'
import {local, session} from 'common/util/storage.js'

import logoImg from './logo.png'

@createForm()
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.login = this.login.bind(this)
        this.onKeyPressLogin = this.onKeyPressLogin.bind(this)
    }

    componentDidMount() {
        session.removeAll()
    }

    login() {
        this.props.form.validateFields((err, values) => {
            if (err) return

            this.setState({
                loading: true
            })

            let loginData = values
            this.setState({
                loading: false
            })
            session.set('isLogin', true)
            hashHistory.push('/home')
            return

            request({
                url: '/login',
                type: 'post',
                dataType: 'json',
                data: loginData
            })
                .then(res => {
                    console.log(res)
                    this.setState({
                        loading: false
                    })
                    if (res.code === '0') {
                        session.set('isLogin', true)
                        session.set('userInfo', res.data.user)
                        session.set('menuInfo', res.data.menu)
                        hashHistory.push('/home')
                    } else {
                        message.error(res.msg)
                    }

                })
                .catch(err => {

                    message.error(err.statusText)
                    this.setState({
                        loading: false
                    })
                })
        })
    }

    onKeyPressLogin(event) {
        if (event.which === 13) {
            this.login();
        }
    }

    render() {

        const {getFieldDecorator} = this.props.form

        return (
            <div className="login-page">
                <DocumentTitle title="管理台"/>
                <div className="login-box">
                    <img src={logoImg} alt="logo" className="logo"/>
                    <Spin spinning={this.state.loading} size="large">
                        <Form className="login-form" onKeyPress={this.onKeyPressLogin}>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入账户名'
                                        }
                                    ],
                                })(
                                    <Input placeholder="账户"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ],
                                })(
                                    <Input autoComplete="off" type="password" placeholder="密码"/>
                                )}
                            </FormItem>
                            <Button type="primary" onClick={this.login}>登录</Button>
                        </Form>
                    </Spin>
                </div>
            </div>
        )
    }
}

export default Login
