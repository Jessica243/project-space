import * as React from 'react'
import { View } from 'react-native';
import Page from './Pages';

interface RegistrationProps {
  onRegistrationSuccess: () => void,
  onCancel: () => void,
}

const Registration = ({
  onRegistrationSuccess,
  onCancel,
}: RegistrationProps) => {
  const [pageNumber, setPageNumber] = React.useState(1);
  return (
    <View>
      <Page
        pageNumber={pageNumber}
        onRegistrationSuccess={onRegistrationSuccess}
        onCancel={onCancel}
        setPageNumber={setPageNumber}
      />
    </View>
  )
}

export default Registration;
