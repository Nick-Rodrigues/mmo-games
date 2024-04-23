import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import { ScreenContent } from 'components/ScreenContent';
import { RootStackParamList } from '../navigation';

type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function Details() {
  const router = useRoute();

  return (
    <View style={styles.container}>
      <Text>{router.params.gamesDetails.short_description}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
