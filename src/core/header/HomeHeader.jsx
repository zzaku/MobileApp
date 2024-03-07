import { SearchIcon } from "lucide-react-native"
import { Heading } from "@gluestack-ui/themed"
import { Box, Button, ButtonIcon } from '@gluestack-ui/themed';
import { View, StyleSheet, Text } from 'react-native';

const HomeHeader = () => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Box width="$full" flexDirection="row" justifyContent='space-around' marginTop="$2" alignItems="center" height="100%">
                    <Box flexDirection="column">
                        <Heading style={[styles.whiteColor, styles.title]}>Mes Projets</Heading>
                        <Text style={styles.whiteColor}>Nombre de projet : 8</Text>
                    </Box>
                    <Button
                        borderRadius="$full"
                        size="lg"
                        p="$3.5"
                        bg="#FAB425"
                        borderColor="#212AA2"
                        borderWidth={2}
                        >
                        {/* EditIcon is imported from 'lucide-react-native' */}
                        <ButtonIcon as={SearchIcon} color="#161519" size="xl" />
                    </Button>
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