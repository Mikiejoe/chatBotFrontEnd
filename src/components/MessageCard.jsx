import React from "react";

function MessageCard({ message }) {
  const sender = message.role === "user";
  const cardStyle = sender ? "rounded-bl-2xl float-right": "float-left rounded-br-2xl"
  return (
    <div
      className={`border-[1px] p-2 w-[80%] border-blue-400 mb-4 rounded-tl-2xl rounded-tr-2xl ${cardStyle}`}
    >
      <p>{message.content}</p>
    </div>
  );
}

export default MessageCard;
