import React,{ useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, Button, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Image, SafeAreaView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import ButtonIcon from '../../components/ButtonIcon';
import { PUTIH } from '../../utils/constans';
import { Picker } from "native-base";
// import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans'

const { width, height } = Dimensions.get("screen");
const DaftarTransportation = () => {
    const [date, setDate] = useState('09-10-2022');
    const [selectedValue, setSelectedValue] = useState("Freight");
    const [selectedValueVessel, setSelectedValueVessel] = useState("Tanker");

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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView >
                        <View style={styles.containerInput}>
                            <Text style={styles.section}>Spesification</Text>
                            <Text style={styles.labelText}>Chartering Type</Text>
                            <View
                               style={styles.inputFieldsSelect}>
                                <Picker 
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    style={{height:30, paddingTop: 0}}
                                >
                                    <Picker.Item label="Freight Charter" value="Freight" />
                                    <Picker.Item label="Time Charter" value="Time" />
                                </Picker>
                            </View>
                            <Text style={styles.labelText}> Title</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : Kapal Roro"
                                autoCorrect={false}
                                onChangeText={() => {}}
                            />
                            <Text style={styles.labelText}>Description</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : BV + ESCORT TUG + F1F11"
                                autoCorrect={false}
                                onChangeText={() => {}}
                            />
                            <Text style={styles.labelText}>Vessel Type</Text>
                            <View
                               style={styles.inputFieldsSelect}>
                                <Picker 
                                    selectedValue={selectedValueVessel}
                                    onValueChange={(itemValue, itemIndex) => setSelectedValueVessel(itemValue)}
                                    style={{height:30, paddingTop: 0}}
                                >
                                    <Picker.Item label="Barge" value="Barge" />
                                    <Picker.Item label="Cabin Cruiser" value="Cabin" />
                                    <Picker.Item label="Tanker" value="Tanker" />
                                    <Picker.Item label="Sailbot" value="Sailbot" />
                                </Picker>
                            </View>
                            
                            <Text style={styles.labelText}>Laycan From</Text>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={date}
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
                                    setDate(date);
                                }}
                            />
                            <Text style={styles.labelText}>Laycan To</Text>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={date}
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
                                    setDate(date);
                                }}
                            />
                            <Text style={styles.labelText}>Duration</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder="Example : Tanjung Priuk"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={() => {}}
                            />
                            <Text style={styles.labelText}>Quantity</Text>
                            <TextInput
                                style={styles.inputFieldsDim}
                                placeholder="in Tons/Cubics"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={() => {}}
                            />
                            <Text style={styles.labelText}>Port Of Loading</Text>
                            <TextInput
                                style={styles.inputFields}
                                placeholder=""
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={() => {}}
                            />
                            
                            <TouchableOpacity 
                                style={styles.btnSubmit} 
                                onPress={() => navigation.navigate('MyTabNavigator', { screen: 'ActivityTab' })}>
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

export default DaftarTransportation

const styles = StyleSheet.create({
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
      color: '#40d5f0',
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
        height: 50,
        fontSize: 16,
        color: '#40d5f0',
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
