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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
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

type Message = {
  _id: string;
  message?: string;
  image?: string;
  senderId: string;
  status: 'sending' | 'sent'; // Added status property
};

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
  const p2pNegotiateData = useAppSelector(state => state.orders.orderP2p)
  const sellerId = useAppSelector(state => state.orders.sellerId)
  const escrowId = useAppSelector(state => state.escrow.escrowId)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')

  const pollingIntervalForEscrow = useRef<any>(null);

  useEffect(() => {
    fetchSellersInfo();
    const pollingIntervalForMessages = setInterval(fetchMessages, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(pollingIntervalForMessages); // Clear the polling interval
 
    };
  }, []);

  useEffect(() => {
     pollingIntervalForEscrow.current = setInterval(checkForStatusInEscrow, 3000);
         
    
    return () => {
      if (pollingIntervalForEscrow.current) {
        clearInterval(pollingIntervalForEscrow.current);
      }

    }
  }, [])


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

  const fetchMessages = async () => {
    try {
      const body = {
        sellerId: id,
        senderId: userData._id,
      };

      const response = await axios.post('messages', body);
      const newMessages = response.data.message;

      // Update messages state with new messages from the server
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg) => {
          const serverMessage = newMessages.find((m: Message) => m._id === msg._id);
          return serverMessage ? { ...msg, status: 'sent' } : msg;
        });

        // Add new messages that were not previously in the state
        const uniqueMessages = newMessages.filter(
          (m: Message) => !prevMessages.some((msg) => msg._id === m._id)
        );

        return [...updatedMessages, ...uniqueMessages];
      });
    } catch (error) {
      ToastAndroid.show('Failed to fetch messages. Refetching!', ToastAndroid.SHORT);

      console.error('Failed to fetch messages:', error);
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

  const handleSend = async () => {
    if (inputText.trim()) {
      // Create a temporary message with "sending" status
      const tempMessage: Message = {
        _id: Math.random().toString(),
        message: inputText,
        senderId: userData._id,
        status: 'sending',
      };

      setMessages((prevMessages) => [...prevMessages, tempMessage]);
      setInputText('');

      try {
        const body = {
          sellerId: id,
          senderId: userData._id,
          message: inputText,
        };

        const response = await axios.post('messages/initiate', body);
        const serverMessage = response.data.message;

        // Update the temporary message with the server-confirmed message
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === tempMessage._id ? { ...serverMessage, status: 'sent' } : msg
          )
        );
      } catch (error) {
        ToastAndroid.show('Failed to send message, try again!', ToastAndroid.SHORT);

        console.error('Failed to send message:', error);
        // If sending fails, keep the message in "sending" status or handle it appropriately
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
        console.log(data.secure_url)
        setImage(data.secure_url); // Store the Cloudinary URL
      } else {
        throw new Error('Failed to upload image');
      }

    } catch (error) {
      ToastAndroid.show('Something went wrong uploading image. Try again!', ToastAndroid.SHORT);

      console.error(error);
    } 
  };


  const handleImageSend = async (image:any) => {
    const tempMessage: Message = {
      _id: Math.random().toString(),
      image: image,
      senderId: userData._id,
      status: 'sending',
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    fadeIn();

    try {
      const body = {
        sellerId: id,
        senderId: userData._id,
       image,
      };

      const response = await axios.post('messages/initiate', body);
      const serverMessage = response.data.message;

      // Update the temporary message with the server-confirmed message
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === tempMessage._id ? { ...serverMessage, status: 'sent' } : msg
        )
      );
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

  const checkForStatusInEscrow = async () => {
    try{
        const body = {
          escrowId
        }

        const response = await axios.post('escrow/check/status', body)

        console.log(response.data)
        if(response.data.message.status === 'completed'){
        dispatch(getTransactionData('order'))
          router.push('/(trade)/transactioncomplete')
          if (pollingIntervalForEscrow.current) {
        clearInterval(pollingIntervalForEscrow.current);
      }
    }
        else {
          return
        }
    }
    catch(err){
      ToastAndroid.show('Something went wrong updating escrow status!', ToastAndroid.SHORT);
      console.log(err)
    }
  }

  const buyerVerifiesMoneyIsTransferred = async () => {
    try{
      setIsLoading(true)
      const body = {
        escrowId,
        userId: userData._id
      }

      const updateEscrow = await axios.post('escrow/pend', body)

      console.log(updateEscrow)

      Alert.alert('Awaiting seller to confirm payment!');
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
      const body = {
        escrowId,
        userId: userData._id
      }
      const updateEscrow = await axios.post('escrow/complete', body)

      Alert.alert('Payment Confirmed!');
    }
    catch(err){
      ToastAndroid.show('Something went wrong sending request. Try again!', ToastAndroid.SHORT);

      console.log(err)
    }
  }

  const renderItem = ({ item }: { item: Message }) => {
    // Avoid rendering the message if it is empty
    if (!item.message && !item.image) return null;

    return (
      <Animated.View style={[styles.messageContainer]}>
       
        {item.senderId === userData._id ? (
          <View style={styles.senderMessage}>
            {item.image ? (
              <TouchableOpacity onPress={() => handleImageClick(item.image)}>
                <Image source={{ uri: item.image }} style={styles.messageImage} />
              </TouchableOpacity>
            ) : (
              <Text style={styles.senderText}>{item.message}</Text>
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
              <Text style={styles.receiverText}>{item.message}</Text>
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
      handleImageSend(result.assets[0].uri);
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>

        <View style={styles.header}>
          {receiverImage ? (
            <Image source={{ uri: receiverImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initials}>{receiverName[0]}</Text>
            </View>
          )}
          <Text style={styles.receiverName}>{fullname}</Text>
          <View style={styles.headerIcons}>
            {
              sellerId === userData._id ? <TouchableOpacity onPress={buyerVerifiesMoneyIsTransferred}>
                <Text style={{fontFamily:'MonsterReg',fontSize:12}}>Click if money have been paid</Text>
              </TouchableOpacity> : <TouchableOpacity onPress={sellerVerifiesPayment}>
                <Text style={{fontFamily:'MonsterReg',fontSize:12}}>Confirm payment</Text>
              </TouchableOpacity>
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
 <Text style={styles.label}>Buyer intends to buy {p2pNegotiateData?.coinAmount} quantity of {p2pNegotiateData?.coin} which is worth ${parseFloat(p2pNegotiateData?.fiatAmount).toFixed(2)}. Buyer should confirm money have been sent and seller should confim money have been received by clicking the button above. Dispute should be sent for false transactions.
 </Text>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) =>  String(item._id)}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
  }
});

export default ChatScreen;
