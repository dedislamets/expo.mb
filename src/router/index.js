import React from 'react'
import { Dimensions, StyleSheet, Text, View, Button, Image,useWindowDimensions,ImageBackground, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../pages/Home';
import MessageTab from '../../tabs/MessageTab';
import JualTab from '../../tabs/JualTab';
import IklankuTab from '../../tabs/IklankuTab';
import AccountTab from '../../tabs/AccountTab';
import { Ionicons } from '@expo/vector-icons';
import Details from '../pages/Details';
import { PUTIH } from '../utils/constans';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  useFonts,
  NunitoSans_200ExtraLight,
  NunitoSans_400Regular ,
  NunitoSans_700Bold
} from '@expo-google-fonts/nunito-sans';
import Iklanku from '../pages/Iklan';
import Akun from '../pages/Akun';
import Loginto from '../pages/Loginto';
import Register from '../pages/Register';
import Daftar from '../pages/Produk/daftarTrading';
import DaftarChartering from '../pages/Produk/daftarChartering';
import DaftarTransportation from '../pages/Produk/daftarTransportation';
import ListChat from '../pages/Chat';
import IsiChat from '../pages/Chat/isi';
import MenuTradingChartering from '../pages/Home/tradingmenu';
import ListHomeTransportation from '../pages/Transportation/listhome';
import ListHomeShipyard from '../pages/Shipyards/listhome';
import ListNotifikasi from '../pages/Notifikasi';
import ListSurvey from '../pages/Survey';
import Bahasa from '../pages/Akun/bahasa';
import About from '../pages/Akun/about';
import DaftarShipyard from '../pages/Produk/daftarShipyards';
import ListSubmission from '../pages/Submission';
import Dokumen from '../pages/Dokumen';
import UploadDoc from '../pages/Submission/detail';
import DokumenBuyer from '../pages/Dokumen/buyer';
import ScheduleMeet from '../pages/Survey/schedule';
import PushNotif from '../pages/Notifikasi/push';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHight = Dimensions.get('window').height;
// const { width, height } = useWindowDimensions();
const promoBgHeight = windowHight * 0.7;
const CustButton = ({ onPress, title, style }) => (
  <TouchableOpacity onPress={onPress} style={[style]}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

function ModalScreen({ navigation }) {
  return (
    <ImageBackground
        source={require('../assets/sellpage.png')}
        style={{
          width: '100%', 
          height: '100%' 
        }}
        imageStyle={{
          resizeMode: 'cover' // works only here!
        }}
    >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ fontSize: 30, color: PUTIH, fontFamily: 'NunitoSans_400Regular' }}>HALLO..</Text>
      <Text style={{ fontSize: 18, color: PUTIH, paddingBottom: 20, fontFamily: 'NunitoSans_400Regular' }}>Layanan apa yang akan kamu gunakan</Text>
      <CustButton title="Trading" style={styles.appButtonContainer} onPress={() => navigation.navigate("Daftar")} />
      <CustButton title="Chartering" style={styles.appButtonContainer} onPress={() => navigation.navigate("DaftarChartering")} />
      <CustButton title="Shipyards" style={styles.appButtonContainer} onPress={() => navigation.navigate("DaftarShipyard")} />
      <CustButton title="Transportation" style={styles.appButtonContainer} onPress={() => navigation.navigate("DaftarTransportation")} />
      <View 
        style={{
          position: 'absolute',
          top: 30, // space from bottombar
          height: 40,
          width: 40,
          left:10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name="close" color={'#fff'} size={26} onPress={() => navigation.goBack()} />
      </View>
    </View>
</ImageBackground>
    
  );
}

const MyTabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#40d5f0",
        tabBarInactiveTintColor: "#555",
        headerTitle: '',
        headerStyle:{
          borderBottomColor: '#fff',
          height: 30,
          // elevation:0,
          backgroundColor: '#40d5f0',
        },
        tabBarItemStyle: {
          paddingTop: 5
        }
      })
      }>
        <Tab.Screen 
          name="ActivityTab" 
          component={Home}
          options={{ 
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            unmountOnBlur: true
          }}
        />
        <Tab.Screen name="MessageTab" component={ListChat} 
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" color={color} size={size} />
            ),
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerShown: true,
            headerTitle: () => (
              <Text style={{ color: '#000', marginTop: 10, fontSize: 18, fontFamily: 'NunitoSans_400Regular'}}>Chat</Text>
            ),
            headerRight: ({size}) => (
                <View style={{ paddingEnd: 10, flexDirection: 'row' }}>
                    <Ionicons name="search" color={'#555'} size={20} style={{paddingRight: 20}} />
                    <Ionicons name="trash" color={'#555'} size={20} />
                </View>
            ),
            unmountOnBlur: true
          }}
        />
        <Tab.Screen name="JualTab" screenOptions={{ presentation: 'modal' }} component={ModalScreen} 
          options={{
            tabBarLabel: 'Jual',
            tabBarLabelStyle: {
              paddingBottom:10
            },
            tabBarIcon: ({tintColor,  color, size}) => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 5, // space from bottombar
                  height: 58,
                  width: 58,
                  borderRadius: 58,
                  backgroundColor: '#40d5f0',
                  borderColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name="cart" color={'#fff'} size={size} />
              </View>
            ),
          }}
        />
        
        <Tab.Screen name="IklankuTab" component={Iklanku} 
          options={{
            tabBarLabel: 'Iklanku',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="storefront" size={size} color={color} />
            ),
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerShown: true,
            headerTitle: () => (
              <Text style={{ color: '#000', marginTop: 10, fontSize: 18, fontFamily: 'NunitoSans_400Regular'}}>Iklanku</Text>
            ),
            headerRight: ({size}) => (
                <View style={{ paddingEnd: 10, flexDirection: 'row' }}>
                    <Ionicons name="search" color={'#555'} size={20} style={{paddingRight: 20}} />
                    <Ionicons name="trash" color={'#555'} size={20} />
                </View>
            ),
            unmountOnBlur: true
          }}
        />
        <Tab.Screen name="AccountTab" component={Akun}
          options={{
            tabBarLabel: 'Akun',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            unmountOnBlur: true
          }}
        />
      </Tab.Navigator>
    );
  };

