import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Alert
} from 'react-native';
import { connect, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setLoginState from '../../redux/action'
import { API_URL } from '../../utils/constans';
import OneSignal from 'react-native-onesignal';

const Loginto = ({navigation}) => {
    const loginReducer = useSelector((state) => state.loginReducer)
    // const data_push = OneSignal.getDeviceState();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    useEffect(()=>{
      // alert(JSON.stringify(data_push));
    },[])

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onSubmitHandler = () => {
      if (!password.trim() || !email.trim()) {
        setIsError(true);
        setMessage("Password or Email required");
        return;
      }
      const payloads = {
        email : email,
        password : password
      };
      
      fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloads),
      })
      .then(async res => { 
          try {
            const jsonRes = await res.json();
            if (res.status !== 200) {
                setIsError(true);
                setMessage(jsonRes.message);
            } else {
              setIsError(false);
              if(jsonRes.status == false){
                setIsError(true);
                setMessage(jsonRes.message);
              }else{
                // const payloads_push = {
                //   email : email,
                //   device : null,
                //   player_id : player_id
                // };

                // fetch(`${API_URL}/api/onesignal`, {
                //   method: 'POST',
                //   headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json',
                //   },
                //   body: JSON.stringify(payloads_push),
                // }).then(async res => res);

                // setMessage(jsonRes.message);
                const o = { ...jsonRes['data'][0] };
                setLoginLocal(o); 
                navigation.navigate('MyTabNavigator', { screen: 'ActivityTab' })
              }
              
            }
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    const setLoginLocal = async (loginData) => {
      try {
        await AsyncStorage.setItem('loginData', JSON.stringify(loginData));
      } catch (err) {
        console.log(err);
      }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container}>            
                <View style={styles.containerLogo}>
                    
                    <Image 
                    style={styles.imgLogo} 
                    source={require('../../assets/logo.png')} />
                    <Text 
                      style={styles.titleLogin}>Marine Business
                    </Text>
                </View>
                <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                <View style={styles.containerInput}>
                    <TextInput
                    style={styles.inputFields}
                    placeholder="Email Address"
                    autoCorrect={false}
                    onChangeText={setEmail}
                    // value={loginReducer.name}
                    />
                    <TextInput
                    style={styles.inputFields}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCorrect={false}
                    onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                    style={styles.btnSubmit} 
                    // onPress={() => navigation.navigate('MyTabNavigator', { screen: 'ActivityTab' })}
                    onPress={onSubmitHandler}
                    >
                    <Text 
                        style={styles.btnText}>Login
                    </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.btnRecover} 
                        onPress={() => navigation.navigate('RecoverPassword')}>
                    <Text 
                        style={styles.textForgotPassword}>Lupa Password?
                    </Text>
                    </TouchableOpacity>
                    
                    <Text 
                    style={styles.register}> Atau daftar lebih cepat dengan
                    </Text>

                    <View style={styles.containerIcons}>
                    <Image
                        style={styles.iconsRegister}
                        source={require('../../assets/facebook.png')}
                    />
                    <Image
                        style={styles.iconsRegister}
                        source={require('../../assets/google.png')}
                    />
                  
                    </View>

                    <View style={styles.createAccount}>
                    <Text 
                        style={styles.btnRegister}>Belum punya akun?
                    </Text>
                    <TouchableOpacity 
                        style={styles.btnRegister} 
                        onPress={() => navigation.navigate('Register')}>
                        <Text 
                        style={styles.btnRegisterText}>Daftar sekarang
                        </Text>
                    </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Loginto

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    marginVertical: '5%',
  },
  imgLogo: {
    width: 150,
    height: 150
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    flex: 1.3,
    alignItems: 'center',
    width: '95%',
  },
  inputFields: {
    borderColor: '#40d5f0',
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    marginBottom: 15,
    height: 50,
    fontSize: 18,
    color: '#40d5f0',
    width: '90%',
    backgroundColor: '#fff',
    textAlign: 'left',
  },
  btnSubmit: {
    width: '90%',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 50,
    padding: 15,
    borderColor: '#fff',
    backgroundColor: '#40d5f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  btnRegister: {
    marginTop: 5,
    color: '#a6a6a6',
  },
  btnRegisterText: {
    fontSize: 14,
    color: '#FF8C00',
    fontWeight: '500',
    alignSelf: 'center',
  },
  titleLogin: {
    marginTop: 10,
    color: '#40d5f0',
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
  },
  register: {
    color: '#a6a6a6',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  containerIcons: {
    flexDirection: 'row',
    flex: 1,
  },
  iconsRegister: {
    margin: 8,
  },
  textForgotPassword: {
    color:'#ff8c00',
    fontSize: 14,
  },
  createAccount: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  btnRecover: {
    marginBottom: 10,
  },
});