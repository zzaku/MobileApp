import { SearchIcon } from "lucide-react-native"
import { Heading } from "@gluestack-ui/themed"
import { Box, Input, InputSlot, InputField, InputIcon } from '@gluestack-ui/themed';
import { View, StyleSheet, Text } from 'react-native';
import { useAuth } from "../context/firebaseContext";
import { useEffect, useState } from "react";

const HomeHeader = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const [searchText, setSearchText] = useState("");


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Box width="$full" flexDirection="row" justifyContent='space-around' marginTop="$2" alignItems="center" height="100%">
                    <Box flexDirection="column">
                        <Heading style={[styles.whiteColor, styles.title]}>Mes Projets</Heading>
                        <Text style={styles.whiteColor}>Nombre de projet : {currentUser?.projects?.length}</Text>
                    </Box>
                    <Input variant="rounded" w="50%" onch>
                        <InputSlot pl="$5">
                            <InputIcon as={SearchIcon} />
                        </InputSlot>
                        <InputField color="#FBFAF9" placeholder="Rechercher..." onChangeText={text => setSearchText(text)}  />
                    </Input>
                </Box>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 6
    },
    whiteColor: {
        color: "#FBFAF9",
    },
    container: {
        flex: 1,
        backgroundColor: "#140F3F",
    },
    content: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#2B339B", 
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomWidth: 2,
        borderStartWidth: 2,
        borderEndWidth: 2,
        borderColor: "#FBFAF9"
    }
});

export default HomeHeader