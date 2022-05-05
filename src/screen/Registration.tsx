import * as React from 'react'
import { View } from 'react-native';
import RegistrationPage from './Registration/RegistrationPages';

interface RegistrationProps {
  onRegistrationSuccess: () => void,
}

const Registration = ({
  onRegistrationSuccess
}: RegistrationProps) => {
  const [pageNumber, setPageNumber] = React.useState(1);
  return (
    <View>
      <RegistrationPage
        pageNumber={pageNumber}
        onRegistrationSuccess={onRegistrationSuccess}
        setPageNumber={setPageNumber}
      />
    </View>
  )
}

export default Registration;
