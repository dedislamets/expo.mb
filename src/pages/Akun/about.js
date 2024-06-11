import { StyleSheet, Text, View, Image, SafeAreaView,  } from 'react-native';
import React, { useState } from 'react';
import ButtonIcon from '../../components/ButtonIcon';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const About = ({navigation}) => {
    
    onPress = () => {
        navigation.navigate('MyTabNavigator')
    };

  return (
      
    <SafeAreaView style={styles.headerContainer}>
        
        <View style={{alignItems: 'center', paddingTop: 40}}>
            <View>
                <Image
                    style={styles.userImage}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <Text style={{fontSize: 28, padding: 20, fontWeight: 'bold', color: '#40d5f0'}}>Marine Business</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#707070'}}>Copyright 2021, Marine Business.</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#707070'}}>All Rights Reserved.</Text>
            <Text style={{fontSize: 18, fontWeight: '400', color: '#707070', textDecorationLine: 'underline', marginBottom: 40}}>www.marinebusiness.co.id</Text>
            <ButtonIcon title="Kembali" style={styles.appButtonContainer} 
                onPress={() => onPress()}
            />
        </View>
        
      </SafeAreaView>
  );
};

export default About;

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
