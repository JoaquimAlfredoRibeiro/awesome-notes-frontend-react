import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default (props) => (
  <div
    style={{
      position: 'absolute',
      bottom: '0px',
      right: '0px',
      padding: '10px 20px',
    }}
  >
    <Typography variant="body2" color="textSecondary">
      <Link color="inherit" href="https://github.com/JoaquimAlfredoRibeiro">
        Joaquim Ribeiro
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  </div>
)
