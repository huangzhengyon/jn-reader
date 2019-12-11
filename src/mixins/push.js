import wepy from 'wepy'
import {getStore, connect} from 'wepy-redux'
import {fetch} from '../api'

const store = getStore()
export default class PushMixin extends wepy.mixin {
    data = {}
    methods = {
        handleSavePushCode({detail: {formId}}) {
            console.log('mixin handle push code', formId)
            let postData = {
                token: store.getState().user.token,
                code: formId
            }
            fetch.savePushCode(postData).then(response => {
                console.log('succed in saving push code')
            }).catch(error => {
                console.log('error', error)
            })
        }
    }
}
