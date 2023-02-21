import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function LoginScreen(props) {
    return (
        <View style={styles.background}>
            <Text>Login Screen</Text>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})