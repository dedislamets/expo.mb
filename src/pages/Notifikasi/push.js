// import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet,Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PushNotif = ({navigation}) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  return (
      
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
};

export default PushNotif;

const styles = StyleSheet.create({
    appButtonContainer: {
        width: 200,
        elevation: 8,
        backgroundColor: "#40d5f0",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
    container: {
      flex: 1,
    },
    headerContainer: {
      alignItems: 'center',
      backgroundColor: '#FFF',
      flex: 1
    },
    scroll: {
      backgroundColor: '#FFF',
    },
    sceneContainer: {
      marginTop: 10,
    },
    socialIcon: {
      marginLeft: 14,
      marginRight: 14,
    },
    socialRow: {
      flexDirection: 'row',
    },
    userBioRow: {
      marginLeft: 40,
      marginRight: 40,
    },
    userBioText: {
      color: 'gray',
      fontSize: 13.5,
      textAlign: 'center',
    },
    userImage: {
      borderRadius: 60,
      height: 150,
      marginBottom: 10,
      width: 150,
      alignSelf: 'center'
    },
    userNameRow: {
      marginBottom: 10,
    },
    userNameText: {
      color: '#5B5A5A',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    userRow: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: 12,
    },
    listItemContainer: {
      height: 55,
      borderWidth: 0.5,
      color:'#000',
      borderColor: '#ECECEC',
    },
  })
