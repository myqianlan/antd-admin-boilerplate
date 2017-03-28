import React from 'react'
import {browserHistory, Link} from 'react-router'
import {Menu, Icon, Switch} from 'antd';
const SubMenu = Menu.SubMenu;
import FAIcon from 'component/faicon'
import './index.scss'
import {local, session} from 'common/util/storage.js'

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    convertSidebarMenu(menuData, key) {

        return menuData.map((val, index) => {
            if (val.children) {
                return (
                    <SubMenu key={key + val.path} title={<span><FAIcon name={val.icon}/><span>{val.name}</span></span>}>
                        {
                            this.convertSidebarMenu(val.children, key)
                        }
                    </SubMenu>
                )

            } else {
                return (
                    <Menu.Item key={key + val.path}>
                        <Link to={val.path}><FAIcon name={val.icon}/><span>{val.name}</span></Link>
                    </Menu.Item>
                )

            }
        })
    }

    getSideBarMenu() {

        let menuData = this.props.menuData
        return this.convertSidebarMenu(menuData, 'yt_')

    }

    getMenuPath(menuData, pathName) {
        let menuPath = []
        let currentPath = pathName.split('/')

        function getPath(data, pathName, parentPath) {
            if (!data) return

            for (let i = 0; i < data.length; i++) {
                let path = parentPath.slice()
                path.push(data[i].path)
                if (data[i].path == pathName) {
                    menuPath = path
                    break
                } else {
                    getPath(data[i].children, pathName, path)
                }
            }
        }

        while (menuPath.length === 0 && currentPath.length > 1) {
            getPath(menuData, currentPath.join('/'), [])
            currentPath.pop()
        }

        // menuPath array     current array
        return {
            menuPath: menuPath.slice(0, menuPath.length - 1).map(v => 'yt_' + v),
            current: menuPath.slice(menuPath.length - 1, menuPath.length).map(v => 'yt_' + v)
        }
    }

    render() {

        const mini = this.props.miniMode
        const mode = mini ? 'vertical' : 'inline'
        const pathname = this.props.location.pathname === '/' ? '/home' : this.props.location.pathname

        const {current} = this.getMenuPath(this.props.menuData, pathname)

        return (
            <aside className="yt-admin-framework-sidebar">
                <Menu theme="light"
                      selectedKeys={current}
                      mode={mode}
                >
                    {
                        this.getSideBarMenu()
                    }
                </Menu>
            </aside>
        )
    }
}

export default Sidebar
