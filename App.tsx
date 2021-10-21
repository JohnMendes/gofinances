import React from "react";
import {StatusBar} from 'react-native'
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { NavigationContainer } from "@react-navigation/native";
import {AppRoutes} from './src/routes/apptoutes'

import {Signin} from './src/screens/Signin'
import {AuthProvider} from './src/Hooks/auth'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer  >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <AuthProvider>
          <Signin />
        </AuthProvider>        
      </NavigationContainer>
    </ThemeProvider>
  );
}
