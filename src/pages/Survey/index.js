import React, { useMemo,useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, ScrollView, RefreshControl ,View,SafeAreaView, FlatList, SectionList, TouchableOpacity, Image,Linking, BackHandler, Alert } from 'react-native'
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
import ButtonIcon from '../../components/ButtonIcon';

const ListItem = ({ item, login }) => {
    return (
        <View style={styles.listColumn}>
            <View style={styles.listRow}>
                <View style={[styles.colItem, {marginHorizontal: 10}]}>     
                    <View style={[styles.productCardThumb]}>
                        <Image
                            source={{
                                uri: item.nama_foto == null ? 'https://freesvg.org/img/1593086103cruise-ship-silhouette-freesvg.org.png' : 'https://marinebusiness.co.id/uploads/iklan/' + item.nama_foto,
                            }}
                            style={[styles.itemPhotoComment]}
                        />
                    </View>
                    
                </View>
                <View style={styles.productCardContent}>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Text style={[styles.itemText]}>{item.kode_pengajuan}</Text>
                        </View>
                        
                    </View>
                    <View>
                        <Text style={[styles.itemText,{fontSize: 12}]}>{item.title_pengajuan}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                 
                        <View style={{width: '55%'}}>
                            {
                                item.title == null ?
                                <Text style={[styles.itemTahun,{color: 'green'}]}>Klik untuk buat janji</Text>
                                :
                                item.onschedule == '1' && item.tgl_meetup != null ?
                                <Text style={[styles.itemTahun]}>{item.tgl_meetup}</Text>
                                : 
                                item.j_from == login['email'] ?
                                <Text style={[styles.itemTahun,{color: 'orange'}]}>Menunggu Konfirmasi</Text>
                                :
                                <Text style={[styles.itemTahun,{color: 'orange'}]}>Butuh Konfirmasi</Text>
                            }
                        </View>
                        <View style={{width: 115, top:0, alignItems: 'flex-end', paddingEnd: 10}}>
                            <Text style={[styles.itemTahun ]}>{item.status}</Text>
                        </View>
                    </View>
                    
                </View>
                
            </View>
        </View>
    );
  };
