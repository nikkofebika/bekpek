import React from 'react'
import { ScrollView, Text, View, Box, HStack, IconButton, Icon } from "native-base"
import Ionicon from 'react-native-ionicons'

const Card = () => {
    return (
        <View mx={3} my={2}>
            <Box bg="gray.50" borderTopRadius='lg' >
                <Text bold fontSize="lg" py={1}>Extra Small</Text>
                <Text py={2}>Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi </Text>
            </Box>
            <HStack alignItems="center" justifyContent="space-between" bg="gray.300" borderBottomRadius='lg'>
                <Text>Sen, 27 Feb 2021</Text>
                <IconButton
                    icon={<Icon as={<Ionicon name="trash" />} color="white" />}
                />
            </HStack>
        </View >
    )
}

const Home = () => {
    return (
        <ScrollView>
            <Card />
            <Card />
            <Card />
        </ScrollView>
    )
}

export default Home
