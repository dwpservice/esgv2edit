import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox'



import { DataContext } from './DataService';
import { FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MyCheckboxB(props) {
//  console.log('CHECK PROPS',props.holdparentid)
//  const {items,setItems} = React.useContext(DataContext) 
  
/*  
  function updateCheckboxB(event){
 
       
        setItems(
            items.map((item) => 
                
                item.id === props.holdparentid
                ?{
                    ...item,
                    details: item.details.map((detail) =>                 
                                detail.info === props.parentid
                                ? {...detail, 
                                    listcheckbox: detail.listcheckbox.map((mem,idx)=>
                                        idx === 1
                                        ? event.target.checked ? 't': 'f'
                                        : mem
                                        
                                     )

                                  }
                                : {...detail}
                                ),
                 }
                :{...item}
            
            )
       ) 
  }
*/
 

  return (
    props.id === "0Integrative ProcessB" ?
    
    <FormControlLabel 
    value="top"
    control={<Checkbox  id={props.id} 
                        name={props.name} 
                        value={props.value} 
                        parentid={props.parentid} 
                        holdparentid ={props.holdparentid}
                        checked={props.value === "t" ? true:false}
                        color='primary'                   
                        aria-disabled
                        style={{backgroundColor:"#eef51d",borderStyle:"solid",borderRadius:"inherit"}} /> }
    label="?"
    labelPlacement="top"
    />
    :   
           
    <Checkbox  id={props.id} 
            name={props.name} 
            value={props.value} 
            parentid={props.parentid} 
            holdparentid ={props.holdparentid}
            checked={props.value === "t" ? true:false}
            color='primary'                   
            aria-disabled
            style={{backgroundColor:"#eef51d",borderStyle:"solid",borderRadius:"inherit"}} />         
    
  );
}
