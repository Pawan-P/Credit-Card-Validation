import { Component } from 'react';
import { createStyles, Theme } from '@material-ui/core/styles';
import {withStyles} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

const useStyles = createStyles((theme: Theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingTop: theme.spacing(10)
    },
    navigationBar: {
      minHeight: "50px"
    }
  }));

interface IProps{
  children: any,
  classes: any
}

interface IState{
}

class Layout extends Component<IProps, IState> {
  
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
  }

  render() {

    const classes = this.props.classes;

    return <div className={classes.root}>
        <CssBaseline />
        <AppBar
            color="primary"
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar className={classes.navigationBar}>
            <Typography variant="h6" noWrap>
                <b>MoKART.com</b>
            </Typography>
        </Toolbar>
        </AppBar>
        <main className={classes.content}>
            {
                this.props.children
            }   
        </main>
    </div>
  }
}

export default withStyles(useStyles)(Layout);