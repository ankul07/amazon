import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, IconButton, List, ListItem } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
import { Logincontext } from '../context/ContextProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RightHeader from './RightHeader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
    const { account, setAccount } = useContext(Logincontext)
    const history = useNavigate();
    const [text, setText] = useState("")

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    console.log(text);
    const [liopen, setliopen] = useState(true)

    const { products } = useSelector(state => state.getproductdata);

    const [dropen, setdrOpen] = useState(false)

    const getdetailvaliduser = async () => {
        const res = await fetch("/validateuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (res.status !== 201) {
            console.log("error")
        }
        else {
            console.log("data valid")
            setAccount(data);
        }

    }


    //handle open
    const handleopen = () => {
        setdrOpen(true)
    }

    const handledrclose = () => {
        setdrOpen(false)
    }
    const getText = (items) => {
        setText(items)
        setliopen(false)
    }

    useEffect(() => {
        getdetailvaliduser();
    }, [])

    //logout user
    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        // console.log(data2);

        if (!res2.status === 201) {
            const error = new Error(res2.error);
            throw error;
        } else {
            setAccount(false);
            // setOpen(false)
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            history("/");
        }
    }
    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className="hamburgur" onClick={handleopen}>
                        <MenuIcon style={{ color: '#ffffff' }} />
                    </IconButton>
                    <Drawer open={dropen} onClose={handledrclose}>
                        <RightHeader logclose={handledrclose} logoutuser = {logoutuser} />
                    </Drawer>
                    <NavLink to="/">
                        <div className="navlogo">
                            <img src="../amazon_PNG25.png" alt="logo" />
                        </div>
                    </NavLink>

                    <div className="nav_searchbaar">
                        <input type="text" name='' id='' placeholder='serch your products' onChange={(e) => getText(e.target.value)} />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>
                        {
                        text &&
                        <List className="extrasearch" hidden={liopen}>
                            {
                                products.filter(product => product.title.shortTitle.toLowerCase().includes(text.toLowerCase())).map(product => <ListItem>

                                    <NavLink to={`/getproductsone/${product.id}`} onClick={() => setliopen(true)}>
                                        {product.title.shortTitle}
                                    </NavLink>
                                </ListItem>)
                            }
                        </List>
                    }
                    </div>
                    
                </div>

                <div className="right">
                    <div className="nav_btn">
                        {
                            account ? "" : <NavLink to="/login">signin</NavLink>
                        }
                    </div>
                    <div className="cart_btn">
                        {
                            account ? <NavLink to="/buynow">
                                <Badge badgeContent={account.carts.length} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </NavLink>
                                :
                                <NavLink to="/login">
                                    <Badge badgeContent={0} color="primary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                </NavLink>
                        }
                        <ToastContainer />

                        <p>Cart</p>
                    </div>
                    {
                        account ? <Avatar className='avtar2' id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar>
                            :
                            <Avatar className='avtar' id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}></Avatar>
                    }

                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >

                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {
                            account ? <MenuItem onClick={handleClose} onClick={logoutuser}> <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />
                                Logout</MenuItem> : ""
                        }

                    </Menu>
                </div>
            </nav>
        </header>
    )
}

export default Navbar