import { Icon, CloseIcon, Center, Modal, VStack,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Heading,
    Text, 
    FormControl,
    FormControlLabel,
    Input,
    FormControlLabelText,
    InputField,
    Button,
    ButtonText,
    ButtonIcon,
    Divider,
    Toast,
    useToast,
    ToastTitle,
    ToastDescription,
    Box
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { ImageUpIcon } from 'lucide-react-native';
import {ImageBackground, StyleSheet} from 'react-native';
import { useLoading } from '../../../../core/context/LoadingContext';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../../../core/context/firebaseContext';
    
    const AddTaskModal = ({showModal, setShowModal, project, colonneId, ref}) => {
    
        const [formData, setFormData] = useState({
            taskTitle: "",
            taskDescription: "",
            datas: {
                image: "",
                imageType: ""
            }
          });

        const { currentUserID, addTask } = useAuth();

        const { setLoading } = useLoading();

        const toast = useToast()

        const pickImage = async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
              
              if (!result.cancelled) {
                const uri = result.assets[0].uri;
                const blob = await ImageToBlobAsync(uri);
      
                setFormData(
                  {
                        ...formData,
                        datas: {
                            imageType: result.assets[0].mimeType,
                            image: blob
                      }
                  }
                );
              }
          };
      
        const ImageToBlobAsync = (uri) => { 
            return new Promise((resolve, reject) => { 
                const xhr = new XMLHttpRequest(); 
                xhr.onload = function () {
                    resolve(xhr.response); 
                };
        
                xhr.onerror = function (e) { 
                    reject(new TypeError("Network request failed"));
                };
        
                xhr.responseType = "blob"; 
                xhr.open("GET", uri, true); 
                xhr.send(null);
            });
        };  

        const createProject = async () => {
            setLoading(true);
            
            handleModalDismiss();

            const datas = {
                taskTitle: formData.taskTitle,
                taskDescription: formData.taskDescription,
            }
      
              addTask(datas, formData.datas, project.id, colonneId, currentUserID.uid)
              .then((res) => {
                setLoading(false);
                
                if(res.code === "approved"){
                  toast.show({
                      placement: "top",
                      render: ({ id }) => {
                        const toastId = "toast-" + id
                        return (
                          <Toast nativeID={toastId} action="success" variant="accent">
                            <VStack space="xs">
                              <ToastTitle>Ajout Tâche</ToastTitle>
                              <ToastDescription>
                                La tâche a été créée avec succés !
                              </ToastDescription>
                            </VStack>
                          </Toast>
                        )
                      },
                  })
                }
            })
        };

          const handleModalDismiss = () => {
            URL.revokeObjectURL(formData.image);

            setFormData({
                taskTitle: "",
                taskDescription: ""
            });
      
            setShowModal(false);
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
              <ModalContent bg='#2B339B'>
                <ModalHeader>
                  <Heading size="lg">Nouvelle tâche</Heading>
                  <ModalCloseButton>
                    <Icon as={CloseIcon} />
                  </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <FormControl minWidth='$7' isRequired={true}>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText>Titre du la tâche</FormControlLabelText>
                        </FormControlLabel>
                        <Input marginBottom="$4">
                            <InputField onChangeText={text => setFormData({ ...formData, taskTitle: text })} color='#FBFAF9'/>
                        </Input>
                    </FormControl>
                    <Divider height={2} marginTop={6} marginBottom={10}/>
                    <FormControl minWidth='$7'>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText>Description de la tâche</FormControlLabelText>
                        </FormControlLabel>
                        <Input marginBottom="$4">
                            <InputField onChangeText={text => setFormData({ ...formData, taskDescription: text })} color='#FBFAF9'/>
                        </Input>
                    </FormControl>
                    <FormControl minWidth='$7'>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText>Ajouter une image</FormControlLabelText>
                        </FormControlLabel>
                        <Button
                        onPress={() => pickImage()}
                        p="$5"
                        marginTop="$4"
                        marginBottom="$4"
                        borderRadius={7}
                        bg="#FAB425"
                        borderWidth={2}
                        borderColor='#0B0044'
                        $hover-bg="$primary400"
                        alignItems='center'
                        justifyContent='space-around'
                        flexDirection='row'
                        w="60%"
                        h="10%"
                    >
                        <ButtonIcon as={ImageUpIcon} color='#161519' size='xl'/>
                    </Button>
                    </FormControl>
                    {
                        formData.datas?.image &&
                        <ImageBackground source={{ uri: URL.createObjectURL(formData.datas.image) }} resizeMode="cover" style={styles.image}>
                        </ImageBackground>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button
                    variant="outline"
                    size="sm"
                    action="secondary"
                    mr="$3"
                    onPress={() => {
                        setShowModal(false);
                        handleModalDismiss()
                    }}
                    >
                        <ButtonText>Annuler</ButtonText>
                            </Button>
                            <Button
                            size="sm"
                            action="positive"
                            borderWidth="$0"
                            onPress={() => {
                                createProject()
                            }}
                            >
                        <ButtonText>Créer</ButtonText>
                    </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Center>
        )
    }

    const styles = StyleSheet.create({
        image: {
          flex: 1,
          justifyContent: 'center',
          alignItems: "center",
          height: 200
        },
        text: {
            color: 'white',
            fontSize: 42,
            lineHeight: 84,
            fontWeight: 'bold',
            textAlign: 'center',
          },
      });
    
    export default AddTaskModal