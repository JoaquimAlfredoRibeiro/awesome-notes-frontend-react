import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import NoteStyles from './Notes.styles'

import { deleteNote, getAllNotes, clearData } from './NotesActions'
import { Grid } from '@material-ui/core'

import AuthRequired from '../common/AuthRequired'
import TableTitle from '../common/TableTitle.component'
import ConfirmationDialog from '../common/ConfirmationDialog.component'
import NoteCard from '../common/NoteCard.component'

const styles = NoteStyles

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.props.getAllNotes(true)

    this.state = {
      showDeleteDialog: false,
      selectedNoteId: '',
    }
  }

  componentWillUnmount() {
    this.props.clearData()
  }

  deleteNoteOpen = (e) => {
    this.setState({
      showDeleteDialog: true,
      selectedNoteId: e.id,
    })
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

  render() {
    const { classes } = this.props
    let { noteList } = this.props

    if (!noteList || !noteList.length) {
      noteList = []
    }

    return (
      <div>
        <div className={classes.root}>
          <TableTitle text="notes.notesListFinished" />
          <div className={classes.grid}>
            <Grid container spacing={2} className={classes.innerGrid}>
              {noteList.map((note) => (
                <Grid
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
                    finished={note.finished}
                    imageName={note.imageName}
                    dueDate={note.dueDate}
                    image={note.image64}
                    onDelete={(e) => this.deleteNoteOpen(e)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          <ConfirmationDialog
            open={this.state.showDeleteDialog}
            handleClose={this.deleteNoteClose}
            handleAccept={this.deleteNoteAccept}
            title="notes.deleteNote"
            text="notes.deleteNoteConfirmation"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  noteList: state.notes.noteList,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteNote,
      getAllNotes,
      clearData,
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
