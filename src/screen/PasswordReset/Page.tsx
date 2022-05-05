import * as React from 'react'
import { Button, Text, View } from 'react-native';
import appStyles from '../../appStyles';
import EnterCodePage from './EnterCodePage';
import EnterEmailPage from './EnterEmailPage';
import NewPasswordPage from './NewPasswordPage';

interface PageProps {
  pageNumber: number,
  onPasswordResetSuccess: () => void,
  onCancel: () => void,
  setPageNumber: (page: number) => void,
}

const Page = ({ pageNumber, setPageNumber, onPasswordResetSuccess, onCancel }: PageProps) => {
  switch(pageNumber){
    case 1:    
      return <EnterEmailPage onSuccess={() => setPageNumber(2)} onCancel={onCancel}/>
    case 2:
      return <EnterCodePage onSuccess={() => setPageNumber(3)} onCancel={onCancel}/>
    case 3:
      return (
        <View>
          <Text>We have successfully validated your code!</Text>
          <View style={appStyles.buttonRow}>
            <Button
              onPress={onCancel}
              title="Cancel"
            />
            <Button
              onPress={() => setPageNumber(4)}
              title="Reset password"
            />
          </View>
        </View> 
      )
    case 4:
      return <NewPasswordPage onSuccess={() => setPageNumber(5)} onCancel={onCancel} />
    case 5:
      return (
        <View>
          <Text>You have successfully reset your password!</Text>
          <Button
            onPress={onPasswordResetSuccess}
            title="Back to login"
          />
        </View>
      )
    default:  
      return null;
  }
}

export default Page;
