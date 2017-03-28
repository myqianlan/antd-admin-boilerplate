"use strict"

import React, {Component} from 'react'
import {Modal, Form, Input, Radio, Select, Checkbox} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option

import _ from 'lodash'

@createForm()
class CreateModal extends Component {

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

    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }

    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
        console.log(Date.now())

        setTimeout(() => {

            let now = Date.now()
            if (now % 2 === 1) {
                console.log('0')
                callback()
            } else {
                console.log('1')
                callback(new Error('自定义验证函数未通过'))
            }

        }, 1000)

    }

    render() {

        const {visible, form, confirmLoading} = this.props
        const {getFieldDecorator} = form

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <Modal
                visible={visible}
                title="新建"
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
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('title', {
                            initialValue: visible,
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
                            rules: [
                                {
                                    required: true,
                                    validator: this.asyncValidator.bind(this)
                                }
                            ],
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
                        label="huhu"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('needAuth', {})(
                            <CheckboxGroup options={[
                                {label: 'Apple', value: 'Apple'},
                                {label: 'Pear', value: 'Pear'},
                                {label: 'Orange', value: 'Orange'},
                            ]}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Description"
                        hasFeedback
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
                    <FormItem
                        label="Select"
                        hasFeedback
                        {...formItemLayout}
                    >
                        {getFieldDecorator('select', {
                            rules: [
                                {required: true, message: 'Please select your country!'},
                            ],
                        })(
                            <Select placeholder="Please select a country">
                                <Option value="china">China</Option>
                                <Option value="use">U.S.A</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

CreateModal.propTypes = {}
CreateModal.defaultProps = {}

export default CreateModal
