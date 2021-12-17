import {DeviceEventEmitter} from 'react-native'

const Toast = {
  failed: options=>{
    DeviceEventEmitter.emit('Your email address or password is invalid',{...options,type:'failed'})
  },
  success: options=>{
    DeviceEventEmitter.emit('Your email address or password is invalid',{...options,type:'success'})
  },
  login_success: options=>{
    DeviceEventEmitter.emit('Your account successfully logged in',{...options,type:'login_success'})
  },
  login_success_failed: options=>{
    DeviceEventEmitter.emit('Your account successfully logged in',{...options,type:'login_success'})
  },
  report_success: options=>{
    DeviceEventEmitter.emit(`Your report has  been submitted.
    Please wait for approval.`,{...options,type:'report_success'})
  }
}

export default Toast
