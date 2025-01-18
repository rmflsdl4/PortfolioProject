import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ChatbotMenu from './ChatbotMenu'; // ChatbotMenu 페이지 가져오기
import { useNavigation } from '@react-navigation/native';

const ChatbotMain = () => {
  const [language, setLanguage] = useState('KR'); // 초기 언어 설정
  const [question, setQuestion] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false); // 메뉴 페이지 표시 여부
  const navigation = useNavigation();

  const LanguageChange = () => {
    setLanguage((prev) => (prev === 'EN' ? 'KR' : 'KR')); // 언어 변경
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible); // 메뉴 페이지 토글
  };

  const SendQuestion = () => {
    if (question.trim() === '') {
      alert('질문을 입력하세요.');
      return;
    }
    alert(`질문 전송: ${question}`);
    setQuestion(''); // 입력창 초기화
  };

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={LanguageChange} style={styles.languageButton}>
          <Text style={styles.buttonText}>{language}</Text>
        </TouchableOpacity>
        {/* 로고 위치 */}
        <Image source={require('./assets/HeaderLogo.png')} style={styles.logo} />
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.buttonText}>☰</Text>
        </TouchableOpacity>
      </View>
      

      {/* 채팅 영역 */}
      <View style={styles.chatArea}>
      </View>

      {/* 하단 입력 필드 */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="라이티에게 궁금한 것을 물어보세요!"
          placeholderTextColor="#999999"
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity onPress={SendQuestion} style={styles.sendButton}>
          <Image
            source={require('./assets/SendIcon.png')} // 전송 버튼 아이콘
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>


      {/* 메뉴 페이지 */}
      {isMenuVisible && (
        <ChatbotMenu
          onClose={toggleMenu}
          style={{
            position: 'absolute', // 화면 위에 고정
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10, // 최상위에 표시
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF1EE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 410,
    paddingVertical: 0,
    paddingHorizontal: 20,
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 100 }, // 그림자 위치 (아래쪽으로)
    shadowOpacity: 0, // 그림자 투명도
    shadowRadius: 1, // 그림자 흐림 정도
    elevation: 3, // Android 전용 그림자
    height: 75,
  },
  languageButton: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 3,
  },
  logo: {
    width: 192,
    height: 64,
  },
  menuButton: {
    color: '#004E2B',
    padding: 20,
  },
  buttonText: {
    color: '#004E2B',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 0,
    marginRight: 0,
  },
  chatArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
  },

  //----------질문 작성 부분----------

  inputArea: {
    flexDirection: 'row',
    justifyContent: 'center', // 컨텐츠를 가로 중앙 정렬
    alignItems: 'center', // 컨텐츠를 세로 중앙 정렬
    height: 50,
    width: 360,
    bottom : 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#004E2B',
    borderRadius: 15, // 전체 컨테이너 둥근 모서리
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 10, // 좌우 여백
  },
  input: {
    flex: 1, // 입력란이 남은 공간 차지
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 15,
  },
  sendButton: {
    width: 40, // 버튼 크기
    height: 40,
    borderRadius: 20, // 완전한 원형
    backgroundColor: '#004E2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5, // 버튼과 입력란 사이 여백
  },
  sendIcon: {
    width: 18, // 아이콘 크기
    height: 18,
    tintColor: '#FFFFFF', // 아이콘 색상
  },
  container: {
    flex: 1,
    justifyContent: 'center', // 화면 세로 중앙 정렬
    alignItems: 'center', // 화면 가로 중앙 정렬
    backgroundColor: '#EBF1EE',
  },
  
});

export default ChatbotMain;
