import {createAsyncThunk} from '@reduxjs/toolkit'
import { signin } from '../../api/userApi';

class authThunk{
  static login = createAsyncThunk('auth/login', async (payload) => {
    try {
        const response = await signin(payload)
        localStorage.setItem('user', JSON.stringify(response.data))
        // console.log(response.data)
        return response.data
      } catch (error) {
        throw new Error(error.response.data.message);
      }
  })
}

export default authThunk