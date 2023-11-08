import { Text, Input, Tr, Td, Button, ChakraProvider, Tbody, Grid, GridItem, HStack, TableContainer, Accordion, AccordionItem } from "@chakra-ui/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { start } from "repl";
import { CloseIcon, Icon } from "@chakra-ui/icons";

function Home() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <ChakraProvider>
      <Header />
      <Text></Text>
      <Grid templateColumns="1fr 1fr" gap={4}>
        <GridItem>
          <HStack>
            <Input
              type="text"
              color={"black"}
              placeholder="Add a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button colorScheme="blue" onClick={addTask}>
              Add
            </Button>
          </HStack>
        </GridItem>
        <GridItem>
          <Accordion>
            {tasks.map((task, index) => (
              <AccordionItem key={index} w="100%" justifyContent="space-between" alignItems="center">
                <Text color={"black"} p={1} m={3}>{task}
                <Button
                  colorScheme="red"
                  size="sm"
                  marginLeft={3}
                  onClick={() => deleteTask(index)}
                >
                  <CloseIcon/>
                </Button>
                </Text>
              </AccordionItem>
            ))}
          </Accordion>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default Home;
