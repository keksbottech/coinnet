import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';

interface ChatPreviewProps {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  profileUrl?: string;
  isNewMessage: boolean;
  onPress: (id: string) => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ id, name= 'kjsj ks', lastMessage, time, profileUrl, isNewMessage, onPress }) => {
  // Extract initials if no profile URL
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.imageContainer}>
        {profileUrl ? (
          <Image source={{ uri: profileUrl }} style={styles.profileImage} />
        ) : (
          <View style={styles.initialsContainer}>
            <ThemedText style={styles.initialsText}>{initials}</ThemedText>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <ThemedText style={styles.nameText}>{name}</ThemedText>
        <ThemedText style={styles.messageText}>{lastMessage}</ThemedText>
      </View>
      <View style={styles.timeContainer}>
        <ThemedText style={styles.timeText}>{time}</ThemedText>
        {isNewMessage && <View style={styles.newMessageIndicator} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imageContainer: {
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageText: {
    color: '#555',
    marginTop: 4,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  newMessageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3d00',
    marginTop: 4,
  },
});

export default ChatPreview;
