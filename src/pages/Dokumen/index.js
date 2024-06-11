import React, { useState,useMemo, useEffect } from 'react'
import { StyleSheet, Text, View,SafeAreaView, FlatList, SectionList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans';
import { PUTIH } from '../../utils/constans';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Center, FormControl, Input, Modal,Button, NativeBaseProvider } from 'native-base';
import { API_URL } from '../../utils/constans';
import AsyncStorage from '@react-native-async-storage/async-storage'

const ListItem = ({ item }) => {
    return (
        <View style={styles.listColumn}>
            <View style={styles.listRow}>
                <View style={[styles.colItem, {marginHorizontal: 10}]}>     
                    <View style={[styles.productCardThumb]}>
                        
                        <Image
                        source={{
                            uri: 'https://marinebusiness.co.id/uploads/iklan/' + item.nama_foto,
                        }}
                        style={[styles.itemPhotoComment]}
                        />
                    </View>
                    
                </View>
                <View style={styles.productCardContent}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width: '100%'}}>
                            <Text style={[styles.itemTahun]}>By : {item.nama_buyer}</Text>
                        </View>
                        {/* <View style={{width: 205, top:0, alignItems: 'flex-end'}}>
                            <Text style={[styles.itemTahun ]}>{item.status}</Text>
                        </View> */}
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Text style={[styles.itemText]}>{item.title_pengajuan}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width: 120}}>
                            <Text style={[styles.itemText,{fontSize: 12}]}>Date : {item.tgl_pengajuan}</Text>
                        </View>
                        <View style={{width: 120, top:0, alignItems: 'flex-end'}}>
                            <Text style={[styles.itemTahun ]}>{item.kode_pengajuan}</Text>
                        </View>
                    </View>
                    
                </View>
                
            </View>
        </View>
    );
  };
const Dokumen = ({navigation}) => {
    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState([]);
    const [dataSubmission, setDataSubmission] = useState([]);
    
    useMemo(() => {
        AsyncStorage.getItem('loginData', (error, result) => {
            // console.log(result)
            if (result) {
              let resultParsed = JSON.parse(result);
              setLogin(resultParsed);
            }
        });
    }, []);
    useEffect(() => {
        fetchData()
    },[login]);

    const fetchData = ()=> {

        fetch(`${API_URL}/api/sign_seller?id=` + login['id'], {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(async res => { 
              try {
                const jsonRes = await res.json();
                // console.log(jsonRes);
                if (res.status == 200) {
                  var data_get = [];
                  if(jsonRes.status){
                    data_get.push({
                      data: []
                    })
                  }
      
                  for (const key in jsonRes.data) {
                    if (jsonRes.data.hasOwnProperty(key)) {
                      data_get[0].data.push(jsonRes.data[key]);
                    }
      
                  }
                  setDataSubmission(data_get);
                } 
              } catch (err) {
                  console.log(err);
              };
          })
          .catch(err => {
              console.log(err);
          });
    }

    return (
        <>
        { dataSubmission && dataSubmission.length ?
            <SafeAreaView style={{ flex: 1 }}>
                <SectionList
                contentContainerStyle={{ paddingHorizontal: 10 }}
                stickySectionHeadersEnabled={false}
                sections={dataSubmission}
                renderSectionHeader={({ section, index }) => (
                    
                    <View key={index} style={styles.colItem}>
                        <FlatList
                            nestedScrollEnabled={true}
                            data={section.data}
                            renderItem={({ item }) =>
                            <TouchableOpacity  
                            containerStyle={styles.productCardContainer}
                            style={styles.productCard}
                            onPress={() => navigation.navigate("UploadDoc",{item, tipe: 'customer'})}>
                                <ListItem item={item} />
                            </TouchableOpacity>
                            }
                            showsHorizontalScrollIndicator={false}
                        />
                        
                    </View>
                    
                    
                )}
                renderItem={({ item, section }) => {
                    return null;
                }}
                
                />  
                
            </SafeAreaView>
            :
            <View>
                <Image
                    style={styles.userImage}
                    source={require('../../assets/empty.png')}
                />
            </View>
        }
        
        </>
    )
}

export default Dokumen

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    verifikasi: {
        backgroundColor: '#bba718'
    }, 
    ditolak: {
        backgroundColor: 'red'
    },
    aktif:{
        backgroundColor: 'green'
    },
    userImage: {
        height: 300,
        marginBottom: 10,
        width: 300,
        marginTop: 200,
        alignSelf: 'center',
      },
    itemStatus: {
        fontFamily: 'NunitoSans_400Regular',
        textAlign: 'center', 
        paddingLeft: 10,
        paddingRight: 10,
        color: '#a6a6a6',
        fontSize: 12,
        borderRadius: 5
    },  
    itemText: {
        color: '#5a5a5a',
        fontSize: 16,
        fontFamily: 'NunitoSans_700Bold'
    },
    itemTahun: {
        color: '#8d8d8d',
        fontSize: 14,
        fontFamily: 'NunitoSans_400Regular'
    },
    itemPrice: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'NunitoSans_700Bold'
    },
    listRow: {
        flexDirection: 'row', 
        padding: 10
    },
    listColumn: {
        flexDirection: 'column',
        backgroundColor: '#fff', 
        borderColor: '#fff',
        borderWidth: 0.5,
        borderBottomColor: '#f1f1f1',
        borderRadius: 10,
    },
    listComment: {
        flexDirection: 'column',
        backgroundColor: '#f1f1f1', 
        borderColor: '#fff',
        borderWidth: 0.5,
        marginTop:5,
        marginBottom: 5,
        marginHorizontal:10,
        borderRadius: 10,
        height: 100
        // backgroundColor: '#a6a6a6'
    },
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
    productCardContainer: {
        marginHorizontal: 6,
        borderRadius: 20,
        // marginBottom: 12,
        backgroundColor: '#000',
        // ...shadows[3],
    },
    productCard: {
        flexDirection: 'column',
        paddingHorizontal: 0,
    },
    productCardThumb: {
        position: 'relative',
    },
    productCardImage: {
        width: '100%',
        // height: 144,
        resizeMode: 'cover',
        backgroundColor: '#000',
    },
    productCardContent: {
        paddingHorizontal: 12,
        flexBasis: 270,
    },
    itemPhoto: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    itemPhotoComment: {
        width: 60,
        height: 60,
        borderRadius: 5
    },
    colItem: {
        flexBasis: 60,
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: -6,
    },
})
