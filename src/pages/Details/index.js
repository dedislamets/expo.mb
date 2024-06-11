import React,{ useState, useLayoutEffect,useCallback, useMemo, useRef} from 'react'
//import  From 'react-native-reanimated'
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet,Alert ,ToastAndroid, Text, View, Dimensions, Animated, Button,
    TouchableHighlight,
    TouchableOpacity,
    Image,useWindowDimensions } from 'react-native';
import { ScrollView  } from 'react-native-gesture-handler';
import ButtonIcon from '../../components/ButtonIcon';
import Modal from "react-native-modal";
import { API_URL, PUTIH } from '../../utils/constans';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans'
import { NumericFormat } from 'react-number-format';
import axios from 'axios';

const { width, height } = Dimensions.get("screen");


const Details = ({navigation, route}) => {

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '65%'], []);
    const [email, setEmail] = useState('')

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
      }, []);
    
    const showToast = () => {
        ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
    };
    const createTwoButtonAlert = () =>
      Alert.alert(
        "Inquery berhasil terkirim..",
        "Kami akan segera menghubungi anda..",
        [
          
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
    const notifAlert= (title,text) =>
      Alert.alert(
        title,
        text,
        [
          
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
    const onInquery = async ({item,email}) => {
        if(email == ''){
            navigation.navigate('Loginto');
            return;
        }

        const payloads = {
            id : item.id,
            f_komisi : 'Y',
            email: email
          };
        
        console.log(payloads);
    
        axios.post(`${API_URL}/api/inquery`, 
          JSON.stringify(payloads)
          , {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            console.log(res.data);
            
            setModalVisible(!modalVisible);
            if(!res.data['status']){
                notifAlert("Warning !", res.data['message']);
            }else{
                createTwoButtonAlert();
            }
            
          })
          .catch(err => console.log(err));
        
    }

    const item= route.params;

    useLayoutEffect(() => {
        
        AsyncStorage.getItem('loginData', (error, result) => {
        if (result) {
          let resultParsed = JSON.parse(result)
          setEmail(resultParsed['email']);
        }
      })
    })
    // console.log(item)
    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })
    
    const { width } = useWindowDimensions();
    const minHeight = (width) / 1.5;
    const [aligment] = useState(new Animated.Value(0) );
    const [modalVisible, setModalVisible] = useState(false);


    // if (error) return <View><Text>{error.message}</Text></View>;
    // if (!loaded) return null;
    if (!fontsLoaded) { 
        return <AppLoading /> 
    }
    return (
        // <Animated.View style={[styles.container, actionSheetStyle]}>
        <View style={styles.container}>
            
            <Modal
                backdropColor={'black'}
                backdropOpacity= {0.7}
                animationType={"slide"}
                // transparent={false}
                onBackdropPress={() => setModalVisible(false)}
                isVisible={modalVisible}
                // onRequestClose={() => {
                //     Alert.alert('Modal has been closed.');
                // }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            <Text style={[styles.modalText, { fontSize: 20, fontWeight: 'bold'}]}>Inquery</Text>
                            <Text style={styles.modalText}>You must follow any policies made available to you within the Services.</Text>

                            <Text style={styles.modalText}>Don’t misuse our Services. For example, don’t interfere with our Services or try to access them using a method other than the interface and the instructions that we provide. You may use our Services only as permitted by law, including applicable export and re-export control laws and regulations. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</Text>

                            <Text style={styles.modalText}>Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access. You may not use content from our Services unless you obtain permission from its owner or are otherwise permitted by law. These terms do not grant you the right to use any branding or logos used in our Services. Don’t remove, obscure, or alter any legal notices displayed in or along with our Services.</Text>

                            <Text style={styles.modalText}>Our Services display some content that is not Google’s. This content is the sole responsibility of the entity that makes it available. We may review content to determine whether it is illegal or violates our policies, and we may remove or refuse to display content that we reasonably believe violates our policies or the law. But that does not necessarily mean that we review content, so please don’t assume that we do.</Text>

                            <Text style={styles.modalText}>In connection with your use of the Services, we may send you service announcements, administrative messages, and other information. You may opt out of some of those communications.</Text>

                            <Text style={styles.modalText}>Some of our Services are available on mobile devices. Do not use such Services in a way that distracts you and prevents you from obeying traffic or safety laws.</Text>
                            <TouchableHighlight
                                style={styles.appButtonContainer}
                                onPress={() => onInquery({item,email})}>
                                <Text style={styles.textStyle}>Submit</Text>
                            </TouchableHighlight>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <View style={styles.productCardThumb}>
                <Image source={{ uri: 'https://marinebusiness.co.id/uploads/iklan/' + item.nama_foto }} style={[styles.productCardImage, { minHeight }]} />  
            </View>
            
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >  
                <View style={{ flexDirection: 'row', marginBottom: 20, paddingTop: 10,paddingBottom:0, paddingLeft:20,paddingRight: 20}}>
                    <View style={{ width: '50%', paddingRight: 10}}>
                        <TouchableOpacity
                            onPress={ () => {navigation.navigate('IsiChat')}}>
                            <ButtonIcon title="Chat" style={styles.appButtonContainer} />
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{ width: '50%'}}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                            }}>
                            <ButtonIcon title="Inquery" style={styles.appButtonContainer}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.konten}>
                    
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ width: '70%'}}>
                            <Text style={{fontSize: 21, fontFamily: 'NunitoSans_400Regular', color: '#000'}}>{item.title}</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={styles.status}>Aktif</Text>
                        </View>
                    </View>
                    <NumericFormat
                        value={item.price}
                        style={{fontSize: 24, fontWeight: 'bold', fontFamily: 'NunitoSans_700Bold'}}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        renderText={(value, props) => <Text style={styles.itemPrice} {...props}>{value}</Text>}
                    />
                
                    <Text style={{fontSize: 16, fontFamily: 'NunitoSans_400Regular'}}>{item.vessel_nama}</Text>
                    <View style={styles.tableDesc}>
                        <View style={{ flexDirection: 'row', marginBottom: 20}}>
                            <View style={{ width: '40%'}}>
                                <Text style={styles.td}>Description</Text>
                            </View>
                            <View style={{ width: '60%'}}>
                                <Text style={styles.td2}>{item.description}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tablekonten}>
                        
                        { (item.service =='Trading') && 
                            <>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Type</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.type}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Year Of Build</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.year_build}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Place Of Build</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>Jakarta</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Port Of Registry</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.port_registry}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Builder</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.builder}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Deck Capacity</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.deck_capacity}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Max Deck</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.max_deck_load}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>NRT/DWT</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.nrt}/{item.dwt}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>LOA</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.loa}</Text>
                                    </View>
                                </View>
                            </>
                        }
                        { (item.service =='Chartering') && 
                            <>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Type</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.type}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Charter</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.type_charter} Charter</Text>
                                    </View>
                                </View>

                                { (item.type_charter =='time' || item.type_charter =='bareboat') && 
                                    <>
                                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                            <View style={{ width: '40%'}}>
                                                <Text style={styles.td}>Duration</Text>
                                            </View>
                                            <View style={{ width: '60%'}}>
                                                <Text style={styles.td2}>{item.duration} {item.duration_uom}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                            <View style={{ width: '40%'}}>
                                                <Text style={styles.td}>Laycan From</Text>
                                            </View>
                                            <View style={{ width: '60%'}}>
                                                <Text style={styles.td2}>{item.laycan_from}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                            <View style={{ width: '40%'}}>
                                                <Text style={styles.td}>Laycan To</Text>
                                            </View>
                                            <View style={{ width: '60%'}}>
                                                <Text style={styles.td2}>{item.laycan_to}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                            <View style={{ width: '40%'}}>
                                                <Text style={styles.td}>Area</Text>
                                            </View>
                                            <View style={{ width: '60%'}}>
                                                <Text style={styles.td2}>{item.area}</Text>
                                            </View>
                                        </View>
                                    </>
                                }

                                { (item.type_charter =='freight') && 
                                    <>
                                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                            <View style={{ width: '40%'}}>
                                                <Text style={styles.td}>Port Of Loading</Text>
                                            </View>
                                            <View style={{ width: '60%'}}>
                                                <Text style={styles.td2}>{item.portloading}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                            <View style={{ width: '40%'}}>
                                                <Text style={styles.td}>Port Of Discharging</Text>
                                            </View>
                                            <View style={{ width: '60%'}}>
                                                <Text style={styles.td2}>{item.portdischarge}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                            <View style={{ width: '40%'}}>
                                                <Text style={styles.td}>Qty</Text>
                                            </View>
                                            <View style={{ width: '60%'}}>
                                                <Text style={styles.td2}>{item.qty_freight}</Text>
                                            </View>
                                        </View>
                                    </>
                                }
                                
                                
                                
                                
                                
                            </>
                        }
                        
                        { (item.service =='Shipyard') && 
                            <>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Area</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.area}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Length/Width</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.length_width}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5}}>
                                    <View style={{ width: '40%'}}>
                                        <Text style={styles.td}>Draft</Text>
                                    </View>
                                    <View style={{ width: '60%'}}>
                                        <Text style={styles.td2}>{item.draft}</Text>
                                    </View>
                                </View>

                            </>
                        }
                        {/* <View style={{ flexDirection: 'row', marginBottom: 20}}>
                            <View style={{ width: '40%'}}>
                                <Text style={styles.td}>Length / Beam</Text>
                            </View>
                            <View style={{ width: '60%'}}>
                                <Text style={styles.td2}>28 m / 11.8 m</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20}}>
                            <View style={{ width: '40%'}}>
                                <Text style={styles.td}>Draft</Text>
                            </View>
                            <View style={{ width: '60%'}}>
                                <Text style={styles.td2}>4.8 m</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20}}>
                            <View style={{ width: '40%'}}>
                                <Text style={styles.td}>Gross Tonage</Text>
                            </View>
                            <View style={{ width: '60%'}}>
                                <Text style={styles.td2}>379 Ton</Text>
                            </View>
                        </View> */}
                    </View>
                    
                </ScrollView>
            </BottomSheet>
        </View>
        //</Animated.View>
    )
    
}

