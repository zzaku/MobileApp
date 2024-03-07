import { useState, useRef } from 'react';
import ProjectCard from '../shared/components/cards/project-card/project-card';
import { Box, Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { ScrollView, } from 'react-native';
import { PlusCircle } from 'lucide-react-native';
import AddProjectModal from '../shared/components/modals/add-project-modal/add-project-modal';

export function Home({navigation}) {
  const [showModal, setShowModal] = useState(false)
  const ref = useRef(null)

  return (
    <Box flexDirection='column' justifyContent='center' alignItems='center' position='relative' h="$full" w="$full" bg="#140F3F">
      <Box marginTop={20}>
        <ScrollView>
          <ProjectCard />
          <ProjectCard />
        </ScrollView>
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
          ref={ref}
        >
          <ButtonText color='#161519'>Ajouter un projet</ButtonText>
          <ButtonIcon as={PlusCircle} color='#161519' size='xl'/>
        </Button>
        <AddProjectModal showModal={showModal} setShowModal={setShowModal} ref={ref} />
    </Box>
  );
}
