import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import SearchForm from './src/components/SearchForm';
import LinearGradient from 'expo-linear-gradient'
import dummyData from './data';
import FlightOptionItem from './src/components/FlightPriceOption';

const option1 = dummyData[0];

export default function App() {

  const [items, setItems] = useState([]);
  const onSearch = (data) => {
    console.log(data)

    //get items from the backend

    setItems(data);
  }

  return (
    <View style={styles.container}>

      <SafeAreaView>

      {/* when the user presses the search button, we update the items state variables with the flights and put them in the flatlist */}
        <SearchForm onSearch ={onSearch}/>

        <FlatList data={items} renderItem={({item})=> <FlightOptionItem flight = {item}/>} showsVerticalScrollIndicator={false}/>
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
