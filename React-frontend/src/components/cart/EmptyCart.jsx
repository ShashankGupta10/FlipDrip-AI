import { Typography, Box, styled } from "@mui/material";

const Component = styled(Box)(({ theme }) => ({
  width: "80%",
  height: "65vh",
  background: "#fff",
  margin: "60px 140px",
  [theme.breakpoints.down('md')]: {
    margin:"auto"
  }
}));

const Container = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingTop: "70px"
}))

const Image = styled("img")({
  width: "20%",
});

const EmptyCart = () => {
  const imgurl =
    "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90";

  const token = localStorage.getItem("token");
  const signUp = localStorage.getItem("signup")

  return (
    <>
      {token||signUp ? (
        <Box style={{ background: "#f2f2f2", height: "90vh" }}>
          <Component>
            <Container>
              <Image src={imgurl} />
              <Typography style={{fontWeight:600}}>Your cart is empty!</Typography>
              <Typography component="span">Add items to it now.</Typography>
            </Container>
          </Component>
        </Box>
      ) : (
        <Box style={{ background: "#f2f2f2", height: "90vh" }}>
          <Component>
            <Container>
              <Image src={imgurl} />
              <Typography style={{fontWeight:600}}>Missing Cart Items?</Typography>
              <Typography component="span">
                Please Login First To See The cart!
              </Typography>
            </Container>
          </Component>
        </Box>
      )}
    </>
  );
};

export default EmptyCart;
