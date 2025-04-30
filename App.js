// App.js (Complete Updated Version)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './AuthContext';

// Screens
import LessonsScreen from './screens/LessonsScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import TranslatorScreen from './screens/TranslatorScreen';
import LessonDetailScreen from './screens/LessonDetailScreen';
import QuizScreen from './screens/QuizScreen';
import RandomWordScreen from './screens/RandomWordScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function LessonsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LessonsHome"
        component={LessonsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee',
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 4,
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#8e8e8e',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          elevation: 5,
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          borderRadius: 50,
        },
      }}
    >
      <Tab.Screen
        name="Lessons"
        component={LessonsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="comment-processing-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Translator"
        component={TranslatorScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="google-translate" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Random Word"
        component={RandomWordScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alphabetical" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Root navigator that handles authentication state
function RootNavigator() {
  const { currentUser } = useAuth();
  
  return (
    <>
      {currentUser ? <MainTabNavigator /> : <AuthStackScreen />}
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}