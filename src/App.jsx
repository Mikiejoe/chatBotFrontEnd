import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatMessages from "./pages/ChatMessages";
import ChatScreen from "./pages/ChatScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./hooks/authContext";
import {NotFound} from "./pages/NotFound";
function App() {
  return (
    // <BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<LandingPage/>}/>
    //   <Route path="/chats" element={<HomePage/>}/>
    //   <Route path="/chats/:id" element={<ChatScreen/>}/>
    //   <Route path="/login" element={<Login/>}/>
    //   <Route path="/register" element={<Register/>}/>
    // </Routes>
    // </BrowserRouter>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats/:id"
            element={
              <ProtectedRoute>
                <ChatScreen />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
