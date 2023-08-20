
// components import -------->
import Header from "./components/header/Header"
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import ContextProvider from "./context/ContextProvider";
import DetailView from "./components/details/DetailView";
import Cart from "./components/cart/Cart";
import ChatbotUI from "./components/Chatbot/ChatbotUI";

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 54 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<DetailView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/chatbot" element={<ChatbotUI />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
