import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    randomImageStyles: {
        width: '96vw',
        height: 400,
        
    },
    mainContainer: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
      },
    randomImageContainer: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    userName: {
        // alignItems: 'flex-bottom',
        // textAlign: 'center',
        fontSize: 40,
      },
     purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: 100,
        height:100,
      },
     button: {
        
     } 
}))
  