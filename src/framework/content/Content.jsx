import React from 'react'

import './index.scss'

class Content extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="yt-admin-framework-content">
                {this.props.children}
            </main>
        )
    }
}

export default Content
