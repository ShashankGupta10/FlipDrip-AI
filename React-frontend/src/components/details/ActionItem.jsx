import { useState } from "react";

import { Button, Box, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import axios from "axios";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down("lg")]: {
    padding: "20px 40px",
  },
}));

const Image = styled("img")({
  width: "90%",
  padding: "15px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  width: "48%",
  height: 50,
  borderRadius: 2,
  [theme.breakpoints.down("lg")]: {
    width: "46%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "48%",
  },
}));
const ActionItem = ({ product }) => {
  const token = localStorage.getItem("token");
  const signUp = localStorage.getItem("signup")
  const navigate = useNavigate();
  const { id } = product;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // const token = localStorage.getItem("token");

  const handleOprnrazorPay = (data) => {
    const options = {
      key: "rzp_test_nJzVZbVKoUGrDj",
      amount: Number(data.amount),
      currency: data.currency,
      order_id: data.id,
      name: "FLIPKART CLONE", //
      description: "MY WEBSITE", //
      handler: function (response) {
        console.log(response, "56");
        axios
          .post("https://flipkart-clone-o5h3.onrender.com/verify", { response: response })
          .then((res) => {
            console.log(res, "37");
            // your orders
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const buyNow = async (amount) => {
    // let response = await payUsingPaytm({ amount: 100, email: 'aman1722@gmail.com'});
    // var information = {
    //     action: 'https://securegw.paytm.in/order/process',
    //     params: response
    // }
    // post(information);
    if (token||signUp) {
      const _data = { amount: amount };
      axios
        .post(`https://flipkart-clone-o5h3.onrender.com/orders`, _data)
        .then((res) => {
          console.log(res.data);
          handleOprnrazorPay(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
        toast.error("Please Login First!",{
            position: "top-center",
            theme: "colored",
          });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const addItemToCart = () => {
    if (token||signUp) {
        toast.info("Product Added To Cart!",{
            position: "top-center",
            theme: "colored",
        })
        setTimeout(()=>{
            dispatch(addToCart(id, quantity));
            navigate("/cart");
        },2000)
     
    } else {
      toast.error("Please Login First!",{
        position: "top-center",
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <LeftContainer>
      <Box style={{ padding: "15px 20px", border: "1px solid #f0f0f0" }}>
        <Image src={product.detailUrl} alt="product" />
      </Box>

      <StyledButton
        onClick={() => addItemToCart()}
        style={{ marginRight: 10, background: "#ff9f00" }}
        variant="contained"
      >
        <Cart />
        Add to Cart
      </StyledButton>

      <StyledButton
        onClick={() => buyNow(product.price.cost)}
        style={{ background: "#fb541b" }}
        variant="contained"
      >
        <Flash /> Buy Now
      </StyledButton>
      <ToastContainer />
    </LeftContainer>
  );
};

export default ActionItem;
