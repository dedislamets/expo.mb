import React from 'react'
import { StyleSheet, Text, View,SafeAreaView, FlatList, SectionList, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
    useFonts,
    NunitoSans_200ExtraLight,
    NunitoSans_400Regular ,
    NunitoSans_700Bold
  } from '@expo-google-fonts/nunito-sans';
import { PUTIH } from '../../utils/constans';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = ({ item }) => {
    return (
        <View style={styles.listColumn}>
            <View style={styles.listRow}>
                <View style={[styles.colItem, {marginHorizontal: 10}]}>     
                    <View style={[styles.productCardThumb]}>
                        <Image
                            source={{
                                uri: item.uri,
                            }}
                            style={[styles.itemPhoto]}
                        />
                    </View>
                    
                </View>
                <View style={styles.productCardContent}>
                    <View style={{flexDirection:'row', marginBottom: 0, position: 'relative'}}>
                        <View style={{width: '55%'}}>
                            <Text style={[styles.itemText]}>{item.text}</Text>
                        </View>
                        <View style={{width: 115, top:0, alignItems: 'flex-end'}}>
                            <Text style={[styles.itemStatus ]}>{item.waktu}</Text>
                        </View>
                    </View>
                    
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.itemTahun}>{item.chat}</Text>
                    </View>
                    
                </View>
                
            </View>
        </View>
    );
  };
const SemuaChat = ({navigation}) => {
    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({ section, index }) => (
                <View key={index} style={styles.colItem}>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={section.data}
                        renderItem={({ item }) =>
                        <TouchableOpacity  
                        containerStyle={styles.productCardContainer}
                        style={styles.productCard}
                        onPress={() => navigation.navigate("IsiChat")} >
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
    )
}

export default SemuaChat

const SECTIONS = [
    {
      title: 'Kapal Terbaru',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Kapal Angkat Berat Tongkang',
          uri: 'https://images.pexels.com/photos/799871/pexels-photo-799871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          chat: 'Gimana gan yang kemarin ?',
          waktu: 'Kemarin'
        },
        {
          key: '2',
          text: 'Kapal Kargo 1 Ton muatan',
          uri: 'https://images.pexels.com/photos/7306966/pexels-photo-7306966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          chat: 'Kapan bisa survey??',
          waktu: '12 Sept 2021'
        },
        {
            key: '3',
            text: 'Kapal Tongkang',
            uri: 'https://images.pexels.com/photos/8417259/pexels-photo-8417259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            chat: 'Saya tertarik iklan anda',
            waktu: '12 Sept 2021'
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
    },
    itemPhoto: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    colItem: {
        flexBasis: 60,
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: -6,
    },
})
