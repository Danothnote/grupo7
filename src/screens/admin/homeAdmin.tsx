import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface HomeAdminProps {}

const HomeAdmin = (props: HomeAdminProps) => {
  return (
    <View style={styles.container}>
      <Text>HomeAdmin</Text>
    </View>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  container: {}
});
