import React, { Component, useEffect } from 'react'
import {
  Switch ,
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native'
import { Icon, ListItem,Badge } from 'react-native-elements'
import PropTypes from 'prop-types'
import contactData from './contact.json'

import Posts from './Posts'
import BaseIcon from './Icon'
import Chevron from './Chevron'
import InfoText from './InfoText'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../../utils/constans'

class Profil extends Component {
  
  constructor(props){
      super(props);

      this.state = {
        pushNotifications: true,
        isLogin: false,
        nama:'',
        login: [],
        badge: {
          count :0,
          count_sign_seller: 0,
          count_sign_buyer: 0,
          count_submission: 0,
          count_meetup: 0,
          count_history: 0
        }
      }
  }


  componentDidMount() {
    AsyncStorage.getItem('loginData', (error, result) => {
      if (result) {
        let resultParsed = JSON.parse(result);
        this.setState({ isLogin: true});
        this.setState({ nama: resultParsed['nama']});
        this.setState(st =>  { return {...st, ...{login: resultParsed} }});
        this.fetchData();
      }
    });
    
  }
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    
  }

  fetchData = ()=> {
      fetch(`${API_URL}/api/badge?email=` + this.state.login['email'] + '&id=' +  this.state.login['id'] , {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then(async res => { 
          try {
            const jsonRes = await res.json();
            if (res.status == 200) {
              console.log(jsonRes)
              this.setState({ badge: jsonRes.data});
             
            } 
          } catch (err) {
              console.log(err);
          };
        })
        .catch(err => {
            console.log(err);
        });
  }
  


  onPressSetting = () => {
    this.props.navigation.navigate('Loginto')
  }
  onPressLogout = async () => {
    AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => this.props.navigation.navigate('Loginto'));
  }
  onPressSurvey = () => {
    this.props.navigation.navigate('ListSurvey')
  }
  onPressSubmission = () => {
    this.props.navigation.navigate('ListSubmission')
  }
  onPressSchedule = () => {
    this.props.navigation.navigate('ScheduleMeet')
  }
  onPressBahasa = () => {
    this.props.navigation.navigate('Bahasa')
  }
  onPressAbout = () => {
    this.props.navigation.navigate('About')
  }
  onPressPush = () => {
    this.props.navigation.navigate('Push')
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  }

  renderContactHeader = () => {
    const { avatar, name, bio } = this.props
    
    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={{uri: avatar}}
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{this.state.nama}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{bio}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10, width: '50%' }}>
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>83</Text>
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>Following</Text>
            </View>
            <View style={{ width: '50%', paddingTop:10}}>
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>40</Text>
                <Text style={{color: 'gray', fontFamily: 'NunitoSans_400Regular', textAlign: 'center'}}>Followers</Text>
            </View>
        </View>
        <View style={styles.socialRow}>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#3B5A98"
              name="facebook-with-circle"
              onPress={() => console.log('facebook')}
            />
          </View>
          <View style={styles.socialIcon}>
            <Icon
              size={30}
              type="entypo"
              color="#56ACEE"
              name="twitter-with-circle"
              onPress={() => console.log('twitter')}
            />
          </View>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#DD4C39"
              name="google--with-circle"
              onPress={() => console.log('google')}
            />
          </View>
        </View>
      </View>
    )
  }

  render() {
    
    return (
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
                {this.renderContactHeader()}
            </View>
            <InfoText text="General" />
            <View>
              { !this.state.isLogin && 
                <ListItem
                    onPress={() => this.onPressSetting()}
                    containerStyle={styles.listItemContainer}
                    >
                   <BaseIcon
                        containerStyle={{
                            backgroundColor: '#57DCE7',
                        }}
                        icon={{
                        type: 'material',
                        name: 'login',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>Login/Register</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron  />
                </ListItem>
                }

                { this.state.isLogin && 
                <ListItem
                    onPress={() => this.onPressLogout()}
                    containerStyle={styles.listItemContainer}
                    >
                   <BaseIcon
                        containerStyle={{
                            backgroundColor: '#57DCE7',
                        }}
                        icon={{
                        type: 'material',
                        name: 'logout',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>Logout</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron  />
                </ListItem>
                }
                <ListItem
                    onPress={() => this.onPressSurvey()}
                    containerStyle={styles.listItemContainer}
                    >
                   <BaseIcon
                        containerStyle={{
                            backgroundColor: '#57DCE7',
                        }}
                        icon={{
                        type: 'material',
                        name: 'event',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>Jadwal Survei</ListItem.Title>
                    </ListItem.Content>
                    {this.state.badge.count_meetup>0 &&
                      <Badge value={this.state.badge.count_meetup} status="error" />
                    }
                    <ListItem.Chevron  />
                </ListItem>
                <ListItem
                    onPress={() => this.onPressSubmission()}
                    containerStyle={styles.listItemContainer}
                    >
                   <BaseIcon
                        containerStyle={{
                            backgroundColor: '#57DCE7',
                        }}
                        icon={{
                        type: 'material',
                        name: 'list',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>Submission List</ListItem.Title>
                    </ListItem.Content>
                    {this.state.badge.count_submission >0 &&
                      <Badge value={this.state.badge.count_submission} status="error" />
                    }
                    <ListItem.Chevron  />
                </ListItem>
                <ListItem
                    onPress={() => this.props.navigation.navigate('Dokumen') }
                    containerStyle={styles.listItemContainer}
                    >
                    
                   <BaseIcon
                        containerStyle={{
                            backgroundColor: '#57DCE7',
                        }}
                        icon={{
                        type: 'material',
                        name: 'markunread',
                        }}
                    ></BaseIcon>
                    
                    <ListItem.Content>
                        <ListItem.Title>Sign Document Seller</ListItem.Title>
                    </ListItem.Content>
                    {this.state.badge.count_sign_seller >0 &&
                      <Badge value={this.state.badge.count_sign_seller} status="error" />
                    }
                    <ListItem.Chevron  />
                </ListItem>
                <ListItem
                    onPress={() => this.props.navigation.navigate('DokumenBuyer') }
                    containerStyle={styles.listItemContainer}
                    >
                    
                   <BaseIcon
                        containerStyle={{
                            backgroundColor: '#57DCE7',
                        }}
                        icon={{
                        type: 'material',
                        name: 'edit',
                        }}
                    ></BaseIcon>
                    
                    <ListItem.Content>
                        <ListItem.Title>Sign Document Buyer</ListItem.Title>
                    </ListItem.Content>
                    {this.state.badge.count_sign_buyer >0 &&
                      <Badge value={this.state.badge.count_sign_buyer} status="error" />
                    }
                    <ListItem.Chevron  />
                </ListItem>
                
                <ListItem
                    onPress={() => this.onPressSetting()}
                    containerStyle={styles.listItemContainer}
                    >
                   <BaseIcon
                        containerStyle={{
                            backgroundColor: '#57DCE7',
                        }}
                        icon={{
                        type: 'material',
                        name: 'history',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>Riwayat Pembelian</ListItem.Title>
                    </ListItem.Content>
                    {this.state.badge.count_history>0 &&
                      <Badge value={this.state.badge.count_history} status="error" />
                    }
                    <ListItem.Chevron  />
                </ListItem>
                {/* <ListItem
                    onPress={() => this.onPressSetting()}
                    >
                   <BaseIcon
                        containerStyle={{ backgroundColor: '#57DCE7' }}
                        icon={{
                        type: 'material',
                        name: 'favorite',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>Disukai</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron  />
                </ListItem> */}
                
                <ListItem
                    onPress={() => this.onPressBahasa()}
                    >
                   <BaseIcon
                        containerStyle={{ backgroundColor: '#57DCE7' }}
                        icon={{
                        type: 'material',
                        name: 'language',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>Bahasa</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron  />
                </ListItem>
            </View>
            <InfoText text="More" />
            <View>
                <ListItem
                    onPress={() => this.onPressAbout()}
                    containerStyle={styles.listItemContainer}
                    >
                   <BaseIcon
                        containerStyle={{ backgroundColor: '#A4C8F0' }}
                        icon={{
                        type: 'ionicon',
                        name: 'md-information-circle',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>About Us</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron  />
                </ListItem>
                <ListItem
                    onPress={() => this.onPressPush()}
                    >
                   <BaseIcon
                        containerStyle={{ backgroundColor: '#57DCE7' }}
                        icon={{
                        type: 'material',
                        name: 'favorite',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>Push Notifikasi</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron  />
                </ListItem>
            
            </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none'
  },
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 45,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    color:'#000',
    borderColor: '#ECECEC',
  },
})

export default Profil