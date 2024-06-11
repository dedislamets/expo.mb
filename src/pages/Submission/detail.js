import React,{ useState,useEffect, useLayoutEffect,useCallback, useMemo, useRef} from 'react'
//import  From 'react-native-reanimated'
import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet,Alert ,ToastAndroid, Text, View, Dimensions, Animated, Button,TouchableHighlight,Image,useWindowDimensions  } from 'react-native';
import { ScrollView,TouchableOpacity  } from 'react-native-gesture-handler';
import ButtonIcon from '../../components/ButtonIcon';
import Modal from "react-native-modal";
import { API_URL, PUTIH } from '../../utils/constans';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

// import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans'
import {NumericFormat} from 'react-number-format';
import axios from 'axios';
import ScaledImage from '../../components/ScaledImages';

const { width, height } = Dimensions.get("screen");


const UploadDoc = ({navigation, route}) => {

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '65%'], []);
    const [email, setEmail] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    
    
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
            // console.log(res.data);
            
            setModalVisible(!modalVisible);
            if(!res.data['status']){
                notifAlert("Warning !", res.data['message']);
            }else{
                createTwoButtonAlert();
            }
            
          })
          .catch(err => console.log(err));
        
    }

    const item= route.params.item;
    const tipe= route.params.tipe;
    // console.log(route.params);

    useEffect(() => {

      }, []);
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
    const minHeight = (width) / 2;
    const [aligment] = useState(new Animated.Value(0) );
    const [modalVisible, setModalVisible] = useState(false);
    const [imageDoc, setImageDoc] = useState([]);
    
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: false,
            // aspect: [4, 3],
            // quality: 1,
            base64: true
          });
        // console.log(pickerResult);
        setSelectedImage({ localUri: pickerResult.uri });
        setImageDoc((doc) => [
            ...doc,pickerResult
          ]);
        if(tipe == 'buyer'){
            StoreImagesApiBuyer(pickerResult);
        }else{
            StoreImagesApiSeller(pickerResult);
        }
        
    }

    const StoreImagesApiSeller = (pickerResult) => {
        // console.log(pickerResult);
        setLoading(true);
        const payloads = {
            images: pickerResult,
            kode: item.kode_pengajuan
          };
        //  console.log(payloads);
          axios.post(`${API_URL}/api/upload_dokumen`, 
          JSON.stringify(payloads)
          , {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            console.log(res.data);
            notifAlert("Success Upload Document !", 'Document success sent to server..');
            kirim_email_sign1()
            setLoading(false)
          })
          .catch(err => {
              console.log(err)
              setLoading(false) 
          });
    }
    const StoreImagesApiBuyer = (pickerResult) => {
        const payloads = {
            images: pickerResult,
            kode: item.kode_pengajuan
          };
          setLoading(true);
        //  console.log(payloads);
          axios.post(`${API_URL}/api/upload_dokumen_buyer`, 
          JSON.stringify(payloads)
          , {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            console.log(res.data);
            notifAlert("Success Upload Document !", 'Document success sent to server..');
            kirim_email_sign2()
            setLoading(false)
          })
          .catch(err => {
              console.log(err)
              setLoading(false)
          });
    }

    const kirim_email_sign1 = ()=> {

        fetch(`${API_URL}/api/kirim_email_sign1?kode=` + item.kode_pengajuan, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
    }
    const kirim_email_sign2 = ()=> {

        fetch(`${API_URL}/api/kirim_email_sign2?kode=` + item.kode_pengajuan, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
    }
    

    if (!fontsLoaded) { 
        return <AppLoading /> 
    }
    return (
        <View style={styles.container}>
            <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            />
            <ScrollView style={styles.konten}>
                <View style={styles.productCardThumb}>
                    <Image source={{ uri: 'https://marinebusiness.co.id/uploads/iklan/' + item.nama_foto }} style={[styles.productCardImage, { minHeight }]} />  
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ width: '100%'}}>
                        <Text style={{fontSize: 21, fontFamily: 'NunitoSans_400Regular', color: '#000'}}>{item.title}</Text>
                    </View>
                </View>
                <View style={styles.tablekonten}>
                    <View style={{ flexDirection: 'row', marginBottom: 5}}>
                        <View style={{ width: '40%'}}>
                            <Text style={styles.td}>Inquery</Text>
                        </View>
                        <View style={{ width: '60%'}}>
                            <Text style={styles.td2}>{item.kode_pengajuan}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5}}>
                        <View style={{ width: '40%'}}>
                            <Text style={styles.td}>Date</Text>
                        </View>
                        <View style={{ width: '60%'}}>
                            <Text style={styles.td2}>{item.tgl_pengajuan}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5}}>
                        <View style={{ width: '40%'}}>
                            <Text style={styles.td}>Request By</Text>
                        </View>
                        <View style={{ width: '60%'}}>
                            <Text style={styles.td2}>{item.nama_buyer}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5}}>
                        <View style={{ width: '40%'}}>
                            <Text style={styles.td}>Price</Text>
                        </View>
                        <View style={{ width: '60%'}}>
                            <NumericFormat
                            value={item.nilai_pengajuan}
                            style={{fontWeight: 'bold', fontFamily: 'NunitoSans_700Bold'}}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp'}
                            renderText={(value, props) => <Text style={styles.itemPrice} {...props}>{value}</Text>}
                        />
                        </View>
                    </View>

                    
                    <TouchableOpacity
                        onPress={ () => {navigation.navigate('IsiChat')}}>
                        <ButtonIcon title="Download PDF" style={styles.appButtonContainer} />
                    </TouchableOpacity>
                </View>
                <View style={styles.tableDesc}>
                    <View style={{ width: '100%'}}>
                            <Text style={styles.howto}>How to</Text>
                    </View>
                    <View style={ styles.row }>
                        
                        <View style={ styles.bullet }>
                            <Text>{'\u2022' + " "}</Text>
                        </View>
                        <View style={ styles.bulletText }>
                            <Text>Download the PDF file according to the inquiry code</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text>{'\u2022' + " "}</Text>
                        </View>
                        <View style={ styles.bulletText }>
                            <Text>Print PDF file that has been downloaded</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text>{'\u2022' + " "}</Text>
                        </View>
                        <View style={ styles.bulletText }>
                            <Text>Put a signature on the stamp 6000</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text>{'\u2022' + " "}</Text>
                        </View>
                        <View style={ styles.bulletText }>
                            <Text>Scan dokumen and save it with extention JPEG,JPG</Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text>{'\u2022' + " "}</Text>
                        </View>
                        <View style={ styles.bulletText }>
                            <Text>Reupload the document in this page to complete the submission</Text>
                        </View>
                    </View>
                    <View style={ [styles.row,{ paddingBottom: 10}] }>
                        <View style={ styles.bullet }>
                            <Text>{'\u2022' + " "}</Text>
                        </View>
                        <View style={ styles.bulletText }>
                            <Text>Please waiting until document are processed</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={{marginBottom: 20}}>
                    {/* <Text style={styles.instructions}>
                        To share a photo from your phone with a friend, just press the button below!
                    </Text> */}
                    { selectedImage && 
                        <ScaledImage width={Dimensions.get('window').width * 0.9} uri={selectedImage.localUri} />
                    }

                    <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                        <Text style={styles.buttonText}>Browse Files..</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={StoreImagesApi} style={styles.button}>
                        <Text style={styles.buttonText}>Upload..</Text>
                    </TouchableOpacity> */}
                </View>
                
            </ScrollView>
        </View>
        //</Animated.View>
    )
    
}

export default UploadDoc

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
      },
    logo: {
        width: 305,
        marginBottom: 20,
        height: 200,
        flex: 1
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        borderRadius: 5,
      },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    dropzone: {
        textAlign: 'center',
        padding: 30,
        // borde: 3px dashed #eeeeee;
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        marginBottom: 20
    },
    selectedfilewrapper: {
        textAlign: 'center'
    },
    selectedfile: {
        color: '#000',
        fontWeight: 'bold'
    },
    howto: {
        fontSize: 18, 
        fontFamily: 'NunitoSans_400Regular', 
        color: '#000',
        padding:10,
        backgroundColor: '#40d5f0'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // color: 'white',
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        // color: 'white',
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
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
        marginVertical: 4,
        paddingLeft:20,
        paddingRight: 20,
    },
    bullet: {
        width: 10
    },
    bulletText: {
        flex: 1
    },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        // color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        // color: '#000',
      },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#40d5f0",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12
      },
    container: {
        flex: 1,
        fontFamily: 'NunitoSans_200ExtraLight',
        backgroundColor: 'white',
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
        // height: height/3.1 ,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'column',
        paddingLeft:20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom:10
    },
    tableDesc: {
        backgroundColor: '#f4f4f4',
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'column',
        marginBottom: 30
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
