import NoteActionTypes from './NotesActionTypes'

const INITIAL_STATE = {
  noteList: [],
  showNoteDialog: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NoteActionTypes.GET_ALL_NOTES:
      return {
        ...state,
        noteList: action.payload.data,
      }
    case NoteActionTypes.CREATE_NOTE:
      return {
        ...state,
        showNoteDialog: false,
        noteList: [...state.noteList, action.payload],
      }
    case NoteActionTypes.UPDATE_NOTE:
      return {
        ...state,
        showNoteDialog: false,
        noteList: state.noteList.map(function (a) {
          return a.id === action.payload.id ? action.payload : a
        }),
      }
    case NoteActionTypes.DELETE_NOTE:
      return {
        ...state,
        showNoteDialog: false,
        noteList: state.noteList.filter(function (a) {
          return a.id != action.payload.id
        }),
      }
    case NoteActionTypes.SET_SHOW_NOTE_DIALOG:
      return {
        ...state,
        showNoteDialog: action.payload,
      }
    case NoteActionTypes.CLEAR_DATA:
      return {
        noteList: {},
      }
    default:
      return state
  }
}
