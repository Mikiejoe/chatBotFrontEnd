import React from "react";
import { MessageBox } from "react-chat-elements";

function MessageCard({ message }) {

  function parseTextToBoldAndNewLines(text) {
    // Split by the numbered points to ensure they start on a new line
    const parts = text.split(/(\d+\.\s\*\*.*?\*\*|\d+\.\s.*?(?=\d+\.\s|$))/);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the asterisks and wrap in <strong>
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (/\d+\.\s/.test(part)) {
        // Handle numbered points
        return <div key={index} style={{ marginTop: '10px' }}>{parseTextToBold(part)}</div>;
      }
      return <span key={index}>{part}</span>;
    });
  }

  function parseTextToBold(text) {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}><br></br>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  }

  const sender = message.role === "user";
  const cardStyle = sender
    ? "float-right"
    : "float-left";
  return (
    <div className={`mb-2 flex ${cardStyle} float-right flex justify-${sender?"end":"start"} ${sender?"pl-2":"pr-2"}`}>
      <MessageBox
        position={sender ? "right" : "left"}
        type={"text"}
        text={parseTextToBold(message.content)}
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
