import { useContext, createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db, auth, storage } from "../firebase/firebase";
import { collection, addDoc, getDocs, updateDoc, query, where, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, getStorage, getDownloadURL, uploadString, deleteObject, listAll, list, uploadBytes } from "firebase/storage";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  ////////local storage currentUserID
  const userAccount = AsyncStorage.user;
  const [currentUserID, setCurrentUserID] = useState(userAccount ? JSON.parse(userAccount) : null);
  
  const userAccountInfos = AsyncStorage.userInfos;
  const [currentUser, setCurrentUser] = useState(userAccountInfos ? JSON.parse(userAccountInfos) : null);

  useEffect(() => {
    AsyncStorage.setItem("userInfos", JSON.stringify(currentUser));
  }, [currentUser]);
  
  useEffect(() => {
    AsyncStorage.setItem("user", JSON.stringify(currentUserID));
  }, [currentUserID]);

////////////////////////////////////////////////////////////
/**/   const userProjectRef = currentUserID ? collection(db, "projects") : null;
/**/
/**/   const addProject = (data, type_background, data_background, userId) => {
/**/     return new Promise((resolve, reject) => {
/**/       addDoc(userProjectRef, data)
/**/         .then(async (res) => {
/**/           await uploadBackground(type_background, data_background, res.id);
/**/              await getAllProjectsByUserId(userId);
/**/              resolve({ code: "approved" });
/**/         })
/**/         .catch((error) => {
/**/           if(error.code === "not-found"){
/**/              reject({ code: "not-found" });
/**/           } else if(error.code === "auth"){
/**/              reject({ code: "auth" });
/**/           } else if ({ code: "uploadImage" }){
/**/              reject({ code: "uploadImage" });
/**/           } else {
  /**/            reject({ code: "denied" });
  /**/         }
/**/         });
/**/     });
/**/   };
/**/
/**/   const getAllProjectsByUserId = (userId) => {
/**/    return new Promise(async (resolve, reject) => {
/**/      if (currentUserID) {
/**/          const q = query(collection(db, "projects"), where("collaboratorsIds", "array-contains", userId));
/**/          const datas = await getDocs(q);
/**/          
/**/          setCurrentUser({...currentUser, projects: datas.docs.map(doc => ({...doc.data(), id: doc.id}))});
/**/          resolve({code: "approved"});
/**/      } else {
/**/          setCurrentUser(null);
/**/          resolve({code: "auth"});
/**/      }
/**/    });
/**/  };
/**/
/**/   const uploadBackground = (type_background, data_background, projectId) => {
/**/    return new Promise(async (resolve, reject) => {
/**/      try {
/**/        const setProjectRef = doc(db, "projects", projectId);
/**/        let background = "";
/**/       
/**/        if(type_background === "image"){
/**/          const backgroundRef = ref(storage, `background/image-${projectId}`);
/**/        
/**/          await uploadBytes(backgroundRef, data_background.binary);
/**/        
/**/          background = await getBackBackground(projectId);
/**/        } else if(type_background === "color"){
/**/          background = data_background.color
/**/        }
/**/        
/**/        await updateDoc(setProjectRef, { background: { data: background, type: type_background === "image" ? data_background.imageType : "color"}});
/**/        
/**/        resolve({code: "approved"});
/**/      } catch (error) {
/**/        reject({code: "uploadImage"});
/**/      }
/**/    });
/**/  };
/**/
/**/   const getBackBackground = (projectId) => {
/**/    return new Promise(async (resolve, reject) => {
/**/      try {
/**/        const storage = getStorage();
/**/        const url = await getDownloadURL(ref(storage, `background/image-${projectId}`));
/**/
/**/        resolve(url);
/**/      } catch (error) {
/**/        reject(error);
/**/      }
/**/    });
/**/   };
/**/
/**/   const setProjectFavoris = (projectId, isAlreadyFav, userId) => {
/**/    return new Promise(async (resolve, reject) => {
/**/      try {
/**/        const setProjectRef = doc(db, "projects", projectId);
/**/        
/**/        await updateDoc(setProjectRef, { favoris: !isAlreadyFav});
/**/        await getAllProjectsByUserId(userId);
/**/        
/**/        resolve({code: "approved"});
/**/      } catch (error) {
/**/        reject({code: "error-set-fav"});
/**/      }
/**/    });
/**/   };
////////////////////////////////////////////////////////////

  //////SIGNUP, LOGIN AND LOGOUT//////////////////////////////////////////////////////////////////
   const signup = async (auth, email, password) => {
    
     const fetchSignup = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
     return fetchSignup;
    
  };
  
   const signin = async (auth, email, password) => {
     const fetchSignin = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
     return fetchSignin;
    
  };
  
   const signout = async () => {
     const fetchSignout = await signOut(auth);
     return fetchSignout;
    
  };
  
   const updateMail = async (email) => {
     await updateEmail(auth.currentUser, email);
    
  };
  
   const updatePass = async (newPassword) => {
     await updatePassword(auth.currentUser, newPassword);
    
  };
  
   const deleteAccount = async (idUser) => {
    
     const deleteCurrentUser = doc(db, "Users", idUser);
     const deleteCurrentUserPref = collection(db, "Users", idUser, "");
     const deleteCurrentUserResume = collection(db, "Users", idUser, "");
    
    
     await onSnapshot(deleteCurrentUserPref, async (elem) => {
       elem.docs.map(async (document) => {
         const deleteUserPreferences = doc(
          db,
          "Users",
          idUser,
          "",
          document._key.path.segments.at(-1)
        );
         await deleteDoc(deleteUserPreferences);
        
      });
      
    });
    
     await onSnapshot(deleteCurrentUserResume, async (elem) => {
       elem.docs.map(async (document) => {
         const deleteCurrentResume = doc(
          db,
          "Users",
          idUser,
          "",
          document._key.path.segments.at(-1)
        );
         await deleteDoc(deleteCurrentResume);
        
      });
      
    });
    
     await deleteDoc(deleteCurrentUser);
     await deleteUser(auth.currentUser);
    
  };
  
   const reauthenticateAccount = async (userProvidedPassword) => {
    
     const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      userProvidedPassword
    );
    
     await reauthenticateWithCredential(auth.currentUser, credential);
    
  };
  
   useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserID(user);

        return () => {
          setCurrentUserID(user);
        };
      } else {
        setCurrentUser(null);

        return () => {
          setCurrentUserID(user);
        };
      }
    });
  }, []);

  const value = {
    currentUserID,
    currentUser,
    setCurrentUser,
    signup,
    signin,
    signout,
    updateMail,
    updatePass,
    deleteAccount,
    reauthenticateAccount,
    addProject,
    getAllProjectsByUserId,
    uploadBackground,
    getBackBackground,
    setProjectFavoris,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
