import AuthForm from "@/components/auth/AuthForm";
import React from "react";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const AuthenticationPage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta
          name="description"
          content="Login or signup to keep your tasks at one place!"
        />
      </Head>
      <AuthForm />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AuthenticationPage;
