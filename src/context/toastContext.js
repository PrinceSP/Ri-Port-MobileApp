import React, {createContext, useReducer} from 'react'

const ToastContext = createContext()

const ToastContextProvider = (props) => {

  const [state,dispatch] = useReducer((state, action)=>{
    
  },notifications)

  const notifications = [
    {
      id:1,
      type:'success',
      title:'Success',
      message:'Your account successfuly logged in'
    },
    {
      id:2,
      type:'failed',
      title:'Error',
      message:'Your email or password is invalid'
    },
    {
      id:3,
      type:'success',
      title:'Success',
      message:'Your account has been saved'
    },
    {
      id:4,
      type:'success',
      title:'Success',
      message:`Your report has  been submitted.
      Please wait for approval`
    },
  ]

  return (
    <ToastContext.Provider>
      {props.children}
    </ToastContext.Provider>
  )
}

export default ToastContextProvider
