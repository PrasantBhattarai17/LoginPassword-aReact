import { StyleSheet, Text, ScrollView } from 'react-native';
import Body from './src/components/Body';

export default function App() {
  return (
    <ScrollView style={styles.container}>
    <Body/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'antiquewhite',
    width:380
  },
});
