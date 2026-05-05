import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Oi Fernando!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}


