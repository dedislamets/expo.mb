import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import initialMessages from './messages';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from './InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from './MessageContainer';

const MessageTab = () => {

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages(initialMessages.reverse());
  // }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hai, Apa kabar',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      alignTop
      text={text}
      alwaysShowSend
      scrollToBottom
      renderActions={renderActions}
      onInputTextChanged={setText}
      renderAvatarOnTop
      bottomOffset={26}
      isCustomViewBottom
      renderComposer={renderComposer}
    />
    // <GiftedChat
    //   messages={messages}
    //   text={text}
    //   onInputTextChanged={setText}
    //   onSend={onSend}
    //   user={{
    //     _id: 1,
    //     name: 'Aaron',
    //     avatar: 'https://placeimg.com/150/150/any',
    //   }}
    //   alignTop
    //   alwaysShowSend
    //   scrollToBottom
    //   // showUserAvatar
    //   renderAvatarOnTop
    //   renderUsernameOnMessage
    //   bottomOffset={26}
    //   onPressAvatar={console.log}
    //   // renderInputToolbar={renderInputToolbar} untuk background panel pengetikan
    //   renderActions={renderActions} //untuk icon sebelah kiri papan pengetikan
    //   renderComposer={renderComposer} // untuk border pengetikan
    //   // renderSend={renderSend} untuk icon kanan pengetikan
    //   // renderAvatar={renderAvatar}
    //   renderBubble={renderBubble}
    //   renderSystemMessage={renderSystemMessage}
    //   // renderMessage={renderMessage} untuk background panel messages
    //   renderMessageText={renderMessageText}
    //   // renderMessageImage
    //   // renderCustomView={renderCustomView}
    //   isCustomViewBottom
    //   // messagesContainerStyle={{ backgroundColor: 'indigo' }}
    //   parsePatterns={(linkStyle) => [
    //     {
    //       pattern: /#(\w+)/,
    //       style: linkStyle,
    //       onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
    //     },
    //   ]}
    // />
  );
};

export default MessageTab;

const myStyles = StyleSheet.create({
  wadahUtama: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teksTebal: {
    fontSize: 24,
    color: "blue",
    justifyContent: "center",
  },
});
