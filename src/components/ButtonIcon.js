import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const ButtonIcon = ({ onPress, title, style }) => (
  <TouchableOpacity onPress={onPress} style={[style]}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default ButtonIcon;