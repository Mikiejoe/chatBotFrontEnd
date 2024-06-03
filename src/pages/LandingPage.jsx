import React, { useEffect, useState } from "react";
import { ChatList } from "react-chat-elements";
import { MdAdd, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
// import baseUrl from "../utils/constants"

function LandingPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [hasChats,setHasChats] = useState(false)
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const [chats, setChats] = React.useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const prodUrl = "https://chat-bot-azure-chi.vercel.app/chat/";
  // const prodUrl = "http://localhost:5000/chats/";
  const getChats = async()=>{
    const res = await fetch(prodUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.accessToken}`,
      },
    });
    if (!res.ok) console.log("error")
    const data = await res.json()
  console.log(data.chats)
  setChats(data.chats.reverse())
   if(data.chats.length>0){
    console.log()
    setHasChats(true)
   }
  }



  const handleCreateChat = async () => {
    
    console.log(userData.accessToken);
    const res = await fetch("http://localhost:5000/chats", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      
      navigate(`/chats/${data.chat._id}`,{state:{id:data.chat._id}});
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateConversation = () => {
    const message = {
      id: Math.floor(Math.random() * 1000000).toString(),
      title: title,
      subtitle: "What are you doing?",
      date: new Date(),
      unread: 0,
      avatar:
        "https://www.shutterstock.com/shutterstock/photos/1114445501/display_1500/stock-vector-blank-avatar-photo-place-holder-1114445501.jpg",
    };
    setChats([...chats, message]);
    setIsPopupOpen(false);
  };
  const handleChatClick = (data) => {
    console.log("Chat clicked ", data);
    navigate(`/chats/${data.id}`, { state: data });
  };
  useEffect(()=>{
    getChats()
    console.log("chats",hasChats)
  },[])

  const formatDate = (dateString) => {
    const date = new Date(dateString);

const humanFriendlyDate = date.toLocaleString('en-US', {
  // weekday: 'long', // "Monday"
  year: 'numeric', // "2024"
  month: 'long', // "June"
  day: 'numeric', // "3"
  hour: 'numeric', // "9"
  minute: 'numeric', // "13"
  second: 'numeric', // "36"
  hour12: true // "AM/PM"
});
return humanFriendlyDate;
}

  return (
    <div className="bg-gray-100 h-screen relative w-screen p">
      <div className="bg-blue-500 w-screen flex justify-end p-2 h-fit">
        <MdLogout onClick={handleLogout} color="white" size={24} />
      </div>
      {
        !hasChats && <div className="h-full bg-red-500 flex justify-center items-center"><p cl>create new chat</p></div>
      }
      <ChatList
        className="chat-list rounded-md m-2"
        onClick={({ ...props }) => handleChatClick(props)}
        dataSource={chats.map((chat) => ({
          // ...chat,
          // avatar: chat.avatar,
          // alt: chat.title,
          id: chat._id,
          title: formatDate(chat.createdAt),
          subtitle: chat.messages[chat.messages.length-1].content,
          date: chat.createdAt,
          // unread: chat.unread,
        }))}
      />
      <button className="bg-blue-500 fixed bottom-6 right-4 rounded-full h-8 w-8">
        <MdAdd size={32} color="white" onClick={handleCreateChat} />
      </button>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 p-4 rounded-md">
            <div>
              <input
                type="text"
                onChange={handleTitleChange}
                placeholder="Enter Type of conversation"
                className="h-8 px-2 w-full outline-none border rounded-md "
              />
            </div>
            <div className="flex justify-end gap-4 mt-4 text-white">
              <button
                onClick={handleCreateChat}
                className="bg-green-500 p-2 rounded-lg w-full"
              >
                OK
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-500 w-full rounded-lg"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
