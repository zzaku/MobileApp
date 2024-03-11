import { 
    Modal, 
    ModalBackdrop, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalCloseButton, 
    ModalBody, 
    View,
    FormControl, 
    Input,
    FormControlLabel,
    FormControlLabelText,
    Icon, 
    CloseIcon, 
    Heading,
    InputField,
    Button,
    ButtonText,
    Toast,
    useToast,
    VStack,
    ToastTitle,
    ToastDescription,
    HStack,
    Spinner
} from '@gluestack-ui/themed';
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native';
import { useAuth } from "../../core/context/firebaseContext";
import { useState, useRef } from "react";
import { useLoading } from '../../core/context/LoadingContext';

const SettingsProject = ({ navigation, route }) => {

    const { addColonne, currentUserID, signout } = useAuth();
    const { loading, setLoading } = useLoading();

    const { project } = route.params;

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({title: ""});

    const ref = useRef(null)
    const toast = useToast()

    const createColone = () => {
        console.log(currentUserID.uid)
        addColonne(formData, project.id, currentUserID.uid)
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
                          <ToastTitle>Ajout Colonne</ToastTitle>
                          <ToastDescription>
                            La colonne a été créée avec succés !
                          </ToastDescription>
                        </VStack>
                      </Toast>
                    )
                  },
              })
            } else if(res.code === "not-found"){
              toast.show({
                placement: "top",
                render: ({ id }) => {
                  const toastId = "toast-" + id
                  return (
                    <Toast nativeID={toastId} action="warning" variant="accent">
                      <VStack space="xs">
                        <ToastTitle>Erreur de récupération Projet</ToastTitle>
                        <ToastDescription>
                          Le projet n'a pas pu être récupéré !
                        </ToastDescription>
                      </VStack>
                    </Toast>
                  )
                },
              })
            } 
          });
        }

    const logout = () => {
      signout();
    }

    const handleModalDismiss = () => {
  
        setFormData({
          title: ""
        });
  
        setShowModal(false);
    };

    return(
        <View h="$full" bg="#262551" alignItems="center"  justifyContent="space-between">
            <TouchableOpacity style={styles.btn} onPress={() => setShowModal(true)}>
                <Heading color="#262551" size="md">Ajouter une colonne</Heading>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btn2]} onPress={() => logout()}>
                <Heading color="#262551" size="md">Se déconnecter</Heading>
            </TouchableOpacity>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                size="auto"
                finalFocusRef={ref}>
                <ModalBackdrop />
                <ModalContent borderWidth={2} borderColor="#140F3F">
                <ModalHeader>
                    <Heading size="lg">Nouvelle colonne</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <FormControl minWidth='$7' isRequired={true}>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText>Titre du projet</FormControlLabelText>
                        </FormControlLabel>
                        <Input marginBottom="$4">
                            <InputField onChangeText={text => setFormData({ ...formData, title: text })} color="#262551"/>
                        </Input>
                    </FormControl>
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
                        createColone()
                    }}
                    >
                        <ButtonText>Créer</ButtonText>
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    whiteColor: {
        color: "#FBFAF9",
    },
    container: {
      margin: 0,
        flex: 1,
        height: "100%",
        width: "100%",
    },
    btn: {
        width: 300,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding: 5,
        backgroundColor: "#FAB425",
        borderRadius: 8,
        marginBottom: 10
    },
    btn2: {
        backgroundColor: "#c94444"
    }
  });

export default SettingsProject