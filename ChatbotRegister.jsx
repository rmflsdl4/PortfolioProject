import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const ChatbotRegister = () => {
  const [username, setUsername] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인
  const [department, setDepartment] = useState(''); // 학과 선택
  const navigation = useNavigation(); // 네비게이션 훅

  const handleRegister = () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim() || !department.trim()) {
      Alert.alert('알림', '모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
      return;
    }
    Alert.alert('회원가입 완료', `아이디: ${username}\n학과: ${department}`);
  };

  const handleLoginNavigation = () => {
    navigation.navigate('Login'); // 로그인 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.languageButton}>
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>회원가입</Text>
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
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        placeholderTextColor="#999999"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Picker
        selectedValue={department}
        onValueChange={(itemValue) => setDepartment(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="학과" value="" />
        <Picker.Item label="컴퓨터공학과" value="컴퓨터공학과" />
        <Picker.Item label="정보통신공학과" value="정보통신공학과" />
        <Picker.Item label="소프트웨어공학과" value="소프트웨어공학과" />
      </Picker>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>회원가입</Text>
      </TouchableOpacity>

      <View style={styles.loginLinkContainer}>
        <TouchableOpacity onPress={handleLoginNavigation}>
          <Text style={styles.loginText}>이미 계정이 있으신가요?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  languageButton: {
    padding: 10,
  },
  buttonText: {
    color: '#004E2B',
    fontSize: 25,
    fontWeight: 'bold',
  },
  logo: {
    top: 30,
    width: 150,
    height: 150,
  },
  title: {
    top: 30,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#004E2B',
    marginTop: 10,
  },
  subtitle: {
    top: 30,
    fontSize: 16,
    color: '#004E2B',
    marginBottom: 30,
  },
  input: {
    top: 30,
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#004E2B',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    color: '#000000', // 텍스트 색상
  },
  picker: {
    top: 30,
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#004E2B',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    color: '#000000', // 텍스트 색상
  },
  registerButton: {
    top: 30,
    width: '80%',
    height: 50,
    backgroundColor: '#004E2B',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    top: 30,
    marginVertical: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#888484',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ChatbotRegister;
