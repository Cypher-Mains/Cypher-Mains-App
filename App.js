import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AuthenticateBTN from './components/Authenticate.js';
import Newauth from './components/Newauth.js';


export default function App() {
  return (
    <>
      {/* <ScrollView style={styles.container} > */}

            {/* <Header /> */}
            
            {/* <Body /> */}
            <AuthenticateBTN />
            {/* <Newauth /> */}
            {/* <QR /> */}
            
            <StatusBar hidden = {false}/>

      {/* </ScrollView> */}
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(191, 255, 240, 1)',
  },
});
