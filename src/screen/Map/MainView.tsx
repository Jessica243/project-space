import React from 'react';
import { Text } from 'react-native';
import { LocationObject } from 'expo-location';
import appStyles from '../../appStyles';
import InteractiveMap from './InteractiveMap';

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

interface MainViewProps {
  location: LocationObject | null,
  locationError: string,
}

const MainView = ({ location, locationError }: MainViewProps) => {
  if (locationError.length === 0 && location !== null) {
    return <InteractiveMap location={location} />;
  }
  return <Text style={appStyles.validationError}>{locationError}</Text>;
};

export default MainView;
