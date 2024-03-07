import { Modal, 
    ModalBackdrop, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalCloseButton, 
    ModalBody, 
    Text, 
    Button, 
    ButtonIcon, 
    ButtonText, 
    FormControl, 
    Input,
    Select, 
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    FormControlLabel,
    FormControlLabelText,
    SelectItem,
    Icon, 
    CloseIcon, 
    Heading,
    Box,
    Divider,
    InputField,
    Toast,
    VStack,
    ToastTitle,
    ToastDescription
} from '@gluestack-ui/themed';
import ColorPickerComponent from '../../color-picker/color-picker';
import { SvgCssUri } from 'react-native-svg/css';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { useState } from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import { ImageUpIcon, ChevronDownIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../../../core/context/firebaseContext';

const tableau = require('./assets/tableau.svg');
const svg = resolveAssetSource(tableau);

const AddProjectModal = ({showModal, setShowModal, ref}) => { 

    const [formData, setFormData] = useState({
        background: { type: "color", data: { color: "green" } },
        projectTitle: '',
        visibility: ''
      });

      const { addProject } = useAuth();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.cancelled) {
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
    
          setFormData(
            {
                ...formData,
                background: {
                    type: "image",
                    data: {
                        color: formData.background.data.color,
                        imageType: result.assets[0].mimeType,
                        binary: URL.createObjectURL(blob)
                }
              }
            }
          );
        }
    };

    const createProject = async () => {
        console.log("Form Data:", formData);
        const datas = {projectTitle: formData.projectTitle, visibility: formData.visibility}

        addProject(datas)
        .then(() => {
            toast.show({
                placement: "top",
                render: ({ id }) => {
                  const toastId = "toast-" + id
                  return (
                    <Toast nativeID={toastId} action="success" variant="accent">
                      <VStack space="xs">
                        <ToastTitle>Ajout Projet</ToastTitle>
                        <ToastDescription>
                          Le projet a été crée avec succés !
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  )
                },
            })
        })
    };

    const uploadImage = async () => {
        const uuid = uuidv4();
    
        if (imageDestination) {
          if (witchFormat === "avatar") {
            uploadAvatar(imageDestination, imageName, uuid).then(() => {
              getBackImage(currentUser?.[0]?.avatar_path, imageName, uuid).then(
                (res) => {
                  setAvatar(res);
                  setAvatarPath({ avatar: res }, currentUser[0].id);
                  setImageUpload(null);
                  setAddAvatar(false);
                  setWitchFormat("");
                }
              );
            });
          } else if (witchFormat === "background") {
            uploadBackground(imageDestination, imageName, uuid).then(() => {
              getBackBackground(currentUser[0].avatar_path, imageName, uuid).then(
                (res) => {
                  setBackground(res);
                  setBackgroundPath({ background: res }, currentUser[0].id);
                  setImageBackgroundUpload(null);
                  setAddBackground(false);
                  setWitchFormat("");
                }
              );
            });
          }
        }
    };

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
            setShowModal(false)
            }}
            finalFocusRef={ref}
        >
            <ModalBackdrop />
            <ModalContent
            borderWidth={2}
            borderColor='#FAB425'
            bg='#666dcc'
            >
            <ModalHeader>
                <Heading color='#FBFAF9' size="xl">Nouveau Projet</Heading>
                <ModalCloseButton>
                <Icon as={CloseIcon} />
                </ModalCloseButton>
            </ModalHeader>
            <ModalBody h={400}>
                    {
                        formData.background.type === "color" ?

                        <Box w="$full" h={200} marginBottom="$3" justifyContent='center' bg={formData.background.data.color} borderRadius={8} alignItems='center'>
                            <SvgCssUri uri={svg.uri} width="90%" height="80%" />
                        </Box>
                        :
                        <ImageBackground source={{ uri: formData.background.data.binary }} resizeMode="cover" style={styles.image}>
                            <SvgCssUri uri={svg.uri} width="90%" height="80%" />
                        </ImageBackground>
                    }
                <FormControl minWidth='$7' isRequired={true}>
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>Fond d'écran</FormControlLabelText>
                    </FormControlLabel>
                    <ColorPickerComponent formData={formData} setFormData={setFormData} />
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
                        w="$full"
                        h={65}
                    >
                        <Text size="sm" color="#161519">Ajouter une image en fond d'écran</Text>
                        <ButtonIcon as={ImageUpIcon} color='#161519' size='xl'/>
                    </Button>
                </FormControl>
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
                <FormControl minWidth='$7' isRequired={true}>
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>Titre du projet</FormControlLabelText>
                    </FormControlLabel>
                    <Input marginBottom="$4">
                        <InputField onChangeText={text => setFormData({ ...formData, projectTitle: text })} color='#FBFAF9'/>
                    </Input>
                </FormControl>
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
                <FormControl isRequired={true}>
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>Visibilité</FormControlLabelText>
                    </FormControlLabel>
                    <Select value={formData.visibility} onValueChange={(value) => setFormData({ ...formData, visibility: value })}>
                        <SelectTrigger variant="rounded"  size="md" >
                            <SelectInput color='#FBFAF9' />
                            <SelectIcon mr="$3">
                            <Icon as={ChevronDownIcon} />
                            </SelectIcon>
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop/>
                            <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem
                                label="Privé"
                                value="private"
                            />
                            <SelectItem
                                label="Espace de travail"
                                value="workspace"
                            />
                            <SelectItem
                                label="Public"
                                value="public"
                            />
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button
                variant="outline"
                size="sm"
                action="secondary"
                mr="$3"
                onPress={() => {
                    setShowModal(false)
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

export default AddProjectModal