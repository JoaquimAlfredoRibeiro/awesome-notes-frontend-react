import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { Translate } from 'react-redux-i18n'

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function ConfirmationDialog(props) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    <Translate value={props.title} />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Translate value={props.text} />
                        <br />
                        <Translate style={{ fontWeight: 'bold' }} value={'global.irreversible'} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleClose} color="primary">
                        <Translate value={'global.cancel'} />
                    </Button>
                    <Button onClick={props.handleAccept} color="primary">
                        <Translate value={'global.submit'} />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}