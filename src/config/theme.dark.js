// eslint-disable-next-line
import {createMuiTheme } from '@material-ui/core/styles'
export default createMuiTheme({
  palette: {
    type: 'dark',
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
    fontSize: 16
  },
  shape: {
    borderRadius: 4
  }
})
