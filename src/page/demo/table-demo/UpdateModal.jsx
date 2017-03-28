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
                maskClosable={!confirmLoading}
            >
                <Form horizontal>
                    <FormItem
                        label="Title"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('title', {
                            initialValue: initialValue.title,
                            rules: [{required: true, message: 'Please input the title of collection!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="Moyi"
                        hasFeedback
                        extra="建议输入文字"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('moyi', {
                            initialValue: initialValue.age,
                            rules: [{required: true}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="Description"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('description')(<Input type="textarea"/>)}
                    </FormItem>
                    <FormItem
                        label="Description"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('modifier', {
                            initialValue: 'public',
                        })(
                            <Radio.Group>
                                <Radio value="public">Public</Radio>
                                <Radio value="private">Private</Radio>
                            </Radio.Group>
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
