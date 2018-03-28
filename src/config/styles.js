// eslint-disable-next-line
import theme from './theme'
import Green from 'material-ui/colors/green'
import Red from 'material-ui/colors/red'

export default theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    zIndex: 1,
    overflow: 'hidden'
  },
  table: {
    minWidth: 150
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    minWidth: 100
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  bar: {},
  checked: {
    color: '#f44336',
    '& + $bar': {
      backgroundColor: '#f44336'
    }
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: `100%`,
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    flexGrow: 1,
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      width: `100%`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  gridRoot: {
    flexGrow: 1
  },
  grid: {
    padding: 16,
    textAlign: 'center'
  },
  gridHeader: {
    spacing: 0,
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50
  },
  link: {
    color: theme.palette.secondary.main
  },
  success: {
    backgroundColor: Green[500]
  },
  danger: {
    backgroundColor: Red[500]
  },
  avatar: {
    margin: 10
  },
  accountIcon: {
    right: theme.spacing.unit * 2,
    marginTop: '-0.5em',
    position: 'fixed'
  },
  margin: {
    margin: theme.spacing.unit * 2
  }
})
