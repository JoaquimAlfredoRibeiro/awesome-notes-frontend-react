import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import NoteActionTypes from './NotesActionTypes'
import appConstants from '../../appConstants'

import _ from 'lodash'

const BASE_URL = appConstants.API_URL + '/note'
const BASE_URL_FILE = appConstants.API_URL + '/files'
var I18n = require('react-redux-i18n').I18n

export function getAllNotes(finished) {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/all/${finished}`)
      .then((response) => {
        dispatch([
          {
            type: NoteActionTypes.GET_ALL_NOTES,
            payload: response,
          },
        ])
      })
      .catch((e) => {
        if (_.get(e, ['response', 'data', 'message'], false)) {
          toastr.error(
            I18n.t('toastr.error'),
            I18n.t(`toastr.${e.response.data.message}`)
          )
        } else {
          toastr.error(I18n.t('toastr.error'), e.message)
        }
      })
  }
}

export function getAllNotesForToday() {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/all/today`)
      .then((response) => {
        dispatch([
          {
            type: NoteActionTypes.GET_ALL_NOTES,
            payload: response,
          },
        ])
      })
      .catch((e) => {
        if (_.get(e, ['response', 'data', 'message'], false)) {
          toastr.error(
            I18n.t('toastr.error'),
            I18n.t(`toastr.${e.response.data.message}`)
          )
        } else {
          toastr.error(I18n.t('toastr.error'), e.message)
        }
      })
  }
}

export function createNote(note) {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}`, note)
      .then((response) => {
        dispatch([
          {
            type: NoteActionTypes.CREATE_NOTE,
            payload: response.data,
          },
        ])
      })
      //success message
      .then((response) => {
        toastr.success(I18n.t('toastr.success'), I18n.t('notes.addNoteSuccess'))
      })
      .catch((e) => {
        //if error message is ApiResponse
        if (_.get(e, ['response', 'data', 'message'], false)) {
          dispatch({
            type: NoteActionTypes.GET_ERRORS,
            payload: {},
          })
          toastr.error(I18n.t('toastr.error'), e.response.data.message)
          //if error message is provided by Spring Valid
        } else if (_.get(e, ['response', 'data'], false)) {
          dispatch({
            type: NoteActionTypes.GET_ERRORS,
            payload: e.response.data,
          })
        } else {
          toastr.error(I18n.t('toastr.error'), e.message)
        }
      })
  }
}

export function updateNote(note) {
  return (dispatch) => {
    axios
      .put(`${BASE_URL}`, note)
      .then((response) => {
        if (note.finished) {
          dispatch([
            {
              type: NoteActionTypes.DELETE_NOTE,
              payload: response.data,
            },
          ])
        } else {
          dispatch([
            {
              type: NoteActionTypes.UPDATE_NOTE,
              payload: response.data,
            },
          ])
        }
      })
      //success message
      .then((response) => {
        toastr.success(
          I18n.t('toastr.success'),
          I18n.t('notes.editNoteSuccess')
        )
      })
      .catch((e) => {
        //if error message is ApiResponse
        if (_.get(e, ['response', 'data', 'message'], false)) {
          dispatch({
            type: NoteActionTypes.GET_ERRORS,
            payload: {},
          })
          toastr.error(I18n.t('toastr.error'), e.response.data.message)
          //if error message is provided by Spring Valid
        } else if (_.get(e, ['response', 'data'], false)) {
          dispatch({
            type: NoteActionTypes.GET_ERRORS,
            payload: e.response.data,
          })
        } else {
          toastr.error(I18n.t('toastr.error'), e.message)
        }
      })
  }
}

export function deleteNote(id) {
  return (dispatch) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then((response) => {
        dispatch([
          {
            type: NoteActionTypes.DELETE_NOTE,
            payload: response.data,
          },
        ])
      })
      .catch((e) => {
        if (_.get(e, ['response', 'data', 'message'], false)) {
          toastr.error(
            I18n.t('toastr.error'),
            I18n.t(`toastr.${e.response.data.message}`)
          )
        } else {
          toastr.error(I18n.t('toastr.error'), e.message)
        }
      })
  }
}

export function uploadImage(id, image) {
  return (dispatch) => {
    axios
      .post(`${BASE_URL_FILE}/upload/${id}`, image)
      .then((response) =>
        dispatch([
          {
            type: NoteActionTypes.UPDATE_NOTE,
            payload: response.data,
          },
        ])
      )
      //success message
      .then((response) => {
        toastr.success(
          I18n.t('toastr.success'),
          I18n.t('files.fileAddedSucess')
        )
      })
      .catch((e) => {
        //if error message is ApiResponse
        if (_.get(e, ['response', 'data', 'message'], false)) {
          dispatch({
            type: NoteActionTypes.GET_ERRORS,
            payload: {},
          })
          toastr.error(I18n.t('toastr.error'), e.response.data.message)
          //if error message is provided by Spring Valid
        } else if (_.get(e, ['response', 'data'], false)) {
          dispatch({
            type: NoteActionTypes.GET_ERRORS,
            payload: e.response.data,
          })
        } else {
          toastr.error(I18n.t('toastr.error'), e.message)
        }
      })
  }
}

export function deleteImage(id) {
  return (dispatch) => {
    axios
      .post(`${BASE_URL_FILE}/delete/${id}`)
      .then((response) =>
        dispatch([
          {
            type: NoteActionTypes.UPDATE_NOTE,
            payload: response.data,
          },
        ])
      )
      //success message
      .then((response) => {
        toastr.success(
          I18n.t('toastr.success'),
          I18n.t('files.fileRemovedSucess')
        )
      })
      .catch((e) => {
        //if error message is ApiResponse
        if (_.get(e, ['response', 'data', 'message'], false)) {
          dispatch({
            type: NoteActionTypes.GET_ERRORS,
            payload: {},
          })
          toastr.error(I18n.t('toastr.error'), e.response.data.message)
          //if error message is provided by Spring Valid
        } else if (_.get(e, ['response', 'data'], false)) {
          dispatch({
            type: NoteActionTypes.GET_ERRORS,
            payload: e.response.data,
          })
        } else {
          toastr.error(I18n.t('toastr.error'), e.message)
        }
      })
  }
}

export function setShowNoteDialog(state) {
  return {
    type: NoteActionTypes.SET_SHOW_NOTE_DIALOG,
    payload: state,
  }
}

export function clearData() {
  return {
    type: NoteActionTypes.CLEAR_DATA,
    payload: {},
  }
}

export function clearErrors() {
  return {
    type: NoteActionTypes.CLEAR_ERRORS,
    payload: {},
  }
}