const Router = () => {
  let [fontsLoaded, error] = useFonts({ 
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular,
    NunitoSans_700Bold
  })
    return (
        <Stack.Navigator initialRouteName="MyTabNavigator">
            <Stack.Screen
                name="MyTabNavigator"
                component={MyTabNavigator}
                options={{
                    headerShown: false,
                    
                }}
            />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Loginto" component={Loginto} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            <Stack.Screen name="Daftar" component={Daftar} 
              options={{ 
                headerTitle: 'Input Trading', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="DaftarChartering" component={DaftarChartering} 
              options={{ 
                headerTitle: 'Input Chartering', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="DaftarShipyard" component={DaftarShipyard} 
              options={{ 
                headerTitle: 'Input Shipyard', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="DaftarTransportation" component={DaftarTransportation} 
              options={{ 
                headerTitle: 'Input Transportation', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="IsiChat" component={IsiChat} 
              options={{ 
                headerStyle: {
                    backgroundColor: '#f6f6f6'
                },
                headerShown: true,
                headerTitle: () => (
                    <View style={{ flex: 1, flexDirection: 'row'  }}>
                        <Image
                            style={{ width: 40, height: 40,borderRadius: 30, marginRight: 10,
                            marginTop: 10 }}
                            source={{
                                uri: 'https://placeimg.com/32/32/any',
                            }}
                        />
                        <View style={{ flexDirection: 'column'  }} >
                            <Text style={{ color: '#000', marginTop: 10, fontSize: 18}}>Kapal Cargo Std</Text>
                            <Text style={{ color: '#a6a6a6', fontSize: 12}}>Rp 800.000.000</Text>
                        </View>
                    </View>
                ),
                headerRight: ({size}) => (
                    <View style={{ paddingEnd: 10 }}>
                        <Ionicons name="call" color={'#40d5f0'} size={16} />
                    </View>
                )
              }}/>
            <Stack.Screen name="MenuTradingChartering" component={MenuTradingChartering} 
              options={{ 
                headerTitle: 'Trading & Chartering', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="ListHomeTransportation" component={ListHomeTransportation} 
              options={{ 
                headerTitle: 'Transportation', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="ListHomeShipyard" component={ListHomeShipyard} 
              options={{ 
                headerTitle: 'Shipyard', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="ListNotifikasi" component={ListNotifikasi} 
              options={{ 
                headerTitle: 'Notifikasi', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="ListSurvey" component={ListSurvey} 
              options={{ 
                headerTitle: 'Schedule Survey', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="ListSubmission" component={ListSubmission} 
              options={{ 
                headerTitle: 'Submission List', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="Dokumen" component={Dokumen} 
              options={{ 
                headerTitle: 'Sign Dokumen Seller', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="DokumenBuyer" component={DokumenBuyer} 
              options={{ 
                headerTitle: 'Sign Dokumen Buyer', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="UploadDoc" component={UploadDoc} 
              options={{ 
                headerTitle: 'Upload Dokumen', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
            }}/>
            <Stack.Screen name="ScheduleMeet" component={ScheduleMeet} 
              options={{ 
                headerTitle: 'Buat Schedule', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
            }}/>
            <Stack.Screen name="Bahasa" component={Bahasa} 
              options={{ 
                headerTitle: 'Bahasa', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="About" component={About} 
              options={{ 
                headerTitle: 'About', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
            <Stack.Screen name="PushNotif" component={PushNotif} 
              options={{ 
                headerTitle: 'Push', 
                headerStyle: {
                  backgroundColor: '#40d5f0',
                },
                headerTintColor: '#fff'
              }}/>
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 200,
    marginBottom: 20
  },
  appButtonText: {
    fontSize: 18,
    color: "#40d5f0",
    alignSelf: "center",
    fontFamily: 'NunitoSans_400Regular'
  }
})
