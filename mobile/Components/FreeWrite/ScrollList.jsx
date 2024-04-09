import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  View, Text, StyleSheet, SectionList, FlatList, Image, SafeAreaView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   sectionHeader: {
//     fontWeight: '800',
//     fontSize: 18,
//     color: '#f4f4f4',
//     marginTop: 20,
//     marginBottom: 5,
//   },
//   item: {
//     margin: 10,
//   },
//   itemPhoto: {
//     width: 200,
//     height: 200,
//   },
//   itemText: {
//     color: 'rgba(255, 255, 255, 0.5)',
//     marginTop: 5,
//   },
// });

// const SECTIONS = [
//   {
//     title: 'Made for you',
//     data: [
//       {
//         key: '1',
//         text: 'Item text 1',
//         uri: 'https://picsum.photos/id/1/200',
//       },
//       {
//         key: '2',
//         text: 'Item text 2',
//         uri: 'https://picsum.photos/id/10/200',
//       },

//       {
//         key: '3',
//         text: 'Item text 3',
//         uri: 'https://picsum.photos/id/1002/200',
//       },
//       {
//         key: '4',
//         text: 'Item text 4',
//         uri: 'https://picsum.photos/id/1006/200',
//       },
//       {
//         key: '5',
//         text: 'Item text 5',
//         uri: 'https://picsum.photos/id/1008/200',
//       },
//     ],
//   },
//   {
//     title: 'Punk and hardcore',
//     data: [
//       {
//         key: '1',
//         text: 'Item text 1',
//         uri: 'https://picsum.photos/id/1011/200',
//       },
//       {
//         key: '2',
//         text: 'Item text 2',
//         uri: 'https://picsum.photos/id/1012/200',
//       },

//       {
//         key: '3',
//         text: 'Item text 3',
//         uri: 'https://picsum.photos/id/1013/200',
//       },
//       {
//         key: '4',
//         text: 'Item text 4',
//         uri: 'https://picsum.photos/id/1015/200',
//       },
//       {
//         key: '5',
//         text: 'Item text 5',
//         uri: 'https://picsum.photos/id/1016/200',
//       },
//     ],
//   },
//   {
//     title: 'Based on your recent listening',
//     data: [
//       {
//         key: '1',
//         text: 'Item text 1',
//         uri: 'https://picsum.photos/id/1020/200',
//       },
//       {
//         key: '2',
//         text: 'Item text 2',
//         uri: 'https://picsum.photos/id/1024/200',
//       },

//       {
//         key: '3',
//         text: 'Item text 3',
//         uri: 'https://picsum.photos/id/1027/200',
//       },
//       {
//         key: '4',
//         text: 'Item text 4',
//         uri: 'https://picsum.photos/id/1035/200',
//       },
//       {
//         key: '5',
//         text: 'Item text 5',
//         uri: 'https://picsum.photos/id/1038/200',
//       },
//     ],
//   },
// ];

// function ListItem({ item }) {
//   return (
//     <View style={styles.item}>
//       <Image
//         source={{
//           uri: item.uri,
//         }}
//         style={styles.itemPhoto}
//         resizeMode="cover"
//       />
//       <Text style={styles.itemText}>{item.text}</Text>
//     </View>
//   );
// }

// export default function ScrollList({ title }) {
//   return (
//     <View>
//       <StatusBar />
//       <SafeAreaView style={{ flex: 1 }}>
//         <SectionList
//           contentContainerStyle={{ paddingHorizontal: 10 }}
//           stickySectionHeadersEnabled={false}
//           sections={SECTIONS}
//           renderSectionHeader={({ section }) => (
//             <>
//               <Text style={styles.sectionHeader}>{section.title}</Text>
//               <FlatList
//                 horizontal
//                 data={section.data}
//                 renderItem={({ item }) => <ListItem item={item} />}
//                 showsHorizontalScrollIndicator={false}
//               />
//             </>
//           )}
//           renderItem={({ item, section }) => <ListItem item={item} />}
//           // if (section.horizontal) {
//           //   return null;
//           // }

//         />
//       </SafeAreaView>
//     </View>
//   );
// }

const SECTIONS = [
  {
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
  {
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1020/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: '110%',
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});

function ListItem({ item }) {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
}

export default function ScrollList({ title }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{title}</Text>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <ListItem item={item} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

ScrollList.propTypes = {
  title: PropTypes.string.isRequired,
};
