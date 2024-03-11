import { Icon, CloseIcon, Center, Modal, VStack,
ModalBackdrop,
ModalBody,
ModalCloseButton,
ModalContent,
ModalFooter,
ModalHeader,
Heading,
Text, 
Image,
Divider} from '@gluestack-ui/themed';
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity, StyleSheet } from 'react-native';

const   TaskModal = ({showModal, setShowModal, task, ref}) => {

    const handleDownload = async () => {
        try {
          const { uri } = await FileSystem.downloadAsync(
            task.image.data,
            FileSystem.documentDirectory + 'downloaded_image.jpg'
          );
        } catch (error) {
          console.error('Erreur lors du téléchargement de l\'image:', error);
        }
      };

    return (
        <Center h="auto">
        <VStack space="md">
        </VStack>
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
          }}
          size="auto"
          finalFocusRef={ref}
        >
          <ModalBackdrop />
          <ModalContent borderWidth={2} borderColor="#140F3F">
            <ModalHeader>
              <Heading size="lg">{task.taskTitle}</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text size="sm">
              {task.taskDescription}
              </Text>
              <Divider height={2} marginTop={6} marginBottom={10}/>
              <Heading size='xs'>Pièces jointes</Heading>
                { task?.image?.data ?
                    <>
                        <Image alt='attachment' source={{ uri: task?.image?.data  }} style={{ width: 200, height: 200 }} />
                        <TouchableOpacity style={styles.btn} onPress={() => handleDownload()}>
                            <Heading fontSize={17} color="#140F3F" size="md">Télécharger l'image</Heading>
                        </TouchableOpacity>
                    </>
                    :
                    <Text>Cette tâche ne contient aucune photo</Text>
                }
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
    )
}

const styles = StyleSheet.create({
    btn: {
      backgroundColor: "red",
      padding: 5,
      marginTop: 10,
      borderWidth: 2,
      borderColor: "#140F3F",
      width: 200,
      backgroundColor: "#FAB425",
      borderRadius: 8,
      marginBottom: 5
    },
  });

export default TaskModal