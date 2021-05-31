import {Fonts} from '../../styles/themes'
const drawerWidth = 240

export const styles = theme => ({
    root: {
    display: 'flex',
  },
  account: {
    marginTop: 45
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#19A15F'
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidebarText: {
    color: '#fff',
    fontSize: '14px',
    width: '100%',
    fontFamily: Fonts.primary,
    textTransform: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  nestedIcon: {
    position: 'absolute',
    right: 0,
    color: '#fff'
  },
  companyName: {
    // color: Colors.light,
    fontSize: 21,
    marginLeft: 20,
    marginTop: -40,
    
  },
})





