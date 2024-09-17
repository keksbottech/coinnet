import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Animated,
  Easing,
  Alert,
  BackHandler,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import DisplayPhoneNumber from '@/components/display phone number/DisplayPhoneNumber';
import { useLocalSearchParams } from 'expo-router';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getTransactionData } from '@/lib/store/reducers/storeTransactionAuthentication';
import Loading from '@/components/loading/Loading';
import { ThemedText } from '@/components/ThemedText';
import io from 'socket.io-client'
import { getTransactionFallback } from '@/lib/store/reducers/storeTransferDetails';
import axiosBase from 'axios'

type Message = {
  _id: string;
  message?: string;
  image?: string;
  senderId: string;
  status: 'sending' | 'sent'; // Added status property
};

let socket;


const ChatScreen = ({
  receiverName = 'alex favour',
  receiverImage,
  receiverPhone,
}: {
  receiverName: string;
  receiverImage?: string;
  receiverPhone: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();
  const flatListRef = useRef<FlatList<Message>>(null);
  const [isPhoneDisplayCancelled, setIsPhoneDisplayCancelled] = useState(false);
  const [disableBackPress, setDisableBackPress] = useState(true);
  const { id } = useLocalSearchParams();
  const [sellerData, setSellerData] = useState<any>(null);
  const [fullname, setFullname] = useState<string | null>(null);
  const userData = useAppSelector((state) => state.user.user);
  const sellerId = useAppSelector(state => state.orders.sellerId)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const theme = useAppSelector(state => state.theme.theme)
  const [p2pNegotiateData, setP2pNegotiateData] = useState(null)
  const [isMsgSending, setIsMsgSending] = useState(false)
  const [isSocketInitialized, setIsSocketInitialized] = useState(false); 
  const [escrowId, setEscrowId] = useState('')
  const pollingIntervalForEscrow = useRef<any>(null);
  const marketStoredData = useAppSelector(state => state.market.marketData); // Assuming the state is stored here
  const [ngnRate, setNgnRate] = useState(null)
  
  useEffect(() => {
    const fetchMessages = async () => {
      try{
        const body = {
          senderId:userData._id,
          receiverId: id
        }

        console.log(body)



        const response = await axios.post('messages/get', body)

        setMessages(prev => [...prev, ...response.data.message])
        console.log(response.data, 'fetched date')
      } 
      catch(err){
        console.log(err)
      }

    }

    fetchMessages()
  },[])

  useEffect(() => {
    // Initialize the socket
   socket = io('https://coinnet-server.onrender.com', {
    query: {
      userId: userData._id
    }
   })
  
    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message])
      console.log(message, 'message')
      
    })

    console.log(escrowId, 'escrow id')


     const escrowData = {
      senderId: userData._id,
      receiverId: id,
      escrowId
     }

       socket.emit('checkEscrow', escrowData);
 
       // Emit the message to the server

// create socket.io escrow 
  socket.on('checkEscrow', (message) => {
  console.log(message, 'escrow message')
     if(message.status === 'completed'){
        dispatch(getTransactionData('order'))
          router.push('/(trade)/transactioncomplete')
      }
})
// const intervalId = setInterval(() => {
//   console.log('listening to the server')


// }, 10000); // 5000ms = 5 seconds

// Cleanup interval when the component unmounts

  
    // Cleanup function to remove listeners and disconnect the socket
    return () => {
  //  clearInterval(intervalId);
      socket.off('newMessage') // Remove the specific listener
      socket.off('checkEscrow')
      socket.disconnect() // Properly disconnect the socket

    }
  }, [isSocketInitialized, escrowId])
  
  
  useEffect(() => {
    fetchSellersInfo();
    fetchEscrowId()
  }, [escrowId])

