import React from 'react'
import MyList from "./MyList"
import Appbar from "./Appbar"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
    Outlet,
    useParams,
    NavLink,
    useNavigate,
    useLocation
} from 'react-router-dom';
import { nanoid } from 'nanoid'



import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FormGroup } from '@mui/material';
import { FormControlLabel, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox'


const useStyles = makeStyles((theme) => ({
      typography: {
      padding: theme.spacing(2),
    },
    root: {
     
        margin: '1px',
        padding: '1px'
     
    },
    mystyletest:{
       textAlign: 'left'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  
}));

const DataContext = React.createContext();


const DataService = (props) => {
    
    const classes = useStyles();
    const [keepproject,SetKeepproject] = React.useState(''); 
    const [proje,setProje] = React.useState([]); 
    const location = useLocation();
    
  //  console.log('location value is ',location.state);
    const mybearer = location.state.myAccessToken; 
    const myreceiveemail = location.state.myemail;
    const myuid = location.state.myUid;
    const [myflag, setMyFlag] = React.useState(true)
    const [checkleed,setCheckLeed] = React.useState(false)

    const [message, setMessage] = React.useState('');
    const [severity,setSeverity] = React.useState('');
    const [items, setItems] = React.useState([])
    const [rowposition, setRowPosition] = React.useState(1)
//    const allItem = items.data.items
    const [hidebutton,setHideButton] = React.useState(false)
    const [level, setLevel] = React.useState(0)
    const [showprogress, setShowProgress] = React.useState(true)
    const [getscore,setGetScore] = React.useState('')
    const [scoreonscreen,setScoreOnScreen] = React.useState(0)

    const ListItem = items.map(d =>(  
       
        
        d.id === '0'
        ? <div key={d.id} className="boy1" >       
            <MyList 
                key={d.id}
                id={d.id}
                item={d.item}   
                details={d.details}  
                scoreonscreen={scoreonscreen}
                setscoreonscreen={setScoreOnScreen}
                headscore={d.headscore}
            /> 
        
         </div>  
        : <div key={d.id} className="boy" >       
            <MyList 
                key={d.id}
                id={d.id}
                item={d.item}   
                details={d.details}  
                scoreonscreen={scoreonscreen}
                setscoreonscreen={setScoreOnScreen}
                headscore={d.headscore}
            /> 
    
           </div> 
        
    )) 
    function updateGooglesheet(){
       
        const ArrKeepProject = keepproject.split(":"); //[project no,region,studio,projectname]
        // ES6 Destructuring assignment
        const [ProjectNumber,Region,Studio,ProjectName,RecordID,RecordStatus,Symbol] = ArrKeepProject;

    //    console.log('ArrKeepProject ==> ',ArrKeepProject)
        const currDate = new Date();
        let strDate = currDate.toLocaleString();

        var axiosUpdate = require('axios')
        const objItems = {...items}
    //    console.log("HELLO ",objItems) /*  */
      //  var dataRange = '{"values": [[' + "HELLO SHEET" + ']]' + ',"majorDimension": "ROWS"}'
      var dataRange = '{"values": [['+ "'" + JSON.stringify(objItems)  + "'" + ',"' + myreceiveemail + '"' +  ',"' + ProjectNumber + '"' + ',"' + Region + '"' + ',"' + Studio + '"'  + ',"' + ProjectName + '"' + ',"' + strDate + '"' + ',"'  + RecordID + '"' + ',"' + RecordStatus + '"' + ',"' + Symbol + '"'  + ']],"majorDimension": "ROWS"}'
        var configUpdate = {
            method: 'put',
            url: `https://sheets.googleapis.com/v4/spreadsheets/1uZE9EgGfRn4i0T_roi5H17FjHUu2QiiurzNt74B3dnc/values/Sheet1!A${rowposition}:J${rowposition}?valueInputOption=USER_ENTERED`,
            headers: {
                'Authorization':`Bearer ${mybearer}`, 
                'Content-Type': 'text/plain'
            },
            data: dataRange
            }; 

            axiosUpdate(configUpdate) 
            .then(function (response){  
                   setSeverity("success")     
                   setMessage("Update changes to database completed!")  
                   setHideButton(false)
                   swal("Success!","This form was updated in google sheet.","success")
                   .then((value)=>{
                             
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                            
                   });
    //                 window.alert(`Succeed in update log to google sheet.`);
                //   console.log("success")                     
                   
            /*       window.location.reload(false); */   
            //       window.location = "https://dwpservice.github.io/esgv2/#/app";   
                
            })
            .catch(function(error){
            //    console.log("failure")
                swal("Error!","Something went wrong...Updating Failure!","error");
    //            console.log(error) 
            }) 

    }
    


     React.useEffect(()=>{
        fetch("https://docs.google.com/spreadsheets/d/1uZE9EgGfRn4i0T_roi5H17FjHUu2QiiurzNt74B3dnc/gviz/tq?tqx=out:json&tq&gid=0")
        .then(resp => resp.text())
        .then(data => {
            const temp1 = data.substring(47).slice(0,-2);
            const json1 = JSON.parse(temp1);
        //    console.log('GET DATA FROM - WFM Hubspot Google Data - use tabname -Integrate ',json.table.rows);
            const rows1 = json1.table.rows;           
        //    console.log('อ่านข้อมูลจาก ESG Log v.2 ...',rows1)
            var finishArr1 = [];
            rows1.forEach((row,index,arr)=>{
        //           console.log('INDEX...',index)
               
                    if (row.c[7].v === myuid)
                        {
                            const activeRow = index + 1
                            setRowPosition(activeRow)
                            var finishArr = []; 
                            const ourObj = {proj: `${row.c[2].v}`,projname: `${row.c[5].v}`, region: `${row.c[3].v}`, stu: `${row.c[4].v}`, recid: `${row.c[7].v}`, recstatus:`${row.c[8].v}`, symb:`${row.c[9].v}`}
                            finishArr.push(ourObj)
        //                    console.log('finishArr...',finishArr)
                            setProje(finishArr)
                            
                            SetKeepproject(row.c[2].v + ':' + row.c[3].v + ":" + row.c[4].v + ":" + row.c[5].v + ":" + row.c[7].v + ":" + row.c[8].v + ":" + row.c[9].v);
        //                    console.log('keepproject ...',keepproject)
                            //---------------------------------------------------------------------------
        //                    console.log("LOOK AT DATA ...",JSON.parse(row.c[0].v))
                            const objOut = JSON.parse(row.c[0].v)
                            finishArr1.push(objOut["0"]) /*เป็นรูปแบบการอ้างแบบ object เนื่องจากค่าเป็นตัวเลขจะใช้จุดไม่ได้ -- ไม่ใช่ array */
                            finishArr1.push(objOut["1"])
                            finishArr1.push(objOut["2"])
                            finishArr1.push(objOut["3"])
                            finishArr1.push(objOut["4"])
                            finishArr1.push(objOut["5"])
                            finishArr1.push(objOut["6"])
                            finishArr1.push(objOut["7"])
                            finishArr1.push(objOut["8"])
                            //----------------------------------------------
                            // Calculate total scores
                            let accu1 = 0
                            let accu2 = 0
                            let accu3 = 0
                            let accu4 = 0
                            let accu5 = 0
                            let accu6 = 0
                            let accu7 = 0
                            let accu8 = 0
                            const det1 = objOut["0"].details 
                            det1.map(member => {
                                accu1 = accu1 + parseInt(member.score)                               
                            })
                            const det2 = objOut["1"].details 
                            det2.map(member => {
                                accu2 = accu2 + parseInt(member.score)                               
                            })
                            const det3 = objOut["2"].details 
                            det3.map(member => {
                                accu3 = accu3 + parseInt(member.score)                               
                            })
                            const det4 = objOut["3"].details 
                            det4.map(member => {
                                accu4 = accu4 + parseInt(member.score)                               
                            })
                            const det5 = objOut["4"].details 
                            det5.map(member => {
                                accu5 = accu5 + parseInt(member.score)                               
                            })
                            const det6 = objOut["5"].details 
                            det6.map(member => {
                                accu6 = accu6 + parseInt(member.score)                               
                            })
                            const det7 = objOut["6"].details 
                            det7.map(member => {
                                accu7 = accu7 + parseInt(member.score)                               
                            })
                            const det8 = objOut["7"].details 
                            det8.map(member => {
                                accu8 = accu8 + parseInt(member.score)                               
                            })
                            const totalscore = accu1 + accu2 + accu3 + accu4 + accu5 + accu6 + accu7 + accu8 
                    //        console.log('totalscore --- ',totalscore)
                            setGetScore(totalscore.toString())
                            setScoreOnScreen(totalscore)

                        }    
                
            })
        //    console.log('finishArr1 ---> ' , finishArr1)
            setItems(finishArr1)
            setHideButton(true)
            setShowProgress(false)

        })
     },[])

//    console.log('proje ...',proje)

    const samhandleChange = (event) => {
        //  setAge(event.target.value);
//          console.log("AFTER CLICK PROJECT LIST ",event.target.value);
          SetKeepproject(event.target.value);
     
        };  
    const updatescreen = (event) =>{
        var sumx = 0
        items.map(item =>{
            item.details.map(detail =>{
                sumx = sumx + parseInt(detail.score)
            })
        })
        setGetScore(sumx.toString())
    }    

    return (
        <DataContext.Provider 
            value={{items,setItems,mybearer,myreceiveemail,myuid,getscore,setGetScore,updatescreen,checkleed,setCheckLeed,myflag,setMyFlag}}
        >
            <Appbar />     
           
            
            
            {showprogress?
                <div style={{margin:"auto"}}>
                    <LinearProgress  style={{width: "100%"}}    />
                </div>
                : null}
            <FormControl className={classes.formControl} style={{paddingLeft: "4px"}} onSubmit={ e=> {e.preventDefault()}}>
                <InputLabel id="demo-simple-select-label"style={{paddingLeft: "4px",fontWeight:"600"}} >PROJECT NO.</InputLabel>
                
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={keepproject}
                    onChange={samhandleChange}  
                >
                {
                    proje.map((item)=>( 
                        <MenuItem   key={item.proj+item.projname+item.region} 
                                    value={item.proj+":"+item.region+":"+item.stu+":"+item.projname+":"+item.recid+":"+item.recstatus+":"+item.symb}>
                                    {item.proj}-----{item.projname}
                        </MenuItem>
                    ))
                }     
                </Select>
                
            </FormControl>
            
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                {showprogress? null
                :<div className="scorecontainer" style={{backgroundColor: (getscore > 10) ? (getscore > 20)? "#32d95e" : "#eef51d" : (getscore == 0) ? "#b6b6b6" :"#f5851d"}}><div id="showtotal">Totals Possible Points (Not used for now): <span style={{width:"34px",height:"34px",padding:"10px",borderWidth:"thin",textAlign:"center"}}> {getscore.toString()} </span></div></div>
                }
            </div>  
            
            
           
           
            
            
            <div className="flex-container">    
               {showprogress? null
      
                :<div>
                {/*    <div style={{display:"flex",backgroundColor:"white",paddingLeft:"10px",paddingTop:"10px"}}>
                        <img src="leedlogo.png" width="auto"  height="60px" />
                        <h5 style={{fontWeight: "lighter",marginLeft: "10px"}}>LEED v4.1 BD+C</h5>
                    </div>
               */} 
                    {ListItem} 
                    {hidebutton ?   <div className="MySubmitButton">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                style={{width: "max-content",marginLeft:"10px",marginBottom: "10px"}}
                                                endIcon={<Icon>send</Icon>}
                                                onClick={updateGooglesheet}
                                            >
                                                Update
                                            </Button>  
                                    </div>     
                                : null}
                           
                </div>  
                }      
            </div>
            
            
        </DataContext.Provider>
    )
}

export  {DataContext, DataService}