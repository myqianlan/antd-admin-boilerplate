"use strict"

import React, {Component} from 'react'
import {Icon, Card} from 'antd'
import Page from 'framework/page'
import request from 'common/request/request.js'
import FileUpload from 'component/file-upload/FileUpload.jsx'

class UploadDemo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            fileName: '请选择文件',
            fileUrl: null,
            ossFile: null,
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    handleOSSUploadChange(file) {
        console.log(file)
        this.setState({
            ossFile: file,
        })
    }

    render() {

        let _this = this

        let uploadUrl = '/upload'
        if (process.env.NODE_ENV === 'development') {
            uploadUrl = '/api' + uploadUrl
        }
        const options = {
            baseUrl: 'http://eternalsky.me:8122/file/upload',
            param: {
                fid: 0,
                type: '千与千寻'
            },
            chooseFile(files) {
                // console.log('you choose',typeof files == 'string' ? files : files[0].name)
                _this.setState({
                    fileName: typeof files == 'string' ? files : files[0].name,
                    fileUrl: URL.createObjectURL(files[0]),
                })
            },
            uploadSuccess(resp){
                console.log(resp, 'upload success')
            },
            beforeUpload(){
                return false
            },
            doUpload(){
                console.log('正在上传')
            },
            fileFieldName(file){
                return 'file'
            },
        }

        return (
            <Page title="upload demo" isLoading={this.state.isLoading}>
                <Card>
                    <FileUpload options={options} className="upload-demo">

                        <button ref="chooseBtn"> {this.state.fileName}</button>
                        <button ref="uploadBtn">上传</button>
                        <div className="thumb">
                            <img src={this.state.fileUrl} alt=""/>
                        </div>
                    </FileUpload>
                </Card>
            </Page>
        )
    }
}

export default UploadDemo
