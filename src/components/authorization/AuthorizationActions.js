import AuthorizationActionTypes from './AuthorizationActionTypes'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import _ from 'lodash'

import setAuthToken from './setAuthToken'
import jwt_decode from 'jwt-decode'

import appConsts from '../../appConstants'

const BASE_URL = appConsts.OAPI_URL
var I18n = require('react-redux-i18n').I18n

export function changeIsLoginActive(active) {
  return {
    type: AuthorizationActionTypes.CHANGE_IS_LOGIN_ACTIVE,
    payload: active,
  }
}

export const registerUser = (user) => (dispatch) => {
  axios
    .post(`${BASE_URL}/signup`, user)
    //return to login state
    .then((response) => {
      dispatch({
        type: AuthorizationActionTypes.CHANGE_IS_LOGIN_ACTIVE,
        payload: true,
      })
    })
    //success message
    .then((response) => {
      toastr.success(I18n.t('toastr.success'), I18n.t('login.signupSuccess'))
    })
    .catch((e) => {
      //if error message is ApiResponse
      if (_.get(e, ['response', 'data', 'message'], false)) {
        dispatch({
          type: AuthorizationActionTypes.GET_ERRORS,
          payload: 'noError',
        })
        toastr.error(I18n.t('toastr.error'), e.response.data.message)
        //if error message is provided by Spring Valid
      } else if (_.get(e, ['response', 'data'], false)) {
        dispatch({
          type: AuthorizationActionTypes.GET_ERRORS,
          payload: e.response.data,
        })
      } else {
        toastr.error(I18n.t('toastr.error'), e.message)
      }
    })
}

export const loginUser = (user, history) => (dispatch) => {
  axios
    .post(`${BASE_URL}/signin`, user)
    .then((res) => {
      const token = res.data.accessToken
      localStorage.setItem(appConsts.ACCESS_TOKEN, token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    //success message
    .then((response) => {
      toastr.success(I18n.t('toastr.success'), I18n.t('login.signinSuccess'))
    })
    .then((response) => {
      history.push('/dashboard')
    })
    .catch((e) => {
      //if error message is ApiResponse
      if (_.get(e, ['response', 'data', 'message'], false)) {
        dispatch({
          type: AuthorizationActionTypes.GET_ERRORS,
          payload: 'noError',
        })
        toastr.error(
          I18n.t('toastr.error'),
          I18n.t(`loginValidation.${e.response.data.message}`)
        )
        //if error message is provided by Spring Valid
      } else if (_.get(e, ['response', 'data'], false)) {
        dispatch({
          type: AuthorizationActionTypes.GET_ERRORS,
          payload: e.response.data,
        })
      } else {
        toastr.error(I18n.t('toastr.error'), e.message)
      }
    })
}

export const logoutUser = (history) => (dispatch) => {
  axios
    .post(`${BASE_URL}/logout`)
    .then((res) => {
      localStorage.removeItem(appConsts.ACCESS_TOKEN)
      setAuthToken(false)
      dispatch(setCurrentUser({}))
    })
    //success message
    .then((response) => {
      toastr.success(I18n.t('toastr.success'), I18n.t('login.logoutSuccessful'))
    })
    .then((response) => {
      history.push('/auth')
    })
    .catch((e) => {
      //if error message is ApiResponse
      if (_.get(e, ['response', 'data', 'message'], false)) {
        dispatch({
          type: AuthorizationActionTypes.GET_ERRORS,
          payload: 'noError',
        })
        toastr.error(
          I18n.t('toastr.error'),
          I18n.t(`loginValidation.${e.response.data.message}`)
        )
        //if error message is provided by Spring Valid
      } else if (_.get(e, ['response', 'data'], false)) {
        dispatch({
          type: AuthorizationActionTypes.GET_ERRORS,
          payload: e.response.data,
        })
      } else {
        toastr.error(I18n.t('toastr.error'), e.message)
      }
    })
}

export const setCurrentUser = (decoded) => {
  return {
    type: AuthorizationActionTypes.SET_CURRENT_USER,
    payload: decoded,
  }
}

export const clearErrors = () => {
  return {
    type: AuthorizationActionTypes.CLEAR_ERRORS,
    payload: {},
  }
}
