import React, { useState,useMemo, useEffect } from 'react'
import { 
    Text,
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity, 
    Alert} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PUTIH } from '../../utils/constans';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Center, FormControl, Input, Modal,Button, NativeBaseProvider } from 'native-base';
import { API_URL } from '../../utils/constans';
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import axios from 'axios';

const ScheduleMeet = ({navigation, route}) => {
    const params= route.params.item;
    const reschedule = route.params.reschedule;
    const [eventTitle, setEventTile] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('00:00');
    const [open, setOpen] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [dateValue, setdateValue] = useState('');
    const [login, setLogin] = useState([]);

    useEffect(() => {
       console.log('reschedule', reschedule)
      }, []);
    
    useMemo(() => {
        AsyncStorage.getItem('loginData', (error, result) => {
            if (result) {
              let resultParsed = JSON.parse(result);
              setLogin(resultParsed);
            }
        });
    }, []);

    const createEvent = () =>{
        let permissions;
        const newDate = moment(date ).add(120,'minutes').format('yyyy-MM-DD HH:mm');

        const payloads = {
            name : eventTitle,
            description : eventDesc,
            location: eventLocation,
            start_date: date.replace(/\//g,"-"),
            end_date: newDate,
            kode_pengajuan_2: params.kode_pengajuan,
            email: login['email'],
            reschedule: reschedule
          };
         
        console.log(payloads);

        axios.post(`${API_URL}/api/buat_jadwal`, 
        JSON.stringify(payloads)
        , {
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            Alert.alert(
                "Janji Sukses Dibuat",
                "Menunggu konfirmasi client.. Silahkan refresh halaman",
                [
                  { text: "OK", onPress: () => navigation.navigate('ListSurvey') }
                ]
            )
            
        })
        .catch(err => console.log(err));

        
  
    }
  
    // const onChange = (event, selectedDate) => {
    //     console.log(selectedDate)
    //     var currentdate = new Date(selectedDate);
    //               var datetime =
    //                 +currentdate.getDate() +
    //                 '/' +
    //                 (currentdate.getMonth() + 1) +
    //                 '/' +
    //                 currentdate.getFullYear() +
    //                 ' - ' +
    //                 currentdate.getHours() +
    //                 ':' +
    //                 currentdate.getMinutes();

    //               setOpen(false);
    //               setDate(date);
    //               setdateValue(datetime.toString());
    // };

    return (
        <View style={styles.container}>
            <ScrollView>
                <StatusBar
                    animated={true}
                    backgroundColor="#61dafb"
                    barStyle='light-content'
                    showHideTransition='fade'
                />
                <View style={styles.containerInput}>
                    <Text style={styles.section}> Nomor : {params.kode_pengajuan}</Text>
                    <Text style={styles.labelText}> Title</Text>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Enter Event Title"
                        value={eventTitle}
                        onChangeText={value => {
                        setEventTile(value);
                        }}
                    />
                    <Text style={styles.labelText}> Description</Text>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Enter Description"
                        value={eventDesc}
                        onChangeText={value => {
                            setEventDesc(value);
                        }}
                    />

                    <Text style={styles.labelText}> Location</Text>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Enter Event Location"
                        value={eventLocation}
                        onChangeText={value => {
                            setEventLocation(value);
                        }}
                        multiline={true}
                        numberOfLines={2}
                    />

                    <TextInput value={date} style={styles.dateInput} />
                    <TouchableOpacity
                        style={styles.btnSubmit} 
                        onPress={() => setOpen(true)}>
                        <Text style={{color: '#fff'}}>Select Date</Text>
                    </TouchableOpacity>
                    {open && (
                        // <DateTimePicker
                        //     testID="tanggal"
                        //     mode='date'
                        //     value={date}
                        //     onChange={onChange}
                        //     is24Hour={true}
                        //     display='calendar'
                        //     minimumDate={new Date()}
                        // />
                        <DatePicker
                            onSelectedChange={date => setDate(date)}
                            selected={getFormatedDate(new Date(), 'YYYY-MM-DD')}
                        />
                    )}
                    

                    <TouchableOpacity
                        style={styles.btnSubmit2} 
                        onPress={()=>createEvent()}
                    >
                        <Text> Save Event </Text>
                    </TouchableOpacity>
                </View>
                
                
                
                
            </ScrollView>
        </View>
    )
}

export default ScheduleMeet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4fc',
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
    btnSubmit2: {
        width: '90%',
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 15,
        height: 50,
        padding: 15,
        borderColor: '#000',
        color:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInput: {
        flex: 1.3,
        alignItems: 'center',
        width: '100%',
        paddingTop: 20
      },
    
    singleElement: {
        display: 'flex',
        flex: 4,
        flexDirection: 'column',
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
    labelText: {
        textAlign: 'left',
        alignItems: 'flex-start',
        width: '95%',
        paddingLeft: 15,
        paddingBottom: 7,
        fontSize: 16,
        fontFamily: 'NunitoSans_200ExtraLight',
    },
    
    textInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 1,
    },
    
    dateInputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        marginBottom: 1,
        margin: 2,
    },
    
    dateIcon: {
        padding: 10,
    },
})
