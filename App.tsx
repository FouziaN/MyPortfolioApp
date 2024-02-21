import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, FlatList} from 'react-native';
import axios from 'axios';
import StocksCard from './src/components/StocksCard';
import ExpandableCard from './src/components/ExpandableCard';

// Define the type for the holdings array
type Holding = {
  close: any;
  symbol: string;
  ltp: any;
  quantity: number;
  avgPrice: number;
};

// Format a number to display a single digit at the end
const formatNumber = (number: number) => Number(number.toFixed(1));

// Calculate Current Value (Individual item)
const calculateCurrentValue = ({ltp, quantity}: Holding) =>
  formatNumber(ltp * quantity);

// Calculate Investment Value (Individual item)
const calculateInvestmentValue = ({avgPrice, quantity}: Holding) =>
  formatNumber(avgPrice * quantity);

// Calculate P&L (Individual item)
const calculatePNL = (item: Holding) =>
  formatNumber(calculateCurrentValue(item) - calculateInvestmentValue(item));

// Calculate Current Value Total
const calculateCurrentValueTotal = (holdings: Holding[]) =>
  formatNumber(
    holdings.reduce((total, item) => total + calculateCurrentValue(item), 0),
  );

// Calculate Total Investment
const calculateTotalInvestment = (holdings: Holding[]) =>
  formatNumber(
    holdings.reduce((total, item) => total + calculateInvestmentValue(item), 0),
  );

// Calculate Total P&L
const calculateTotalPNL = (holdings: Holding[]) =>
  formatNumber(
    calculateCurrentValueTotal(holdings) - calculateTotalInvestment(holdings),
  );

// Calculate Today's P&L
const calculateTodayPNL = (holdings: Holding[]) =>
  formatNumber(
    holdings.reduce(
      (total, item) => total + (item.close - item.ltp) * item.quantity,
      0,
    ),
  );

const App = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8',
        );
        setHoldings(response.data.userHolding);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderStockCard = ({item}: {item: Holding}) => (
    <StocksCard
      Symbol={item.symbol}
      LTPAmount={item.ltp}
      Quantity={item.quantity}
      PLAmount={calculatePNL(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upstox Holding</Text>
      </View>
      <FlatList
        data={holdings}
        keyExtractor={item => item.symbol}
        renderItem={renderStockCard}
      />
      <ExpandableCard
        CurrentValue={calculateCurrentValueTotal(holdings)}
        TotalInvestment={calculateTotalInvestment(holdings)}
        PLValue={calculateTodayPNL(holdings)}
      />
      <View style={styles.profitBox}>
        <Text style={styles.label}>Profit & Loss : </Text>
        <Text style={styles.value}>₹{calculateTotalPNL(holdings)}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
  },
  header: {
    backgroundColor: '#A020F0',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  profitBox: {
    bottom: -30,
    backgroundColor: 'white',
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});

export default App;
