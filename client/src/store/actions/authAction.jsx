import {createAsyncThunk} from '@reduxjs/toolkit'
import { signin } from '../../api/userApi';

class authThunk{
  static login = createAsyncThunk('auth/login', async (payload) => {
      const response = await signin(payload)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('accessToken', response.data.tokens.accessToken)
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken)
      return response.data
  })
}

export default authThunk