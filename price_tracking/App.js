import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import SearchForm from './src/components/SearchForm';
import LinearGradient from 'expo-linear-gradient'
import data from './data';
import FlightOptionItem from './src/components/FlightPriceOption';

const option1 = data[0];

export default function App() {
  return (
    <View style={styles.container}>

      <SafeAreaView>
        <SearchForm />

        <FlatList data={data} renderItem={({item})=> <FlightOptionItem flight = {item}/>} showsVerticalScrollIndicator={false}/>
      </SafeAreaView>

      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
