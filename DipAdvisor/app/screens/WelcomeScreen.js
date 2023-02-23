import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';



function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground 
          style={styles.background}
          source={require("../assets/WelcomeScreenImg.jpg")}
        >
            <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/React-icon.png")} />
            <Text style={styles.companyName}>DipAdvisor</Text>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
              <View>
                <Text style={styles.loginText}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('SignUpScreen')}>
            <View>
                <Text style={styles.signupText}>SignUp</Text>
            </View>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    loginButton: {
        width: '80%',
        height: 70,
        backgroundColor: "#fc5c65",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    registerButton: {
        width: '80%',
        height: 70,
        backgroundColor: "#4ecdc4",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginBottom: 150,
    },
    logo: {
        width: 150,
        height: 130,
        color: 'black'
    },
    logoContainer: {
        alignItems: 'center',
        position: "absolute",
        top: 70,
    },
    companyName: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    signupText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default WelcomeScreen;