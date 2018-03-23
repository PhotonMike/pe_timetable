import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';


export default function MyAppBar(props) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Tesi órarend
                </Typography>
            </Toolbar>
        </AppBar>
    );
}