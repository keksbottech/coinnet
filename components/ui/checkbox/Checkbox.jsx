import { Check } from '@tamagui/lucide-icons';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'tamagui';


export default function CheckboxWithLabel({ label = <Text>Hello world</Text>, value, onValueChange }) {
  return (
    <View style={styles.container}>
      <Checkbox theme="light" onCheckedChange={onValueChange} size="$4">
        <Checkbox.Indicator>
          <Check />
        </Checkbox.Indicator>
      </Checkbox>
      <View style={styles.labelContainer}>
        {label}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    marginLeft: 6,
  },
});
