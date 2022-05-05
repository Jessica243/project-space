import * as React from 'react'
import { View } from 'react-native';
import Page from './Pages';

interface RegistrationProps {
  onRegistrationSuccess: () => void,
}

const Registration = ({
  onRegistrationSuccess
}: RegistrationProps) => {
  const [pageNumber, setPageNumber] = React.useState(1);
  return (
    <View>
      <Page
        pageNumber={pageNumber}
        onRegistrationSuccess={onRegistrationSuccess}
        setPageNumber={setPageNumber}
      />
    </View>
  )
}

export default Registration;
