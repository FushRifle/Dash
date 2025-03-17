import Loginpage from "@/app/login/page";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

interface ManagerProp {
  children: React.ReactNode;
}

// Define the GraphQL mutation for refreshing the access token
const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
    }
  }
`;

const Manager = ({ children }: ManagerProp) => {
  // const router = useRouter();
  const [isTokenValid, setIsTokenValid] = useState(false);

  console.log(isTokenValid, "Outside useEffect");

  // Use Apollo Client's useMutation hook to perform the refresh token mutation
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);
  console.log(children);

  const refreshToken = JSON.parse(localStorage.getItem("refreshToken") ?? "0");
  useEffect(() => {
    // const refreshTokenExpiresIn = JSON.parse(
    //   localStorage.getItem("refreshTokenExpiresIn") ?? "0"
    // );
    // const refreshTokenIsExpired = Date.now() >= refreshTokenExpiresIn;
    // const fetchNewAccessToken = async () => {
    //   if (refreshToken && !refreshTokenIsExpired) {
    //     try {
    //       const { data } = await refreshTokenMutation({
    //         variables: { refreshToken },
    //       });
    //       console.log(data?.refreshToken?.token, "myData");
    //       const { accessToken } = data.refreshToken?.token;
    //       // Store the new access token and its expiration time in localStorage
    //       localStorage.setItem("token", accessToken);
    //       setIsTokenValid(true);
    //       console.log(isTokenValid, "Outside useEffect");
    //     } catch (error) {
    //       console.error("Failed to refresh access token:", error);
    //       setIsTokenValid(false);
    //     }
    //   } else {
    //     setIsTokenValid(false);
    //   }
    // };
    // fetchNewAccessToken();
  }, [refreshToken]);

  // if (isTokenValid) {
  return <div className="page-container">{children}</div>;
  // }

  // else {
  //   return <Loginpage />;
  // }
};

export default Manager;
