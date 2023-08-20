


import { useState, useContext } from "react";
import { Box, Button, Typography, styled, Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginContext } from "../../context/ContextProvider";
import LoginDialog from "../login/LoginDialogue";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

// Styles ---->

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  '& > *': {
    marginRight: '40px !important',
    fontSize: 16,
    alignItems: "center"
  },
  [theme.breakpoints.down('md')]: {
    display: "block"
  }
}))

const Container = styled(Link)(({ theme }) => ({
  display: "flex",
  textDecoration: "none",
  color: "inherit",
  [theme.breakpoints.down('md')]: {
    display: "block"
  }
}))

const LoginButton = styled(Button)`
    color: #2874f0;
    background: #FFF;
    text-transform: none;
    padding: 5px 40px;
    border-radius: 2px;
    box-shadow: none;
    font-weight: 600;
    height: 32px;
    margin-left: 20px;
    : hover{
        color: #2874f0;
        background-color: #FFF 
    }
`

const CoustomButton = () => {
  const [open, setOpen] = useState(false);

  const { account, setAccount } = useContext(LoginContext)

  const { cartItems } = useSelector(state => state.cart)

  const navigate = useNavigate();

  const openDialog = () => {
    setOpen(true);
  }
  

 
const handleButtonClick = (event) => {
    event.stopPropagation();
    openDialog();
  }
  return (
    <Wrapper>
      {account ? <Profile account={account} setAccount={setAccount} /> :
        <LoginButton variant="contained" onClick={handleButtonClick}>Login</LoginButton>
      }

      <Typography style={{ marginTop: 3, width: 135 }}>Become a Seller</Typography>
      <a onClick={()=>navigate('/chatbot')} style={{ marginTop: 3,textDecoration:'None',cursor: 'pointer' }}>Chatbot</a>

      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
        <Typography style={{ marginLeft: 8 }}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>

  );
}

export default CoustomButton;
