import { Card, Heading, Box, Pressable, HStack, FlatList, Spinner} from "@gluestack-ui/themed"
import Task from "./Task"
import { SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler"
import { useEffect, useRef, useState } from "react";
import AddTaskModal from "../../shared/components/modals/add-task-modal/add-task-modal";
import { useAuth } from "../../core/context/firebaseContext";
import { useLoading } from "../../core/context/LoadingContext";


const Colonne = ({project, colonneId, colonneTitle}) => {

    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    
    const ref = useRef(null)

    const { getAllTasksByColonne } = useAuth()

    useEffect(() => {
        getAllTasksByColonne(project.id, colonneId)
        .then(res => setTasks(res))
    }, [])

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
          backgroundColor: "red",
          padding: 5,
          backgroundColor: "#262551",
          borderRadius: 8,
          marginBottom: 5
        },
      });

    return (
        <Box>
                    <HStack justifyContent="space-between">
                        <Heading color="#FBFAF9">{colonneTitle}</Heading>
                        <TouchableOpacity style={styles.btn} onPress={() => setShowModal(showModal => !showModal)}>
                            <Heading color="#F5FCFF" size="md">Ajouter une tâche</Heading>
                        </TouchableOpacity>
                    </HStack>
                    <Card bg="#F5FCFF" h={120} w="$full">
                        <FlatList
                            data={tasks.data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <Task project={project} task={item} colonneId={item.id}/>}
                            horizontal={true}
                        />
                    </Card>
            <AddTaskModal showModal={showModal} setShowModal={setShowModal} project={project} colonneId={colonneId} ref={ref}/>
        </Box>
    )
}

export default Colonne