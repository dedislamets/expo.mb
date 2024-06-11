import React,{ useState, useLayoutEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, Button, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Image, SafeAreaView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import ButtonIcon from '../../components/ButtonIcon';
import { API_URL, PUTIH } from '../../utils/constans';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Box, Center, Collapse, HStack, IconButton, VStack,CloseIcon,NativeBaseProvider, Picker } from "native-base";
import uuid from 'react-native-uuid';
import axios from 'axios';
import moment from 'moment';
// import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans'

const { width, height } = Dimensions.get("screen");
const DaftarChartering = ({navigation, route}) => {
    const item= route.params;
    const [dateFrom, setDateFrom] = useState('09-10-2022');
    const [dateTo, setDateTo] = useState('09-10-2022');
    const [charterType, setCharterType] = useState("Time");
    const [uomDuration, setUomDuration] = useState("Day");
    const [selectedValueVessel, setSelectedValueVessel] = useState("");
    const [listCategory, setCategory] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [imageKapal, setImageKapal] = useState([]);
    const [idDeleteImg, setDeleteImage] = useState([]);
    const [show, setShow] = useState(false);
    const [msgErr, setError] = useState('')
    const [price, setPrice] = useState('0')
    const [area, setArea] = useState('')
    const [portLoading, setPortLoading] = useState('')
    const [portDischarging, setPortDischarging] = useState('')
    const [qty, setQty] = useState('0')
    const [duration, setDuration] = useState('1')
    const [description, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('')
    const [idIklan, setIdIklan] = useState(0)
    const [isScreenMounted, setScreen] =  useState(true)

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
        setImageKapal((prevKapal) => [
          ...prevKapal,result
        ]);
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

      if(charterType == 'Time' || charterType == 'Bareboat'){
        if (price == 0 ) {
          setError('Price required')
          setShow(true)
          return;
        }
      }


      const payloads = {
        title : title,
        description : description,
        type_charter: charterType,
        type: selectedValueVessel,
        service: 'Chartering',
        token: uuid.v4(),
        email: email,
        idIklan: idIklan,
        idDeleteImg: idDeleteImg,
        dateto: dateTo,
        datefrom: dateFrom
      };
      
      if(charterType == 'Time' || charterType == 'Bareboat'){
        payloads['price_charter'] = price
        payloads['duration'] = duration
        payloads['uom'] = uomDuration
        payloads['area'] = area
      }else if(charterType == 'Freight'){
        payloads['price_freight'] = price
        payloads['portloading'] = portLoading
        payloads['portdischarge'] = portDischarging
        payloads['qty_freight'] = qty
      }
      payloads['images'] = imageKapal
     
      // console.log(payloads);

      axios.post(`${API_URL}/api/chartering`, 
      JSON.stringify(payloads)
      , {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        // console.log(res.data);
        navigation.navigate('IklankuTab')
      })
      .catch(err => console.log(err));
    };

    const fetchdataimage = async  (id) => {
      if(isScreenMounted){
        setImageKapal([])
        await fetch(`${API_URL}/api/kapalku_detail_chartering?id=` + id)
          .then((response) => response.json())
          .then((json) => {
            // console.log(imageKapal)
            for (const key in json.data) {
              // console.log(json.data[key])
                
                setImageKapal((prevKapal) => [
                  ...prevKapal,{
                    "uri": 'https://marinebusiness.co.id/uploads/iklan/' + json.data[key]['foto_iklan'],
                    "id" : json.data[key]['id_iklan']
                  }
                ]);
    
            }
            
          })
          .catch((error) => console.error(error))
      }
      
    }
    
    useLayoutEffect(() => {
      
      AsyncStorage.getItem('loginData', (error, result) => {
        if (result) {
          let resultParsed = JSON.parse(result)
          setEmail(resultParsed['email']);
        }
      })

      

      if(item != undefined){
        navigation.setOptions({ headerTitle : 'Edit Chartering'})
        fetchdataimage(item.id)
        setTitle(item.title);
        setDesc(item.description);
        setPrice(item.price);
        setIdIklan(item.id);
        setSelectedValueVessel(item.type);
        setDateFrom(moment(item.laycan_from).format('DD/MM/YYYY'))
        setDateTo(moment(item.laycan_to).format('DD/MM/YYYY'))

        if(item.type_charter == 'time' || item.type_charter == 'Time'){
          setCharterType("Time");
          setPrice(item.price_charter);
          setDuration(item.duration);
          setUomDuration(item.duration_uom);
          setArea(item.area);
        }

        if(item.type_charter == 'Freight' || item.type_charter == 'freight'){
          setCharterType("Freight");
          setPortLoading(item.portLoading);
          setPortDischarging(item.portdischarge);
          setQty(item.qty_freight);
        }
      }
      
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
          
          setCategory(json.data);
          if(item != undefined){
            setSelectedValueVessel(item.type);
          }
          
        })
        .catch((error) => console.error(error));
    },[])
    
    
    let renderCategoryList = listCategory.map((kategori,myIndex)=>{
      return(
      <Picker.Item key={kategori.category_name} label={kategori.category_name} value={kategori.category_name} />
      )
    });

    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })
    
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
                            <Text style={styles.section}>Spesification</Text>
                            <Text style={styles.labelText}>Chartering Type</Text>
                            <View
                               style={styles.inputFieldsSelect}>
                                <Picker 
                                    selectedValue={charterType}
                                    onValueChange={(itemValue, itemIndex) => setCharterType(itemValue)}
                                    style={{height:30, paddingTop: 0}}
                                >
                                  <Picker.Item label="Time Charter" value="Time" />
                                  <Picker.Item label="Freight Charter" value="Freight" />
                                  <Picker.Item label="Bareboat Charter" value="Bareboat" />
                                </Picker>
                            </View>
                            <Text style={styles.labelText}> Title</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : Kapal Roro"
                                autoCorrect={false}
                                onChangeText={setTitle}
                                value={title}
                            />
                            <Text style={styles.labelText}>Description</Text>
                            <TextInput
                                style={styles.inputFields}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={setDesc}
                                value={description}
                            />
                            <Text style={styles.labelText}>Vessel Type</Text>
                           
                            <View
                               style={styles.inputFieldsSelect}>
                                <Picker 
                                    selectedValue={selectedValueVessel}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValueVessel(itemValue)}
                                    style={{height:30, paddingTop: 0}}
                                >
                                  {renderCategoryList}
                                </Picker>
                            </View>

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
                            
                            <Text style={styles.labelText}>Laycan From</Text>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={dateFrom}
                                mode="date"
                                placeholder="select date"
                                format="DD/MM/YYYY"
                                minDate="01-01-1900"
                                maxDate="01-01-2030"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 2,
                                        top: 4,
                                        marginLeft: 0,

                                    },
                                    dateInput: {
                                        borderColor: '#a6a6a6',
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        alignItems: "center",
                                        padding: 15,
                                        height: 50,
                                      },
                                }}
                                onDateChange={(date) => {
                                    setDateFrom(date);
                                }}
                            />
                            <Text style={styles.labelText}>Laycan To</Text>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={dateTo}
                                mode="date"
                                placeholder="select date"
                                format="DD/MM/YYYY"
                                minDate="01-01-1900"
                                maxDate="01-01-2030"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 2,
                                        top: 4,
                                        marginLeft: 0,

                                    },
                                    dateInput: {
                                        borderColor: '#a6a6a6',
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        alignItems: "center",
                                        padding: 15,
                                        height: 50,
                                      },
                                }}
                                onDateChange={(date) => {
                                    setDateTo(date);
                                }}
                            />
                            <Text style={styles.labelText}>Price</Text>
                            <TextInput
                                style={styles.inputFields}
                                autoCorrect={false}
                                onChangeText={setPrice}
                                value={price}
                            />
                            { (charterType =='Time' || charterType =='Bareboat') && 
                            <>
                            <Text style={styles.labelText}>Duration</Text>
                            <View style={{ width: '90%', flex: 1, flexDirection: 'row'}}>
                              <TextInput
                                  style={styles.inputFieldsDuration}
                                  autoCorrect={false}
                                  onChangeText={setDuration}
                                  value={duration}
                                />
                              <View
                                style={[styles.inputFieldsSelect,{ width: '40%', borderBottomLeftRadius: 0, borderTopLeftRadius: 0}]}>
                                
                                <Picker 
                                      selectedValue={uomDuration}
                                      onValueChange={(itemValue, itemIndex) => setUomDuration(itemValue)}
                                      style={{height:30, paddingTop: 0,}}
                                  >
                                      <Picker.Item label="Day" value="Day" />
                                      <Picker.Item label="Month" value="Month" />
                                      <Picker.Item label="Year" value="Year" />
                                </Picker>
                              </View>
                            </View>
                            
                            <Text style={styles.labelText}>Area Chartering</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : Jakarta"
                                autoCorrect={false}
                                onChangeText={setArea}
                                value={area}
                            />
                            </>
                            }
                            { charterType =='Freight' && 
                            <>
                              <Text style={styles.labelText}>Port Of Loading</Text>
                              <TextInput
                                style={styles.inputFields}
                                placeholder=""
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={setPortLoading}
                                value={portLoading}
                              />    
                              <Text style={styles.labelText}>Port Of Discharging</Text>
                              <TextInput
                                style={styles.inputFields}
                                placeholder=""
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={setPortDischarging}
                                value={portDischarging}
                              />    
                              <Text style={styles.labelText}>Quantity</Text>
                              <TextInput
                                style={styles.inputFieldsDim}
                                placeholder="in Tons/Cubics"
                                autoCorrect={false}
                                onChangeText={setQty}
                                value={qty}
                              />
                            </>
                            }
                            <TouchableOpacity 
                                style={styles.btnSubmit} 
                                onPress={onSubmitHandler}>
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

export default DaftarChartering

const styles = StyleSheet.create({
    imgUpload: {
      width: 250, 
      height: 200,
      margin: 10,
      borderStyle: 'solid',
      borderWidth: 1 ,
      borderColor: 'gray'
    },
    datePickerStyle: {
        width: '95%',
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'NunitoSans_200ExtraLight',
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 7
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
      color: '#000',
      width: '90%',
      backgroundColor: '#fff',
      textAlign: 'left',
    },
    inputFields: {
        fontFamily: 'NunitoSans_200ExtraLight',
        borderColor: '#a6a6a6',
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#000',
        width: '90%',
        backgroundColor: '#fff',
        textAlign: 'left',
      },
    inputFieldsDuration: {
        fontFamily: 'NunitoSans_200ExtraLight',
        borderColor: '#a6a6a6',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 1,
        padding: 15,
        marginBottom: 15,
        height: 50,
        fontSize: 16,
        color: '#000',
        width: '60%',
        backgroundColor: '#fff',
        textAlign: 'left',
        alignItems: 'flex-start'
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
        color: '#40d5f0',
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
