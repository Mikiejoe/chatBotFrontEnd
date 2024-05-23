import React from 'react'
import { ChatList } from 'react-chat-elements'
import { MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const [chats, setChats] = React.useState([
    {
      id: '123456',
      title: 'Depression',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
      avatar: 'https://www.shutterstock.com/shutterstock/photos/1114445501/display_1500/stock-vector-blank-avatar-photo-place-holder-1114445501.jpg'
    },
    {
      id: "212345",
      title: 'Break Up',
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
      avatar: 'https://www.shutterstock.com/shutterstock/photos/1114445501/display_1500/stock-vector-blank-avatar-photo-place-holder-1114445501.jpg'
    }
  ])
  const handleCreateConversation = () => {
    const message = {
      id: Math.floor(Math.random() * 1000000).toString(),
      title: title,
      subtitle: 'What are you doing?',
      date: new Date(),
      unread: 0,
      avatar: 'https://www.shutterstock.com/shutterstock/photos/1114445501/display_1500/stock-vector-blank-avatar-photo-place-holder-1114445501.jpg'
    }
    setChats([...chats, message])
    setIsPopupOpen(false)
  }
  const handleChatClick = (data) => {
    console.log('Chat clicked ',data)
    navigate(`/chats/${data.id}`, { state: data });
  }
  return (
    <div className="bg-gray-100 h-screen relative w-screen p-4">
      <ChatList
    className='chat-list rounded-md bg-gray-500'
    onClick={({ ...props }) => handleChatClick(props)}
    dataSource={
      chats.map((chat) => ({
        ...chat,
        avatar: chat.avatar,
        alt: chat.title,
        title: chat.title,
        subtitle: chat.subtitle,
        date: chat.date,
        unread: chat.unread,
      }))
    } />
    <button className='bg-blue-500 fixed bottom-6 right-4 rounded-full h-8 w-8'>
      <MdAdd size={32} color='white' onClick={() => setIsPopupOpen(true)} />
    </button>
    {isPopupOpen && (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-1/2 p-4 rounded-md">

          <div>
            <input type="text" onChange={handleTitleChange} placeholder='Enter Type of conversation' className='h-8 px-2 w-full outline-none border rounded-md ' />
          </div>
          <div className='flex justify-end gap-4 mt-4 text-white'>
            <button onClick={handleCreateConversation} className='bg-green-500 p-2 rounded-lg w-full'>OK</button> 
            <button onClick={() => setIsPopupOpen(false)}  className='bg-gray-500 w-full rounded-lg'>CANCEL</button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default LandingPage