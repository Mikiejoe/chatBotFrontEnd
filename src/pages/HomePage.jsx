import React from "react";
import { ChatItem, ChatList } from "react-chat-elements";
import { Link } from "react-router-dom";

const chatList = [
  {
    id: "nbfyuiuytretyui",
    title: "Depression",
    subtitle: "Nice, I feel great now...",
    date: new Date(),
  },
];

function HomePage() {
  const handleChatItemClick = (e) => {
    console.log(e);
  };
  return (
    <div>
      <div className="p-2 bg-red-500"></div>
      {chatList.map((chat, index) => (
        <Link to={`chats${chat.id}`} state={chat}>
          <div className="bg-green-400 p-4">{chat.date.getFullYear}</div>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