export default Details

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        color: 'white',
      },
      modalView: {
        margin: 10,
        backgroundColor: 'white',
        color: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#000',
      },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#40d5f0",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
    container: {
        flex: 1,
        fontFamily: 'NunitoSans_200ExtraLight',
        backgroundColor: 'grey',
        // position: "absolute",
        // left: 0,
        // right: 0,
        // bottom: 0,
        // height: height - 190,
        // width: width,
        // borderTopRightRadius: 40,
        // marginHorizontal: 0,
        // borderTopLeftRadius: 40
    },
    grabber: {
        // width: 60,
        // borderTopWidth: 5,
        // borderTopColor: '#aaa',
        // alignContent: 'center'
    },
    konten: {
        flex: 1,
        flexDirection: 'column',
        // position: 'absolute',
        top:10,
        textAlign: 'left',
        paddingLeft: 25,
        paddingRight: 25,
        width: '100%'
    },
    tablekonten: {
        backgroundColor: '#f4f4f4',
        width: '100%',
        height: height/3.1 ,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'column',
        paddingLeft:20,
        paddingRight: 20,
        paddingTop: 30,
        marginBottom:10
    },
    tableDesc: {
        backgroundColor: '#f4f4f4',
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'column',
        paddingLeft:20,
        paddingRight: 20,
        paddingTop: 30,
    },
    status: {
        fontSize: 14, 
        textAlign: 'center',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        padding: 5,
        backgroundColor: 'green',
        color: PUTIH,
        width: 60,
        borderRadius:20,
        fontFamily: 'NunitoSans_400Regular'
    },
    td: {
        fontSize: 16, 
        color: '#8f8f8f', 
        fontFamily: 'NunitoSans_400Regular'
    },
    td2: {
        // fontWeight: 'bold',
        fontFamily: 'NunitoSans_700Bold'
    }
})
