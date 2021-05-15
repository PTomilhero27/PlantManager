import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { color } from 'react-native-reanimated';
import userImage from '../assets/pedro.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Header() {

  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function  LoadStorageUserName() {
    const user = await AsyncStorage.getItem('@plantManager:user');
    setUserName(user || '');
    }
    LoadStorageUserName()

  }, [])

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.greeting}>Ola,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image source={userImage} style={styles.image} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 80,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  }
})