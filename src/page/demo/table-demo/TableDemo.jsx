"use strict"

import React, {Component} from 'react'
import {Icon, Table, Input, Button, Form, Row, Col, Popconfirm, message} from 'antd'
const Search = Input.Search
const ButtonGroup = Button.Group
const FormItem = Form.Item
import Page from 'framework/page'
import request from 'common/request/request.js'

import  CreateModal from './CreateModal.jsx'
import  UpdateModal from './UpdateModal.jsx'

class TableDemo extends Component {
    constructor(props) {
        super(props)

        const _this = this

        this.state = {
            isLoading: false,
            // table 分页
            pagination: {
                showSizeChanger: true,
                showTotal: (total, range) => `共${total}条记录`,
                pageSize: 10,
                current: 1
            },
            // table loading
            isTableLoading: false,
            // table 配置
            columns: [
                {
                    title: '姓名',
                    key: 'name',
                    dataIndex: 'name',
                    sorter: true,
                    filters: [
                        {text: 'Male', value: 'male'},
                        {text: 'Female', value: 'female'},
                    ],
                    render: name => `${name.first} ${name.last}`
                },
                {
                    title: 'gender',
                    key: 'gender',
                    dataIndex: 'gender',
                    sorter: true,
                    filters: [
                        {text: 'Male', value: 'male'},
                        {text: 'Female', value: 'female'},
                    ]
                },
                {
                    title: 'email',
                    key: 'email',
                    dataIndex: 'email'
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: function (text, record) {
                        return (
                            <Popconfirm
                                title="确定删除?"
                                placement="topRight"
                                onConfirm={ _this.deleteItem.bind(_this, record) }
                                onCancel={v => v}
                            >
                                <a href="javascript:;">Delete</a>
                            </Popconfirm>

                        )
                    }
                }
            ],
            tableSelectRow: {},
            // table 数据
            tableData: [],

            searchData: {},

            // create modal
            createModalVisible: false,
            createModalConfirmLoading: false,

            // update modal
            updateModalVisible: false,
            updateModalConfirmLoading: false,
            initialUpdateValue: {}
        }
    }

    // 关键词搜索
    handleSearch(value) {
        console.log(value)
        const pager = this.state.pagination
        pager.current = 1
        console.log(pager)

        let filters = {}

        const columns = this.state.columns.map(v => {
            v.sortOrder = false
            if (v.filters) {
                v.filteredValue = null
                filters[v.dataIndex] = null
            }
            return v
        })

        this.setState({
            pagination: pager,
            columns: columns,
            searchData: {
                keyFilter: value
            },
        })

        this.getTableData({
            results: pager.pageSize,
            page: pager.current,
            sortField: undefined,
            sortOrder: undefined,
            ...filters,
            keyFilter: value,
        })
    }

    // table refresh
    // 按照上次查询条件进行table刷新
    handleTableRefresh() {

        const pager = this.state.pagination
        pager.current = 1

        let filters = {}
        let sort = {}
        const columns = this.state.columns.map(v => {

            if (v.sortOrder) {
                sort.sortOrder = v.sortOrder
                sort.sortField = v.dataIndex
            }
            if (v.filteredValue) {
                filters[v.dataIndex] = v.filteredValue
            }
            return v
        })

        this.setState({
            pagination: pager,
            // columns: columns,
        })

        this.getTableData({
            results: pager.pageSize,
            page: pager.current,
            sortField: sort.sortField,
            sortOrder: sort.sortOrder,
            ...filters,
            ...this.state.searchData,
        })
    }

    //table有变化
    handleTableChange(pagination, filters, sorter) {
        console.log(pagination, filters, sorter)

        const pager = this.state.pagination
        pager.current = pagination.current
        pager.pageSize = pagination.pageSize

        const filterKeys = Object.keys(filters)
        console.log(filterKeys)
        const columns = this.state.columns.map(v => {

            v.dataIndex === sorter.field ? v.sortOrder = sorter.order : v.sortOrder = false

            if (filterKeys.indexOf(v.dataIndex) !== -1) {
                v.filteredValue = filters[filterKeys[filterKeys.indexOf(v.dataIndex)]]
            }

            return v
        })

        this.setState({
            pagination: pager,
            columns: columns,
        })

        // filterKeys.map(v => {
        //     if (filters[v] === null) delete filters[v]
        // })


        this.getTableData({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
            ...this.state.searchData,
        })
    }

    //获取table data
    getTableData(params = {}) {
        console.log('params:', params);

        this.setState({
            isTableLoading: true
        })

        request({
            url: 'https://randomuser.me/api',
            type: 'get',
            data: {
                ...params,
            },
            dataType: 'json',
        }).then((res) => {

            const pagination = this.state.pagination;
            // 读取数据总条数
            // pagination.total = data.totalCount;
            pagination.total = 200;

            this.setState({
                isTableLoading: false,
                tableData: res.results,
                pagination,
            })
        })
    }

