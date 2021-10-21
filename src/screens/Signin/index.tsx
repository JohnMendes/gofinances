import React, {useContext} from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {Alert} from "react-native"

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import {useAuth} from '../../Hooks/auth'

import {SingnInSocialButton} from '../../components/SingInSocialBotton'

import { Container, Header, TitleWrapper , Title, SignInTitle, Footer, FooterWrapper} from "./styles";

export function Signin() {

  const {SignInWithGoogle} = useAuth();
  
  async function handleSignInWithGoogle(){
    try {
      await SignInWithGoogle(); 

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Google')
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />          
        </TitleWrapper>
        <Title>Controle suas {'\n'} finanças de forma {'\n'} muito simples</Title>
        <SignInTitle>Faça seu login com {'\n'} uma das contas abaixo</SignInTitle>
      </Header>

      <Footer >
        <FooterWrapper>
          <SingnInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
          <SingnInSocialButton title="Entrar com Apple" svg={AppleSvg} />  
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
