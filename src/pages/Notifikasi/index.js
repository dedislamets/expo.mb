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
import { Center, FormControl, Input, Modal,Button, NativeBaseProvider } from 'native-base';
import { useState } from 'react';

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
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Text style={[styles.itemText]}>{item.text}</Text>
                        </View>
                    </View>
                    
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.itemTahun}>{item.waktu}</Text>
                    </View>
                    
                </View>
                
            </View>
        </View>
    );
  };
const ListNotifikasi = ({navigation}) => {
    let [fontsLoaded, error] = useFonts({ 
        NunitoSans_200ExtraLight,
        NunitoSans_400Regular,
        NunitoSans_700Bold
      })
    const [showModal, setShowModal] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        onPress={() => setShowModal(true)}>
                            <ListItem item={item} />
                            <NativeBaseProvider>
                                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                    <Modal.Content maxWidth="400px">
                                        <Modal.Body>
                                            <View >
                                                <View style={{  alignItems: 'center', paddingTop: 30, paddingBottom: 10}}>
                                                    <Text style={[styles.itemText,{textAlign: 'center'}]}>Survey Ditolak pada tanggal</Text>
                                                    <Text>04 November 2021</Text>
                                                </View>
                                                <View style={styles.listColumn}>
                                                    <View style={styles.listRow}>
                                                        <View style={[styles.colItem, {marginHorizontal: 10}]}>     
                                                            <View style={[styles.productCardThumb]}>
                                                                <Image
                                                                    source={{ uri : "https://images.pexels.com/photos/799871/pexels-photo-799871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }}
                                                                    style={[styles.itemPhotoComment]}
                                                                />
                                                            </View>
                                                            
                                                        </View>
                                                        <View style={styles.productCardContent}>
                                                            <View style={{flexDirection:'row'}}>
                                                                <View>
                                                                    <Text style={[styles.itemText]}>Kapal Cargo </Text>
                                                                </View>
                                                            </View>
                                                            
                                                            <View style={{flexDirection:'row'}}>
                                                                <Text style={styles.itemTahun}>600.000.000</Text>
                                                            </View>
                                                            
                                                        </View>
                                                        
                                                    </View>
                                                </View>
                                                <View style={styles.listComment}>
                                                    <View style={styles.listRow}>
                                                        <Text style={{color: '#a9a9a9'}}>Ubah tanggal surveimu</Text>
                                                    </View>
                                                </View>
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
        </SafeAreaView>
    )
}

export default ListNotifikasi

const SECTIONS = [
    {
      title: 'List Notifikasi',
      horizontal: true,
      data: [
        {
          key: '1',
          text: 'Iklan anda perlu diperbaiki: Foto Iklan perlu diperbaiki',
          uri: 'https://images.pexels.com/photos/799871/pexels-photo-799871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          waktu: '1 hari yang lalu'
        },
        {
          key: '2',
          text: 'Survei ditolak penjual',
          uri: 'https://images.pexels.com/photos/7306966/pexels-photo-7306966.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          waktu: '1 hari yang lalu'
        },
        {
            key: '3',
            text: 'Selamat Iklan anda sudah tayang! Judul : Kapal Kargo',
            uri: 'https://images.pexels.com/photos/8417259/pexels-photo-8417259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            waktu: '2 hari yang lalu'
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
        borderColor: '#fff',
        borderWidth: 0.5,
        marginTop:5,
        marginBottom: 5,
        marginHorizontal:10,
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
        flexBasis: 60,
        overflow: 'hidden',
        borderRadius: 10,
        marginHorizontal: -6,
    },
})
