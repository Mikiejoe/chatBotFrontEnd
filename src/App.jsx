import { BrowserRouter,Route,Routes } from "react-router-dom"
import React from "react"
import HomePage from "./pages/HomePage"
import LandingPage from "./pages/LandingPage"
import ChatMessages from "./pages/ChatMessages"
import ChatScreen from "./pages/ChatScreen"
import Login from "./pages/Login"
import Register from "./pages/Register"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/chats" element={<HomePage/>}/>
      <Route path="/chats" element={<ChatMessages/>}/>
      <Route path="/chats/:id" element={<ChatScreen/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
