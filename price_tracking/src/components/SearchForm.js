//can also use pressable for buttons
import {Text, View, StyleSheet, TextInput, Button, Pressable} from 'react-native'
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Feather} from '@expo/vector-icons';


export default function SearchForm({onSearch}) {

    //use state varoable will re render component when the variable changes; smart variable that makes application "reactive"
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departDate, setDepart] = useState(new Date());
    const [returnDate, setReturn] = useState(new Date());

    const onSearchPress = () => {
        onSearch({from, to, departDate, returnDate})
    };

    return (
      <View style={styles.card}>
        <Text style={styles.title}>
          {" "}
          Search the best flight prices for your next trip!
        </Text>

        <TextInput
          value={from}
          onChangeText={setFrom}
          placeholder="From"
          styles={styles.input}
        />
        <TextInput
          value={to}
          onChangeText={setTo}
          placeholder="To"
          styles={styles.input}
        />

        <View style={styles.datePicker}>

            <Feather name="calendar" size = {24} color = 'black'/>
          <DateTimePicker
            value={departDate}
            onChange={(event, date) => setDepart(date || newDate)}
            minimumDate={new Date()}
          />

          <Text style={{fontSize:25, color: 'gainsboro', marginLeft: 5}}> |</Text>
          <DateTimePicker
            value={returnDate}
            onChange={(event, date) => setReturn(date || newDate)}
            minimumDate={departDate}
          />
        </View>

        <Button title="Search" onPress={onSearchPress} />
      </View>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,

    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  title: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,

    flexDirection: 'row',
    alignItems: 'cemter',
  },
});