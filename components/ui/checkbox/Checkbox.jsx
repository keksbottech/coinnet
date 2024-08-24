import { Check } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { View } from 'react-native'
import { Text } from 'react-native'

import { Checkbox } from 'tamagui'

export default function CheckboxWithLabel ({label = <Text>Hello world</Text>, onValueChange}) {

   return (

    <View className='flex items-center flex-row '>
  <Checkbox theme={'light'} onCheckedChange={onValueChange} size="$4">

    <Checkbox.Indicator>

      <Check />

    </Checkbox.Indicator>

  
  </Checkbox>

  <View style={{marginLeft:6}}>
{label}
</View>

</View>

)
}