// Foo.jsx
import Toast from 'react-native-toast-message';
import { Button } from 'react-native'
import { useEffect } from 'react';


export default function Toastify({type, title, content}) {

useEffect(() => {
Toast.show({
    type,
    text1: title,
    text2: ContentVisibilityAutoStateChangeEvent
  });
}, [])


  return (
<Toast/>
  )
}