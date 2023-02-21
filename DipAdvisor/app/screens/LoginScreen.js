import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';

function LoginScreen({ navigation }) {

    const handleLogin = (values) => {
        if (values.username === 'Admin' && values.isChecked === true) {
            console.log('hello')
            navigation.navigate('HomeScreen')
        }
    }


    return (
        <ImageBackground
          style={styles.background}
          source={require("../assets/WelcomeScreenImg.jpg")}
          >
            <Formik initialValues={{ username: '', password: '', isChecked: false }} onSubmit={(values) => {handleLogin(values)}}>
              {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <View style={styles.loginContainer}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                       style={styles.usernameInput}
                       placeholder={'Admin'}
                       onChangeText={handleChange('username')}
                       onBlur={handleBlur('username')}
                       value={values.username}
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                       style={styles.passwordInput}
                       placeholder={'Not required at this time'}
                       secureTextEntry
                       onChangeText={handleChange('password')}
                       onBlur={handleBlur('password')}
                       value={values.password}
                    />
                    <Text style={styles.disclaimer}>By using this App, the user agrees to indemnify and hold harmless the App and its developers, affiliates, and partners from any claims, damages, or expenses arising out of or in connection with the use of the information provided.</Text>
                    <CheckBox
                      style={styles.checkbox}
                      title="Accept terms & conditions"
                      checked={values.isChecked}
                      onPress={() => setFieldValue("isChecked", !values.isChecked)}
                    />
                    <Button style={styles.button} onPress={handleSubmit} title="Log In" />
                </View>
              )}
            </Formik>
        </ImageBackground>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    loginContainer: {
        borderRadius: 8,
        width: '80%',
        height: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 110,
    },
    usernameInput: {
        height: 40,
        width: '100%',
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    passwordInput: {
        height: 40,
        width: '100%',
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 20,
      },
    button: {
        marginTop: 20,
    },
    disclaimer: {
        backgroundColor: 'white',
        marginBottom: 10,
        // marginTop: 50,
    },
})