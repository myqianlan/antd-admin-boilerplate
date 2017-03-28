import 'font-awesome/css/font-awesome.css';
import React from 'react';
import classNames from 'classnames';

class FAIcon extends React.Component {
    render() {
        const {name, className, ...others} = this.props
        const cls = classNames({
            'fa': true,
            [`fa-${name}`]: true,
            // ['fa-'+name]: true,
        }, className)
        return <i className={cls} {...others}></i>
    }
}

FAIcon.propTypes = {
    name: React.PropTypes.string,
}

export default FAIcon
