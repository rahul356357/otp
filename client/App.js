/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import SingUpForm from './components/SignUp';
import SignInForm from './components/SignIn';
import firebase from 'firebase';
export default class App extends Component {
  constructor(props){
    super(props);
    var config = {
      apiKey: "",
      authDomain: ".firebaseapp.com",
      databaseURL: ".firebaseio.com",
      projectId: "one-time-password-55947",
      storageBucket: ".appspot.com",
      messagingSenderId: ""
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <View style={styles.container}>
      <SingUpForm></SingUpForm>
      <SignInForm></SignInForm>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
