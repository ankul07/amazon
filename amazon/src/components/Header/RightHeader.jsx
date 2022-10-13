import React,{useContext} from 'react'
import './rightheader.css';
import Avatar from '@mui/material/Avatar';
import { Logincontext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const RightHeader = ({logclose,logoutuser}) => {
    const {account,setAccount} = useContext(Logincontext)
  return (
    <>
    <div className="rightheader">
        <div className="right_nav">
        {
                    account ? <Avatar className='avtar2'>{account.fname[0].toUpperCase()}</Avatar>
                    :
                    <Avatar className='avtar'></Avatar>
                }
                  {account ? <h3>hello, {account.fname.toUpperCase()}</h3> : ""}

        </div>

        <div className="nav_btn" onClick={()=>logclose()}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Shop By Categories</NavLink>
            <Divider style={{width:"100%",marginLeft:"-20px"}}/>
            <NavLink to="/">Today's Deal</NavLink>
            {
                account ? <NavLink to="/buynow">Yours Order</NavLink> : <NavLink to="/login">Yours Order</NavLink>
            }
          
                  <Divider/>

                  <div className="flag">
                  <NavLink to="/login">Settings</NavLink>
                  <img style={{width:35,marginLeft:10}} src="../india.png" alt="flag" />
                  </div>
                  {
                    account ? 
                    <div className="flag">
                      <LogoutIcon style={{fontSize:18,marginRight:4}}/>
                      <h3 onClick={()=>logoutuser()} style={{cursor:"pointer",fontWeight:500}}>Logout</h3>
                    </div> :
                    <NavLink to="/login">SignIN</NavLink>
                  }
            
        </div>
    </div>
    </>
  )
}

export default RightHeader