"use strict"

import React from 'react'
import {Card, Icon, Button} from 'antd'

import './info-card.scss'


const InfoCard = (props) => {
    const {error, onReload, errorMessage, ...others} = props

    function handleReload() {
        if (!props.loading) {
            onReload()
        }
    }

    return (
        <Card
            className="info-card"
            bordered={true}
            extra={
                <Button
                    className="reload-btn-simple"
                    onClick={handleReload.bind(this)}
                    style={{pointerEvents: props.loading ? 'none' : ''}}
                    type="ghost" shape="circle" size="small">
                    <Icon type="reload" spin={props.loading}/>
                </Button>
            }
            {...others}>
            {
                error ?
                    <div className="info-card-error">
                        <Icon className="error-icon" type="cross-circle"/>
                        <span>{ errorMessage ? errorMessage : '加载数据出错' }</span>
                        {/*<Button*/}
                        {/*onClick={onReload.bind(this)}*/}
                        {/*className="reload-btn"*/}
                        {/*type="ghost" size="small" icon="reload">*/}
                        {/*重新加载*/}
                        {/*</Button>*/}
                    </div>
                    :
                    props.children
            }
        </Card>
    )
}

InfoCard.propTypes = {}
InfoCard.defaultProps = {
    error: false,
    onReload: function () {
    }
}

export default InfoCard
