import { View, Heading, ImageBackground, HStack, Spinner, FlatList, Divider } from "@gluestack-ui/themed"
import { SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native';
import Colonne from "./Colonne";
import { useLoading } from "../../core/context/LoadingContext";
import { useAuth } from "../../core/context/firebaseContext";
import { useEffect } from "react";

const HomeProject = ({ navigation, route }) => {

    const { project } = route.params;

    const imageType = project.background.type.split('/')[0];

    const { currentProjectColonnes, getAllColonnes } = useAuth()

    const { setLoading, loading } = useLoading();

    useEffect(() => {
        setLoading(true);
        getAllColonnes(project.id)
        .then(res => {
          if(res.code === "approved"){
            setLoading(false);
          }
        });
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
            backgroundColor: project.background.type === "color" ? project.background.data : "#F5FCFF",
        },
        image: {
          flex: 1,
          padding: 10
        },
      });

      console.log('-------------------------', currentProjectColonnes)

    return(
        <View style={styles.container}>
                <ImageBackground source={{ uri: imageType === "image" &&  project.background.data}} height={Dimensions.get("screen").height} w={Dimensions.get("screen").width} opacity="0.88" style={styles.image}>
                {
                loading ?
                <HStack space="sm"><Spinner color="#FAB425" /></HStack>
                :
                    <FlatList
                        data={currentProjectColonnes?.colonnes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>  <><Colonne project={project} colonneTitle={item.title} colonneId={item.id}/><Divider height={2} marginTop={10} marginBottom={10}/></>}
                    />
                }
                </ImageBackground>
        </View>
    )
}

export default HomeProject