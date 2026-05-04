import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Oi Fernando Tozetto!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}


