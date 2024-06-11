import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Trading from '../Trading';
import Chartering from '../Chartering';
import Shipyards from '../Shipyards';

const Tab = createMaterialTopTabNavigator();
const Iklanku = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Trading" component={Trading} 
                // options={{
                //     unmountOnBlur: true
                //   }}
            />
            <Tab.Screen name="Chartering" component={Chartering}  />
            <Tab.Screen name="Shipyards" component={Shipyards}  />
        </Tab.Navigator>
    )
}

export default Iklanku

const styles = StyleSheet.create({})
