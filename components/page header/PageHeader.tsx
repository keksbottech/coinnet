import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

type PageHeaderPropTypes = {
    label?: string | ReactNode;
    className?: string;
    icon?: string | ReactNode;
    other?: ReactNode | string
}
const PageHeader = ({label,icon = <AntDesign name="arrowleft" size={24} color="black" />, className,other}: PageHeaderPropTypes) => {

  return (
    <View style={styles.container}>
        <View>
{icon}
</View>
      <View>{label}</View>

      <View>{other}</View>
    </View>
  )
}

export default PageHeader

const styles = StyleSheet.create({
    container:{
     alignItems:'center',
     justifyContent:'space-between',
     flexDirection:'row',
     padding:10,
    }
})