import { AUTH, USER_PROFILE } from '../constants/actionTypes';
import * as api from '../api';


export const signin = (formData, navigate) => async (dispatch) => {
   try {
    const { data } = await api.signIn(formData)

    dispatch({ type: AUTH,  data})

    navigate('/');
   } catch (error) {
    console.log(error);
   }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData)

      dispatch({ type: AUTH,  data})
 
     navigate('/');
    } catch (error) {
     console.log(error);
    }
 }

 export const userPorfile = (id) => async (dispatch) => {
   try {
      const { data } = await api.userProfile(id);

     dispatch({ type: USER_PROFILE,  payload: { user: data }});
   } catch (error) {
      console.log(error);
   }
 }