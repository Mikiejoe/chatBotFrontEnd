import { BrowserRouter,Route,Routes } from "react-router-dom"
import React from "react"
import HomePage from "./pages/HomePage"
import ChatMessages from "./pages/ChatMessages"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/chat" element={<ChatMessages/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
