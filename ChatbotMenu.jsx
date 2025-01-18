import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatbotMenu = ({ onClose }) => {
    const slideAnim = React.useRef(new Animated.Value(300)).current; // 초기 위치 (화면 밖)
    const navigation = useNavigation(); // 네비게이션 객체 생성
  
    React.useEffect(() => {
      // 애니메이션 시작 (슬라이드 인)
      Animated.timing(slideAnim, {
        toValue: 0, // 화면 안으로 슬라이드
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, []);
  
    const closeMenu = () => {
      // 애니메이션 시작 (슬라이드 아웃)
      Animated.timing(slideAnim, {
        toValue: 300, // 화면 밖으로 슬라이드
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onClose(); // 메뉴 닫기
      });
    };
  
    // 메뉴 데이터
    const menuItems = [
      { id: 1, label: '로그인', border: true, action: () => navigation.navigate('Login') },
      { id: 2, label: '광주대학교 홈페이지', border: false },
      { id: 3, label: '학사일정', border: false },
      { id: 4, label: '웹메일', border: false },
      { id: 5, label: '누리시스템', border: false },
      { id: 6, label: '인터넷 증명서', border: true },
      { id: 7, label: '의견 보내기', border: false },
      { id: 8, label: '이용 안내', border: false },
      { id: 9, label: '설정', border: true },
    ];
  
    return (
      <Animated.View
        style={[
          styles.menuContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={closeMenu} style={styles.backButton}>
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>메인 메뉴</Text>
        </View>
  
        {/* 메뉴 항목 */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItemContainer}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={item.action} // 여기에서 action 연결
              >
                <Image
                  // source={require('./assets/[your-icon.png]')}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
              {item.border && <View style={styles.menuItemBorder} />}
            </View>
          ))}
        </View>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    menuContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 410,
      backgroundColor: '#ffffff',
      shadowColor: '#000', // 그림자 색상
      shadowOffset: { width: 0, height: 5 }, // 그림자 위치 (아래쪽으로)
      shadowOpacity: 0.3, // 그림자 투명도
      shadowRadius: 5, // 그림자 흐림 정도
      elevation: 3, // Android 전용 그림자
      zIndex: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', // 헤더 내용 중앙 정렬
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      height: 75,
      zIndex: 10,
    },
    backButton: {
      position: 'absolute',
      left: 20, // 화살표 버튼 왼쪽 정렬
      zIndex: 10,
    },
    arrowText: {
      color: '#004E2B',
      fontSize: 40, // 화살표 크기 조정
      fontWeight: 'bold',
      transform: [{ translateY: -10 }],
      zIndex: 10,
    },
    headerTitle: {
      fontSize: 24, // 메인 메뉴 폰트 크기
      fontWeight: 'bold',
      color: '#004E2B',
      transform: [{ translateY: -1 }],
    },
    menuList: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      zIndex: 10,
    },
    menuItemContainer: {
      marginBottom: 5, // 각 메뉴 간격
      zIndex: 10,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      zIndex: 10,
    },
    menuIcon: {
      width: 30,
      height: 30,
      marginRight: 20,
      zIndex: 10,
    },
    menuText: {
      fontSize: 18,
      color: '#004E2B',
      fontWeight: 'bold',
      zIndex: 10,
    },
    menuItemBorder: {
      height: 1,
      backgroundColor: '#EBF1EE',
      marginTop: 5, // 메뉴 아이템과 경계 사이의 간격
      zIndex: 10,
    },
  });

export default ChatbotMenu;
