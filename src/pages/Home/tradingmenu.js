import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SemuaChat from '../Chat/semua';
import Chartering from '../Chartering';
import ListHomeTrading from '../Trading/listhome';
import ListChartering from '../Chartering/listChartering';

const Tab = createMaterialTopTabNavigator();
const MenuTradingChartering = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Trading" component={ListHomeTrading}  />
            <Tab.Screen name="Chartering" component={ListChartering}  />
        </Tab.Navigator>
    )
}

export default MenuTradingChartering

const styles = StyleSheet.create({})
