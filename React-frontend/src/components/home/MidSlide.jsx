import { Box,styled } from "@mui/material";

import Slide from "./Slide";



const Componant = styled(Box)`
    display: flex;
`

const LeftComponant = styled(Box)(({ theme })=>({
    width: '83%',
    [theme.breakpoints.down('md')]:{
      width:'100%'
    }
}))

const RightComponant = styled(Box)(({theme})=>({
    background: "#FFFFFF",
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    width: "17%",
    textAlign: "center",
    [theme.breakpoints.down('md')]:{
      display:"none"
    }
}))

const MidSlide = ({ products, title, timer }) => {
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';
  return (
    <Componant>
      <LeftComponant>
        <Slide products={products} title={title} timer={timer} />
      </LeftComponant>
      <RightComponant>
        <img src={adURL} alt="ad" style={{ width: 217 }} />
      </RightComponant>
    </Componant>
  );
};

export default MidSlide;
