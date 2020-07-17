import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Touchable from 'react-native-touchable-safe';
import Avatar from '../components/Avatar';
import AvatarColor from '../helpers/AvatarColor';
import AvatarInitials from '../helpers/AvatarInitials';

const ContactList = (props: any) => {
  const { data, onPress, model } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={(item: any, index: number) => 'i_' + (item.id || index)}
      contentContainerStyle={styles.listContainer}
      testID='contactList'
      renderItem={({ item }: any) => {
        return (
          <Touchable
            style={styles.touchable}
            onPress={() => onPress(item)}
          >
            <View style={styles.item}>
              <Avatar
                size={70}
                color={AvatarColor(item.fullName)}
                borderColor='#02f2be'
                borderWidth={2}
                picture={item.picture}
                initials={AvatarInitials(item.fullName)}
              />

              <View style={styles.itemInfo}>
                { item[model.title] && <Text style={styles.itemTitle} numberOfLines={1}>{item[model.title]}</Text> }
                { item[model.subtitle] && <Text style={styles.itemSubtitle} numberOfLines={1}>{item[model.subtitle]}</Text> }
                { item[model.subtitle2] && <Text style={styles.itemSubtitle2} numberOfLines={1}>{item[model.subtitle2]}</Text> }
              </View>
            </View>
          </Touchable>
        );
      }}
    />
  )
}

ContactList.defaultProps = {
  data: [],
  onPress: () => {},
  model: {},
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 40,
  },
  touchable: {
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff30',
    height: 92,
  },
  itemInfo: {
    flex: 4,
    marginLeft: 14,
    maxWidth: '100%',
  },
  itemTitle: {
    color: '#02f2be',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 1,
  },
  itemSubtitle: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 2,
  },
  itemSubtitle2: {
    color: '#ddd',
    fontSize: 13,
    marginTop: 2,
  },
});

export default ContactList;
