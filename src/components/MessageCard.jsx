import React from "react";
import { MessageBox } from "react-chat-elements";

function MessageCard({ message }) {
  const sender = message.role === "user";
  const cardStyle = sender
    ? "float-right"
    : "float-left";
  return (
    <div className={`mb-2 flex ${cardStyle} ${sender?"pl-2":"pr-2"}`}>
      <MessageBox
        position={sender ? "right" : "left"}
        type={"text"}
        text={message.content}
        data={{
          status: {
            click: false,
            loading: 0,
          },
        }}
      />
    </div>
  );
}

export default MessageCard;
