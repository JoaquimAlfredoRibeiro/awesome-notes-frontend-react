import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { Translate } from 'react-redux-i18n'
import { withStyles } from '@material-ui/core/styles'

import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import NoteStyles from './Notes.styles'
import If from '../common/If'

import _ from 'lodash'

import {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getAllNotesForToday,
  clearData,
  clearErrors,
  setShowNoteDialog,
  uploadImage,
  deleteImage,
} from './NotesActions'
import {
  Button,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
} from '@material-ui/core'

import AuthRequired from '../common/AuthRequired'
import TableTitle from '../common/TableTitle.component'
import ConfirmationDialog from '../common/ConfirmationDialog.component'
import NoteCard from '../common/NoteCard.component'

import NoteAddIcon from '@material-ui/icons/NoteAdd'

const styles = NoteStyles
const I18n = require('react-redux-i18n').I18n
const NEW_NOTE = 'addNote'
const EDIT_NOTE = 'editNote'

class Notes extends React.Component {
  constructor(props) {
    super(props)

    if (props.today) {
      this.props.getAllNotesForToday()
    } else {
      this.props.getAllNotes(false)
    }
    this.props.setShowNoteDialog(false)

    this.state = {
      dialogType: '',
      showDeleteDialog: false,
      selectedNoteId: '',
      content: '',
      dueDate: '',
      modDueDate: '',
      finished: false,
      image: '',
      errors: {},
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      return {
        errors: props.errors,
      }
    }

    return null
  }

  componentWillUnmount() {
    this.props.clearData()
    this.props.clearErrors()
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleDateChange(e) {
    this.setState({
      dueDate: e.toISOString(),
      modDueDate: e.toISOString(),
    })
  }

  newNote = () => {
    this.setState({
      dialogType: NEW_NOTE,
      selectedNoteId: '',
      content: '',
      dueDate: '',
      modDueDate: '',
      finished: false,
      errors: {},
    })
    this.props.setShowNoteDialog(true)
  }

  dialogClose = () => {
    this.props.setShowNoteDialog(false)

    this.setState({
      selectedNoteId: '',
      content: '',
      dueDate: '',
      modDueDate: '',
      finished: false,
      errors: {},
    })

    this.props.clearErrors()
  }

  dialogSubmit = (e) => {
    e.preventDefault()

    const note = {
      id: this.state.selectedNoteId,
      content: this.state.content,
      dueDate: this.state.dueDate,
      finished: this.state.finished,
      imageName: this.state.image,
    }

    if (this.state.dialogType === NEW_NOTE) {
      note.finished = false
      this.props.createNote(note)
    } else if (this.state.dialogType === EDIT_NOTE) {
      this.props.updateNote(note)
    }
  }

  onNoteEdit = (e) => {
    this.setState({
      dialogType: EDIT_NOTE,
      selectedNoteId: e.id,
      content: e.content,
      modDueDate: this.getDate(e.dueDate),
      finished: e.finished,
      image: e.imageName,
      errors: {},
    })

    this.props.setShowNoteDialog(true)
  }

  getDate = (date) => {
    if (date === null) {
      return null
    }
    let returnDate = [...date]
    returnDate[1] = returnDate[1] - 1

    return new Date(...returnDate)
  }

  deleteNoteOpen = (e) => {
    this.setState({
      showDeleteDialog: true,
      selectedNoteId: e.id,
    })
  }

  uploadImage = (props, e) => {
    const formData = new FormData()
    formData.append('file', e)

    this.props.uploadImage(props.id, formData)
  }

  deleteImage = (props, e) => {
    this.props.deleteImage(props.id)
  }

  deleteNoteClose = () => {
    this.setState({
      showDeleteDialog: false,
      selectedNoteId: '',
    })
  }

  deleteNoteAccept = () => {
    this.props.deleteNote(this.state.selectedNoteId)

    this.setState({
      showDeleteDialog: false,
      selectedNoteId: '',
    })
  }

  changeFinished = () => {
    this.setState({
      finished: !this.state.finished,
    })
  }

  render() {
    const { classes } = this.props
    let { noteList, showNoteDialog } = this.props
    const { errors } = this.state

    if (!noteList || !noteList.length) {
      noteList = []
    }

    if (showNoteDialog === undefined) {
      showNoteDialog = false
    }

    let title = ''
    if (this.props.today) {
      title = 'notes.today'
    } else {
      title = 'notes.notesList'
    }

    return (
      <div>
        <div className={classes.root}>
          <TableTitle text={title} />
          <div className={classes.grid}>
            <Grid container spacing={2} className={classes.innerGrid}>
              {noteList.map((note) => (
                <Grid
                  key={note.id}
                  itemxs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                  className={classes.rowGrid}
                >
                  <NoteCard
                    id={note.id}
                    content={note.content}
                    dueDate={note.dueDate}
                    finished={note.finished}
                    imageName={note.imageName}
                    image={note.image64}
                    onEdit={(e) => this.onNoteEdit(e)}
                    onDelete={(e) => this.deleteNoteOpen(e)}
                    uploadImage={(props, e) => this.uploadImage(props, e)}
                    deleteImage={(e) => this.deleteImage(e)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          <Dialog
            open={showNoteDialog}
            onClose={this.dialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {I18n.t(`notes.${this.state.dialogType}`)}
            </DialogTitle>
            <DialogContent>
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="content"
                label={<Translate value="notes.content" />}
                name="content"
                autoFocus
                onChange={this.handleInputChange}
                value={this.state.content}
                error={Boolean(`${_.get(errors, ['fields', 'content'], '')}`)}
                helperText={I18n.t(
                  `noteValidation.${_.get(errors, ['fields', 'content'], '')}`
                )}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  clearable
                  value={this.state.modDueDate}
                  placeholder={I18n.t('notes.noDueDate')}
                  onChange={(date) => this.handleDateChange(date)}
                  format="dd/MM/yyyy"
                  invalidDateMessage=""
                  style={{ marginTop: '10px' }}
                  TextFieldComponent={(props) => (
                    <TextField {...props} disabled />
                  )}
                />
              </MuiPickersUtilsProvider>
              <If test={this.state.dialogType === EDIT_NOTE}>
                <div style={{ marginLeft: '450px' }}>
                  <Translate value="notes.finished" />
                  <Checkbox
                    edge="end"
                    checked={this.state.finished}
                    onChange={this.changeFinished}
                    name="checkedB"
                    color="primary"
                  />
                </div>
              </If>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.dialogClose} color="primary">
                {I18n.t('global.cancel')}
              </Button>
              <Button onClick={this.dialogSubmit} color="primary">
                {I18n.t('global.submit')}
              </Button>
            </DialogActions>
          </Dialog>

          <ConfirmationDialog
            open={this.state.showDeleteDialog}
            handleClose={this.deleteNoteClose}
            handleAccept={this.deleteNoteAccept}
            title="notes.deleteNote"
            text="notes.deleteNoteConfirmation"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<NoteAddIcon />}
          onClick={() => this.newNote()}
        >
          <Translate value="notes.addNote" />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  noteList: state.notes.noteList,
  showNoteDialog: state.notes.showNoteDialog,
  errors: state.errors,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createNote,
      updateNote,
      deleteNote,
      getAllNotes,
      getAllNotesForToday,
      clearData,
      clearErrors,
      setShowNoteDialog,
      uploadImage,
      deleteImage,
    },
    dispatch
  )

export default AuthRequired(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles, { withTheme: true })(Notes))
  )
)
