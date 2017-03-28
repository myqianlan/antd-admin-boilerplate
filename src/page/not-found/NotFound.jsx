"use strict"
import React from 'react'
import FAIcon from 'component/faicon'
import Page from 'framework/page'
import {Icon} from 'antd'

import './style.less'

export default (props) =>

    <Page loading={false} title="404">
        <div className='error-404'>
            <Icon type='frown-o'/>
            <h1>404 Not Found</h1>
        </div>
    </Page>
