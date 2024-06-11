import React from 'react'
import { Platform, StyleProp, StyleSheet, View, ViewStyle, Text } from 'react-native';
import Modal, { Direction, ModalProps } from 'react-native-modal';

const BottomDrawer = ({
    title,
    titleProps,
    children,
    containerStyle,
    style,
    animationIn,
    swipeDirection = 'down',
  }) => {
    return (
        <Modal
        animationIn="slideInUp"
        swipeDirection={swipeDirection === null ? undefined : swipeDirection}
        style={[styles.container, containerStyle]}
        useNativeDriverForBackdrop
        {...props}
        >
            <View style={[
                styles.card,
                {
                paddingTop: !swipeDirection ? 24 : 0,
                },
                style
            ]}>
                {!swipeDirection ? null : (
                    <View style={[styles.dragIcon, {
                        backgroundColor: colors.gray[400],
                        marginBottom: 24,
                    }]} />
                )}

                {!title ? null : (
                    <Text style={styles.title}>{title}</Text>
                 
                )}

                {children}
            </View>
        </Modal>
    )
}

export default BottomDrawer

const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 24,
        paddingBottom: 12,
    },
    container: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    card: {
        backgroundColor: colors.palettes.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingBottom: Platform.OS === 'ios' ? 34 : 0,
    },

    dragIcon: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 24,
        width: 36,
        height: 5,
        borderRadius: 5,
    },
})
