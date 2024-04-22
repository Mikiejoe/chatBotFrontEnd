import { BrowserRouter,Route,Routes } from "react-router-dom"
import React from "react"
import HomePage from "./pages/HomePage"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
