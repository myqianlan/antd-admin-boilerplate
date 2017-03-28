"use strict"

import React, {Component} from 'react'
import {Icon, Card} from 'antd'
import Page from 'framework/page'
import request from 'common/request/request.js'

import InfoCard from 'component/info-card'

class InfoCardDemo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {

        return (
            <Page title="info card demo" isLoading={this.state.isLoading}>
                <InfoCard
                    title="账号信息">
                    千与千寻
                </InfoCard>
                <InfoCard
                    onReload={v => {
                        console.log('reload')
                    }}
                    error={true}
                    errorMessage="自定义错误信息"
                    title="账号信息">
                    千与千寻
                </InfoCard>
                <InfoCard
                    onReload={v => {
                        console.log('reload')
                    }}
                    error={true}
                    title="账号信息">
                    千与千寻
                </InfoCard>
                <InfoCard
                    onReload={v => {
                        console.log('reload')
                    }}
                    error={true}
                    loading={true}
                    title="身份信息"
                >
                    Whatever content
                </InfoCard>
            </Page>
        )
    }
}

export default InfoCardDemo
