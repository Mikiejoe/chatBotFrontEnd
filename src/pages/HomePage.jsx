import React, { useEffect, useState, useRef } from "react";
import MessageCard from "../components/MessageCard";
import { IoMdSend } from "react-icons/io";

const Messages = [];

function HomePage() {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a psychologist.Let's keep the conversation human-like, responding in a way that feels natural and relatable.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    setLoading(true);
    if (newMessage.trim() === "") return; // Prevent sending empty messages
    console.log(newMessage);
    const message = {
      role: "user",
      content: newMessage,
    };
    const newMessages = [...messages, message];
    setMessages(newMessages);
    setNewMessage("");
    fetch("https://chat-bot-azure-chi.vercel.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: newMessages }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.messages);
        setMessages(data.messages);
      });
    setLoading(false);
  };
  const filteredMessages = messages.slice(1); // Remove the system message from the chat

  return (
    <div className="h-[100vh] w-[100vw] pt-8 overflow-x-hidden bg-gray-100">
      <div className=" px-8 h-[78vh] overflow-y-auto" ref={chatContainerRef}>
        {filteredMessages.map((message) => (
          <MessageCard message={message} />
        ))}
        {/* {loading && <div className="animate-spin rounded-full h-3 w-2 border-t-2 border-b-2 border-blue-500"></div>} */}
      </div>

      <div className="px-8 flex items-center justify-center w-full h-[80px] bg-white">
        <div className="flex justify-between w-full border-blue-400 border-[1px] rounded-lg p-2">
          <input
            type="text"
            placeholder="Type a message"
            className="outline-none  w-full self-center h-[40px] bg-transparent"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage(); // Send message when Enter key is pressed
            }}
          />
          <IoMdSend
            size={32}
            onClick={sendMessage}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <p className="text-center text-gray-500">itakua fty</p>
    </div>
  );
}

export default HomePage;
