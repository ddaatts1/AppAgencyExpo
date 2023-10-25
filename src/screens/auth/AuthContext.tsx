import { createContext, useState, useContext, useEffect } from 'react';
import { StorageHelper } from '../../constants/storageHelper';
import _, { values } from "lodash"
import {
  useIsFocused,
} from '@react-navigation/native';
interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  // onRegister?: (username: string, password: string) => Promise<any>;
  // onLogin?: (username: string, password: string) => Promise<any>;
  intro?: { isIntro: boolean | null };
  setIntros?: (value: boolean | null) => void;
  setAuthStates?: (token: string | null, authenticated: boolean | null) => void;
}
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
export default function AuthProvider({ children }: any) {
  // const { isLogout } = useLogin();

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const [intro, setIntro] = useState<{
    isIntro: boolean | null;
  }>({
    isIntro: null,
  });
  // const focus = useIsFocused();
  useEffect(() => {
    const loadToken = async () => {
      try {
        const tokens = await StorageHelper.getToken();
        if (tokens) {
          setAuthState({
            token: tokens,
            authenticated: true,
          });
        } else {
          setAuthState({
            token: null,
            authenticated: false,
          });
        }
        const intro: any = await StorageHelper.getRules();
        const user: any = await StorageHelper.getUser();
        let ruleJson = JSON.parse(intro)
        let userJson = JSON.parse(user)
        const ruleItem = ruleJson?.find((item: any) => item?.email === userJson?.email)
        setIntro({
          isIntro: ruleItem?.isIntro,
        });
      } catch (error) { }
    };
    loadToken();

  }, []);
  const setAuthStates = async (
    token: string | null,
    authenticated: boolean | null,
  ) => {
    return setAuthState({
      token: token,
      authenticated: authenticated,
    });
  };

  const setIntros = async (value: any) => {
    setIntro({
      isIntro: value,
    });

  };
  const value = {
    authState,
    setAuthStates,
    intro,
    setIntros,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
