import * as React from 'react'
import { Button, Text, View } from 'react-native';
import appStyles from '../../appStyles';
import DetailForm from './DetailForm';

interface PageProps {
  pageNumber: number
  setPageNumber: (page: number) => void,
  onRegistrationSuccess: () => void,
  onCancel: () => void,
}

const Page = ({pageNumber, onRegistrationSuccess, setPageNumber, onCancel}: PageProps) => {
  switch(pageNumber){
    case 1:
      return (
        <View>
          <Text>Feature 1: Voice Enabled Search</Text>
          <Text>Find parkings that match your preferences</Text>
          <View style={appStyles.buttonRow}>
            <Button
              onPress={() => onCancel()}
              title="Cancel"
            />
            <Button
              onPress={() => setPageNumber(2)}
              title="Next"
            />
          </View>
        </View>
      );
    case 2:
      return (
        <View>
          <Text>Feature 2: Personalized Parking</Text>
          <Text>Find parkings that match your preferences</Text>
          <View style={appStyles.buttonRow}>
            <Button
              onPress={() => setPageNumber(1)}
              title="Back"
            />
            <Button
              onPress={() => setPageNumber(3)}
              title="Next"
            />  
          </View>
        </View>
      );
    case 3:
      return (
        <View>
          <Text>Feature 3: Quick Navigation</Text>
          <Text>Easily navigate to your preferred parking</Text>
          <View style={appStyles.buttonRow}>
            <Button
              onPress={() => setPageNumber(2)}
              title="Back"
            />
            <Button
              onPress={() => setPageNumber(4)}
              title="Next"
            />  
          </View>
        </View>
      );
    case 4:
      return (
        <DetailForm onCancel={onCancel} onSuccess={() => setPageNumber(5)}/>
      );
    case 5:
      return (
        <View>
          <Text>You have successfully registered an account!</Text>
          <Button
            onPress={onRegistrationSuccess}
            title="Back to login"
          />
        </View>
      )
    default: return null
  }
}

export default Page;
