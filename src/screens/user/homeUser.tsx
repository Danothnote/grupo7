import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface HomeUserProps {}

const HomeUser = (props: HomeUserProps) => {
  return (
    <View style={styles.container}>
      <Text>HomeUser</Text>
    </View>
  );
};

export default HomeUser;

const styles = StyleSheet.create({
  container: {}
});
