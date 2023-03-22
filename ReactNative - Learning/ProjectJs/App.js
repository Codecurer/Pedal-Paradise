import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Header from './components/Header';

const App = () => {
  const [name, setName] = useState('Meet');

  const fruitShop = () => {
    setName('Meets Kalariya');
  };
  return (
    <View>
      <Header />
      <Text style={{fontSize: 50}}>Welcome to my market</Text>
      <Text style={{fontSize: 30}}>Wow Shampoo</Text>
      <Text style={customeStyle.title}>My Name is : {name}</Text>
      <Button title="Buy me"></Button>
      <Button
        title="Press me"
        onPress={() => fruitShop()}
        color={'red'}></Button>
      <UserProfile name={name}/>
    </View>
  );
};

const UserProfile = (props) => {
  const {name} = props;
  return (
    <View>
      <Button
        title={name}
        color={'green'}></Button>
    </View>
  );
};

const customeStyle = StyleSheet.create({
  title:{
    color:'white',
    backgroundColor:'red',
    fontWeight:'bold',
    fontSize:50,
  }
})

export default App;
