import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
// import SVGImage from 'react-native-svg-image';

export default class LayoutTest_1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  render() {
    return (
      <View style={styles.viewLayout}>
        <View style={styles.row}>
          <Image
            source={require('../image/Android.png')}
            style={styles.androidImage}
          />
          {/* <SVGImage
            source={{uri:'https://fluent-panda.appspot.com.storage.googleapis.com/dumbbell.svg'}}
            style={{ width: 50, height: 50 }}
          /> */}
          <View style={styles.justifyCenter}>
            <Text style={styles.h1}>LayoutTest</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.h2, styles.borderBottomWidth]}>please input:</Text>
        </View>
        <View>
          <TextInput
            style={[styles.text, styles.borderBottomWidth]}
            placeholder="subject"
            value={this.state.text}
            onChangeText={text => this.setState({text})}
            // autoFocus
          />
        </View>
        <View>
          <TouchableOpacity style={styles.textAuto} activeOpacity={0.3} focusedOpacity={0.5}>
            <Text style={styles.button}>Login</Text>
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
  borderBottomWidth: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#666',
  },
  text: {
    fontSize: 30,
    color: '#333',
    height: 120,
    paddingLeft: 10,
    marginBottom: 10,
  },
  textAuto: {
    alignSelf: 'flex-end',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  button: {
    fontSize: 30,
    color: '#333',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ddd',
  }
})