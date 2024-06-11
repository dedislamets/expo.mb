import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native'

import contactData from './contact.json'

import Profile from './Profile'

const Akun = (props) => {
  return <Profile {...contactData} {...props} />
}

Akun.navigationOptions = () => ({
  header: null,
})

Akun.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default Akun