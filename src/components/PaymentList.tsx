import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Avatar from './Avatar';
import AvatarColor from '../helpers/AvatarColor';
import AvatarInitials from '../helpers/AvatarInitials';

const PaymentList = (props: any) => {
  const { data } = props;

  const [higherValue, setHigherValue] = useState(0);

  useEffect(() => {
    getItemBarHeight();
  }, []);

  const getItemBarHeight = () => {
    const values: any = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].value) {
        values.push(data[i].value);
      }

      if (i === data.length - 1) {
        setHigherValue(Math.max(...values));
      }
    }
  }

  const maxBarHeight = 135;

  return (
    <FlatList
      data={data}
      horizontal={true}
      keyExtractor={(item: any, index: number) => 'i_' + (item.id || index)}
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
      testID='paymentList'
      renderItem={({ item }: any) => {
        return (
          <View style={styles.item}>
            <Text style={styles.itemValue}>
              { item.formattedValue }
            </Text>

            { !!item.value && !!higherValue &&
              <View style={[styles.itemBar, { maxHeight: maxBarHeight, height: Math.round((item.value / higherValue) * maxBarHeight) }]} />
            }

            <Avatar
              size={50}
              color={AvatarColor(item.fullName)}
              borderColor='#02f2be'
              borderWidth={1}
              picture={item.picture}
              initials={AvatarInitials(item.fullName)}
            />
          </View>
        );
      }}
    />
  )
}

PaymentList.defaultProps = {
  data: [],
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 30,
    paddingLeft: 22,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 18,
    height: 92,
  },
  itemValue: {
    fontSize: 14,
    color: '#02f2be',
    marginBottom: 10,
  },
  itemBar: {
    width: 5,
    backgroundColor: '#02f2be95',
    borderRadius: 5,
  }
});

export default PaymentList;
