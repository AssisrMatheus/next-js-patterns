import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm";
import { graphql } from "../../generated/gql";
import { SignupUserMutationVariables } from "../../generated/gql/graphql";
import styles from "../../styles/Home.module.css";

const SIGNUP_USER_MUTATION = graphql(/* GraphQL */ `
  mutation SignupUser($email: String!, $name: String!, $password: String!) {
    signupUser(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`);

const SignUp: NextPage = () => {
  const [signUpUser] = useMutation(SIGNUP_USER_MUTATION);
  const { push } = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up</title>
      </Head>

      <main className={styles.main}>
        <AuthForm
          isSignup
          onSubmit={async (form) => {
            try {
              await signUpUser({
                variables: form as SignupUserMutationVariables,
              });

              signIn("credentials", form);
            } catch (e) {
              // if (err instanceof ApolloError) {}

              if (e instanceof Error) {
                push(`/auth/signup?error=${encodeURIComponent(e.message)}`);
              }
            }
          }}
        />
      </main>
    </div>
  );
};

export default SignUp;
