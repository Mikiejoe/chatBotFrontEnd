import React, { useEffect, useState, useRef } from "react";
import MessageCard from "../components/MessageCard";
import { IoMdPerson, IoMdSend } from "react-icons/io";
import { MessageBox, Input } from "react-chat-elements";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";

const Messages = [
  {
    role: "system",
    content:
      "You are Dr. Rachel, my psychologist.Let's keep the conversation human-like, responding in a way that feels natural and relatable. Send emojis where necessary.",
  },
];
const testData = [
  {
    role: "user",
    content: "Kiswahili chako kibovu sana?",
  },
  {
    content:
      "Hi there! It's nice to meet you. I'm happy to chat with you today. How's your day going so far?",
    role: "assistant",
  },
  {
    role: "user",
    content: "It has been good, but my girlfriend dumped me today",
  },
  {
    content:
      "I'm so sorry to hear that. Breakups can be really tough, and it's totally normal to feel upset. Would you like to talk about what happened? Sometimes sharing what's on your mind can help process your emotions. What was going through your mind when she broke up with you?",
    role: "assistant",
  },
  {
    role: "user",
    content: "A mixed of emotions",
  },
  {
    content:
      "That's completely understandable. Breakups can be a rollercoaster of emotions. You might be feeling sad, angry, confused, relieved, or even all of those at the same time. It's like your emotions are all jumbled up.\n\nIs there one emotion in particular that's standing out to you right now? Are you feeling more sad and hurt, or maybe angry and frustrated?\n\nAnd if you feel comfortable sharing, what did she say when she broke up with you? Sometimes understanding the reasons behind the breakup can help clarify things.",
    role: "assistant",
  },
  {
    role: "user",
    content: "what do you think i should do?",
  },
  {
    role: "assistant",
    content:
      "Well, I'm not here to tell you what to do, but I can offer some guidance.Firstly, be kind to yourself and allow yourself to feel whatever emotions arise. It's essential to acknowledge and validate your feelings, rather than trying to suppress them. In the short term, take care of your physical and emotional well-being. Make sure you're getting enough rest, eating well, and staying active. These small habits can help stabilize your mood.Also, consider reaching out to friends, family, or a trusted friend group for support. Talking to people who care about you can help you feel heard and understood.As for the relationship, it might be helpful to take some time to reflect on what happened. Not to place blame, but to understand what you learned from the experience and how you can grow from it.Lastly, remember that healing is a process, and it's okay to take your time. You don't need to rush into anything or try to 'get over' the breakup by a certain time. Just focus on small, manageable steps towards healing and moving forward.What do you think about that? Is there anything in particular that resonates with you, or is there something else on your mind?",
  },
  {
    role: "user",
    content: "thats actually good advice i'l definately consider that.",
  },
  {
    role: "assistant",
    content:
      "I'm glad you found it helpful! Remember, it's not about rushing into anything or trying to 'get over' the breakup quickly. It's about taking small steps towards healing and moving forward. And hey, it's okay to not be okay right now. Breakups can be tough, and it's normal to feel overwhelmed. But by taking care of yourself and allowing yourself to process your emotions, you'll get through this. If you ever need to talk or have any questions, I'm here to listen and offer guidance. And don't forget to be kind to yourself during this time. You're doing the best you can, and that's something to be proud of. One more thing: don't be too hard on yourself if you find yourself thinking about your ex or the relationship. It's natural to have some lingering feelings or memories. Just acknowledge them, and gently refocus on your own healing and growth. You got this, and remember, you're not alone!",
  },
];

function ChatScreen() {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([...Messages]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  if (!location.state) {
    window.location.href = "/";
  }
  const {title,id} = location.state;            
  console.log("state",title,id)
  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    setLoading(true);

    if (newMessage.trim() === "") return;
    const message = {
      role: "user",
      content: newMessage,
    };
    const newMessages = [...messages, message];
    setMessages(newMessages);
    setNewMessage("");
    try {
      const res = await fetch("https://chat-bot-azure-chi.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      console.log(data  )
      setMessages(data.messages);
    } catch (error) {
      console.log("error");
    }
    setLoading(false);
  };
  const filteredMessages = messages.slice(1); // Remove the system message from the chat
  
  return (
    <div className="h-[100vh] w-[100vw] overflow-x-hidden bg-gray-100">
      <div className="h-14 px-4 py-2 flex items-center gap-2 shadow-lg bg-gray-400">
        <div className="h-full bg-gray-300 w-[40px] overflow-hidden  rounded-full flex items-center justify-center">
          <IoMdPerson size={48} color="gray" />
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <div className="flex items-center gap-1">
            <div className="p-1 bg-green-500 w-1 h-1 rounded-full"></div>
            <p>Online</p>
          </div>
        </div>
      </div>
      <div className="h-[78.3vh] overflow-y-auto" ref={chatContainerRef}>
        {filteredMessages.map((message, index) => (
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
