// eslint-disable-next-line
import theme from './theme'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import amber from '@material-ui/core/colors/amber'

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
  formControl: {
    minWidth: 100
  },
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
  content: {
    backgroundColor: theme.palette.background.default,
    width: `100%`,
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    marginRight: 'auto',
    marginLeft: 'auto',
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
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  warning: {
    backgroundColor: amber[700]
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
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2196F3'
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    backgroundColor: `rgba(255,255,255,0.7)`,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  },
  textInput: {
    color: '#0D47A1'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    marginTop:'0.3em'
  }
})