const ListSurvey = ({navigation}) => {
    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })
    const [showModal, setShowModal] = useState(false);
    const [dataSchedule, setDataSchedule] = useState([]);
    const [login, setLogin] = useState([]);
    const [dataModal, setDataModal] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setDataSchedule([]);
        if(login.keys){
            getLogin();
        }
        fetchData();
      }, []);
    
    useMemo(() => {
        AsyncStorage.getItem('loginData', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result);
                setLogin(resultParsed);
            }
        });
    },[])
    
    const getLogin = () => {
        AsyncStorage.getItem('loginData', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result);
                setLogin(resultParsed);
            }
        });
    }

    useEffect(() => {
        if(!login.keys){
            fetchData();
        }
        
    },[login]);

    const popdetail = (item) => {

        if(item.title == null){
            navigation.navigate("ScheduleMeet",{item, reschedule : 0})
        }else{
            setShowModal(true)
            setDataModal(item)
        }
    }
    const gotoSchedule = (item) =>{
        setShowModal(false);
        navigation.navigate("ScheduleMeet",{item, reschedule : 1})
    }

    const OpenURLButton = ({ url, children, style }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);

            
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <ButtonIcon title={children} style={style} onPress={handlePress} />;
      };

    const fetchData = ()=> {
        console.log(login)
        fetch(`${API_URL}/api/schedule?email=` + login['email'], {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(async res => { 
            console.log(res)

            try {
                const jsonRes = await res.json();
                if (res.status == 200) {
                    var data_get = [];

                    for (const i in jsonRes.data) {
                        if(jsonRes.status){
                            data_get.push({
                                title: jsonRes.data[i].title,
                                data: []
                              })
                        }

                        for (const key in jsonRes.data[i].data) {
                            if (jsonRes.data[i].data.hasOwnProperty(key)) {
                                data_get[i].data.push(jsonRes.data[i].data[key]);
                                
                            }
                        }
                    }
                    setDataSchedule(data_get);
                    setRefreshing(false);
                } 
            } catch (err) {
                  console.log('error1',err);
                  setRefreshing(false)
            };
          })
          .catch(err => {
              console.log('error2', err);
              setRefreshing(false)
          });
    }

    return (
        <>
        { dataSchedule && dataSchedule.length ?
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                    }
                >
                    <SectionList
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    stickySectionHeadersEnabled={false}
                    sections={dataSchedule}
                    renderSectionHeader={({ section, index }) => (
                        <View key={index} style={styles.colItem}>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            <FlatList
                                nestedScrollEnabled={true}
                                data={section.data}
                                renderItem={({ item }) =>
                                <TouchableOpacity  
                                containerStyle={styles.productCardContainer}
                                style={styles.productCard}
                                onPress={() => popdetail(item)}>
                                    <ListItem item={item} login={login} />
                                    <NativeBaseProvider>
                                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                            <Modal.Content maxWidth="400px">
                                                <Modal.Body>
                                                    <View >
                                                        <View style={{  alignItems: 'center', paddingTop: 30, paddingBottom: 10}}>
                                                            <Text style={[styles.itemText,{textAlign: 'center', fontSize: 30}]}>{dataModal.title}</Text>
                                                            <Text style={{fontSize: 24}}>{dataModal.keterangan}</Text>
                                                            <Text>Start : {dataModal.start}</Text>
                                                            <Text>End : {dataModal.end}</Text>
                                                            <Text style={{fontSize: 18}}>Location </Text>
                                                            <Text>{dataModal.location}</Text>
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
                                                                        <Text style={styles.itemTahun}>{dataModal.kode_pengajuan}</Text>
                                                                    </View>
                                                                    <View style={{flexDirection:'row'}}>
                                                                        <View>
                                                                            <Text style={[styles.itemText,{width: 140}]}>{dataModal.nama_buyer}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                
                                                            </View>
                                                            <View style={{flexDirection:'row', marginHorizontal: 10}}>
                                                                <View>
                                                                    <Text style={[styles.itemText]}>{dataModal.title_pengajuan}</Text>
                                                                </View>
                                                            </View>
                                                            {dataModal.onschedule == '1' && dataModal.tgl_meetup == null && dataModal.j_from != login['email'] &&
                                                                <View style={styles.listRow}>
                                                                    <View style={[styles.colItem]}> 
                                                                        <OpenURLButton url={'https://marinebusiness.co.id/notification/coming/' + dataModal.kode_pengajuan} style={styles.appButtonContainer}>Datang</OpenURLButton>
                                                                    </View>
                                                                    <View style={[styles.colItem, {marginHorizontal: 10}]}> 
                                                                        {/* <OpenURLButton url={'https://marinebusiness.co.id/notification/rescedule/' + dataModal.kode_pengajuan} style={styles.appButtonContainerre}>Reschedule</OpenURLButton> */}
                                                                            <ButtonIcon title="Rescedule" onPress={()=> gotoSchedule(dataModal)} style={styles.appButtonContainerre} />
                                                                    </View>
                                                                </View>
                                                            }
                                                        </View>
                                                        {/* <View style={styles.listComment}>
                                                            <View style={styles.listRow}>
                                                                <Text style={{color: '#a9a9a9'}}>Ubah tanggal surveimu</Text>
                                                            </View>
                                                        </View> */}
                                                    </View>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button.Group space={2}>
                                                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                                        setShowModal(false);
                                                    }}>
                                                    OK
                                                    </Button>
                                                
                                                </Button.Group>
                                                </Modal.Footer>
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
                </ScrollView>
            </SafeAreaView>
            :
            <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                <View>
                    <Image
                        style={styles.userImage}
                        source={require('../../assets/empty.png')}
                    />
                </View>
            </ScrollView>
        }
        
        </>
    )
}

export default ListSurvey


const styles = StyleSheet.create({
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#000',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'right',
        paddingRight:10,
        fontFamily: 'NunitoSans_400Regular'
      },
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
        // flexBasis: 60,
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: -6,
    },
})
