import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class LayoutTest_2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usr: '',
      pwd: '',
    }
  }
  render() {
    return (
      <View style={styles.viewLayout}>
        <View style={styles.list}>
          <View style={styles.wrapTextView}>
            <Text style={styles.listText}>用  户  名：</Text>
          </View>
          <TextInput
            style={styles.listInput}
            value={this.state.usr}
            onChangeText={usr => this.setState({usr})}
          />
        </View>
        <View style={styles.list}>
          <View style={styles.wrapTextView}>
            <Text style={styles.listText}>用户密码：</Text>
          </View>
          <TextInput
            style={styles.listInput}
            value={this.state.pwd}
            onChangeText={pwd => this.setState({pwd})}
          />
        </View>
        <View style={styles.list}>
          <View style={styles.wrapTextView}>
            <View style={styles.checkBar}></View>
            <Text style={styles.rememberpsd}>记住密码</Text>
          </View>
          <TouchableOpacity style={styles.textAuto} activeOpacity={0.3} focusedOpacity={0.5}>
            <Text style={styles.button}>登陆</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewLayout: {
    marginLeft: 20,
    marginRight: 20,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  wrapTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: {
    fontSize: 18,
    color: '#333',
    width: 100,
    textAlign: 'justify',
  },
  listInput: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 18,
    color: '#333',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  checkBar: {
    width: 30,
    height: 30,
    marginLeft: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  rememberpsd: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    fontSize: 18,
    color: '#333',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#ddd',
  }
})