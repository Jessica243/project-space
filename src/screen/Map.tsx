import React, { useState } from 'react';
import {
  StyleSheet, Dimensions, View, Text, Button, TextInput,
} from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import appStyles from '../appStyles';

// const TaskApp = () => {
//   const realm = useRealm();
//   const tasks = useQuery(Task);
//   const [newDescription, setNewDescription] = useState('');

//   return (
//     <SafeAreaView>
//       <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
//         <TextInput
//           value={newDescription}
//           placeholder="Enter new task description"
//           onChangeText={setNewDescription}
//         />
//         <Pressable
//           onPress={() => {
//             realm.write(() => {
//               realm.create('Task', Task.generate(newDescription));
//             });
//             setNewDescription('');
//           }}
//         >
//           <Text>➕</Text>

//         </Pressable>
//       </View>
//       <FlatList
//         data={tasks.sorted('createdAt')}
//         keyExtractor={(item) => item._id.toHexString()}
//         renderItem={({ item }) => (
//           <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
//             <Pressable
//               onPress={() => realm.write(() => {
//                 item.isComplete = !item.isComplete;
//               })}
//             >
//               <Text>{item.isComplete ? '✅' : '☑️'}</Text>
//             </Pressable>
//             <Text style={{ paddingHorizontal: 10 }}>{item.description}</Text>
//             <Pressable
//               onPress={() => {
//                 realm.write(() => {
//                   realm.delete(item);
//                 });
//               }}
//             >
//               <Text>🗑️</Text>
//             </Pressable>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

const Map = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState('');
  const [searchString, setSearchString] = useState('');

  const showDestinationOnMap = () => {
    // TODO: open driving directions
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied.\nPlease grant permission and try again.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View>
      {
        locationError.length > 0
        && <Text style={appStyles.validationError}>{locationError}</Text>
      }
      {
        locationError.length === 0 && location !== null
        && (
          <>
            <MapView
              initialRegion={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              style={componentStyles.map}
            />
            <Callout style={componentStyles.callout}>
              <View style={appStyles.row}>
                <TextInput
                  style={appStyles.userInput}
                  onChangeText={setSearchString}
                  value={searchString}
                  placeholder="Current location"
                />
                <Button
                  onPress={showDestinationOnMap}
                  title="Open maps"
                />
              </View>
            </Callout>
          </>
        )
      }
    </View>
  );
};

const componentStyles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    margin: 30,
  },
});

export default Map;
