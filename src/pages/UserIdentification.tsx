import content from '*.png';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image
} from 'react-native';

import { Button } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { TextInputMask } from 'react-native-masked-text';
import BrasilianFlag from '../assets/brazilflag.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function UserIdentification() {


  const navigation = useNavigation();
  async function handleSubmit() {

    if (!name) {
      return Alert.alert("Como posso chamar você ? 😢")
    }
    try {
      await AsyncStorage.setItem('@plantManager:user', name);
      navigation.navigate('Confirmation')
    } catch {
      Alert.alert("Não foi possível salvar seu nome 😢")
    }

  }

  const [maskedPhoneValue, setMaskedPhoneValue] = useState("");
  const [phoneMaskRef, setPhoneMaskRef] = useState("");


  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }
  function handleInputFocus() {
    setIsFocused(true)
  }


  function handleTextChange(text: string) {
    setMaskedPhoneValue(text);
    setIsFilled(!!text);
    setName(text)
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isFilled ? '😄' : '😃'}
                </Text>

                <Text style={styles.title}>
                  Informe o {'\n'}
                  Seu Login!
          </Text>
              </View>
              <View style={styles.inputContainer}>
                <Image
                  source={BrasilianFlag}
                  style={{ width: 28, height: 19, marginHorizontal: 10 }}
                  resizeMode="contain"
                />
                <Text >
                  +55
              </Text>
                <TextInputMask
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) ",
                  }}
                  value={maskedPhoneValue}
                  placeholder="(XX) XXXXX-XXXX"
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onChangeText={(text) => handleTextChange(text)}
                  style={[styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },]}
                />


              </View>

              <TextInput

                style={[styles.input,
                { backgroundColor: '#fafafa', margin: 8, textAlign: 'right', paddingHorizontal: 18 }]}
                placeholder="Digite Sua Senha"

              />

              <View style={styles.checkBoxContainer}>
                <TouchableOpacity style={styles.checkBox}>

                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <Button
                  title="Confirmar"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    color: colors.heading,
    borderRadius: 9,
    width: '100%',
    fontSize: 18,
    marginHorizontal: 25,
    height: 55,

  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#fafafa',
  },
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 80,
    width: '100%',
    paddingLeft: 2,
  },
  checkBox: {

    width: 20,
    height: 20,

    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }

})