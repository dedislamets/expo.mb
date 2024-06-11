import React, { useState,useMemo, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View,SafeAreaView, FlatList, SectionList, TouchableOpacity, Image, Linking } from 'react-native'
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
import { NumericFormat } from 'react-number-format';
import ButtonIcon from '../../components/ButtonIcon';
import axios from 'axios';

const OpenURLButton = ({ url, children, style }) => {
    const handlePress = useCallback(async () => {
      console.log(url)
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);

        
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Text style={style} onPress={handlePress} >{children}</Text>;
  };

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
                        <View>
                            <Text style={[styles.itemText]}>{item.title_pengajuan}</Text>
                        </View>
                        
                    </View>
                    <View>
                        <Text style={[styles.itemText,{fontSize: 12}]}>Rp {item.nilai_pengajuan}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                 
                        <View style={{width: '55%'}}>
                            <Text style={[styles.itemTahun]}>{item.tgl_pengajuan}</Text>
                        </View>
                        <View style={{width: 205, top:0, alignItems: 'flex-end'}}>
                            <Text style={[styles.itemTahun ]}>{item.status}</Text>
                        </View>
                    </View>
                    
                </View>
                
            </View>
        </View>
    );
  };
const ListSubmission = ({navigation}) => {
    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState([]);
    const [dataSubmission, setDataSubmission] = useState([]);
    const [dataModal, setDataModal] = useState([]);
    
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

    const popdetail = (item) => {
        setShowModal(true)
        setDataModal(item)
    }

    const gotoCancel = (item) =>{
        const payloads = {
            id : item.id
        };
        axios.post(`${API_URL}/api/cancel_pengajuan`, 
        JSON.stringify(payloads)
        , {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            setShowModal(false);
        })
        .catch(err => console.log(err));
    }

    const fetchData = ()=> {

        fetch(`${API_URL}/api/submission?email=` + login['email'], {
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
                        onPress={() => popdetail(item)}>
                            <ListItem item={item} />
                            <NativeBaseProvider>
                                <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
                                    <Modal.Content maxWidth="400px">
                                        <Modal.Body>
                                            <View >
                                                <View style={{  alignItems: 'center', paddingTop: 30, paddingBottom: 10}}>
                                                    <Text style={[styles.itemText,{textAlign: 'center'}]}>Kode Pengajuan</Text>
                                                    <Text>{dataModal.kode_pengajuan }</Text>
                                                    <Text>{dataModal.tgl_pengajuan }</Text>
                                                </View>
                                                <View style={styles.listColumn}>
                                                    <View style={styles.listRow}>
                                                        <View style={[styles.colItem, {marginHorizontal: 10}]}>     
                                                            <View style={[styles.productCardThumb]}>
                                                                <Image
                                                                    source={{ uri : dataModal.nama_foto == null ? 'https://freesvg.org/img/1593086103cruise-ship-silhouette-freesvg.org.png' : 'https://marinebusiness.co.id/uploads/iklan/' + dataModal.nama_foto }}
                                                                    style={[styles.itemPhotoComment]}
                                                                />
                                                            </View>
                                                            
                                                        </View>
                                                        <View style={styles.productCardContent}>
                                                            <View style={{flexDirection:'row'}}>
                                                                <View>
                                                                    <Text style={[styles.itemText]}>{dataModal.title}</Text>
                                                                </View>
                                                            </View>
                                                            
                                                            <View style={{flexDirection:'row'}}>
                                                                <NumericFormat
                                                                    value={dataModal.nilai_pengajuan}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    prefix={'Rp'}
                                                                    renderText={(value, props) => <Text style={styles.itemPrice} {...props}>{value}</Text>}
                                                                />
                                                                {/* <Text style={styles.itemTahun}>{dataModal.nilai_pengajuan}</Text> */}
                                                            </View>
                                                            
                                                        </View>
                                                        
                                                    </View>
                                                </View>
                                                <View style={[styles.listRow,{ textAlign: 'center', alignSelf: 'center'}]}>
                                                    <OpenURLButton url={'https://marinebusiness.co.id/setting/view_agreement_pdf/' + dataModal.id}  style={{textDecorationLine: 'underline'}}>View Document</OpenURLButton>
                                                </View>
                                                {dataModal.status != 'Cancel' && dataModal.status != 'On Schedule' && dataModal.status != 'Finish' && 
                                                    <View style={styles.listRow}>
                                                        <View style={[styles.colItemFull, {marginHorizontal: 10}]}> 
                                                            <ButtonIcon title="Cancel" onPress={()=> gotoCancel(dataModal)} style={styles.appButtonContainerre} />
                                                        </View>
                                                    </View>
                                                }
                                            </View>
                                        </Modal.Body>
                                    </Modal.Content>
                                </Modal>
                            </NativeBaseProvider>
                            
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
    )
}

export default ListSubmission

const styles = StyleSheet.create({
    appButtonContainer: {
        backgroundColor: "#40d5f0",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
        fontSize: 12
    },
    appButtonContainerre: {
        backgroundColor: "#5a5a5a",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12
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
        // flexBasis: 60,
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: -6,
    },
    colItem2: {
        flexBasis: '50%',
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: -6,
    },
    colItemFull: {
        flexBasis: '100%',
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: -6,
    },
})