    renderTableActionSimple() {
        return (
            <Form
                className="yt-admin-table-action"
            >
                <Row>
                    <Col span={12} style={{textAlign: 'left'}}>
                        <Search
                            placeholder="请输入搜索内容"
                            style={{width: 200}}
                            onSearch={this.handleSearch.bind(this)}
                        />
                    </Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                        <ButtonGroup>
                            <Button onClick={this.showCreateModal.bind(this)}>
                                <Icon type="plus-circle-o"/>新增
                            </Button>
                            <Button onClick={this.showUpdateModal.bind(this)}>
                                <Icon type="edit"/>修改
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Form>
        )
    }

    renderTableAction() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        }

        return (
            <Form
                className="yt-admin-table-action"
            >
                <Row>
                    <Col span={8} key={1}>
                        <FormItem {...formItemLayout} label='查询1'>
                            <Input placeholder="placeholder"/>
                        </FormItem>
                    </Col>
                    <Col span={8} key={2}>
                        <FormItem {...formItemLayout} label='查询2'>
                            <Input placeholder="placeholder"/>
                        </FormItem>
                    </Col>
                    <Col span={8} key={3}>
                        <FormItem {...formItemLayout} label='查询3'>
                            <Input placeholder="placeholder"/>
                        </FormItem>
                    </Col>
                    <Col span={8} key={4}>
                        <FormItem {...formItemLayout} label='查询4'>
                            <Input placeholder="placeholder"/>
                        </FormItem>
                    </Col>

                </Row>

                <Row>
                    <Col span={12} style={{textAlign: 'left'}}>
                        <Button type="primary"><Icon type="search"/>查询</Button>
                        <Button><Icon type="cross"/>清除条件</Button>
                        <Button><Icon type="export"/>导出</Button>
                    </Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                        <ButtonGroup>
                            <Button onClick={this.showCreateModal.bind(this)}>
                                <Icon type="plus-circle-o"/>新增
                            </Button>
                            <Button onClick={this.showUpdateModal.bind(this)}>
                                <Icon type="edit"/>修改
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>

            </Form>
        )
    }

    //新建相关 CreateModal
    handleCreateModalCancel() {
        this.setState({
            createModalVisible: false
        })
    }

    handleCreateModalOk(data) {
        this.setState({
            createModalConfirmLoading: true
        })
        console.log('create data:', data)
        // 异步操作
        setTimeout(() => {
            this.setState({
                createModalVisible: false,
                createModalConfirmLoading: false
            })
            message.success('添加成功')
        }, 3000)
    }

    //更新相关 UpdateModal
    handleUpdateModalCancel() {
        this.setState({
            updateModalVisible: false
        })
    }

    handleUpdateModalOk(data) {
        this.setState({
            updateModalConfirmLoading: true
        })
        console.log('update data:', data)
        // 异步操作
        setTimeout(() => {
            this.setState({
                updateModalVisible: false,
                updateModalConfirmLoading: false
            })
            message.success('修改成功')
        }, 3000)
    }

    // 删除数据项
    deleteItem(record) {
        console.log(record)

        this.setState({
            isTableLoading: true,
        })
        const hide = message.loading('正在删除...', 0)

        setTimeout(() => {

            this.setState({
                isTableLoading: false,
            })
            this.handleTableRefresh()
            hide()
            message.success('删除成功')
        }, 3000)
    }

    // 初始化数据
    componentDidMount() {
        this.getTableData({
            results: this.state.pagination.pageSize,
            page: this.state.pagination.current,
        })
    }

    // open create modal
    showCreateModal() {
        this.setState({
            createModalVisible: true
        })
    }

    // open update modal
    showUpdateModal() {

        this.setState({
            isLoading: true
        })

        setTimeout(() => {
            this.setState({
                isLoading: false,
                updateModalVisible: true,
                initialUpdateValue: {
                    title: 'moyi',
                    age: '27'
                }

            })
        }, 3000)


    }

    render() {
        const rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
            selectedRowKeys: this.state.tableSelectRow.dob
        }
        return (
            <Page title="Table Demo（CRUD）" loading={this.state.isLoading}>
                {
                    this.renderTableAction()
                }
                {
                    this.renderTableActionSimple()
                }
                <Table
                    onRowClick={
                        (v, i) => {
                            console.log(v, i)
                            this.setState({
                                tableSelectRow: v
                            })
                        }
                    }
                    rowClassName={
                        (v, i) => {
                            if (v.dob === this.state.tableSelectRow.dob) {
                                return 'highlight'
                            } else {
                                return ''
                            }
                        }
                    }
                    rowSelection={rowSelection}
                    rowKey={record => record.dob}
                    size="middle"
                    dataSource={this.state.tableData}
                    columns={this.state.columns}
                    pagination={this.state.pagination}
                    loading={this.state.isTableLoading}
                    onChange={this.handleTableChange.bind(this)}
                />

                <CreateModal
                    visible={ this.state.createModalVisible }
                    confirmLoading={ this.state.createModalConfirmLoading }
                    onCancel={ this.handleCreateModalCancel.bind(this) }
                    onOk={ this.handleCreateModalOk.bind(this) }
                />

                <UpdateModal
                    initialValue={this.state.initialUpdateValue}
                    visible={ this.state.updateModalVisible }
                    confirmLoading={ this.state.updateModalConfirmLoading }
                    onCancel={ this.handleUpdateModalCancel.bind(this) }
                    onOk={ this.handleUpdateModalOk.bind(this) }
                />

            </Page>
        )
    }
}

export default TableDemo
