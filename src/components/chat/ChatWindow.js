import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import DisplayMessages from './DisplayMessage';
import ChatThreads from './ChatThreads';
import "./chat.css";
import SendIcon from '@mui/icons-material/Send';
import MoodIcon from '@mui/icons-material/Mood';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Header from '../header';

function ChatWindow() {
  const groups = [{ id: 1, name: 'Group1' }, { id: 2, name: 'Group2' }, { id: 3, name: 'Group3' }];
  const [conversation, setConversation] = useState('');
  const userObj = JSON.parse(localStorage.getItem('userDetails'));
  const [message, setMessage] = useState("");
  const [chat,setChat] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7193/chatHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => localStorage.getItem('signalrAppKey')
      })
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start().then().catch(e => console.log("there is an error", e))
      connection.on("ReceiveMessage", message => {
        console.log("message", message);
        setChat(arr => [...arr, message]);
      })
    }
  }, [connection])

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const joinToConversation = async (groupName) => {
    if (conversation && connection) {
      await connection.invoke("LeaveRoom", conversation);
    }
    await connection.invoke("JoinRoom", groupName);
    setConversation(groupName);
    setChat([]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (conversation) {
      fetch('https://localhost:7193/api/message', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          userName: userObj.userName,
          conversationName: conversation
        })
      });
      setMessage("");
    }
    
  }

  return (
    <>
     <Header />
      <div className="container">
        <div className="row">
            <section className="discussions">
                <ChatThreads groups={groups} joinToConversation={joinToConversation} />
            </section>
            <section className="chat">
                <div className="header-chat">
                    <PersonIcon className="icon fa fa-user-o" />
                    <p className="name">{conversation}</p>
                    <MoreHorizIcon className="icon clickable fa fa-ellipsis-h right" />
                </div>
                <div className="messages-chat">
                    <DisplayMessages chats={chat} user={userObj} />
                </div>
                <div className="footer-chat">
                    <MoodIcon className="icon fa fa-smile-o clickable" style={{ "font-size":"25px"}} aria-hidden="true" />
                    <input value={message} type="text" className="write-message" placeholder="Type your message here" onChange={handleMessageChange}></input>
                    <div onClick={handleSend}><SendIcon className="icon send fa fa-paper-plane-o clickable" /></div>
                </div>
            </section>
        </div>
    </div>
    </>
  );
}

export default ChatWindow;
