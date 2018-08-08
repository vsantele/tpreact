// eslint-disable-next-line
import theme from './theme'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

export default theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    Index: 1,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default
  },
  table: {
    minWidth: 150
  },
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap'
  // },
  formControl: {
    minWidth: 100
  },
  // selectEmpty: {
  //   marginTop: theme.spacing.unit * 2
  // },
  button: {
    margin: theme.spacing.unit
  },
  bar: {},
  checked: {
    color: '#f44336',
    '& + $bar': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  flex: {
    flex: 1
  },
  // menuButton: {
  //   marginLeft: -12,
  //   marginRight: 20
  // },
  // control: {
  //   padding: theme.spacing.unit * 2
  // },
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
    backgroundColor: green[500]
  },
  danger: {
    backgroundColor: red[500]
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
  },
  textFieldProfil: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    },
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px'
  },
  buttonFailed: {
    color: theme.palette.getContrastText('#f44336'),
    backgroundColor: '#f44336',
    '&:hover': {
      backgroundColor: '#ba000d'
    },
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
  // containerAutoSuggest: {
  //   flexGrow: 1,
  //   position: 'relative',
  //   height: 250
  // },
  // suggestionsContainerOpen: {
  //   position: 'absolute',
  //   zIndex: 1,
  //   marginTop: theme.spacing.unit,
  //   left: 0,
  //   right: 0
  // },
  // suggestion: {
  //   display: 'block'
  // },
  // suggestionsList: {
  //   margin: 0,
  //   padding: 0,
  //   listStyleType: 'none'
  // },
  // fab: {
  //   position: 'fixed',
  //   bottom: theme.spacing.unit * 2,
  //   right: theme.spacing.unit * 2
  // }
})
