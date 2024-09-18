import { Client, Account, OAuthProvider } from 'react-native-appwrite';

let client = new Client();

 client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66be769d000584df514f')
    .setPlatform('com.lexisdevelopment.coinnet');


const account = new Account(client);

export const signinWithGoogle = async () =>{
    try{
        const response = await account.createOAuth2Session(
            OAuthProvider.Google, // provider
            'http://localhost:3000', // success (optional)
            'http://localhost:3000', // failure (optional)
            [] // scopes (optional)
        );

        return response
        
        
    }
    catch(err){
        console.log(err)
    }
}
