import React from "react"
import AppBody from "../../components/share/app/AppBody"
import { Box, extendTheme, Heading, SimpleGrid } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react"
import { Input, Switch, Flex, Spacer } from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"
//import { ChevronRightIcon } from "@chakra-ui/icons"
//import { AddIcon } from "@chakra-ui/icons"
const theme = extendTheme({
    component:{
    Modal:{
        size:{
            xl:{
                h:"689px",
                w:"824px",
            }
        }
    }},
    colors: {
        brand: {
            "200": "#9AE6B4",
        },
    },
})

const timetable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <AppBody>
            timetable
            <SimpleGrid columns={[1, 6]} spacing="40px">
                <IconButton aria-label="previous" icon={<ChevronLeftIcon />} />

                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Date
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Month
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Year
                </Box>
                <IconButton aria-label="next" icon={<ChevronRightIcon />} />
                <IconButton
                    onClick={onOpen}
                    w="60px"
                    h="62px"
                    colorScheme="green"
                    aria-label="Add event"
                    size="sm"
                    icon={<AddIcon />}
                    borderRightRadius="55"
                    borderLeftRadius="55"
                />
                <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="xl" >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader ><Heading color='black'>Add Event</Heading></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Event name</FormLabel>
                                <Input ref={initialRef} placeholder="Meeting with PM" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input placeholder="Detail about event" size="lg" />
                            </FormControl>

                            <Flex>
                                <FormControl mt={4}>
                                    <FormLabel>Start Time</FormLabel>
                                    <Input placeholder="Select time" size="xs" type="datetime-local" />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>End Time</FormLabel>
                                    <Input placeholder="Select time" size="xs" type="datetime-local" />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Event Type</FormLabel>
                                    <Select placeholder="Select Event Type" width="151px" height="32px">
                                        <option>Course</option>
                                        <option>Assignment</option>
                                        <option>Activity</option>
                                    </Select>
                                </FormControl>
                            </Flex>
                            <FormControl mt={4}>
                                <FormLabel>Location</FormLabel>
                                <Input placeholder="Place/ Platform" />
                            </FormControl>

                            <FormControl display="flex" alignItems="center">
                                 <Switch id="notification" size="md"/>
                                 <FormLabel htmlFor="notification" mb="0">
                                    Notification
                                </FormLabel>
                               
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} width="239px" height="40px" bg="#319795">
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </SimpleGrid>
        </AppBody>
    )
    // }
}

export default timetable
