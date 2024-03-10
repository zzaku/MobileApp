import { Text, StyleSheet } from 'react-native';
import { Card, Heading, Box, Avatar, AvatarFallbackText, Button, VStack, Divider, Image, HStack, ButtonIcon, useToast, Toast, ToastDescription, ToastTitle, FlatList } from '@gluestack-ui/themed';
import { StarIcon } from "lucide-react-native"
import { useAuth } from '../../../../core/context/firebaseContext';

const ProjectFavorisCard = ({currentProject}) => {

  const nrbTasks = currentProject.colonnes.reduce((total, colonne) => total + colonne?.done?.length + colonne?.pending?.length + colonne?.upcoming?.length, 0);

  const { setProjectFavoris, currentUserID } = useAuth();
  const toast = useToast()

  const fav = () => {
    console.log
    setProjectFavoris(currentProject.id, true, currentUserID.uid)
    .then(res => {
      if(res.code === "approved")
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>Suppression des favoris</ToastTitle>
                <ToastDescription>
                    Le projet a été retiré de la liste des favoris.
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
    })
  }

    return (
        <Card style={styles.cardContainer} w={350} p="$3" variant="elevated" bg='#262551' maxHeight={400} borderRadius="$lg" borderWidth={3} borderColor='#F5FCFF' maxWidth={400} m="$3">
      <Box flexDirection="row" h="80%" mb="$2" mr="$2" w="$full" alignItems='center' padding={0} justifyContent='start'>
          <Image
            borderRadius="$md"
            margin={0}
            alt='image'
            w="50%"
            sx={{
              width: "$40",
              height: "100%",
              "@sm": {
                mb: "$0",
                mr: "$2",
                width: 200,
                height: 154,
              },
            }}
            source={{
              uri: "https://cdn.dribbble.com/users/1171903/screenshots/16813141/media/a5dbf7b00059f0e7c8956d7f668f504e.jpg?resize=400x300&vertical=center",
            }}
          />
          <Box w="45%" h="100%" ml="$2">
            <HStack w="100%" justifyContent='space-between'>
                <Heading size="md" style={styles.whiteColor} fontFamily="$heading" mb="$5">
                    {currentProject.projectTitle}
                </Heading>
                <Button
              borderRadius="$full"
              alignItems='center'
              justifyContent='center'
              mb="$3"
              bg="#FBFAF9"
              h={40}
              w={1}
              borderColor="#FAB425"
              borderWidth={2}
              action='primary'
              onPress={() => fav()}
            >
              <ButtonIcon as={StarIcon} color='#FAB425' size="lg" />
            </Button>
            </HStack>
            <HStack w="100%">
                <Heading style={styles.whiteColor} mr="$2" size="xs" fontFamily="$heading">
                +{currentProject.collaborators.length}
                </Heading>
                <Text style={styles.whiteColor}  size="xs">{currentProject.collaborators.length > 1 ? "collaborateurs" : "collaborateur"}</Text>
            </HStack>
            <Divider
          orientation="vertical"
          height={1}
          width="$full"
          alignSelf="center"
          mb="$5"
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
            <HStack w="100%">
                <Heading style={styles.whiteColor} mr="$2" size="xs" fontFamily="$heading">
                {currentProject.colonnes.length}
                </Heading>
                <Text style={styles.whiteColor} size="xs">colonnes</Text>
            </HStack>
            <Divider
          orientation="vertical"
          height={1}
          width="$full"
          alignSelf="center"
          mb="$5"
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
            <HStack w="100%">
                <Heading style={styles.whiteColor} mr="$2" size="xs" fontFamily="$heading">
                    {nrbTasks}
                </Heading>
                <Text style={styles.whiteColor} size="xs">tâches</Text>
            </HStack>
          </Box>
      </Box>
      <Divider
          orientation="horizontal"
          height="0.5%"
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
      <Box flexDirection="row">
          <VStack
          alignItems="start"
          display='flex'
          flexDirection='row'
          justifyContent='flex-start'
          sx={{
            pt: "$1",
          }}
        >
            <FlatList
            data={currentProject.collaborators}
            keyExtractor={(item) => item.mail}
            renderItem={({ item }) => (
                <Avatar size="sm" mr="$2">
                  <AvatarFallbackText fontFamily="$heading">{item.mail}</AvatarFallbackText>
                </Avatar>
              )}
            />
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

export default ProjectFavorisCard