"use strict"
// OSS单文件上传
import React, {Component} from 'react'
import {Button} from 'antd'
import request from 'common/request/request.js'
import FileUpload from 'component/file-upload/FileUpload.jsx'

class OSSImgUpload extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
        }

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    randomString(len) {
        len = len || 32
        let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let maxPos = $chars.length
        let str = ''
        for (let i = 0; i < len; i++) {
            //0~32的整数
            str += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
        }
        return str
    }

    getFileExt(filename) {
        return filename.replace(/.+\./, '') ? filename.replace(/.+\./, '') : ''
    }

    upload() {
        this.setState({
            isLoading: true,
        })
        this.getOSSPolicy()
            .then(res => {

                this.refs['file-upload'].baseUrl = res.host

                let fileExt = this.getFileExt(this.refs['file-upload'].files[0].name)

                this.refs['file-upload'].paramAddToField = {
                    "name": Date.now(),
                    "key": 'flycar/deviceApp/' + Date.now() + this.randomString(4) + '.' + fileExt,
                    "policy": res.policy,
                    "OSSAccessKeyId": res.accessid,
                    "success_action_status": 200,
                    "callback": res.callback,
                    "Signature": res.signature
                }

                this.refs['file-upload'].commonUpload()

            })


    }

    //@return promise
    getOSSPolicy() {
        return new Promise((resolve, reject) => {

            request({
                url: '/flycar/auth/deviceApp/policy/info',
                type: 'get',
                dataType: 'json',
            }).then((res) => {

                if (res.code === '0') {
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }).catch(err => {
                reject(err)
            })


        })
    }

    render() {

        let _this = this

        const options = {
            baseUrl: '/upload',
            paramAddToField: {},
            textBeforeFiles: true,
            wrapperDisplay: 'block',
            accept: _this.props.accept,
            chooseFile(files) {
                console.log(files)
                if (!files.length) {
                    return
                }

                _this.upload()
            },
            uploadSuccess(res){
                console.log(res, 'upload success')
                _this.props.onChange(res.data)
                _this.setState({
                    isLoading: false,
                })
                // 清空value 防止打开新的Modal不触发onChange
                _this.refs['file-upload'].refs['ajax_upload_file_input'].value = ''
            },
            beforeUpload(files, mill){

            },
            doUpload(){
                console.log('正在上传')
            },
            fileFieldName(file){
                return 'file'
            },
        }

        return (
            <FileUpload options={options} ref="file-upload">
                <Button loading={this.state.isLoading} ref="chooseBtn">
                    {
                        this.props.value ?
                            <img style={{height: 100}} src={this.props.value} alt=""/>
                            :
                            '选择图片，然后将立即上传'
                    }
                </Button>
            </FileUpload>
        )
    }
}

export default OSSImgUpload
