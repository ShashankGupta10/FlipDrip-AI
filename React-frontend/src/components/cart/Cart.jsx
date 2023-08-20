import { useEffect, useState } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, afterPayment, removeFromCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { post } from '../../utils/paytm';
// import { payUsingPaytm } from '../../service/api';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    backgroundColor: "#f2f2f2",
    height:"100vh",
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const Cart = () => {
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        totalAmount();
    }, [cartItems]);

    const totalAmount = () => {
        let price = 0
        cartItems.map(item => {
            price += item.price.cost 
        })
        setPrice(price)
    }
    

    useEffect(() => {
        if(cartItems && id !== cartItems.id)   
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }


    const handleOprnrazorPay =(data)=>{
        const options = {
            key: 'rzp_test_nJzVZbVKoUGrDj',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'FLIPKART CLONE',//
            description: 'MY WEBSITE',//
            handler: function (response) {
                console.log(response, "56")
                axios.post('http://localhost:4000/verify', { response: response })
                    .then(res => {
                        console.log(res, "37")
                        // your orders
                        navigate('/');
                        setTimeout(()=>{
                            dispatch(afterPayment());
                        },1000)
                        
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const buyNow = async (amount) => {
        // let response = await payUsingPaytm({ amount: 100, email: 'aman1722@gmail.com'});
        // var information = {
        //     action: 'https://securegw.paytm.in/order/process',
        //     params: response    
        // }
        // post(information);
        const _data={amount:amount}
        axios.post(`https://flipkart-clone-o5h3.onrender.com/orders`,_data)
        .then(res=>{
            console.log(res.data);
            handleOprnrazorPay(res.data.data);
        })
        .catch(err=>{
            console.log(err)
        })

    }
    // const buyNow = async () => {
    //     let response = await payUsingPaytm({ amount: 500, email: 'kunaltyagi@gmail.com'});
    //     var information = {
    //         action: 'https://securegw-stage.paytm.in/order/process',
    //         params: response    
    //     }
    //     post(information);
    // }
    // onClick={() => buyNow()}
    return (
        <>
        { cartItems.length ? 
            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Header>
                        {   cartItems.map(item => (
                                <CartItem item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <BottomWrapper>
                        <StyledButton onClick={() => buyNow(price)} variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Component> : <EmptyCart />
        }
        </>

    )
}

export default Cart;