// GoogleAuth.js - Create this file to properly handle Google Auth in Expo
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebase';

// Register for redirect URI
WebBrowser.maybeCompleteAuthSession();

// NOTE: Replace these with your own configuration
// You need to create a project in Google Cloud Console and configure OAuth
const WEB_CLIENT_ID = '532986915064-h7gp3411ufsoqj2ffvg1ejnbf44cnv51.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com';
const IOS_CLIENT_ID = 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com';

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });

  async function signInWithGoogle() {
    const result = await promptAsync();
    
    if (result.type === 'success') {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
      return signInWithCredential(auth, credential);
    }
    
    return null;
  }

  return {
    signInWithGoogle,
    googleAuthReady: !!request,
  };
}