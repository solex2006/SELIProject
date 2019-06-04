import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

export default theme;
