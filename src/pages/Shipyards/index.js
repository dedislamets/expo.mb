import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View,SafeAreaView, FlatList, SectionList, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans';
import { API_URL, PUTIH } from '../../utils/constans';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItem = ({ item }) => {
    return (
        <View style={styles.listColumn}>
            <View style={{flexDirection: 'row', backgroundColor: '#40d5f0', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                <View style={{padding: 10, width: '90%'}}>
                    <Text style={{color: PUTIH, fontFamily: 'NunitoSans_400Regular'}}>{item.date_iklan }</Text>
                </View>
                <View style={{ width: '10%', alignItems: 'flex-end', paddingRight:15, paddingTop:10}}>
                    <Icon name="ellipsis-h" size={18} color="#fff" />
                </View>
            </View>
            <View style={styles.listRow}>
                <View style={[styles.colItem, {marginHorizontal: 10}]}>     
                    <View style={[styles.productCardThumb]}>
                        <Image
                        source={{
                            uri: 'https://marinebusiness.co.id/uploads/iklan/' + item.nama_foto,
                        }}
                        style={[styles.itemPhoto, { borderBottomRightRadius: 10, borderBottomLeftRadius: 10}]}
                        />
                    </View>
                    
                </View>
                <View style={styles.productCardContent}>
                    <View style={{flexDirection:'row', marginBottom: 10, position: 'relative'}}>
                        <View style={{width: '56%'}}>
                            <Text style={[styles.itemText]}>{item.title}</Text>
                        </View>
                        <View style={{width: 70, top:0}}>
                            <Text style={[styles.itemStatus, item.status == '0' ? styles.verifikasi : (item.status=='1' ? styles.aktif :styles.ditolak) ]}>{item.status == '0' ? 'Verifikasi' : 'Aktif'}</Text>
                        </View>
                    </View>
                    
                    <View style={{flexDirection:'row'}}>
                        <Ionicons name="calendar" color={'#a6a6a6'} size={12} style={{ paddingRight: 5, paddingTop: 2}} />
                        <Text style={styles.itemTahun}> {item.laycan_from} - {item.laycan_to}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Ionicons name="map" color={'#a6a6a6'} size={12} style={{ paddingRight: 5, paddingTop: 2}} />
                        <Text style={styles.itemTahun}> {item.area}</Text>
                    </View>
                    <View style={{flexDirection:'row', marginBottom: 10}}>
                      <Text style={styles.itemTahun}>Draft : {item.draft}</Text>
                    </View>
                    <Text style={styles.itemPrice}>Length/Width: {item.length_width}</Text>
                    
                    <View style={{flexDirection:'row', marginTop: 10}}>
                        <Ionicons name="heart" color={'#a6a6a6'} size={12} style={{ paddingRight: 5, paddingTop: 2}} />
                        <Text style={styles.itemTahun}>Disukai 9</Text>

                        <Ionicons name="eye" color={'#a6a6a6'} size={12} style={{ paddingRight: 5, paddingTop: 2, paddingLeft: 10}} />
                        <Text style={styles.itemTahun}>Dilihat 50</Text>
                    </View>
                </View>
                
            </View>
        </View>
    );
  };
const Shipyards = ({navigation}) => {
    const [dataKapal, setDataKapal] = useState([]);
    const [login, setLogin] = useState([]);
    useEffect(() => {
        fetchData
        AsyncStorage.getItem('loginData', (error, result) => {
            // console.log(result)
            if (result) {
              let resultParsed = JSON.parse(result);
              setLogin(resultParsed);
            }
        });
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
          });
      
        return unsubscribe;
    
        
    },[login]);

    const fetchData = ()=> {
        fetch(`${API_URL}/api/kapalku_shipyard?email=` + login['email'], {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(async res => { 
              try {
                const jsonRes = await res.json();
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
                  setDataKapal(data_get);
                } 
              } catch (err) {
                  // console.log(err);
              };
          })
          .catch(err => {
              console.log(err);
          });
    }

    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })

    return (
        <>
        { dataKapal && dataKapal.length ?
        <SafeAreaView style={{ flex: 1 , marginTop: 20 }}>
            <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={dataKapal}
            renderSectionHeader={({ section, index }) => (
                <View key={index} style={styles.colItem}>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={section.data}
                        renderItem={({ item }) =>
                        <TouchableOpacity  
                        containerStyle={styles.productCardContainer}
                        style={styles.productCard}
                        onPress={() => navigation.navigate("DaftarShipyard",item)} >
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

export default Shipyards

const SECTIONS = [
    {
      title: 'Kapal Terbaru',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Kapal Angkat Berat Tongkang',
          uri: 'https://images.pexels.com/photos/799871/pexels-photo-799871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          tahun: '1994',
          price: 'Rp 25.000.000',
          satuan: 'Hari',
          status: 'Aktif'
        },
        {
          key: '2',
          text: 'Kapal Kargo 1 Ton muatan',
          uri: 'https://images.pexels.com/photos/7306966/pexels-photo-7306966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          tahun: '1994',
          price: 'Rp 25.000.000',
          satuan: 'Hari',
          status: 'Ditolak'
        },
        {
            key: '3',
            text: 'Kapal Tongkang',
            uri: 'https://images.pexels.com/photos/8417259/pexels-photo-8417259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            tahun: '1994',
            price: 'Rp 25.000.000',
            satuan: 'Hari',
            status: 'Verifikasi'
          },
      ],
    },
    
  ];

const styles = StyleSheet.create({
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
        color: '#fff',
        fontSize: 12,
        borderRadius: 5
    },  
    itemText: {
        color: '#5a5a5a',
        fontSize: 16,
        lineHeight:18,
        fontFamily: 'NunitoSans_400Regular'
    },
    itemTahun: {
        color: '#8d8d8d',
        fontSize: 12,
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
        margin: 10,
        borderRadius: 20,
        borderColor: '#a6a6a6',
        borderWidth: 0.5,
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
        marginBottom: 12,
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
        marginBottom: 10,
    },
    itemPhoto: {
        width: 100,
        height: 130,
    },
    colItem: {
        flexBasis: '30%',
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: -6,
    },
})
