import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

type AuthProps = {
  authState?: {token: string | null; authenticated: boolean | null};
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
};

const TOKEN_KEY = process.env.TOKEN_KEY!;
const API_URL = process.env.API_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<AuthProps['authState']>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const onRegister = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
      return {error: true, msg: (error as any).response.data.msg};
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      setAuthState({
        token: response.data.token,
        authenticated: true,
      });
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
    } catch (error) {
      console.log(error);
      return {error: true, msg: (error as any).response.data.msg};
    }
  };

  const onLogout = async () => {
    // delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    // delete HTTP Headers
    delete axios.defaults.headers.common.Authorization;
    // reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    authState,
    onRegister,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
