import React, { useEffect, useState, useRef } from "react";
import MessageCard from "../components/MessageCard";
import { IoMdPerson, IoMdSend } from "react-icons/io";
import { MessageBox, Input } from "react-chat-elements";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";


function ChatScreen() {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("user"));
  
  
  if (!location.state) {
    window.location.href = "/";
  }
  const { id } = location.state;
  // const prodUrl = "http://localhost:5000/chats/" + id;
  const prodUrl = "https://chat-bot-azure-chi.vercel.app/chats/"+id;
  
  useEffect(() => {
    getMessages();
    console.log("helllo")
  }, []);
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);
  
  const sendMessage = async () => {
    // setLoading(true);
    console.log("loadindfghjkl",loading)
    if (newMessage.trim() === "") return;
    const message = {
      role: "user",
      content: newMessage,
    };
    // const newMessages = [...messages, message];
    // setMessages(newMessages);
    // setNewMessage("");

    
    try {
      
      console.log(userData.accessToken);
      const res = await fetch(prodUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.accessToken}`,
        },
        body: JSON.stringify({ content: newMessage, role: "user" }),
      });
      const data = await res.json();
      const newMessages = [...messages, data];
      console.log("hellloworkd");
      setMessages(newMessages);
      setNewMessage("")
      await getMessages()
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      setLoading(false)
    } catch (error) {
      console.log("error");
    }
    setLoading(false);
  };

  const getMessages = async () => {
    const res = await fetch(prodUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.accessToken}`,
      },
    });
    if (!res.ok) console.log("error")
    const data = await res.json()
    console.log("messages",...data)
    const filteredMessages = data.splice(1);
    setMessages(filteredMessages);
    console.log("state",messages)
    
  };
  // const mess = []
   // Remove the system message from the chat
  return (
    <div className="h-[100vh] w-[100vw] overflow-x-hidden bg-gray-100">
      <div className="h-14 px-4 py-2 flex items-center gap-2 shadow-lg bg-gray-400">
        <div className="h-full bg-gray-300 w-[40px] overflow-hidden  rounded-full flex items-center justify-center">
          <IoMdPerson size={48} color="gray" />
        </div>
        <div>
          {/* <p className="font-bold">{title}</p> */}
          <div className="flex items-center gap-1">
            <div className="p-1 bg-green-500 w-1 h-1 rounded-full"></div>
            <p>Online</p>
          </div>
        </div>
      </div>
      <div className="h-[78.3vh] flex flex-col w-screen" ref={chatContainerRef}>
        {messages.map((message, index) => (
          
            <MessageCard key={index} message={message} />
        ))}
        {loading && (
          <MessageBox
            position={"left"}
            type={"text"}
            text={"Typing ...."}
            data={{
              status: {
                click: false,
                loading: 0,
              },
            }}
          />
        )}
      </div>

      <div className="px-2 flex items-center justify-center w-full h-[60px] bg-gray-500">
        <div className="flex justify-between w-full border-blue-400 border-[1px] rounded-lg overflow-hidden">
          <Input
            placeholder="Type here..."
            multiline={false}
            autofocus={true}
            value={newMessage}
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            onChange={(e) => setNewMessage(e.target.value)}
            rightButtons={
              <IoMdSend
                size={32}
                onClick={sendMessage}
                style={{ cursor: "pointer", color: "rgb(107,114,128)" }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
