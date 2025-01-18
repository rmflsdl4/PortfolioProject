// index.js
import React from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {name as appName} from './app.json';

import ChatbotMain from './ChatbotMain.jsx';
import ChatbotLogin from './ChatbotLogin.jsx';
import ChatbotRegister from './ChatbotRegister.jsx';
import ChatbotMenu from './ChatbotMenu.jsx';

// ✅ 'App.js' 파일이 없고, index.js에서 모든 것을 처리한다면
//    불필요한 import는 제거합니다. (예: import App from './App';)

const Stack = createStackNavigator();

// 네비게이션 루트를 담당하는 컴포넌트를 만듭니다.
function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChatbotMain"
        screenOptions={{
          headerShown: false, // 기본적으로 헤더 숨김
        }}
      >
        <Stack.Screen name="ChatbotMain" component={ChatbotMain} />
        <Stack.Screen name="Login" component={ChatbotLogin} />
        <Stack.Screen name="Register" component={ChatbotRegister} />
        <Stack.Screen name="Menu" component={ChatbotMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// React Native 앱 등록
AppRegistry.registerComponent(appName, () => MainApp);
