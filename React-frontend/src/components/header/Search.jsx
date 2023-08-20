
import { useState,useEffect } from "react";
import { Box, InputBase ,List,ListItem,styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom"

import { getProducts } from "../../redux/actions/productActions";

// Styles ------>
const Searchcontainer = styled(Box)`
    background: #fff;
    width: 40%;
    border-radius: 2px;
    margin-left: 10px;
    display: flex;
`

const Inputsearchbase = styled(InputBase)`
    padding-left: 20px;
    width:100%
`

const Searchiconwrapper = styled(Box)`
    color: blue;
    padding: 5px;
    display: flex;
`
const ListWrapper = styled(List)`
    position:absolute;
    background :#FFFFFF;
    color: #000;
    margin-top:36px;
`
const Search = ()=>{

    const [text ,setText] = useState("");


    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getProducts());
    },[dispatch])
    const getText = (text)=>{
       setText(text)
    }
    return (
        <Searchcontainer>
       <Inputsearchbase
        placeholder="Search for Products Brand and More"
        onChange={(e)=>getText(e.target.value)}
        value={text}
       />
       <Searchiconwrapper>
        <SearchIcon/>
       </Searchiconwrapper>
       {
        text &&
            <ListWrapper>
                {
                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                        <ListItem>
                            <Link to={`/product/${product.id}`}
                            onClick={()=>setText("")}
                            style={{ textDecoration:"none" , color:"inherit"}}
                            >
                            {product.title.longTitle}
                            </Link>
                        </ListItem>
                    ))
                }
            </ListWrapper>
       }
       </Searchcontainer>
    );
}

export default Search;