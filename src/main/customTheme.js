import { createMuiTheme } from '@material-ui/core/styles'
import appConstants from '../appConstants'

//Create custom theme
export default createMuiTheme({
  palette: {
    background: {
      default: appConstants.BACKGROUND_COLOR,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: '#555555',
        backgroundColor: appConstants.BACKGROUND_COLOR,
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: appConstants.BUTTON_COLOR_LIGHT,
        '&:hover': {
          backgroundColor: appConstants.BUTTON_COLOR_MAIN,
        },
      },
    },
    MuiTable: {
      root: {
        marginLeft: '30px',
        width: '96%',
      },
    },
    MuiMenuItem: {
      root: {
        '&:hover': {
          backgroundColor: appConstants.PRIMARY_INFO_LIGHT,
          color: 'white',
        },
      },
    },
    MuiBadge: {
      colorPrimary: {
        backgroundColor: appConstants.PRIMARY_INFO_MAIN,
      },
    },
    MuiToolbar: {
      gutters: {
        '@media (min-width: 600px)': {
          paddingRight: '0px',
        },
      },
    },
    MuiSvgIcon: {
      colorPrimary: {
        color: appConstants.PRIMARY_INFO_MAIN,
      },
    },
  },
})
