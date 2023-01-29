import React from "react";
import SearchIcon from '@mui/icons-material/Search';

const ChatThreads = ({ groups, joinToConversation }) => {
    return (
        <>
            <div className="discussion search">
                <div className="searchbar">
                    <SearchIcon className="fa fa-search" />
                    <input type="text" placeholder="Search..."></input>
                </div>
            </div>
            {groups.map(group => (
                <div className="discussion" key={group.id} onClick={() => joinToConversation(group.name)}>
                    <div className="photo">
                        <div className="online"></div>
                    </div>
                    <div className="desc-contact">
                        <p className="name">{group.name}</p>
                    </div>
                    <div className="timer">3 min</div>
                </div>
            ))}
            
        </>
        
    )
}

export default ChatThreads;