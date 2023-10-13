import { Button, Link as ChakraLink } from "@chakra-ui/react";
// type LoginSignUpButtonProps = {
//     props: string;
//     text: string;
// }
const LogOutButton = () => {
  return (
    <ChakraLink href={'/accounts'}>
      <Button size='md'>{"LogOut"}</Button>
    </ChakraLink>
  );
}
export default LogOutButton;