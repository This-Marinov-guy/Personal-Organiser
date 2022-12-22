import React from "react";
import PersonalChat from "./PersonalChat";
import ChatBubble from "./ChatBubble";
import classes from './ChatsList.module.css'
import { Heading } from "../UI/Heading";

const workers = [{
  id: 'w1',
  picture: 'https://zombiesinmyblog.com/wp-content/uploads/2020/06/MV5BZGU1YThjNzEtM2NjMi00ZmZlLWI2NmYtYTViNWYzNjU2Zjc1XkEyXkFqcGdeQXVyNzQ5NzU1MTA@._V1_SX1777_CR001777999_AL_.jpg',
  to:''
},
{
  id: 'w2',
  picture: 'https://zombiesinmyblog.com/wp-content/uploads/2020/06/MV5BZGU1YThjNzEtM2NjMi00ZmZlLWI2NmYtYTViNWYzNjU2Zjc1XkEyXkFqcGdeQXVyNzQ5NzU1MTA@._V1_SX1777_CR001777999_AL_.jpg',
  to:''
},
{
  id: 'w3',
  picture: 'https://zombiesinmyblog.com/wp-content/uploads/2020/06/MV5BZGU1YThjNzEtM2NjMi00ZmZlLWI2NmYtYTViNWYzNjU2Zjc1XkEyXkFqcGdeQXVyNzQ5NzU1MTA@._V1_SX1777_CR001777999_AL_.jpg',
  to:''
}]

const ChatsList = () => {
  return (
    <div className={classes.chats_display}>
      <Heading>Your chats</Heading>
      <div className={classes.chats_list}>
        {workers.map((workers) => <ChatBubble 
        key={workers.id}
        src={workers.picture}
        to={`/chats${workers.to}`}
        /> )}
      </div>
      <PersonalChat />
    </div>
  );
}

export default ChatsList;
