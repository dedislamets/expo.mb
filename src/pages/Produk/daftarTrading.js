import React,{ useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, Button, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Image, SafeAreaView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ButtonIcon from '../../components/ButtonIcon';
import { API_URL, PUTIH } from '../../utils/constans';
// import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'
import { Alert, Box, Center, Collapse, HStack, IconButton, VStack,CloseIcon,NativeBaseProvider } from "native-base";
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import {Picker} from '@react-native-picker/picker';

// import RNFetchBlob from 'rn-fetch-blob';
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans'


const { width, height } = Dimensions.get("screen");

const Daftar = ({navigation, route}) => {
  const item= route.params;
  // console.log(item);
    const options = {
      title: 'konsepKoding',
      takePhotoButtonTitle: 'Take photo with your camera',
      chooseFromLibraryButtonTitle: 'Choose photo from library',
    };
    const KapalArray = [];
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const [visible, setVisible] = useState(false);
    const [imageKapal, setImageKapal] = useState(KapalArray);
    const [description, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [vessel, setVessel] = useState('');
    const [classs, setClass] = useState('');
    const [yearBuild, setYearBuild] = useState('');
    const [port, setPort] = useState('');
    const [deckCargo, setDeckCargo] = useState('');
    const [maxDeck, setMaxDeck] = useState('');
    const [loa, setLoa] = useState('');
    const [nrt, setNrt] = useState('')
    const [dwt, setDwt] = useState('')
    const [owner, setOwner] = useState('')
    const [place, setPlace] = useState('')
    const [show, setShow] = useState(false);
    const [msgErr, setError] = useState('')
    const [listCategory, setCategory] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [email, setEmail] = useState('')
    const [price, setPrice] = useState(0)
    const [idIklan, setIdIklan] = useState(0)
    const [idKapal, setIdKapal] = useState(0)
    const [idDeleteImg, setDeleteImage] = useState([]);
    
    let [fontsLoaded, error] = useFonts({ 
      NunitoSans_200ExtraLight,
      NunitoSans_400Regular,
      NunitoSans_700Bold
    })

    

    const onUploadHandler = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
  
      // console.log(result);
  
      if (!result.cancelled) {
        // setImageKapal(result.uri);
        setImageKapal((prevKapal) => [
          ...prevKapal,result
        ]);
        // console.log(imageKapal)

      }
    }

    const onRemoveHandler = (url) => {
      setImageKapal(imageKapal.filter(({ uri }) => uri !== url.uri));
      // console.log(url);
      setDeleteImage(imageKapal.filter(({ uri }) => uri == url.uri))
    }

    const onSubmitHandler = async () => {
      // console.log(imageKapal.length);
      if(imageKapal.length == 0){
        setError('Images required')
        setShow(true)
        return;
      }
      if (!description.trim() ) {
        setError('Description required')
        setShow(true)
        // Alert.alert("Description required");
        return;
      }

      if (!title.trim() ) {
        setError('Title required')
        setShow(true)
        return;
      }

      if (!vessel.trim() ) {
        setError('Vessel required')
        setShow(true)
        return;
      }

      if (!yearBuild.trim() ) {
        setError('Year Build required')
        setShow(true)
        return;
      }

      if (!port.trim() ) {
        setError('Port Registry required')
        setShow(true)
        return;
      }

      const payloads = {
        title : title,
        description : description,
        vessel: vessel,
        class: classs,
        type: selectedType,
        service: 'Trading',
        yearBuild: yearBuild,
        owner: owner,
        placeBuild: place,
        port: port,
        deckCargo: deckCargo,
        maxDeck: maxDeck,
        loa: loa,
        nrt: nrt,
        dwt: dwt,
        token: uuid.v4(),
        email: email,
        price: price,
        images: imageKapal,
        idIklan: idIklan,
        idKapal: idKapal,
        idDeleteImg: idDeleteImg
      };
     
      // console.log(payloads);

      axios.post(`${API_URL}/api/iklan`, 
      JSON.stringify(payloads)
      , {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res.data);
        navigation.navigate('IklankuTab')
      })
      .catch(err => console.log(err));

      
      // fetch(`${API_URL}/api/iklan`, {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: JSON.stringify(payloads),
      // })
      // .then(async res => { 
      //     try {
            
      //       const jsonRes = await res.json();
      //       console.log(jsonRes);
      //       // if (res.status !== 200) {
      //       //     // setIsError(true);
      //       //     alert(jsonRes.message);
      //       // } else {
      //       //     alert(JSON.stringify(jsonRes.message));
      //       //     // 
      //       // }
      //     } catch (err) {
      //         console.log(err.message);
      //     };
      // })
      // .catch(err => {
      //     alert(err.message);
      // });
    };

    useEffect(() => {
      setImageKapal([])
      AsyncStorage.getItem('loginData', (error, result) => {
        if (result) {
          let resultParsed = JSON.parse(result)
          
          if(item != undefined){
            navigation.setOptions({ headerTitle : 'Edit Trading'})
            fetch(`${API_URL}/api/kapalku_detail?id=` + item.id)
            .then((response) => response.json())
            .then((json) => {

              for (const key in json.data) {
                if (json.data.hasOwnProperty(key)) {
                  setImageKapal((prevKapal) => [
                    ...prevKapal,{
                      "uri": 'https://marinebusiness.co.id/uploads/iklan/' + json.data[key]['nama_foto'],
                      "id" : json.data[key]['id']
                    }
                  ]);
                }

              }
              
            })
            .catch((error) => console.error(error))
            // .finally(() => setLoading(false));

            setEmail(resultParsed['email']);
            setTitle(item.title);
            setDesc(item.description);
            setPrice(item.price);
            setVessel(item.vessel_nama);
            setYearBuild(item.year_build);
            setPlace(item.place_build);
            setPort(item.port_registry);
            setDeckCargo(item.deck_capacity);
            setMaxDeck(item.max_deck_load);
            setLoa(item.loa);
            setNrt(item.nrt);
            setDwt(item.dwt);
            setOwner(item.owners);
            setIdIklan(item.id_iklan);
            setIdKapal(item.id_kapal);
          }
        }
      });

      fetch(`${API_URL}/api/category`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
       })
        .then((response) => response.json())
        .then((json) => {
          var data_get = [];
          // console.log(json)
          setCategory(json.data);
          if(item != undefined){
            setSelectedType(item.type);
          }
          
        })
        .catch((error) => console.error(error));
    }, []);
    
    
    let renderCategoryList = listCategory.map((kategori,myIndex)=>{
      return(
      <Picker.Item key={kategori.category_name} label={kategori.category_name} value={kategori.category_name} />
      )
    });

    if (!fontsLoaded) { 
      return <AppLoading /> 
    }
    return (
            <ScrollView style={styles.scrollView}>
              <NativeBaseProvider>
                <Center flex={1} px="3" marginTop={5}>
                  <Box w="100%" alignItems="center">
                    <Collapse isOpen={show}>
                      <Alert w="100%" status="error">
                        <VStack space={1} flexShrink={1} w="100%">
                          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={2} alignItems="center">
                              <Alert.Icon />
                              <Text fontSize="md" fontWeight="medium" _dark={{
                                color: "coolGray.800"
                                }}>
                                <Text>Please try again later!</Text>
                              </Text>
                            </HStack>
                            <IconButton variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => setShow(false)} />
                          </HStack>
                          <Box pl="6" _dark={{
                              _text: {
                                  color: "coolGray.600"
                                  }
                              }}>
                            <Text>{msgErr}</Text>
                          </Box>
                        </VStack>
                      </Alert>
                    </Collapse>
                  </Box>
                </Center>
              </NativeBaseProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView >
                        <View style={styles.containerInput}>
                            <Text style={styles.section}>Content</Text>
                            <Text style={styles.labelText}> Title</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : Dijual Kapal bekas "
                                autoCorrect={false}
                                onChangeText={setTitle}
                                value={title}
                            />
                            <Text style={styles.labelText}> Description</Text>
                            <TextInput
                              style={styles.inputFields}
                              multiline={true}
                              numberOfLines={4}
                              onChangeText={setDesc}
                              value={description}
                              // onChangeText={(text) => this.setState({text})}
                            />
                            <Text style={styles.labelText}> Category</Text>
                            <View
                               style={styles.inputFieldsSelect}>
                                <Picker 
                                    selectedValue={selectedType}
                                    onValueChange={(itemValue, itemIndex) => {
                                      setSelectedType(itemValue);
                                    }}
                                    style={{height:30, paddingTop: 0}}
                                >
                                  {renderCategoryList}
                                </Picker>
                            </View>
                            <Text style={styles.labelText}>Price</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder=""
                                autoCorrect={false}
                                onChangeText={setPrice}
                                value={price}
                            />
                            <TouchableOpacity
                              style={styles.btnSubmit} 
                              onPress={onUploadHandler}>
                              <Text style={{color: '#fff'}}>Choose Images</Text>
                            </TouchableOpacity>
   
                            {imageKapal.map((imgKpl, index) => (
                                <View key={index} style={styles.colItem}>
                                      <View
                                        style={{
                                          position: 'absolute',
                                          top: 20, 
                                          zIndex: 100,
                                          height: 30,
                                          width: 30,
                                          right:-30,
                                          borderRadius: 20,
                                          backgroundColor: '#fff',
                                          borderWidth: 1,
                                          borderColor: '#40d5f0',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          paddingTop: 2
                                        }}>
                                          <TouchableOpacity
                                            onPress={() => {
                                              onRemoveHandler(imgKpl)
                                            }}>
                                          <Ionicons name="trash" color={'red'} size={19} />
                                        </TouchableOpacity>
                                      </View>
                                      
                                  
                                  <View style={styles.productCardThumb}>
                                    <Image source={{ uri: imgKpl.uri }} style={styles.imgUpload} />
                                  </View>
                                </View>
                            ))}
                            <Text style={styles.section}>Spesification</Text>
                            <Text style={styles.labelText}> Vessel Name</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : Kapal Roro"
                                autoCorrect={false}
                                onChangeText={setVessel}
                                value={vessel}
                            />
                            
                            <Text style={styles.labelText}>Year Builder</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : 2020"
                                autoCorrect={false}
                                onChangeText={setYearBuild}
                                value={yearBuild}
                            />
                            <Text style={styles.labelText}>Owner</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : CV Sehati"
                                autoCorrect={false}
                                onChangeText={setOwner}
                                value={owner}
                            />
                            <Text style={styles.labelText}>Place Builder</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : Jakarta"
                                autoCorrect={false}
                                onChangeText={setPlace}
                                value={place}
                            />

                            <Text style={styles.labelText}>Port Of Registry</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : Tanjung Priuk"
                                autoCorrect={false}
                                onChangeText={setPort}
                                value={port}
                            />
                            <Text style={styles.section}>Cargo Capacity</Text>
                            <Text style={styles.labelText}>Deck Cargo</Text>
                            <TextInput
                                style={styles.inputFieldsDim}
                                placeholder="in Tons"
                                autoCorrect={false}
                                onChangeText={setDeckCargo}
                                value={deckCargo}
                            />
                            <Text style={styles.labelText}>Max Deck Load</Text>
                            <TextInput
                                style={styles.inputFieldsDim}
                                placeholder="in Tons/M2"
                                autoCorrect={false}
                                onChangeText={setMaxDeck}
                                value={maxDeck}
                            />
                            <Text style={styles.section}>Dimensions</Text>
                            <Text style={styles.labelText}>Length Overall (L.O.A)</Text>
                            <TextInput
                                style={styles.inputFieldsDim}
                                placeholder="in Meters"
                                autoCorrect={false}
                                onChangeText={setLoa}
                                value={loa}
                            />
                            <Text style={styles.labelText}>NRT</Text>
                            <TextInput
                                style={styles.inputFieldsDim}
                                placeholder="in Meters"
                                autoCorrect={false}
                                onChangeText={setNrt}
                                value={nrt}
                            />
                            <Text style={styles.labelText}>DWT</Text>
                            <TextInput
                                style={[styles.inputFieldsDim]}
                                placeholder="in Meters"
                                autoCorrect={false}
                                onChangeText={setDwt}
                                value={dwt}
                            />
                            <TouchableOpacity 
                                style={styles.btnSubmit} 
                                // onPress={() => navigation.navigate('MyTabNavigator', { screen: 'ActivityTab' })}
                                onPress={onSubmitHandler}
                                >
                                <Text 
                                    style={styles.btnText}>Submit
                                </Text>
                            </TouchableOpacity>
                    
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ScrollView>
    )
    
}

