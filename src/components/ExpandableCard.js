import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const ExpandableCard = ({CurrentValue, TotalInvestment, PLValue}) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <View style={[styles.container, isExpanded && styles.expandedContainer]}>
      <TouchableOpacity
        style={styles.toggleButtonContainer}
        onPress={toggleExpansion}>
        <Image
          source={
            isExpanded
              ? require('../assets/images/arrowDown.png')
              : require('../assets/images/arrowUp.png')
          }
          style={styles.toggleImage}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          {renderDetail('Current Value:', `₹${CurrentValue}`)}
          {renderDetail('Total Investment:', `₹${TotalInvestment}`)}
          {renderDetail("Today's Profit & Loss:", `₹${PLValue}`)}
        </View>
      )}
    </View>
  );
};

const renderDetail = (label, value) => (
  <View style={styles.layout}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 40,
    bottom: -30,
    paddingTop: 10,
  },
  expandedContainer: {
    height: '20%',
  },
  toggleButton: {
    color: 'blue',
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  toggleButtonContainer: {
    alignItems: 'center',
  },
});

export default ExpandableCard;
