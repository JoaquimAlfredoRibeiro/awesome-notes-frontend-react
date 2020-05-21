import React from 'react'
import { Translate } from 'react-redux-i18n'
import appConstants from '../../appConstants'

export default function TableTitle(props) {

    return (
        <div style={{
            fontSize: '2em',
            marginLeft: '30px',
            backgroundColor: appConstants.PRIMARY_INFO_MAIN,
            boxShadow: '0 10px 10px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
            color: '#FFF',
            borderRadius: '5px',
            padding: '7px 15px',
            marginTop: '-12px',
            position: 'absolute',
            zIndex: 1,
        }}>
            <Translate value={props.text} />
        </div >
    )
}