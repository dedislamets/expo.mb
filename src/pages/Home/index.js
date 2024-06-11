import React, {Component, useEffect,useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import { FastImage } from "react-native-fast-image";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button, Image,  TouchableHighlight,SafeAreaView
  ,TextInput
  ,Icon 
  ,FlatList ,
  SectionList,
  ScrollView,
  Typography,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import {
  useFonts,
  NunitoSans_200ExtraLight,
  NunitoSans_400Regular ,
  NunitoSans_700Bold
} from '@expo-google-fonts/nunito-sans';
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../utils/constans";
import {NumericFormat} from 'react-number-format';

const ListItem = ({ item }) => {
  return (
    <View style={[styles.colItem, {marginHorizontal: 5}]}>     
        <View style={styles.productCardThumb}>
          <Image
            source={{
              uri: 'https://marinebusiness.co.id/uploads/iklan/' + item.nama_foto,
            }}
            style={styles.itemPhoto}
            // resizeMode="cover"
          />
        </View>
        <View style={[styles.productCardContent, { width: 160 }]}>
          <Text style={styles.itemText} numberOfLines={2} ellipsizeMode='head'>{item.title}</Text>
          <Text style={styles.itemTahun}>{item.year_build}</Text>
          {/* <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row', width:'100%' }}>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Text style={{color: '#8d8d8d', paddingTop: 2}}>/{item.satuan}</Text>
          </View> */}
        </View>
    </View>
  );
};

const RenderProduct = ({ item,index }) => {
  const { width } = useWindowDimensions();
  const minHeight = (width - 30 - 12) / 2;
  return (
      <View>
        <View style={styles.productCardThumb}>
          <Image source={{ uri: 'https://marinebusiness.co.id/uploads/iklan/' + item.nama_foto, }} style={[styles.productCardImage, { minHeight }]} />  
        </View>
        <View style={styles.productCardContent}>
          <Text style={styles.itemText}>{item.title}</Text>
          { item.service == 'Transportation' && 
            <>
              <Text style={styles.itemTahun}>Origin: {item.portloading}</Text>
              <Text style={styles.itemTahun}>Dest: {item.portdiscarge}</Text>
              <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row', width:'100%' }}>
                <NumericFormat 
                  value={item.price}
                  style={styles.itemPrice}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp'}
                  renderText={(value, props) => <Text style={styles.itemPrice} {...props}>{value}</Text>}
                />
              </View>
            </>
          }
          { item.service == 'Chartering' && 
            <>
              <Text style={styles.itemTahun}>Date: {item.laycan_from} -  {item.laycan_to}</Text>
              <Text style={styles.itemTahun}>Area: {item.area}</Text>
              <Text style={styles.itemTahun}>Duration: {item.duration}  {item.duration_uom}</Text>
              <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row', width:'100%' }}>
              <NumericFormat
                  value={item.price_charter}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp'}
                  renderText={(value, props) => <Text style={styles.itemPrice} {...props}>{value}</Text>}
                />
              </View>
            </>
          }
          
        </View>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Kapal Terbaru',
    horizontal: true,
    data: [
      {
        id: '1',
        title: 'Kapal ANgkat Berat',
        uri: 'https://images.pexels.com/photos/799871/pexels-photo-799871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 'Rp 25.000.000',
        year_build: '1994',

      },
      {
        id: '2',
        title: 'Kapal Kargo',
        uri: 'https://images.pexels.com/photos/7306966/pexels-photo-7306966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        year_build: '1994',
        price: 'Rp 25.000.000',
      },

      {
        id: '3',
        title: 'Kapal Tongkang',
        uri: 'https://images.pexels.com/photos/8417259/pexels-photo-8417259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        year_build: '1994',
        price: 'Rp 25.000.000',
      }
    ],
  },
  
];
const SECTIONS_PRODUK = [
  {
    title: 'Sewa Kapal',
    data: [
      {
        key: '1',
        text: 'Kapal Bulk Carrier',
        uri: 'https://images.pexels.com/photos/799871/pexels-photo-799871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        tahun: '1994',
        price: 'Rp 25.000.000',
        satuan: 'Hari'
      },
      {
        key: '2',
        text: 'Kapal Floating Production',
        uri: 'https://images.pexels.com/photos/7306966/pexels-photo-7306966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        tahun: '1994',
        price: 'Rp 25.000.000',
        satuan: 'Hari'
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://images.pexels.com/photos/8417259/pexels-photo-8417259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        tahun: '1994',
        price: 'Rp 25.000.000',
        satuan: 'Hari'
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://images.pexels.com/photos/8444333/pexels-photo-8444333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        tahun: '1994',
        price: 'Rp 25.000.000',
        satuan: 'Hari'
      }
    ],
  },
  {
    title: 'Pengiriman',
    data: [
      {
        key: '6',
        text: 'Kapal Bulk Carrier',
        uri: 'https://images.pexels.com/photos/8444333/pexels-photo-8444333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        tahun: 'Tanjung Mas - Sunda Kelapa',
        price: 'Rp 25.000.000',
        satuan: 'Kg'
      },
      {
        key: '7',
        text: 'Item text 7',
        uri: 'https://images.pexels.com/photos/6877762/pexels-photo-6877762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        tahun: 'Merak - Ketapang',
        price: 'Rp 25.000.000',
        satuan: 'Kg'
      },
      {
        key: '8',
        text: 'Item text 8',
        uri: 'https://images.pexels.com/photos/7469404/pexels-photo-7469404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        tahun: 'Bakauheni - Tanjung Priuk',
        price: 'Rp 25.000.000',
        satuan: 'Kg'
      },
      {
        key: '9',
        text: 'Item text 9',
        uri: 'https://images.pexels.com/photos/8594354/pexels-photo-8594354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        tahun: 'Tanjung Priuk - Ketapang',
        price: 'Rp 25.000.000',
        satuan: 'Kg'
      }
    ],
  },
];


// export default class Home extends Component {
const Home = ({navigation}) => {

  let [fontsLoaded, error] = useFonts({ 
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular,
    NunitoSans_700Bold
  })

  const allowedState =  {
    images: [
      "https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/3840441/pexels-photo-3840441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/3840447/pexels-photo-3840447.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/1544372/pexels-photo-1544372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  ]};

  const [stateOptions, setStateValues] = useState(allowedState);

  const [loading, setLoading] = useState(true);
  const [dataKapal, setDataKapal] = useState([]);
  const [dataKapalSewa, setDataKapalSewa] = useState([]);
  const [nama, setNama] = useState('');
  
  useEffect(() => {
    console.log('Home');
    AsyncStorage.getItem('loginData', (error, result) => {
      if (result) {
        let resultParsed = JSON.parse(result)
        setNama(resultParsed['nama']);
      }
    });
    setStateValues(allowedState);
   
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/front_kapal`, {
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
                horizontal: true,
                title: jsonRes.title,
                data: []
              })
            }

            for (const key in jsonRes.data) {
              if (jsonRes.data.hasOwnProperty(key)) {
                data_get[0].data.push(jsonRes.data[key]);
              }

            }
            setDataKapal(data_get);
            setLoading(false);
          }
        } catch (err) {
        };
    })
    .catch(err => {
        console.log(err);
    });

    fetch(`${API_URL}/api/front_kapal_sewa`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(async res => { 
        try {
          const jsonSewa = await res.json();
          if (res.status == 200) {
            var data_get = [];
            for (const i in jsonSewa.content) {
              if(jsonSewa.status){
                data_get.push({
                  title: jsonSewa.content[i].title,
                  data: []
                })
              }

              for (const key in jsonSewa.content[i].data) {
                if (jsonSewa.content[i].data.hasOwnProperty(key)) {
                  data_get[i].data.push(jsonSewa.content[i].data[key]);
                }

              }
            }

            setDataKapalSewa(data_get);
          }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });

  },[dataKapal]);
  
  if (!fontsLoaded) { 
    return <AppLoading /> 
  }
  return (
   
    <SafeAreaView style={{ flex: 1 , marginTop: 20 }}>
      <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle='light-content'
          showHideTransition='fade'
      />
      <ScrollView >
        <View  style={styles.container} >
          <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '70%'}}>
              <View style={styles.signupTextCont}>
                <Text style={styles.signupText1}>{ nama }, Temukan</Text>
                <Text style={styles.signupText2}>Kapal Terbaikmu disini !</Text>
              </View>
            </View>
            <View style={{ width: '30%', alignItems: 'flex-end'}}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 10, // space from bottombar
                  height: 40,
                  width: 40,
                  right:10,
                  borderRadius: 58,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#40d5f0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity  
                  onPress={() => navigation.navigate("ListNotifikasi")} >
                    <Ionicons name="notifications" color={'#40d5f0'} size={26} />
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
          <View style={styles.inputView}>
            <Ionicons style={styles.searchIcon} name="search" color={'#40d5f0'} size={20} />
            <TextInput
              style={styles.TextInput}
              placeholder="Carii"
              placeholderTextColor="#003f5c"
            />
            <Ionicons style={styles.searchIcon} name="options" color={'#40d5f0'} size={20} />
          </View>
          <View style={styles.kontainer}>
            <View style={styles.itemss} >
              <TouchableOpacity  
                containerStyle={styles.productCardContainer}
                style={styles.productCard}
                onPress={() => navigation.navigate("MenuTradingChartering")} >
                  <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/trading.png')}
                  />
                  <Text style={{fontFamily: 'NunitoSans_400Regular'}}>{'Trading & Chartering'}</Text>
              </TouchableOpacity>
              
            </View>
            <View style={styles.itemss}>
              <TouchableOpacity  
                containerStyle={styles.productCardContainer}
                style={styles.productCard}
                onPress={() => navigation.navigate("ListHomeTransportation")} >
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/transportation.png')}
                />
                <Text style={{fontFamily: 'NunitoSans_400Regular'}}>{'Transportation'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemss}>
              <TouchableOpacity  
                containerStyle={styles.productCardContainer}
                style={styles.productCard}
                onPress={() => navigation.navigate("ListHomeShipyard")} >
                  <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/shipyard.png')}
                  />
                  <Text style={{fontFamily: 'NunitoSans_400Regular', paddingLeft: 10}}>{'Shipyard'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemss}>
            <TouchableOpacity  
                containerStyle={styles.productCardContainer}
                style={styles.productCard}
                onPress={() => navigation.navigate("ListHomeShipyard")} >
                <Image
                  style={styles.tinyLogo}
                  source={require('../../assets/news.png')}
                />
                <Text style={{fontFamily: 'NunitoSans_400Regular'}}>{'News'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <SliderBox
            ImageComponent={FastImage}
            paginationBoxVerticalPadding={0}
            paginationBoxStyle={{
              position: "absolute",
              bottom: -30,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10
            }}
            inactiveDotColor="#90A4AE"
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)"
            }}
            ImageComponentStyle={{
              borderRadius: 15,
              width: '95%', 
              marginTop: 5,
              alignSelf: 'flex-start'
            }}
            images={allowedState.images}
            autoplay
            circleLoop
          />
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={dataKapal}
            renderSectionHeader={({ section }) => (
              <>
              <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row' }}>
                <View style={{ width: '50%'}}>
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                </View>
                <View style={{ width: '50%'}}>
                  <Text style={styles.lihatsemua}>Lihat Semua</Text>
                </View>
              </View>
                {section.horizontal ? (
                  <View>
                    <FlatList
                      horizontal
                      nestedScrollEnabled={true}
                      data={section.data}
                      renderItem={({ item }) =>
                        <TouchableOpacity  
                          containerStyle={styles.productCardContainer}
                          style={styles.productCard}
                          onPress={() => navigation.navigate("Details",item)} >
                            <ListItem item={item} />
                        </TouchableOpacity>
                      }
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                ) : null}
              </>
            )}
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
            }}
          />
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={dataKapalSewa}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                <FlatList style={styles.flatlist}
                nestedScrollEnabled={true}
                numColumns={2}                
                columnWrapperStyle={styles.row}
                data={section.data}
                keyExtractor={(item, index) => item.key }
                renderItem={({ item,index }) =>
                  <View key={index} style={styles.colItem}>
                    <TouchableOpacity  
                      containerStyle={styles.productCardContainer}
                      style={styles.productCard}
                      onPress={() => navigation.navigate("Details",item)} >
                        <RenderProduct item={item} />
                    </TouchableOpacity>
                  </View>
                  }
                showsHorizontalScrollIndicator={false}
                />
              </>
            )}
            renderItem={({ item, section }) => {
              return null;
            }}
          />
        </View >
      </ScrollView>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor: '#fff',
    fontFamily: 'NunitoSans_400Regular'
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#000',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'left',
    fontFamily: 'NunitoSans_400Regular'
  },
  lihatsemua: {
    fontWeight: '800',
    fontSize: 16,
    color: '#40d5f0',
    marginBottom: 5,
    textAlign: 'right',
    marginTop: 22,
    fontFamily: 'NunitoSans_400Regular'
  },
  signupText1: {
    fontSize:18,
    fontFamily: 'NunitoSans_400Regular'
  },
  signupText2: {
    fontSize:18,
    paddingBottom:10,
    fontFamily: 'NunitoSans_400Regular'
  },
  slide: {
    borderRadius:10
  },
  inputView: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: "#fff",
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
    borderColor: '#40d5f0',
    borderWidth:2,
    fontFamily: 'NunitoSans_400Regular'
  },
 
  TextInput: {
    height: 50,
    width: "100%",
    flex: 1,
    padding: 10,
    paddingTop: 0,
    // marginLeft: 20,
    color: '#424242',
    fontFamily: 'NunitoSans_400Regular'
  },
  searchIcon: {
    padding: 10,
  },
  kontainer: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  itemss: {
    width: '25%',
    // padding:5,
    alignItems: 'center'
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 160,
    height: 140,
  },
  itemText: {
    color: '#5a5a5a',
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'NunitoSans_400Regular'
  },
  itemTahun: {
    color: '#8d8d8d',
    fontSize: 10,
    fontFamily: 'NunitoSans_400Regular'
  },
  itemPrice: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'NunitoSans_400Regular'
  },
  tinyLogo: {
    width:90,
    height:90
  },
  row: {
    // flex: 1,
    justifyContent: "space-between",
  },
  flatlist: {
    padding:0,
    margin:0
  },
  categoryImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  colItem: {
    flexBasis: '50%',
    overflow: 'hidden',
    borderRadius: 10,
    marginHorizontal: -6,
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
    paddingTop: 5,
    paddingBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderColor: '#a6a6a6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 0.5,
    marginBottom: 10,
  },

});


export default Home;