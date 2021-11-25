import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { useAuth } from "../../Hooks/auth";

import { SingnInSocialButton } from "../../components/SingInSocialBotton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function Signin() {
  const [isLoading, setIsLoading] = useState(true);
  const { SignInWithGoogle, SignInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await SignInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar a conta Google");
      setIsLoading(false);
    } 

  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await SignInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel conectar a conta Apple");
      setIsLoading(false);
    } 
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
        </TitleWrapper>
        <Title>
          Controle suas {"\n"} finanças de forma {"\n"} muito simples
        </Title>
        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SingnInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {
            Platform.OS === "ios" &&
            <SingnInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />}
        </FooterWrapper>
      </Footer>
      {isLoading && (
        <ActivityIndicator
          color={theme.colors.shape}
          style={{ marginTop: 18 }}
        />
      )}
    </Container>
  );
}
