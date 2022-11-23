import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { DataContext } from './DataService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MyTextReason(props) {
//  console.log('CHECK PROPS',props.holdparentid)
let {parentid,holdparentid,value} = props
const {items,setItems} = React.useContext(DataContext) 
  
  
  const classes = useStyles();
  const fontColor = {
    style: { color: "blue"}
  }


  return (
    <div style={{color:"blue"}}>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={e=> {e.preventDefault()}} >
        <TextField  id={props.id} 
                    value={props.reasoncomment}  
                   
                    label="Submitter Comment" 
                    variant="outlined" 
                    type="text" 
                    disabled
                    multiline
                    size="small" 
                    inputProps={fontColor}
                    style={{width: "300px",marginLeft:"10px",marginRight:"10px",textAlign: "right",float:"right"}} />
    </form>
    </div>
  );
}
