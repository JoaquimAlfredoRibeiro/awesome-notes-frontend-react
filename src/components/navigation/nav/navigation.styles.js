import sidebardImage from '../../../assets/images/Sidebar1.jpg'
import '../../../appConstants'
import appConstants from '../../../appConstants'

const drawerWidth = 240

export default (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    zIndex: '1',
    backgroundImage: 'url(' + sidebardImage + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow:
      '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  logoDiv: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'flex-start',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    marginRight: '5px',
    cursor: 'pointer',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  AppBarTypography: {
    flexGrow: 1,
  },
  backgrounColorText: {
    color: appConstants.BACKGROUND_COLOR,
    marginLeft: '2px',
  },
  sidebarButton: {
    marginTop: '10px',
    borderRadius: '5px',
    '&:hover,&:focus,&:visited,&': {
      color: '#FFF',
    },
    '&:focus': {
      transitionDelay: '0.25s',
      backgroundColor: appConstants.PRIMARY_INFO_MAIN_ON_BLACK,
    },
  },
  activeSidebarButton: {
    marginTop: '10px',
    borderRadius: '5px',
    backgroundColor: appConstants.PRIMARY_INFO_MAIN_ON_BLACK,
    '&:hover,&:focus,&:visited,&': {
      color: '#FFF',
    },
    '&:focus': {
      transitionDelay: '0.25s',
      backgroundColor: appConstants.PRIMARY_INFO_MAIN_ON_BLACK,
    },
  },
  sidebarList: {
    padding: '5px',
  },
})
