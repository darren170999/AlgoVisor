import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import FullScreenSection from "../components/FullScreenSection";

function Admin() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Header />
      <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
        <Card minW="xl">
          <CardBody>
            <Heading as="h1" mb={4}>
              Welcome, Admin!
            </Heading>
            <Button onClick={toggleDrawer} colorScheme="red" variant="outline" position="sticky" top={4} zIndex="stickyButton">
              Open Drawer
            </Button>
            <Divider my={6} />

            <VStack spacing={4} align="start">
              <Box>
                <Heading as="h2" fontSize="xl" mb={2}>
                  Overview
                </Heading>
                <p>
                  This page is developed for administrators to curate content and materials for the learning of IE2108: data structures and algorithm, Project is helmed by Prof Michelle
                </p>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Drawer placement="left" onClose={toggleDrawer} isOpen={isDrawerOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
              <Stack spacing={4}>
                {/* <Link to="/admin/dashboard">
                  <Button variant="ghost">Future*** Dashboard</Button>
                </Link> */}
                <Link to="/admin/question">
                  <Button variant="ghost">Set a Tutorial Question</Button>
                </Link>
                <Link to="/admin/testcase">
                  <Button variant="ghost">Set test cases for question</Button>
                </Link>
                <Link to="/admin/course">
                  <Button variant="ghost">Post a course to concepts</Button>
                </Link>
                <Link to="/admin/delete">
                  <Button variant="ghost">Delete course or questions</Button>
                </Link>
                <Link to="/admin/database">
                  <Button variant="ghost">Observe database metrics</Button>
                </Link>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </FullScreenSection>
    </>
  );
}

export default Admin;
