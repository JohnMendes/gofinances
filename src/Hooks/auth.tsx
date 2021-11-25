import React , { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';


interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  SignInWithGoogle(): Promise<void> 
  SignInWithApple(): Promise<void> 
  SingOut(): Promise<void> 
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

const AuthContex = createContext({} as AuthContextData);

function AuthProvider({ children }:AuthProviderProps) {

  const [user, setUser] = useState<User>({} as User)

  async function SignInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const {type, params} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;

      if(type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json();
        setUser({
          id: userInfo.sub,
          email: userInfo.email,
          name:userInfo.name,
          photo:userInfo.picture 
        });
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  
  async function SignInWithApple() {
    try {
      const credencial = await AppleAuthentication.signInAsync({
        requestedScopes:[
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      })

      if (credencial) {
        const name = credencial.fullName!.givenName!
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
        const UserLogged ={
          id: String(credencial.user),
          email: credencial.email!,
          name,
          photo
        }
        setUser(UserLogged);
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  async function SingOut() {
    setUser({} as User)
  }

  return (
  <AuthContex.Provider value={{user, SignInWithGoogle, SignInWithApple,SingOut}}>
    { children }
  </AuthContex.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContex)

  return context;
}

export {AuthProvider, useAuth}
