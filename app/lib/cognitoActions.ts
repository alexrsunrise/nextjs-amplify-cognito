import { redirect } from 'next/navigation';
import { signUp, confirmSignUp, signIn, signOut } from 'aws-amplify/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn({
      username: String(formData.get('email')),
      password: String(formData.get('password')),
    });
  } catch (error: any) {
    return error.message;
  }
  redirect('/dashboard');
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get('email')),
      password: String(formData.get('password')),
      options: {
        userAttributes: {
          email: String(formData.get('email')),
          name: 'Alex',
        },
        // optional
        autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      },
    });
  } catch (error: any) {
    console.log(error);
    return error.message;
    throw error;
  }
  redirect('/confirm-signup');
}

export async function confirm(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: String(formData.get('email')),
      confirmationCode: String(formData.get('code')),
    });
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
  redirect('/dashboard');
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error: any) {
    console.log('error signing out: ', error);
  }
  redirect('/login');
}