import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import { DataContext } from './DataService'
import FormControl from '@material-ui/core/FormControl'
import { FormGroup } from '@mui/material'
import { FormControlLabel } from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MyCheckboxNotPass(props) {
//  console.log('CHECK PROPS',props.holdparentid)
  const {items,setItems} = React.useContext(DataContext) 
  
  
  function updateCheckboxNotPass(event){
 //   console.log(props.id) /* 1,2,3,...8 */
       
        setItems(
            items.map((item) => 
                
                item.id === props.holdparentid
                ?{
                    ...item,
                    details: item.details.map((detail) =>                 
                                detail.info === props.parentid
                                ? {...detail, 
                                    listcheckbox: detail.listcheckbox.map((mem,idx)=>
                                        idx === 4
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

  
  return (

    props.id === "0Integrative ProcessE" ?
    
    <FormControlLabel 
    value="top"
    control={ <Tooltip title="Not Pass" placement='top'>   
                <Checkbox  id={props.id} 
                                name={props.name} 
                                value={props.value} 
                                parentid={props.parentid} 
                                holdparentid ={props.holdparentid}
                                checked={props.value === "t" ? true:false}                   
                                onClick={updateCheckboxNotPass} 
                                /> 
            </Tooltip>
            }
    label="N/P"
    labelPlacement="top"
    />
    : 
    <Tooltip title="Not Pass" placement='top'>  
    <Checkbox   id={props.id} 
                    name={props.name} 
                    value={props.value} 
                    parentid={props.parentid} 
                    holdparentid ={props.holdparentid}
                    checked={props.value === "t" ? true:false}                   
                    onClick={updateCheckboxNotPass} 
        /> 
    </Tooltip>    
  );
}
