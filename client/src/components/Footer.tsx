import { FC, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { subscriberFormDataProps } from "../types/subscriberFormDataProps";
import { fetchAllUsers } from "../api/fetchAllUsers";
import { unsubscribe } from "../api/unsubscribe";
import { fetchAllSubscribers } from "../api/fetchAllSubscribers";
import { subscribe } from "../api/subscribe";

const Footer: FC = () => {
  const [subscriberFormData, setSubscriberFormData] = useState<subscriberFormDataProps>({
    email: "" 
  })
  const [isUnSub, setIsUnSub] = useState<boolean>(false);
  // const [subber, setSubber] = useState<subscriberFormDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchAllUsers();
        const user = localStorage.getItem("username");
        const userWithEmail = users.find((u: { userName: string | null; }) => u.userName === user);
        if (userWithEmail) {
          setSubscriberFormData({ email: userWithEmail.email });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchSubs = () => {
      fetchAllSubscribers()
        .then(subs => {
          // console.log(subs)
          const subber = subs.find((u: {email: string | null; }) => u.email === subscriberFormData.email);
          setIsUnSub(subber === undefined);
          // console.log(isUnSub);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    };
    fetchSubs();
  }, []);

  const handleUnsubscribe = () => {
    // console.log(subscriberFormData)
    unsubscribe(subscriberFormData);
    setIsUnSub(false)
  };

  const handleSubscribe = () => {
    // console.log(subscriberFormData)
    subscribe(subscriberFormData);
    setIsUnSub(true)
  };

  return (
    <Box backgroundColor="#fcc015">
      <footer>
        <Flex
          margin="0 auto"
          px={12}
          color="black"
          justifyContent="center"
          alignItems="center"
          maxWidth="1024px"
          height={16}
        >
          <p>Darren Soh JunHan • © 2023</p>
          {isUnSub ? 
          <a href="#" onClick={handleUnsubscribe} style={{ marginLeft: "1rem" }}>
            Unsubscribe from mailing list
          </a> : 
          <a href="#" onClick={handleSubscribe} style={{ marginLeft: "1rem" }}>
            Subscribe to mailing list
          </a>}
        </Flex>
      </footer>
    </Box>
  );
};

export default Footer;
