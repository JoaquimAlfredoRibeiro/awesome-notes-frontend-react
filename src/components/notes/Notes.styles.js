export default (theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  innerGrid: {
    padding: '20px',
    marginTop: '40px',
    marginLeft: '5px',
  },
  rowGrid: {
    marginBottom: '20px',
  },
  button: {
    margin: theme.spacing(3, 0),
    alignContent: 'flex-start',
    flexGrow: 1,
    width: 'fit-content',
  },
})
