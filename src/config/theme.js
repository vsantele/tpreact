// eslint-disable-next-line
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
export default createMuiTheme({
  palette: {
    primary: {
      light: '#BBDEFB',
      main: '#2196F3',
      dark: '#0D47A1',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  },
  typography: {
    fontSize: 16,
    button: {
      fontFamily: 'Bahnschrift, "Roboto", "Helvetica", "Arial", sans-serif'
    },
    useNextVariants: true
  },
  shape: {
    borderRadius: 4
  }
})
