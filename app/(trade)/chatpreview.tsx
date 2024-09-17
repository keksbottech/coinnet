import ChatPreview from '@/components/chat preview/ChatPreview';
import { ThemedText } from '@/components/ThemedText';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { getMessagesData } from '@/lib/store/reducers/storeMessages';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import { BackHandler } from 'react-native';
import { Alert } from 'react-native';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { Wave } from 'react-native-animated-spinkit';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  profileUrl?: string;
  isNewMessage: boolean;
  sellerId: string;
  image?: string
}

const ChatListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const messagesData = useAppSelector((state) => state.messages.messages);
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const [disableBackPress, setDisableBackPress] = useState(true)
  const theme = useAppSelector(state => state.theme.theme)

  useEffect(() => {
    fetchChatPreviews();
  }, []);

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
                  router.push('/(trade)/buytrading')
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


  const fetchReceiverData = async (sellerId: string) => {
    try {
        const body = {
            userId: sellerId
        }
      const response = await axios.post(`user/get/info`, body);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }

  };


  const fetchChatPreviews = async () => {
    try {
      setIsLoading(true);

      const body = {
        senderId: userData._id
      }
      const response = await axios.post(`chat-preview`, body);

      console.log(response.data.message, 'chats')



      const chatPreviews = await Promise.all(
        response.data.message.map(async (preview: any) => {
          // Assuming `userId` is the ID of the current user
// `preview.participants` is an array of two participants
const userId = userData._id; // Current user's ID
const [id1, id2] = preview.participants; // Get both participants

let senderId, receiverId;

if (userId === id1) {
  // If the current user is the first participant, they are the sender
  senderId = id1;
  receiverId = id2;
} else {
  // If the current user is the second participant, they are the sender
  senderId = id2;
  receiverId = id1;
}

// Now you can fetch receiver data regardless of the order

          const sellerInfo = await fetchReceiverData(receiverId);

          console.log(sellerInfo.message, 'info')
          return {
            id: preview._id,
            name: `${sellerInfo.message?.firstName} ${sellerInfo.message?.lastName}` || 'Unknown', // Set the name or a default
            lastMessage: preview.recentMessage,
            time: preview.updatedAt,
            profileUrl: sellerInfo[0]?.profileImage || '',
            sellerId: receiverId,
            image: preview.recentImage
            // isNewMessage: false, // You can set this based on your logic
          };
        })
      );
  
  
    


      console.log(chatPreviews)
      setChats(chatPreviews);
      dispatch(getMessagesData(chatPreviews));
    } catch (err) {
      ToastAndroid.show('Failed to fetch chat previews! Try again', ToastAndroid.SHORT);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatPress = (id: string) => {
    console.log('Chat ID:', id);

    router.push(`/(trade)/chats/${id}`)
    // Navigate to chat screen or perform other actions
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchChatPreviews()]);
    setRefreshing(false);
  };


  return (
    
    <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
        
<ThemedText style={styles.title}>{`${userData.firstName} ${userData.lastName} Chats `}</ThemedText>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Chats"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={'#eee'}
      />
      <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
      >
      <View style={{alignItems:'center'}}>
      {isLoading && <Wave size={50} color={theme?'white':'black'}/>}
      </View>
      <View style={{marginTop:20}}>

        {
          filteredChats.length ? filteredChats.map(item => <ChatPreview
          key={item.id}
            id={item.id}
            name={item.name}
            lastMessage={item.lastMessage}
            time={item.time}
            profileUrl={item.profileUrl}
            isNewMessage={item.isNewMessage}
            image={item.image}
            onPress={()=> handleChatPress(item?.sellerId)}
          />)
        : <ThemedText style={styles.label}>You have no chats</ThemedText>
    }
    
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:16
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop:20,
    paddingVertical:10
  },
  title:{
    fontFamily:'MonsterBold',
    fontSize:20
  },
  label:{
    textAlign:'center',
    fontFamily:'MonsterReg',
    marginTop:20
  }
});

export default ChatListScreen;
