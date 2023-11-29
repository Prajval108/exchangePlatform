import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";

function AuthButton() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const { data: session, status } = useSession();

  console.log("connected", address, isConnected);
  // console.log("session", session, status);

  const handleLogin = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      console.log("dasta", message, signature);
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      });
    } catch (error) {
      console.log("errorkjgjg", error);
      // window.alert(error)
    }
  };

  // useEffect(() => {
  //   console.log(isConnected);
  //   if (isConnected && !session) {
  //     handleLogin();
  //   }
  // }, [isConnected]);

  return (
    <>
      {!session ? (
        <Button
          mt="4"
          fontWeight="bold"
          width="100%"
          height="60px"
          borderRadius="15px"
          color="#fc75ff"
          backgroundColor="#ffefff"
          colorScheme='gray'
          onClick={(e) => {
            e.preventDefault();
            if (!isConnected) {
              connect();
            } else {
              handleLogin();
            }
          }}
        >
          Sign-in
        </Button>
      ) : (
        <Button
          mt="4"
          fontWeight="bold"
          width="100%"
          height="60px"
          borderRadius="15px"
          color="#fc75ff"
          backgroundColor="#ffefff"
          colorScheme='gray'
          onClick={(e) => {
            e.preventDefault();
            disconnect();
            signOut();
          }}
        >
          Sign-out
        </Button>
      )}
    </>
  );
}

export default AuthButton;