export default Daftar

const styles = StyleSheet.create({
    imgUpload: {
      width: 250, 
      height: 200,
      margin: 10,
      borderStyle: 'solid',
      borderWidth: 1 ,
      borderColor: 'gray'
    },
    inputFieldsSelect: {
      fontFamily: 'NunitoSans_200ExtraLight',
      borderColor: '#a6a6a6',
      borderRadius: 10,
      borderWidth: 1,
      paddingTop: 10,
      paddingLeft: 10,
      marginBottom: 15,
      height: 50,
      fontSize: 16,
      color: '#40d5f0',
      width: '90%',
      backgroundColor: '#fff',
      textAlign: 'left',
    },
    scrollView: {
        backgroundColor: '#fff'
    },
    labelText: {
        textAlign: 'left',
        alignItems: 'flex-start',
        width: '95%',
        paddingLeft: 15,
        paddingBottom: 7,
        fontSize: 16,
        fontFamily: 'NunitoSans_200ExtraLight',
    },
    section: {
        textAlign: 'right',
        alignItems: 'flex-end',
        width: '95%',
        paddingRight: 10,
        paddingBottom: 7,
        fontSize: 18,
        fontFamily: 'NunitoSans_700Bold',
    },
    imgLogo: {
      width: 150,
      height: 150
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },

    containerInput: {
      flex: 1.3,
      alignItems: 'center',
      width: '100%',
      paddingTop: 20
    },
    dropdown: {
      backgroundColor: 'white',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginTop: 20,
    },
    inputFields: {
      fontFamily: 'NunitoSans_200ExtraLight',
      borderColor: '#a6a6a6',
      borderRadius: 10,
      borderWidth: 1,
      padding: 15,
      marginBottom: 15,
      minHeight: 50,
      fontSize: 16,
      color: '#000',
      width: '90%',
      backgroundColor: '#fff',
      textAlign: 'left',
    },
    inputFieldsDim: {
        fontFamily: 'NunitoSans_200ExtraLight',
        borderColor: '#a6a6a6',
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        marginBottom: 15,
        height: 50,
        fontSize: 16,
        color: '#000',
        width: '90%',
        backgroundColor: '#fff',
        textAlign: 'right',
      },
    btnSubmit: {
      width: '90%',
      marginBottom: 15,
      borderWidth: 1,
      borderRadius: 15,
      height: 50,
      padding: 15,
      borderColor: '#fff',
      backgroundColor: '#40d5f0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '700',
    },
    btnRegister: {
      marginTop: 5,
      color: '#a6a6a6',
    },
    btnRegisterText: {
      fontSize: 14,
      color: '#FF8C00',
      fontWeight: '500',
      alignSelf: 'center',
    },
    titleLogin: {
      marginTop: 10,
      color: '#40d5f0',
      fontSize: 26,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
    },
    // productCardThumb: {
    //   position: 'relative',
    // },
    bgImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.95,
    },
    register: {
      color: '#a6a6a6',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 5,
    },
    containerIcons: {
      flexDirection: 'row',
      flex: 1,
    },
    iconsRegister: {
      margin: 8,
    },
    textForgotPassword: {
      color:'#ff8c00',
      fontSize: 14,
    },
    createAccount: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      marginBottom: 15,
    },
    btnRecover: {
      marginBottom: 10,
    },
  });
