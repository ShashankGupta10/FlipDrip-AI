import { useState } from "react";

import { Box, Typography, Menu, MenuItem, styled } from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


// Styling ----------> 
const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`

const Profile = ({ account,setAccount }) => {
    const [open, setopen] = useState(false);

    const handleClick = (event)=>{
        setopen(event.currentTarget)
    }

    const handleClose = ()=>{
        setopen(false);
    }

    const logoutUser = ()=>{
        localStorage.clear();
        setAccount("");
        window.location.reload();
    }
  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{ marginTop: 3 , cursor:"pointer"}}>{account}</Typography>
      </Box>
      <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleClose();logoutUser();}}>
            <PowerSettingsNewIcon color="primary" fontSize="small" />
            <Logout>Logout</Logout>
        </MenuItem>
      </Component>
    </>
  );
};

export default Profile;
