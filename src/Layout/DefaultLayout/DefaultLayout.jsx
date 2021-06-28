import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import routes from '../routes'
import { userLogout } from '../../store/actions'
import { withStyles } from '@material-ui/core/styles'
import { Route, Switch, } from 'react-router-dom'
import {
    List, ListItem, Toolbar, AppBar, ViewList,
    CssBaseline, IconButton, HomeWorkIcon, Pages, NewReleases,
    ListItemText, ListItemIcon, MenuItem, Menu, Icon, Avatar,
    Collapse, Hidden, Divider, Typography, History, SchoolIcon,
    ExpandLess, ExpandMore, DashboardIcon, Settings,
    MenuIcon, Drawer, AccountCircle
} from '../../mui'
import { styles } from './style'
import { Colors } from '../../styles/themes'
import { ExitToApp } from '@material-ui/icons';





class DefaultLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false,
            openNest: '',
            prevNest: '',
            anchorEl: null,
            anchorEll: null,

        }
    }
    componentDidMount() {
        // const {  token } = this.props.authState
        // if (token === null )
        //     return this.props.history.push('/auth');

    }
    handleProfileMenuOpen = event => {
        this.setState({ anchorEll: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEll: null });
    };

    handleDrawerToggle = () => {
        this.setState(prevState => ({ mobileOpen: !prevState.mobileOpen }))
    }

    handleClick = (item, index) => {
        if (item.children) {
            this.state.openNest === index ?
                this.setState({ openNest: '' }) :
                this.setState({ openNest: index })
        } else {
            this.props.history.push(item.link);
        }
    }

    render() {
        const { isLoggedIn, data } = this.props.authState
        const student = [

            {
                name: "Result Complain", icon: <Pages />, children: [
                    { name: "New Complain", icon: <NewReleases />, link: "/student" },


                ]
            },
        ];
        const exlec = [
            {
                name: "View Complain", icon: <ViewList />, children: [
                    { name: "View Complain", link: "/staff" },
                    { name: "Complain History", icon: <History />, link: "/history" },


                ]
            },

        ]
        const admin = [{
            name: "Settings", icon: <Settings />, children: [
                { name: "Examiner", icon: <SchoolIcon />, link: '/examiner' },
                { name: "Lecturer", icon: <SchoolIcon />, link: '/lecturer' },
                { name: "Student", icon: <SchoolIcon />, link: '/studentT' },
                { name: "Course", icon: <SchoolIcon />, link: '/course' },


            ]
        },]
        const set = [
            {
                name: "My Profile", icon: <AccountCircle />, link: '/profile'
            },
            {
                name: "Logout", icon: <ExitToApp />
            },
        ]
        let authRedirect = null;
        if (isLoggedIn === false) {
            authRedirect = <Redirect to='/auth' />
        }
        const { classes, container, location, } = this.props
        const { openNest, anchorEll } = this.state

        const drawer = (
            <div>

                <div className={classes.toolbar} />
                <div className="business-name">
                    <HomeWorkIcon
                        style={{ fontSize: 40 }}
                    />
                </div>
                <Divider color='inherit' />
                {data && data[0].role === 'Admin' && <List>

                    <ListItem button className={"sidebarBtn"} style={{ '&:focus': { outline: "none" } }} onClick={() => this.props.history.push('/dashboard')} selected={location.pathname === '/dashboard'}>
                        <ListItemIcon style={{ color: "#fff", margin: 0 }}><DashboardIcon /></ListItemIcon>
                        <ListItemText classes={{ primary: classes.sidebarText }}>DASHBOARD</ListItemText>
                    </ListItem>
                </List>}
                <List >
                    {data && data[0].role === 'Lecturer' || data[0].role === 'Examiner' ? exlec.map((item, index) => {
                        return <>
                            <ListItem button className={"sidebarBtn"} style={{ '&:focus': { outline: "none" } }} onClick={item.name === 'Logout' ? () => this.props.onLogout() : () => this.handleClick(item, index)} selected={location.pathname === item.link} >
                                <ListItemIcon style={{ color: "#fff", margin: 0 }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} classes={{ primary: classes.sidebarText }} />
                                {item.children ? <ListItemIcon className={classes.nestedIcon}>{openNest === index ? <ExpandLess /> : <ExpandMore />}</ListItemIcon> : null}
                            </ListItem>
                            <Collapse key={index} in={openNest === index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        item.children ? item.children.map((item, index) => (
                                            <ListItem key={index} button className={classes.nested} onClick={() => this.handleClick(item, index)} selected={location.pathname === item.link}  >
                                                <ListItemIcon style={{ color: "#fff", margin: 0 }}>{item.icon}</ListItemIcon>
                                                {<ListItemText primary={item.name} key={index} classes={{ primary: classes.sidebarText }} />}
                                            </ListItem>
                                        ))
                                            : null}
                                </List>
                            </Collapse>
                        </>
                    }) : data && data[0].role === 'Student' ? student.map((item, index) => {
                        return <>
                            <ListItem button className={"sidebarBtn"} style={{ '&:focus': { outline: "none" } }} onClick={item.name === 'Logout' ? () => this.props.onLogout() : () => this.handleClick(item, index)} selected={location.pathname === item.link} >
                                <ListItemIcon style={{ color: "#fff", margin: 0 }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} classes={{ primary: classes.sidebarText }} />
                                {item.children ? <ListItemIcon className={classes.nestedIcon}>{openNest === index ? <ExpandLess /> : <ExpandMore />}</ListItemIcon> : null}
                            </ListItem>
                            <Collapse key={index} in={openNest === index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        item.children ? item.children.map((item, index) => (
                                            <ListItem key={index} button className={classes.nested} onClick={() => this.handleClick(item, index)} selected={location.pathname === item.link}  >
                                                <ListItemIcon style={{ color: "#fff", margin: 0 }}>{item.icon}</ListItemIcon>
                                                {<ListItemText primary={item.name} key={index} classes={{ primary: classes.sidebarText }} />}
                                            </ListItem>
                                        ))
                                            : null}
                                </List>
                            </Collapse>
                        </>
                    }) : admin.map((item, index) => {
                        return <>
                            <ListItem button className={"sidebarBtn"} style={{ '&:focus': { outline: "none" } }} onClick={item.name === 'Logout' ? () => this.props.onLogout() : () => this.handleClick(item, index)} selected={location.pathname === item.link} >
                                <ListItemIcon style={{ color: "#fff", margin: 0 }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} classes={{ primary: classes.sidebarText }} />
                                {item.children ? <ListItemIcon className={classes.nestedIcon}>{openNest === index ? <ExpandLess /> : <ExpandMore />}</ListItemIcon> : null}
                            </ListItem>
                            <Collapse key={index} in={openNest === index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        item.children ? item.children.map((item, index) => (
                                            <ListItem key={index} button className={classes.nested} onClick={() => this.handleClick(item, index)} selected={location.pathname === item.link}  >
                                                <ListItemIcon style={{ color: "#fff", margin: 0 }}>{item.icon}</ListItemIcon>
                                                {<ListItemText primary={item.name} key={index} classes={{ primary: classes.sidebarText }} />}
                                            </ListItem>
                                        ))
                                            : null}
                                </List>
                            </Collapse>
                        </>
                    })}

                    <Collapse timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItem button className={classes.nested}   >
                                <ListItemIcon style={{ color: "#fff", margin: 0 }}></ListItemIcon>
                                <ListItemText classes={{ primary: classes.sidebarText }} />
                            </ListItem>

                        </List>
                    </Collapse>
                </List>

                {authRedirect}
                {/* <div style={{paddingTop: 50}}>
                    <Settings style={{color: '#fff'}}/>
                </div> */}
                <List style={{ marginTop: "85%" }}>
                    {set.map((item, index) => {
                        return <>
                            <ListItem button className="sidebarBtn" style={{ '&:focus': { outline: "none" } }} onClick={item.name === 'Logout' ? () => this.props.onLogout() : () => this.handleClick(item, index)} selected={location.pathname === item.link} >
                                <ListItemIcon style={{ color: "#fff", margin: 0 }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} classes={{ primary: classes.sidebarText }} />
                                {item.children ? <ListItemIcon className={classes.nestedIcon}>{openNest === index ? <ExpandLess /> : <ExpandMore />}</ListItemIcon> : null}
                            </ListItem>
                        </>
                    })}
                </List>
            </div>
        );
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" id="app-bar" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color='default'
                            aria-label="open drawer"
                            edge="start"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography id="app-bar-title" variant="h6" noWrap>
                            STUDENT RESULT COMPLAIN SYSTEM
          </Typography>


                        <Menu
                            id="material-appbar"
                            anchorEl={anchorEll}
                            open={Boolean(anchorEll)}
                            onClose={this.handleClose}
                            style={{ marginTop: 35 }}
                            classes={{ paper: classes.menu }}
                        >
                            <MenuItem >
                                <Icon color="primary" style={{ marginRight: 10 }}>
                                    account_circle_outlined
              </Icon>
              Create Account
            </MenuItem>
                            {/* <MenuItem onClick={this.handleClose}><Icon style={{color:"#388e3c", marginRight:10}} >people</Icon>Accounts
                    </MenuItem> */}
                            <Divider />
                            <MenuItem >
                                <Icon style={{ color: '#b71c1c', marginRight: 10 }}>
                                    exit_to_app
              </Icon>
              Logout
            </MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer

                            container={container}
                            variant="temporary"
                            anchor={'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        {routes.map((route) => {
                            return route.component ? (
                                <Route key={route.path} path={route.path} exact={route.exact} name={route.name} render={props => (
                                    <route.component {...props} />
                                )} />
                            ) : (null);
                        })}
                    </Switch>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authState: state.isAuthenticated,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(userLogout())
    }
}
DefaultLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, { withTheme: true })(DefaultLayout)));

