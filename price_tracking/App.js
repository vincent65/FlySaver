import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import SearchForm from './src/components/SearchForm';
import LinearGradient from 'expo-linear-gradient'
import dummyData from './data';
import FlightOptionItem from './src/components/FlightPriceOption';
import { searchflights } from './src/services/api';

const option1 = dummyData[0];

export default function App() {

  const [items, setItems] = useState([]);


  const onSearch = async (data) => {
    setLoading(true);
    setItems([]);

    //get items from the backend
    const response = await searchflights(data);
    if(response.error) {
      Alert.alert(response.error);
    }
    else{
      setItems(response.data);
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>

      <SafeAreaView>

      {/* when the user presses the search button, we update the items state variables with the flights and put them in the flatlist */}
        <SearchForm onSearch ={onSearch}/>

        
        {loading && (
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <ActivityIndicator />
            <Text> Searching for the best prices...</Text>
          </View>
        )}

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
