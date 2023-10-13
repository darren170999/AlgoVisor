import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { MouseEvent } from "react"; // Import MouseEvent
type LogOutButtonProps = {
  onClick: (event: MouseEvent<HTMLElement>) => void; // Define the onClick prop
};
const LogOutButton: React.FC<LogOutButtonProps> = ({ onClick }) => {
  return (
    <ChakraLink href={'/accounts'} onClick={onClick}>
      <Button size='md'>{"LogOut"}</Button>
    </ChakraLink>
  );
};

export default LogOutButton;