import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StocksCard = ({Symbol, LTPAmount, Quantity, PLAmount}) => {
  return (
    <View style={[styles.container, styles.bottomBorder]}>
      <View style={styles.textLayout}>
        <Text style={styles.label}>{Symbol}</Text>
        <Text style={styles.value}>LTP : ₹ {LTPAmount}</Text>
      </View>
      <View style={styles.textLayout}>
        <Text style={styles.value}>{Quantity}</Text>
        <Text style={styles.value}>P/L : ₹ {PLAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  textLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  bottomBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});

export default StocksCard;
