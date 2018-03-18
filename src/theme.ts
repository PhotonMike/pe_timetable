import createMuiTheme from "material-ui/styles/createMuiTheme";
import createPalette from 'material-ui/styles/createPalette'
import createTypography from 'material-ui/styles/createTypography';
import {green, blue} from "material-ui/colors";
import {body} from './modules/style';

const palette = createPalette({
    primary: blue,
    secondary: green,
    type: 'light'
});

export default createMuiTheme({
    palette,
    typography: createTypography(palette, {
        fontFamily: body.fontFamily,
        fontSize: 14,
        fontWeightLight: 300, // Font 1
        fontWeightRegular: 400, // Font 1
        fontWeightMedium: 700, // Font 2
    })
});