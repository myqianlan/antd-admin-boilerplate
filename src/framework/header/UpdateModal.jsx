"use strict"

import React, {Component} from 'react'
import {Modal, Form, Input, Radio, Checkbox, Select} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

@createForm()
class UpdateModal extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            confirmDirty: false,
        }
    }

    handleCancel() {
        this.props.onCancel()
    }

    handleOk() {

        this.props.form.validateFields((err, values) => {
            if (err) return

            this.props.onOk(values)

        })

    }

    handleAfterClose() {
        this.props.form.resetFields()
        this.state = {
            confirmDirty: false,
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('loginPwd')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {

        const {visible, form, confirmLoading, initialValue} = this.props
        const {getFieldDecorator} = form

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <Modal
                visible={visible}
                title="修改"
                okText="确定"
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={false}
            >
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="原密码"
                        hasFeedback
                    >
                        {getFieldDecorator('loginPwdOld', {
                            rules: [{
                                required: true, message: '原密码必填',
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                    >
                        {getFieldDecorator('loginPwd', {
                            rules: [{
                                required: true, message: '密码必填',
                            }, {
                                validator: this.checkConfirm.bind(this),
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请确认密码',
                            }, {
                                validator: this.checkPassword.bind(this),
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur.bind(this)}/>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}

UpdateModal.propTypes = {}
UpdateModal.defaultProps = {}

export default UpdateModal
