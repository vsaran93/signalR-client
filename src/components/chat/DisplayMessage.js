import React from "react";


const DisplayMessages = ({ chats, user }) => {
    return (
        <>
            {chats.map(chat => (
                chat.userName !== user.userName ? (
                    <div className="message">
                        <div className="photo">
                        <div className="online"></div>
                        </div>
                        <p className="text">
                            <p style={{ fontWeight: 'bold' }}>{chat.userName}</p>
                            <p>{chat.message}</p>
                        </p>
                    </div>
                ) : (
                    <div className="message text-only">
                        <div className="response">
                        <p className="text">{chat.message}</p>
                        </div>
                    </div>
                )
            ))}
            
          {/* <div className="message text-only">
            <p className="text"> What are you doing tonight ? Want to go take a drink ?</p>
          </div>
          <p className="time"> 14h58</p>
          <div className="message text-only">
            <div className="response">
              <p className="text"> Hey Megan ! It's been a while 😃</p>
            </div>
          </div>
          <div className="message text-only">
            <div className="response">
              <p className="text"> When can we meet ?</p>
            </div>
          </div>
          <p className="response-time time"> 15h04</p>
          <div className="message">
            <div className="photo" style={{"background-image": "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)"}}>
              <div className="online"></div>
            </div>
            <p className="text"> 9 pm at the bar if possible 😳</p>
          </div>
          <p className="time"> 15h09</p> */}
        </>
    )
}

export default DisplayMessages;