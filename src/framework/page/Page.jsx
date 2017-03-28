import React from 'react';
import {Link} from 'react-router';
import {Breadcrumb, Spin} from 'antd';
import QueueAnim from 'rc-queue-anim'
import DocumentTitle from 'react-document-title'
import PageTitle from '../page-title/PageTitle.jsx'

import './page.scss'

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        loading: false,
        animConfig: {
            opacity: [1, 0]
        },
        title: null,
        breadcrumb: []
        // breadcrumb:[
        //     {
        //         text: 'xixi',
        //         path: '/xixi'
        //     },
        //     {
        //         text: 'dashboard',
        //     }
        // ]
    }

    getBreadcrumb(breadcrumb) {

        return breadcrumb.map((v, i) => {

            if (v.path) {
                return (
                    <Breadcrumb.Item key={i}><Link to={v.path}>{v.text}</Link></Breadcrumb.Item>
                )
            } else {
                return (
                    <Breadcrumb.Item key={i}>{v.text}</Breadcrumb.Item>
                )
            }

        })

    }

    render() {

        const titleName = this.props.title
        const documentTitle = titleName === null ? '管理台' : '管理台' + '|' + titleName

        return (
            <QueueAnim className="yt-admin-framework-page" animConfig={this.props.animConfig} delay={100}>
                <DocumentTitle title={ documentTitle }/>
                <PageTitle title={ titleName }/>
                <Breadcrumb className="yt-admin-breadcrumb">
                    {this.getBreadcrumb(this.props.breadcrumb)}
                </Breadcrumb>
                <Spin key="yt-admin-framework-page" spinning={this.props.loading} size="large">
                    <div className="page-content">
                        {this.props.children}
                    </div>
                </Spin>
            </QueueAnim>
        )
    }
}

export default Page
