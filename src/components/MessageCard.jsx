import React from "react";

function MessageCard({ message }) {
  const sender = message.role === "user";
  const cardStyle = sender ? "rounded-bl-lg float-right": "float-left rounded-br-lg"
  return (
    <div
      className={`border-[1px] p-2 w-[80%] border-blue-400 mb-4 rounded-tl-lg rounded-tr-lg ${cardStyle}`}
    >
      <p>{message.content}</p>
    </div>
  );
}

export default MessageCard;
