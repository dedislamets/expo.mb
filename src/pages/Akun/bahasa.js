import { StyleSheet, Text, View, Image, SafeAreaView,  } from 'react-native';
import React, { useState } from 'react';

const Bahasa = () => {
    const [avatar, name, bio] = useState(false);
  return (
      
    <SafeAreaView style={styles.headerContainer}>
        <Text style={{fontSize: 18, padding: 20, marginBottom: 10, fontWeight: 'bold'}}>Pilih Bahasa</Text>
        <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10, width: '50%' }}>
                <Image
                    style={styles.userImage}
                    source={require('../../assets/indonesia.png')}
                />
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>Indonesia</Text>
            </View>
            <View style={{ width: '50%', paddingTop:10}}>
                <Image
                    style={styles.userImage}
                    source={require('../../assets/united-kingdom.png')}
                />
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>English</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10, width: '50%' }}>
                <Image
                    style={styles.userImage}
                    source={require('../../assets/japan.png')}
                />
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>Japan</Text>
            </View>
            <View style={{ width: '50%', paddingTop:10}}>
                <Image
                    style={styles.userImage}
                    source={require('../../assets/china.png')}
                />
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>China</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10, width: '50%' }}>
                <Image
                    style={styles.userImage}
                    source={require('../../assets/south-korea.png')}
                />
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>Korea</Text>
            </View>
            <View style={{ width: '50%', paddingTop:10}}>
                <Image
                    style={styles.userImage}
                    source={require('../../assets/germany.png')}
                />
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>German</Text>
            </View>
        </View>
        
      </SafeAreaView>
  );
};

export default Bahasa;

const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
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
      height: 80,
      marginBottom: 10,
      width: 80,
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
