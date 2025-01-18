import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatbotLogin = () => {
  const [username, setUsername] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const navigation = useNavigation(); // 네비게이션 훅

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('알림', '아이디와 비밀번호를 입력해주세요.');
      return;
    }
    Alert.alert('입력된 정보', `아이디: ${username}\n비밀번호: ${password}`);
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register'); // 회원가입 화면으로 이동
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.languageButton}>
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>로그인</Text>
        <View style={{ width: 40 }} />
      </View>

      <Image source={require('./assets/CircleLogo.png')} style={styles.logo} />

      <Text style={styles.title}>광주대학교 챗봇</Text>
      <Text style={styles.subtitle}>GWANGJU UNIVERSITY CHAT BOT</Text>

      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#999999"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#999999"
        secureTextEntry={true} // 비밀번호를 *로 표시
        value={password}
        onChangeText={setPassword}
        selectionColor="#000000" // 커서 색상
        color="#000000" // 텍스트 색상
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.registerLinkContainer}>
        <TouchableOpacity onPress={handleRegisterNavigation}>
          <Text style={styles.registerText}>GU BOT은 처음이신가요?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0, // 상단 패딩 제거
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 70, // 헤더 높이 조정
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 0, // 여백 제거
  },
  headerText: {
    color: '#004E2B',
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#004E2B',
    fontSize: 40,
    fontWeight: 'bold',
    bottom: 5,
  },
  logo: {
    top: 50,
    width: 150,
    height: 150,
  },
  title: {
    top: 50,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#004E2B',
    marginTop: 10,
  },
  subtitle: {
    top: 50,
    fontSize: 16,
    color: '#004E2B',
    marginBottom: 30,
  },
  input: {
    top: 50,
    width: '80%',
    height: 60,
    borderWidth: 1,
    borderColor: '#004E2B',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    color: '#000000', // 텍스트 색상
  },
  loginButton: {
    top: 50,
    width: '80%',
    height: 50,
    backgroundColor: '#004E2B',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLinkContainer: {
    top: 50,
    marginVertical: 10,
    alignItems: 'center',
  },
  registerText: {
    color: '#888484',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ChatbotLogin;
