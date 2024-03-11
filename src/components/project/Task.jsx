import { Box, Heading, View } from "@gluestack-ui/themed"
import { TouchableOpacity } from "react-native-gesture-handler"
import TaskModal from "../../shared/components/modals/task-modal/task-modal";
import { useState, useRef } from "react";


const Task = ({task}) => {

    const [showModal, setShowModal] = useState(false);
    const ref = useRef(null)
console.log('-----------')
    return (
        <View w={150} mr={5}>
            <TouchableOpacity onPress={() => setShowModal(showModal => !showModal)}>
                <Box bg="#2B339B" w="100%" h="$full" borderRadius={8} borderWidth={2} justifyContent="center" alignItems="center" borderColor="#FAB425">
                    <Heading color="#F5FCFF">{task.taskTitle}</Heading>
                </Box>
                <TaskModal showModal={showModal} setShowModal={setShowModal} task={task} ref={ref} />
            </TouchableOpacity>
        </View>
    )
}

export default Task