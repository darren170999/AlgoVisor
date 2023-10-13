import { Button, Link as ChakraLink } from "@chakra-ui/react";
// type LoginSignUpButtonProps = {
//     props: string;
//     text: string;
// }
const LoginSignUpButton = () => {
  return (
    <ChakraLink href={'/accounts'}>
      <Button size='md'>{"Login/SignUp"}</Button>
    </ChakraLink>
  );
}
export default LoginSignUpButton;