import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Card, Heading, Box, Avatar, AvatarFallbackText, Button, VStack, Divider, Image, ButtonIcon, Toast, ToastTitle, ToastDescription, useToast, FlatList } from '@gluestack-ui/themed';
import { StarOffIcon } from "lucide-react-native"
import { useAuth } from '../../../../core/context/firebaseContext';
import { useState } from 'react';

const ProjectCard = ({navigation, currentProject}) => {

  const nrbTasks = currentProject.colonnes.reduce((total, colonne) => total + colonne?.done?.length + colonne?.pending?.length + colonne?.upcoming?.length, 0);

  const { setProjectFavoris, currentUserID } = useAuth();
  const toast = useToast()
  const [isClicked, setIsClicked] = useState(false);

  const fav = () => {
    setProjectFavoris(currentProject.id, false, currentUserID.uid)
    .then(res => {
      if(res.code === "approved")
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>Ajout favoris</ToastTitle>
                <ToastDescription>
                  Le projet a été à la liste des favoris !
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
    })
  }

    // Animation de réduction de taille lors du clic
    const scaleAnim = new Animated.Value(1);
    
    const handleClick = () => {
      setIsClicked(true);
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsClicked(false);
        navigation.navigate('Project', { project: currentProject });
      });
    };

    const cardStyle = isClicked ? { transform: [{ scale: scaleAnim }] } : {};

    return (
          <TouchableOpacity onPress={handleClick}>
            <Animated.View style={cardStyle}>
              <Card style={[styles.cardContainer]} w={350} p="$5" pt="$2" variant="elevated" bg='#262551' maxHeight={400} borderRadius="$lg" borderWidth={3} borderColor='#F5FCFF' maxWidth={500} m="$3">
                <VStack w="$full" alignItems='flex-end'>
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
                    <ButtonIcon as={StarOffIcon} color='#FAB425' size="lg" />
                  </Button>
                  <Image
                    mb="$3"
                    borderRadius="$md"
                    alt='image'
                    sx={{
                      width: "98%",
                      height: 130,
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
                </VStack>
            <Box flexDirection="row" justifyContent='center'>
              <VStack>
                <Heading size="md" style={styles.whiteColor} fontFamily="$heading" mb="$1">
                  {currentProject.projectTitle}
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
                +{currentProject.collaborators.length}
                </Heading>
                <Text style={styles.whiteColor}  size="xs">{currentProject.collaborators.length > 1 ? "collaborateurs" : "collaborateur"}</Text>
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
                {currentProject.colonnes.length}
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
                  {nrbTasks}
                </Heading>
                <Text style={styles.whiteColor} size="xs">tâches</Text>
              </VStack>
            </Box>
          </Card>
        </Animated.View>
      </TouchableOpacity>
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