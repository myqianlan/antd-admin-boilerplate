import './index.scss'
import React from 'react'

class Layout extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h2 className="yt-admin-page-title">{ this.props.title }</h2>
        )
    }
}

export default Layout
