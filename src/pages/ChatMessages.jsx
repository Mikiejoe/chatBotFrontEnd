import React, { useState } from "react";
import {
  MessageBox,
  Input,
  Popup,
  ChatItem,
  Button,
  SideBar,
  Dropdown,
  LocationMessage,
  SpotifyMessage,MeetingItem
} from "react-chat-elements";
import { IoMdHome } from "react-icons/io";

function ChatMessages() {
  const [show, setShow] = useState(false);
  const icon = <IoMdHome />;
  return ( 
    <div>
      <MessageBox
  position={'right'}
  type={'text'}
  text={'react.svg'}
  data={{
    // uri: 'https://facebook.github.io/react/img/logo.svg',
    status: {
      click: false,
      loading: 0,
    },
  }}
/>
    </div>
  );
}

export default ChatMessages;
