import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Href, useRouter } from 'expo-router';

type RedirectPropType = {
    url?: Href<string | object>;
}
const Redirect = ({url = '/'}:RedirectPropType) => {
    const router = useRouter()


    useEffect(() => {
         router.push(url);
    }, [url])


  return (
    <View>
      <Text>Redirect</Text>
    </View>
  )
}

export default Redirect