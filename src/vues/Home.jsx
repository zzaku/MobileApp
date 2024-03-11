import { useState, useRef, useEffect } from 'react';
import ProjectCard from '../shared/components/cards/project-card/project-card';
import { Box, Button, ButtonIcon, ButtonText, Spinner, HStack, Heading, Divider, Text } from '@gluestack-ui/themed';
import { FlatList } from 'react-native';
import { PlusCircle } from 'lucide-react-native';
import AddProjectModal from '../shared/components/modals/add-project-modal/add-project-modal';
import { useAuth } from '../core/context/firebaseContext';
import { useLoading } from '../core/context/LoadingContext';
import ProjectFavorisCard from '../shared/components/cards/project-favoris-card/project-favoris-card';

export function Home({navigation}) {
  const [showModal, setShowModal] = useState(false);

  const { currentUserID, currentUser, getAllProjectsByUserId } = useAuth();
  const { loading, setLoading } = useLoading();

  const ref = useRef(null);

  useEffect(() => {
    setLoading(true);
    getAllProjectsByUserId(currentUserID.uid)
    .then(res => {
      if(res.code === "approved"){
        setLoading(false);
      }
    });
  }, [])

  return (
    <Box flexDirection='column' justifyContent='center' alignItems='center' position='relative' h="$full" w="$full" bg="#140F3F">
      <Box marginTop={20}>
        {
          loading ?
          <HStack space="sm">
            <Spinner color="#FAB425" />
          </HStack>
          :
          <>
            <Heading color='#FBFAF9'>Favoris</Heading>
            {
              currentUser?.projects?.some(project => project.favoris) ? 

              <FlatList
                data={currentUser?.projects}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => item.favoris && <ProjectFavorisCard navigation={navigation} currentProject={item} />}
                horizontal={true}
              />
            :
              <Text color="#FBFAF9">Aucun projet n'est en favoris pour le moment.</Text>
            }
            <Divider
              orientation="horizontal"
              width="$full"
              height="$0.5"
              alignSelf="center"
              marginBottom="$4"
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
            <Heading color='#FBFAF9'>Liste des projets</Heading>
            {
              currentUser?.projects?.length > 0 ?
              <FlatList
                data={currentUser?.projects}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => !item.favoris && <ProjectCard navigation={navigation} currentProject={item} />}
              />
              :
              <Text color="#FBFAF9">Aucun projet crée pour le moment.</Text>
            }
          </>
        }
      </Box>
        <Button
          position='absolute'
          borderRadius="$full"
          flex={1}
          justifyContent='space-around'
          size="$3"
          w={200}
          h={50}
          p="$3.5"
          bg={showModal ? "#d49920" : "#FAB425"}
          borderColor="#0B0044"
          borderWidth={2}
          bottom={50}
          action='primary'
          onPress={() => setShowModal(showModal => !showModal)}
        >
          <ButtonText color='#161519'>Ajouter un projet</ButtonText>
          <ButtonIcon as={PlusCircle} color='#161519' size='xl'/>
        </Button>
        <AddProjectModal showModal={showModal} setShowModal={setShowModal} ref={ref} />
    </Box>
  );
}
