import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function HomeScreen(props) {
    return (
        <View style={styles.background}>
            <Text>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeScreen;