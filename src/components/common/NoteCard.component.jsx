import React from 'react'

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import BrokenImageIcon from '@material-ui/icons/BrokenImage'

import { I18n } from 'react-redux-i18n'

import defaultImage from '../../assets/images/DefaultNote.jpg'
import If from './If'

export default function NoteCard(props) {
  const onEdit = () => {
    props.onEdit(props)
  }

  const onDelete = () => {
    props.onDelete(props)
  }

  const uploadImage = (e) => {
    props.uploadImage(props, e)
  }

  const deleteImage = () => {
    props.deleteImage(props)
  }

  const formatDate = () => {
    if (props.dueDate) {
      const day = props.dueDate[2]
      const month = props.dueDate[1]
      const year = props.dueDate[0]

      return `${day}-${month}-${year}`
    } else {
      return I18n.t('notes.noDueDate')
    }
  }

  return (
    <Card
      style={{
        maxWidth: 280,
        boxShadow:
          '0 10px 35px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
      }}
    >
      <CardMedia
        style={{
          height: 0,
          paddingTop: '56.25%',
          marginTop: '30',
        }}
        image={props.image ? props.image : defaultImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {formatDate()}
        </Typography>
        <Typography gutterBottom variant="body1">
          {props.content}
        </Typography>
        <CardActions disableSpacing>
          <If test={props.onEdit}>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </If>

          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>

          <If test={props.uploadImage}>
            <input
              accept="image/*"
              hidden
              id={`icon-button-file${props.id}`}
              type="file"
              onChange={(e) => {
                uploadImage(e.target.files['0'])
                e.target.value = null
              }}
            />
            <label htmlFor={`icon-button-file${props.id}`}>
              <IconButton component="span">
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </If>
          <If test={props.deleteImage}>
            <IconButton component="span" onClick={deleteImage}>
              <BrokenImageIcon />
            </IconButton>
          </If>
        </CardActions>
      </CardContent>
    </Card>
  )
}
