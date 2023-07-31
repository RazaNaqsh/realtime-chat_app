import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const setLocal = async () => {
      if (!localStorage.getItem("app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("app-user")));
      }
    };
    setLocal();
  }, []);

  useEffect(() => {
    const currUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    currUser();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          {/* <Contacts contacts={contacts} changeChat={handleChatChange} /> */}
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            // <ChatContainer currentChat={currentChat} socket={socket} />
            <ChatContainer currentChat={currentChat} />
          )}
        </div>
      </Container>
    </>
  );
};

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
