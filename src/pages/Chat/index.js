import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chartering from '../Chartering';
import Shipyards from '../Shipyards';
import SemuaChat from './semua';

const Tab = createMaterialTopTabNavigator();
const ListChat = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Semua" component={SemuaChat}  />
            <Tab.Screen name="Membeli" component={Chartering}  />
            <Tab.Screen name="Menjual" component={Shipyards}  />
        </Tab.Navigator>
    )
}

export default ListChat

const styles = StyleSheet.create({})