const fetchEscrowId = async() =>{
  try{
    const body = {
      senderId: userData._id,
      receiverId: id
    }

    console.log(escrowId, 'escrow id')

    const a = {
      escrowId
    }

    const response = await axios.post('escrowId/get', body)

    setEscrowId(response.data.message.escrowId[0])

    if(escrowId){
    const [escrowData, ngnRateResponse] =  await Promise.all([
      axios.post('escrow/check/status', {escrowId}),
      axiosBase.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
    ])
    setP2pNegotiateData(escrowData.data.message)
    setNgnRate(ngnRateResponse.data.usd.ngn)
    console.log(escrowData.data, 'escrow main dara')

    }

    console.log(response.data)
  }
  catch(err){
    console.log(err)
  }
}

  const fetchSellersInfo = async () => {
    try {
      const body = {
        userId: id,
      };
      const response = await axios.post('user/get/info', body);

      setSellerData(response.data.message);
      setFullname(`${response.data.message.firstName} ${response.data.message.lastName}`);
    } catch (err) {
      console.log(err);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (disableBackPress) {
          Alert.alert(
            'Hold on!',
            'Are you sure you want to go back?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'OK',
                onPress: () => {
                  router.push('/(trade)/chatpreview')
                },
              },
            ],
            { cancelable: true }
          );
          return disableBackPress; // Prevent default back press behavior
        } else {
          return disableBackPress; // Allow default back press behavior
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [disableBackPress])
  );

  const getCoinData = (coinName: string) => {
    return marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === coinName);
  };



  const handleSend = () => {    
    if (inputText.trim()) {
      try {
        setIsMsgSending(true); // Start the message sending state
        setIsSocketInitialized((prev) => !prev);
        const body = {
          receiverId: id,
          senderId: userData._id,
          message: inputText,
          image: null
        };

        console.log(body);

        // Emit the message to the server
        socket.emit('sendMessage', body, (acknowledgment) => {
          // Acknowledgment from the server that the message was received
          if (acknowledgment && acknowledgment.status === 'success') {

            console.log(true)
            // Update state or UI to reflect the message was sent successfully
            console.log('Message sent successfully');
            setIsMsgSending(false);
            // setMessages((prev) => [...prev, body]);
          } else {
            // Handle failure case
            console.error('Failed to send message:', acknowledgment.error);
            setIsMsgSending(false);
          }
        });

        setInputText('')
      } catch (error) {
        ToastAndroid.show('Failed to send message, try again!', ToastAndroid.SHORT);
        console.error('Failed to send message:', error);
        setIsMsgSending(false);
      }
    }
  };

  
  const uploadImage = async (uri: string) => {
    // setIsLoading(true);
    try {
      const formData = new FormData();
      const fileType = uri.split('.').pop();

      formData.append('file', {
      
        uri,
        type: `image/${fileType}`,
        name: `upload.${fileType}`,
      } as any); // Correct way to handle file

      formData.append('upload_preset', 'coinnet');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dcgirmxbm/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        console.log(data.secure_url, 'cloud')
        setImageUrl(data.secure_url); // Store the Cloudinary URL
        handleImageSend(data.secure_url);
      } else {
        throw new Error('Failed to upload image');
      }

    } catch (error) {
      ToastAndroid.show('Something went wrong uploading image. Try again!', ToastAndroid.SHORT);

      console.error(error.response.data.message);
    } 
  };


  const handleImageSend = async (image) => {
    setIsSocketInitialized((prev) => !prev);

    fadeIn();

    try {
      const body = {
        receiverId: id,
        senderId: userData._id,
        message: null,
        image
      };

      console.log(body);

      // Emit the message to the server
      socket.emit('sendMessage', body, (acknowledgment) => {
        // Acknowledgment from the server that the message was received
        if (acknowledgment && acknowledgment.status === 'success') {

          console.log(true)
          // Update state or UI to reflect the message was sent successfully
          console.log('Message sent successfully');
          setIsMsgSending(false);
          // setMessages((prev) => [...prev, body]);
        } else {
          // Handle failure case
          console.error('Failed to send message:', acknowledgment.error);
          setIsMsgSending(false);
        }
      });

    } catch (error) {
      ToastAndroid.show('Failed to send image. Try again!', ToastAndroid.SHORT);

      console.error('Failed to send image:', error);
    }
  };

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleCancel = () => {
    setIsPhoneDisplayCancelled(!isPhoneDisplayCancelled);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };


  const buyerVerifiesMoneyIsTransferred = async () => {
    try{

      dispatch(getTransactionFallback({name:'p2p transaction', chatId: id}))

      router.push('/(other)/transferinput')
      // setIsLoading(true)
      // setIsSocketInitialized((prev) => !prev);
      // const body = {
      //   escrowId,
      //   userId: userData._id
      // }
      
      // console.log(body, 'body')

      // const updateEscrow = await axios.post('escrow/pend', body)

      // console.log(updateEscrow)

      // Alert.alert('Awaiting seller to confirm payment!');
    }
    catch(err){
      ToastAndroid.show('Something went wrong sending request! Try again', ToastAndroid.SHORT);

      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  } 

  const sellerVerifiesPayment = async () => {
    try{
      setIsLoading(true)
      setIsSocketInitialized((prev) => !prev);
      const body = {
        escrowId,
        userId: userData._id
      }

      console.log(body, 'body')

      const updateEscrow = await axios.post('escrow/complete', body)

      Alert.alert('Payment Confirmed!');
    }
    catch(err){
      ToastAndroid.show('Something went wrong sending request. Try again!', ToastAndroid.SHORT);

      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  }


  const renderItem = ({ item, index }: { item: Message }) => {
    // Avoid rendering the message if it is empty
    // if (!item.message && !item.image) return null;

    return (
      <Animated.View key={index} style={[styles.messageContainer]}>
       
        {item?.senderId === userData._id ? (
          <View style={styles.senderMessage}>
            {item.image ? (
              <TouchableOpacity onPress={() => handleImageClick(item.image)}>
                <Image source={{ uri: item.image }} style={styles.messageImage} />
              </TouchableOpacity>
            ) : (
              <ThemedText style={styles.senderText}>{item?.messages}</ThemedText>
            )}
            <Ionicons
              name={item.status === 'sent' ? 'checkmark-done' : 'checkmark'}
              size={16}
              color="#fff"
              style={styles.statusIcon}
            />
          </View>
        ) : (
          <View style={styles.receiverMessage}>
            {item.image ? (
              <TouchableOpacity onPress={() => handleImageClick(item?.image)}>
                <Image source={{ uri: item.image }} style={styles.messageImage} />
              </TouchableOpacity>
            ) : (
              <ThemedText style={styles.receiverText}>{item?.messages}</ThemedText>
            )}
          </View>
        )}
      </Animated.View>
    );
  };

  const handleCall = () => {
    setIsPhoneDisplayCancelled(true);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(receiverPhone);
    Alert.alert('Phone number copied to clipboard!');
  };

  const handleDispute = () => {
    router.push('/(trade)/dispute');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
       uploadImage(result.assets[0].uri)

    }
  };

  let buyer, seller;


  if(userData?._id === p2pNegotiateData?.buyer){
    console.log(true, 'trueeeeeeeeeeeeeeeeeee for buyer active')
    buyer = p2pNegotiateData?.buyer
    seller = id

    console.log(buyer, seller, 'buyer seller')
  }
  else{
    console.log(false, 'falseeeeeeeeeeeeeeee for seller active')
    buyer = ''
    seller = id
    

    console.log(buyer, seller, 'buyer seller')
  }

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <View style={{ flex: 1 }}>

        <View style={[styles.header, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
          {receiverImage ? (
            <Image source={{ uri: receiverImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.initialsContainer}>
              <ThemedText style={styles.initials}>{fullname && fullname[0]}</ThemedText>
            </View>
          )}

          <ThemedText style={styles.receiverName}>{fullname}</ThemedText>
          <View style={styles.headerIcons}>
          {
  // Check if the current user is the buyer
  buyer ? (
    <TouchableOpacity style={styles.buyer} onPress={buyerVerifiesMoneyIsTransferred}>
      <ThemedText style={{ fontFamily: 'MonsterReg', fontSize: 12, color:'white' }}>
        Click to make payment
      </ThemedText>
    </TouchableOpacity>
  ) : (
    // Otherwise, the current user is the seller
    <TouchableOpacity style={styles.seller} onPress={sellerVerifiesPayment}>
      <ThemedText style={{ fontFamily: 'MonsterReg', fontSize: 12,  color:'white' }}>
        Confirm payment
      </ThemedText>
    </TouchableOpacity>
  )
}

            <TouchableOpacity onPress={handleCall}>
              <FontAwesome name="phone" size={24} color="#555" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDispute}>
              <FontAwesome name="exclamation-circle" size={24} color="#555" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

 { isPhoneDisplayCancelled &&   <DisplayPhoneNumber
        handleCancel={handleCancel}
        receiverPhone={sellerData?.phone}
        receiverName={fullname}
        // handleCopy={handleCopy}
      />}
 <ThemedText style={styles.label}>Buyer intends to buy {p2pNegotiateData?.fiatAmount / getCoinData(p2pNegotiateData?.coin)?.RAW.USD.PRICE} quantity of {p2pNegotiateData?.coin} which is worth ${parseFloat(p2pNegotiateData?.fiatAmount).toFixed(2)} ≈ ₦{ngnRate && (parseFloat(ngnRate*p2pNegotiateData?.fiatAmount).toFixed())}. Buyer should confirm money have been sent and seller should confim money have been received by clicking the button above. Dispute should be sent for false transactions.
 </ThemedText>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={() => {
            return <ThemedText style={{fontFamily:'MonsterBold', textAlign:'center'}}>You don't have any recent messages </ThemedText>
          }}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="camera" size={30} color="#555" style={styles.cameraIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={handleSend} disabled={!inputText.trim()}>
            {/* {
              isMsgSending ?<ActivityIndicator/>: <Ionicons name="send" size={30} color="#555" style={styles.sendIcon} />
            } */}
            <Ionicons name="send" size={30} color="#555" style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>



      <Modal visible={showImageModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setShowImageModal(false)} style={styles.modalCloseButton}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
{ selectedImage &&   <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />}
        </View>
      </Modal>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    justifyContent:'center'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initials: {
    color: '#fff',
    fontSize: 18,
  },
  receiverName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent:'center'
  },
  icon: {
    marginLeft: 15,
  },
  messageContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    maxWidth: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 8,
    maxWidth: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderText: {
    color: '#fff',
  },
  receiverText: {
    color: '#333',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  statusIcon: {
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  cameraIcon: {
    marginLeft: 10,
  },
  sendIcon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  modalImage: {
    width: '90%',
    height: '80%',
  },
  label:{
    fontFamily:'MonsterBold',
    textAlign:'center',
    padding:5
  },
  buyer:{
    backgroundColor:'orangered',
    color:'white',
    padding:10,
    borderRadius:30
  },
  seller:{
    backgroundColor:'orangered',
    color:'white',
    padding:10,
    borderRadius:30 
  }
});

export default ChatScreen;
