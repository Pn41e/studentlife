import { Box, useBreakpointValue, Button, Center, Image, Link, SimpleGrid, Spinner, Tag, Text } from "@chakra-ui/react"
import { CARD_QUEUE } from "src/components/dating/shared/card_queue"
import { INTERESTS } from "src/components/dating/shared/interests"
import TinderCard from "react-tinder-card"
import DatingAppBody from "src/components/dating/DatingAppBody"
import React, { useState, useMemo, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import ProfileImg from "../../components/dating/pic/profile.png"
import DatingRandomTag from "src/components/dating/DatingRandomTag"
import DatingRandomCrossButton from "src/components/dating/DatingRandomCrossButton"
import DatingRandomHeartButton from "src/components/dating/DatingRandomHeartButton"

const DatingRandomization = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    const [currentIndex, setCurrentIndex] = useState(CARD_QUEUE.length - 1)
    const characters = CARD_QUEUE
    const interests = INTERESTS
    const currentIndexRef = useRef(currentIndex)
    const controlCross = useAnimation()
    const controlHeart = useAnimation()

    const childRefs: React.RefObject<any>[] = useMemo(
        () =>
            Array(CARD_QUEUE.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val

        if (val == -1) {
            setTimeout(() => location.reload(), 1000)
        }
    }

    const canSwipe = currentIndex >= 0

    const swiped = (direction: string, nameToDelete: string, index: number) => {
        console.log("Swiping " + nameToDelete + " to the " + direction)
        if (direction === "left") {
            controlCross.start("visible")
        } else if (direction === "right") {
            controlHeart.start("visible")
        }

        updateCurrentIndex(index - 1)
    }

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < CARD_QUEUE.length) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    }

    return (
        <DatingAppBody userSelect="none">
            <SimpleGrid overflow={{ base: "hidden", md: "visible" }} columns={{ base: 1, md: 2 }} h={{ base: "600px", md: "530px" }}>
                <Box overflow={{ base: "visible", md: "hidden" }} w={{ md: "379px" }}>
                    <Box className="cardContainer">
                        <Center display="flex">
                            <Box
                                borderRadius="10px"
                                w={{ base: "326px", md: "379px" }}
                                h={{ base: "402px", md: "464px" }}
                                position="absolute"
                                top={{ base: "114px", md: "200px" }}
                                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                backgroundColor="orange.400"
                            >
                                <Spinner size="lg" />
                            </Box>
                        </Center>
                        {characters.map((character, index) => (
                            <TinderCard
                                ref={childRefs[index]}
                                className="swipe"
                                key={character.UserId}
                                onSwipe={(dir: string) => swiped(dir, character.Fname + " " + character.Lname, index)}
                                preventSwipe={["down", "up"]}
                            >
                                <Center>
                                    <Box
                                        borderRadius="10px"
                                        backgroundImage={character.url}
                                        w={{ base: "326px", md: "379px" }}
                                        h={{ base: "402px", md: "464px" }}
                                        backgroundSize="cover"
                                        className="card"
                                        id={character.UserId}
                                        position="absolute"
                                        top="30px"
                                        display="flex"
                                        alignItems="end"
                                        justifyContent="end"
                                        cursor="pointer"
                                    >
                                        <Link href="../../user">
                                            <Button
                                                aria-label="User Profile"
                                                className="pressable"
                                                w="50px"
                                                h="50px"
                                                colorScheme="orange"
                                                borderRadius="full"
                                                mr="10px"
                                                mb="10px"
                                            >
                                                <Image className="pressable" src={ProfileImg}></Image>
                                            </Button>
                                        </Link>
                                    </Box>
                                </Center>
                            </TinderCard>
                        ))}
                    </Box>
                </Box>
                {characters[currentIndex] != null ? (
                    <Box>
                        <Box pt={{ base: "468px", md: "30px" }}>
                            <motion.div
                                key={currentIndex}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 20,
                                }}
                            >
                                <Box display="flex">
                                    <Text color="black" fontWeight="700" fontSize={{ base: "20px", md: "48px" }} lineHeight="120%" pl="18px">
                                        {isMobile
                                            ? characters[currentIndex].Fname.length > 9
                                                ? characters[currentIndex].Fname.substring(0, 9).concat("...")
                                                : characters[currentIndex].Fname
                                            : characters[currentIndex].Fname.length > 15
                                            ? characters[currentIndex].Fname.substring(0, 15).concat("...")
                                            : characters[currentIndex].Fname}{" "}
                                        {characters[currentIndex].Lname.substring(0, 1)}.
                                    </Text>

                                    <Text
                                        color="black"
                                        fontWeight={{ base: "400", md: "700" }}
                                        fontSize={{ base: "20px", md: "48px" }}
                                        lineHeight="120%"
                                        pl="18px"
                                    >
                                        {characters[currentIndex].Gender}, {characters[currentIndex].Age}
                                    </Text>
                                </Box>
                            </motion.div>
                        </Box>
                        <motion.div
                            key={currentIndex}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <Box color="black" fontWeight="400" fontSize={{ base: "20px", md: "30px" }} lineHeight="120%" h={{ md: "200px" }}>
                                <Text pl="18px" pt="10px">
                                    {isMobile
                                        ? characters[currentIndex].Faculty
                                        : characters[currentIndex].Faculty.length > 30
                                        ? characters[currentIndex].Faculty.substring(0, 30).trim().concat("...")
                                        : characters[currentIndex].Faculty}
                                </Text>
                            </Box>
                        </motion.div>
                        <Box height="70px" overflow={{ base: "hidden", md: "visible" }}>
                            <Box
                                pb="5"
                                height="105px"
                                pl="18px"
                                pt="20px"
                                overflowX={{ base: "auto", md: "visible" }}
                                whiteSpace={{ base: "nowrap", md: "initial" }}
                                style={{ WebkitOverflowScrolling: "touch" }}
                            >
                                {characters[currentIndex].interestId.map((id) => (
                                    <DatingRandomTag id={id} interests={interests} />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box height="596px" pb="150px" display="flex" alignItems="center" justifyContent="center" />
                )}
            </SimpleGrid>
            <Box display="flex" pl={{ base: "18px", md: "55px" }} justifyContent={{ base: "center", md: "start" }}>
                <DatingRandomCrossButton controlCross={controlCross} swipe={swipe} />
                <DatingRandomHeartButton controlHeart={controlHeart} swipe={swipe} />
            </Box>
        </DatingAppBody>
    )
}

export default DatingRandomization
