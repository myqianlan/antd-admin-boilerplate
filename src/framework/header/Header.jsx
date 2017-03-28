import React from 'react'
import {Button, Popconfirm, message, Menu, Dropdown, Icon} from "antd";

import FAIcon from 'component/faicon'
import {hashHistory} from 'react-router'
import request from 'common/request/request.js'
import {local, session} from 'common/util/storage.js'

import './index.scss'

import  UpdateModal from './UpdateModal.jsx'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // update modal
            updateModalVisible: false,
            updateModalConfirmLoading: false,
            initialUpdateValue: {}
        }

        this.logout = this.logout.bind(this)
        this.onToggle = this.onToggle.bind(this)
    }

    logout() {

        this.props.onSetLoading(true)

        this.props.onSetLoading(false)
        session.set('isLogin', false)
        hashHistory.push('/login')
        return
        request({
            url: '/logout',
            type: 'get',
            dataType: 'json'
        })
            .then(res => {
                this.props.onSetLoading(false)
                if (res.code === '0') {
                    session.set('isLogin', false)
                    hashHistory.push('/login')
                } else {
                    message.error(res.msg)
                }
            })
            .catch(err => {
                console.log('error>>>', err)
                message.error(err.statusText)
                this.props.onSetLoading(false)
            })


    }

    onToggle() {
        this.props.onMiniChange(!this.props.miniMode)
    }

    //更新相关 UpdateModal
    handleUpdateModalCancel() {
        this.setState({
            updateModalVisible: false
        })
    }

    handleUpdateModalOk(data) {
        this.setState({
            updateModalConfirmLoading: true
        })
        console.log('update data:', data)

        delete data.confirm

        this.setState({
                    updateModalVisible: false,
                    updateModalConfirmLoading: false
                })
        message.success('修改成功')

        return
        // 异步操作
        request({
            url: '/updateUserPwd',
            type: 'post',
            data: {
                ...data,
            },
            dataType: 'json',
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    updateModalVisible: false,
                    updateModalConfirmLoading: false
                })
                message.success('修改成功')
            } else {
                this.setState({
                    updateModalConfirmLoading: false
                })
                message.error(res.msg)
            }
        }).catch(err => {
            this.setState({
                updateModalConfirmLoading: false
            })
            message.error(err.statusText)
        })
    }

    // open update modal
    showUpdateModal() {

        this.setState({
            isLoading: false,
            updateModalVisible: true,
            initialUpdateValue: {}

        })

    }

    handleMenuClick(e) {
        console.log(e)

        if (e.key === 'updatePwd') {
            this.showUpdateModal()
        }

    }

    render() {
        const mini = this.props.miniMode

        const userInfo = session.get('userInfo') || {userName: '紫霞仙子'}

        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="updatePwd">修改密码</Menu.Item>
            </Menu>
        )

        return (
            <header className="yt-admin-framework-header clearfix">
                <h1 className="yt-admin-framework-header-brand">
                    {
                        mini? 'A': 'Ant Design'
                    }
                    <Button type="ghost" style={{display: 'none'}}>only for use antd button styles</Button>
                </h1>
                <div className="yt-admin-framework-header-sidebar-toggle">
                    <a href="javascript:;" onClick={this.onToggle}>
                        <FAIcon name="bars" className="toggle-icon"/>
                    </a>
                </div>
                <ul className="yt-admin-framework-header-menu clearfix">
                    {
                        //     <li className="menu-item">
                        //     <a href="javascript:;">
                        //         <FAIcon name="leaf"/>
                        //         <span className="header-menu-text">叶子</span>
                        //     </a>
                        // </li>
                    }
                    <li className="menu-item">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a href="javascript:;">
                                <FAIcon name="user"/>
                                <span className="header-menu-text">{userInfo.userName}</span>
                            </a>
                        </Dropdown>
                    </li>

                    <li className="menu-item">
                        <Popconfirm placement="bottomRight" title="您确定要退出系统吗？" onConfirm={this.logout}>
                            <a href="javascript:;">
                                <FAIcon name="sign-out"/>
                                <span className="header-menu-text">退出系统</span>
                            </a>
                        </Popconfirm>
                    </li>
                </ul>
                <UpdateModal
                    initialValue={this.state.initialUpdateValue}
                    visible={ this.state.updateModalVisible }
                    confirmLoading={ this.state.updateModalConfirmLoading }
                    onCancel={ this.handleUpdateModalCancel.bind(this) }
                    onOk={ this.handleUpdateModalOk.bind(this) }
                />
            </header>
        )
    }
}

export default Header
