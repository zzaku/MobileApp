import { Text, StyleSheet } from 'react-native';
import { Card, Heading, Box, Avatar, AvatarFallbackText, AvatarImage, VStack, Divider, Image } from '@gluestack-ui/themed';

const ProjectCard = () => {

    return (
        <Card style={styles.cardContainer} w={350} p="$5" variant="elevated" bg='#262551' maxHeight={400} borderRadius="$lg" borderWidth={3} borderColor='#F5FCFF' maxWidth={500} m="$3">
          <Image
            mb="$3"
            borderRadius="$md"
            alt='image'
            sx={{
              width: "$full",
              height: 140,
              "@sm": {
                mb: "$0",
                mr: "$3",
                width: 200,
                height: 154,
              },
            }}
            source={{
              uri: "https://cdn.dribbble.com/users/1171903/screenshots/16813141/media/a5dbf7b00059f0e7c8956d7f668f504e.jpg?resize=400x300&vertical=center",
            }}
          />
      <Box flexDirection="row" justifyContent='center'>
        <VStack>
          <Heading size="md" style={styles.whiteColor} fontFamily="$heading" mb="$1">
            My super project !
          </Heading>
        </VStack>
      </Box>
      <Box flexDirection="row" justifyContent='center'>
      <VStack
          alignItems="center"
          sx={{
            pt: "$3",
            "@sm": {
              flex: 1,
              pt: "$0",
            },
          }}
        >
          <Heading style={styles.whiteColor} size="xs" fontFamily="$heading">
            +4
          </Heading>
          <Text style={styles.whiteColor}  size="xs">collaborateurs</Text>
          <VStack
          alignItems="start"
          display='flex'
          flexDirection='row'
          justifyContent='flex-start'
          sx={{
            pt: "$2",
            "@sm": {
              flex: 1,
              pt: "$0",
            },
          }}
        >
          <Avatar mr="$4">
          <AvatarFallbackText fontFamily="$heading">JD</AvatarFallbackText>
        </Avatar>
          <Avatar mr="$4">
          <AvatarFallbackText fontFamily="$heading">JD</AvatarFallbackText>
        </Avatar>
          <Avatar mr="$4">
          <AvatarFallbackText fontFamily="$heading">JD</AvatarFallbackText>
        </Avatar>
          <Avatar mr="$4">
          <AvatarFallbackText fontFamily="$heading">JD</AvatarFallbackText>
        </Avatar>
        </VStack>
        </VStack>
      </Box>
      <Box
        my="$5"
        display='flex'
        flexDirection='row'
        justifyContent='space-around'
        alignItems='center'
      >
        <VStack
          alignItems="center"
          sx={{
            pb: "$2",
            "@sm": {
              flex: 1,
              pb: "$0",
              borderRightWidth: 1,
              borderColor: "$backgroundLight300",
              _dark: {
                borderRightColor: "$backgroundDark800",
              },
            },
          }}
        >
          <Heading style={styles.whiteColor} size="xs" fontFamily="$heading">
            8
          </Heading>
          <Text style={styles.whiteColor} size="xs">colonnes</Text>
        </VStack>
        <Divider
          orientation="vertical"
          height="60%"
          alignSelf="center"
          sx={{
            bg: "$backgroundLight300",
            display: "flex",
            _dark: {
              bg: "$backgroundDark800",
            },
            "@sm": {
              display: "none",
            },
          }}
        />
        <VStack
          alignItems="center"
          sx={{
            py: "$2",
            "@sm": {
              flex: 1,
              py: "$0",
              borderRightWidth: 1,
              borderColor: "$backgroundLight300",
              _dark: {
                borderRightColor: "$backgroundDark800",
              },
            },
          }}
        >
          <Heading style={styles.whiteColor} size="xs" fontFamily="$heading">
            18
          </Heading>
          <Text style={styles.whiteColor} size="xs">tâches</Text>
        </VStack>
      </Box>
    </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleWrapper: {

    },
    inputWrapper: {

    },
    whiteColor: {
        color: "#FBFAF9",
    }
});

export default ProjectCard