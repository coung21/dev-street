import {createAsyncThunk} from '@reduxjs/toolkit'
import { signin, signout } from '../../api/userApi';
import api from '../../api/api'

class authThunk{
  static login = createAsyncThunk('auth/login', async (payload) => {
    try {
        const response = await signin(payload)
        if(response.status === 200){
          localStorage.setItem('user', JSON.stringify(response.data))
          // console.log(response.data)
          return response.data
        }
        else{
          throw new Error('not authenticate')
        }
      } catch (error) {
        throw new Error(error.response.data.message);
      }
  })

  static logout = createAsyncThunk('auth/logout' , async () => {
    try {
      const response = await signout()
      console.log(response)
      if(response.status === 200){
        localStorage.removeItem('user')
        return response.message
      } 
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  })
}

export default authThunk