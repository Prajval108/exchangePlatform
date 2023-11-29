import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Form,
  FocusLock,
  useDisclosure,
  Text,
  Center
} from '@chakra-ui/react';
import { AiFillSetting } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md"
import AuthButton from '../components/authButton';
import { signOut, useSession } from 'next-auth/react';
import { AiOutlineDisconnect } from "react-icons/ai";
import { disconnect } from '@wagmi/core';


export default function Home() {
  const { data: session, status } = useSession();
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)

  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);

  const handleExchange = () => {
    console.log('Exchange initiated');
  };
  return (
    <Flex justify="center" align="center" height="100vh">
      <Box width={["90%", "80%", "70%", "60%", "50%", "40%"]} p="4" borderWidth="1px" borderRadius="lg" backgroundColor="grey.200">
        <Flex py="10px" justifyContent="flex-end">
          {session && <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            placement='right'
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton size='sm' icon={<AiFillSetting size="20px" />} />
            </PopoverTrigger>
            <PopoverContent p={5}>
              <PopoverHeader fontWeight='semibold'>User</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody mt="10px">
                <Flex style={{ cursor: "pointer" }} onClick={(e) => {
                  e.preventDefault();
                  disconnect();
                  signOut();
                }}>
                  < AiOutlineDisconnect size="22px" />
                  <Text pl={2}>
                    Disconnect Wallet
                  </Text>

                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>}
        </Flex>

        <Box backgroundColor="#f9f9f9" p="5" borderRadius="20px">
          <FormControl>
            <FormLabel fontSize="13px">You Pay</FormLabel>
            <Flex>
              <Input type='number' mr={2} border="none" placeholder='0' />
              <Select
                borderRadius="15px"
                width="30%"
                backgroundColor="white"
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
              >
                <option value="token1"> AlSayad</option>
                <option value="token2"> Matic</option>
              </Select>
            </Flex>
          </FormControl>
          <Flex justifyContent="flex-end" mr="10%" mt="20px">
            <MdAccountBalanceWallet size="25px" />: {fromBalance}
          </Flex>
        </Box>


        <Box mt={"4"} backgroundColor="#f9f9f9" p="5" borderRadius="20px">
          <FormControl>
            <FormLabel fontSize="13px">You Get</FormLabel>
            <Flex>
              <Input type='number' mr={2} border="none" placeholder='0' />
              <Select
                borderRadius="15px"
                width="30%"
                backgroundColor="white"
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
              >
                <option value="token1"> AlSayad</option>
                <option value="token2"> Matic</option>
              </Select>
            </Flex>
          </FormControl>
          {/* <Flex justifyContent="flex-end" mr="10%" mt="20px">
            <MdAccountBalanceWallet size="25px" />: {fromBalance}
          </Flex> */}
        </Box>
        {session ? <Button
          mt="4"
          fontWeight="bold"
          width="100%"
          height="60px"
          borderRadius="15px"
          color="#fc75ff"
          backgroundColor="#ffefff"
          colorScheme='gray'
          onClick={handleExchange}
        >
          Swap
        </Button> :
          <AuthButton />}
      </Box>
    </Flex>
  )
}
