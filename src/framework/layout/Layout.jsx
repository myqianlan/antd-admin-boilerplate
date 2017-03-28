import './index.scss'
import React from 'react'
import {BackTop, Spin} from 'antd'
import Header from '../header/Header.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import Content from '../content/Content.jsx'
import {local, session} from 'common/util/storage.js'
import classNames from 'classnames';

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mini: local.get('mini'),
            menuData: [],
            loading: false,
        }

    }

    componentWillMount() {

        // 菜单信息可以通过后台，在登录的时候返回，存在sessionStroage里面
        // 然后在这里从sessionStroage取出

        let menuData = [
            {
                name: 'dashboard',
                path: '/home',
                icon: 'dashboard'
            },
            {
                name: 'demo',
                icon: 'star',
                path: 'demo-empty',
                children: [
                    {
                        name: 'table demo',
                        path: '/demo/table-demo',
                        icon: 'circle'
                    },
                    {
                        name: 'info card demo',
                        path: '/demo/info-card-demo',
                        icon: 'circle'
                    },
                    {
                        name: 'upload demo',
                        path: '/demo/upload-demo',
                        icon: 'circle'
                    },
                ]
            },
        ]

        this.setState({
            menuData: menuData
        })


    }

    /**
     * menuData
     * path name icon
     * @path 重要 既做路径，又作为唯一key
     * [{
 *      name: '404',
 *      icon: 'circle',
 *      path: '/404'
 *      children: [
 *          {
 *              name: '405',
 *              path: '/405',
 *              icon: 'circle'
 *          },
 *          {
 *              name: '401',
 *              icon: 'circle',
 *              path: '/401'
 *              children: [{
 *                  name: '409',
 *                  path: '/409',
 *                  icon: 'circle'
 *              }]
 *          }
 *      ]
 * },
     * {
 *      name: '403',
 *      path: '/403',
 *      icon: 'circle'
 * }]
     *
     *
     **/

    handleMiniChange(mode) {
        local.set('mini', mode)
        this.setState({
            mini: mode
        })
    }

    handleSetLoading(type) {

        this.setState({
            loading: type
        })

    }

    render() {
        const cls = classNames({
            'mini': this.state.mini,
            'yt-admin-framework': true
        })

        return (
            <div className={cls}>
                <Spin key="yt-admin-framework-layout" spinning={this.state.loading} size="large">
                    <Header
                        miniMode={this.state.mini}
                        onMiniChange={this.handleMiniChange.bind(this)}
                        onSetLoading={this.handleSetLoading.bind(this)}
                    />
                    <Sidebar miniMode={this.state.mini} menuData={this.state.menuData} location={this.props.location}/>
                    <Content>
                        {
                            this.props.children
                        }
                    </Content>
                    <BackTop style={{right: '40px', bottom: '40px'}}/>
                </Spin>
            </div>
        )
    }
}

export default Layout
