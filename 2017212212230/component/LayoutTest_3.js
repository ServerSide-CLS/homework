import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class LayoutTest_3 extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={styles.viewLayout}>
        <View style={styles.row}>
          <Image
            source={require('../image/Android.png')}
            style={styles.androidImage}
          />
          <View style={styles.justifyCenter}>
            <Text style={styles.h1}>LayoutTest</Text>
          </View>
        </View>
        <View>
          <Text style={styles.h2}>YOUR NAME</Text>
          <TextInput
            style={styles.textInput}
            placeholder='INPUT HERE'
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.textAuto} activeOpacity={0.3}>
            <Text style={styles.button}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textAuto} activeOpacity={0.3}>
            <Text style={styles.button}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewLayout: {
    marginBottom: 10,
  },
  androidImage: {
    width: 75,
    height: 75,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  h1: {
    fontSize: 32,
    color: '#333',
  },
  h2: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 18,
    color: '#333',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  textAuto: {
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
  },
  button: {
    fontSize: 18,
    color: '#333',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: '#ddd',
  },
})