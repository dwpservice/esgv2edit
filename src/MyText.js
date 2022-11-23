import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { DataContext } from './DataService';
import Tooltip from '@material-ui/core/Tooltip';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MyText(props) {
  
  const {items,setItems,getscore,setGetScore,updatescreen} = React.useContext(DataContext) 
  
  const classes = useStyles();
//  console.log('props in child ',props)
  let {label,type,id,parentid,value,variant,myfunc} = props

//  console.log('items at MyText.js ',itemsData)

  const [score, setScore] = React.useState(props.value)
 

 
  function updateScore(event){
    
//    console.log('event.target.value is ...',event.target.value)
//    console.log('event.target.id is ...',event.target.id)
    event.preventDefault()

    const newvalue = event.target.value
    setScore(newvalue)
    const addmore = parseInt(getscore) + parseInt(newvalue)
  //  console.log('addmore ---',addmore)
  //  setGetScore(addmore.toString())
   
 //   console.log('AT MyText getscore --- ',getscore)
    
    value = newvalue
    let intFromInput = parseInt(newvalue)
    let intMax = parseInt(props.maxscore)
 
    if (intFromInput <= intMax) {
        setItems(
            items.map((item) =>                 
                item.id === props.holdparentid
                ?{
                    ...item,
                    details: item.details.map((detail) =>                 
                                detail.info === parentid
                                ? {...detail, score: event.target.value}
                                : {...detail}
                                ),
                 }
                :{...item}            
            )
         )
         
    }else{
       
    //    window.alert(`You must put number not over ${props.maxscore}!`)
        swal("Error!",`You must put number not over ${props.maxscore}!`,"error")
        setScore("0")
    }
        

    }
   
//    console.log('ITEM AFTER AFTER UPDATE SCORE ==> ', items) 

  return (

    <form className={classes.root} noValidate autoComplete="off" onSubmit={ e=> {e.preventDefault()}} style={{visibility: props.option !== "o"? "hidden":"visible"}}>     
        <Tooltip title={`Max number...${props.maxscore}` } arrow>
            <TextField  
                    id={props.id} 
                    value={score}  
                    onChange={updateScore} 
                    onBlur={updatescreen}
                    label="Score" 
                    variant="outlined" 
                    type="text" 
                    size="small" 
                    style={{width: "70px",marginLeft:"10px",marginRight:"10px",textAlign: "right"}} />
        </Tooltip>             
    </form>
  );
}
