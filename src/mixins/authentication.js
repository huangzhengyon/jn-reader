import wepy from 'wepy'
import { getStore, connect } from 'wepy-redux'
import { CustomError } from '../errors'
import {
  login
} from '../redux/models/user'
const store = getStore()

export default class AuthenticationMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }

  methods = {
    handleAuthorize({ detail: { errMsg } }) {
      console.log(`authentication errMsg: ${errMsg}`)
      return new Promise((resolve, reject) => {
          if (errMsg==='getUserInfo:fail auth deny') throw new CustomError('用户拒绝授权')
          if (errMsg&&errMsg.includes('fail')) throw new CustomError('用户授权失败')
          resolve(errMsg)
        })
          .then(userInfo => {
            this.isLoaded = false
            this.$apply()
            return store.dispatch(login())
          })
          .catch(error => {
            console.log(`<<<<<<<<<<<<< -- 小节授权: ${error} -- >>>>>>>>>>>>>>`)
          }) // end catch
    } // end handleAuthorize
  } // end methods

  onShow() {
    console.log('authentication mixin onShow')
  } // end onShow

}
