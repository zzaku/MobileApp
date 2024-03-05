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
import { db, auth } from "../firebase/firebase";
import { collection } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  ////////local storage currentUserID
  const userAccount = AsyncStorage.user;
  const [currentUserID, setCurrentUserID] = useState(
    userAccount
      ? JSON.parse(userAccount)
      : {
          apiKey: "",
          appName: "",
          createdAt: "",
          email: "",
          emailVerified: null,
          isAnonymous: null,
          lastLoginAt: "",
          providerData: [],
          stsTokenManager: {},
          uid: "",
        }
  );
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    AsyncStorage.setItem("user", JSON.stringify(currentUserID));
  }, [currentUserID]);
  ///////////////////////////////////////////////////////////

  //////SIGNUP, LOGIN AND LOGOUT//////////////////////////////////////////////////////////////////
  /**/ const signup = async (auth, email, password) => {
    /**/
    /**/ const fetchSignup = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    /**/ return fetchSignup;
    /**/
  };
  /**/
  /**/ const signin = async (auth, email, password) => {
    /**/ const fetchSignin = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    /**/ return fetchSignin;
    /**/
  };
  /**/
  /**/ const signout = async () => {
    /**/ const fetchSignout = await signOut(auth);
    /**/ return fetchSignout;
    /**/
  };
  /**/
  /**/ const updateMail = async (email) => {
    /**/ await updateEmail(auth.currentUser, email);
    /**/
  };
  /**/
  /**/ const updatePass = async (newPassword) => {
    /**/ await updatePassword(auth.currentUser, newPassword);
    /**/
  };
  /**/
  /**/ const deleteAccount = async (idUser) => {
    /**/
    /**/ const deleteCurrentUser = doc(db, "Users", idUser);
    /**/ const deleteCurrentUserPref = collection(db, "Users", idUser, "");
    /**/ const deleteCurrentUserResume = collection(db, "Users", idUser, "");
    /**/
    /**/
    /**/ await onSnapshot(deleteCurrentUserPref, async (elem) => {
      /**/ elem.docs.map(async (document) => {
        /**/ const deleteUserPreferences = doc(
          db,
          "Users",
          idUser,
          "",
          document._key.path.segments.at(-1)
        );
        /**/ await deleteDoc(deleteUserPreferences);
        /**/
      });
      /**/
    });
    /**/
    /**/ await onSnapshot(deleteCurrentUserResume, async (elem) => {
      /**/ elem.docs.map(async (document) => {
        /**/ const deleteCurrentResume = doc(
          db,
          "Users",
          idUser,
          "",
          document._key.path.segments.at(-1)
        );
        /**/ await deleteDoc(deleteCurrentResume);
        /**/
      });
      /**/
    });
    /**/
    /**/ await deleteDoc(deleteCurrentUser);
    /**/ await deleteUser(auth.currentUser);
    /**/
  };
  /**/
  /**/ const reauthenticateAccount = async (userProvidedPassword) => {
    /**/
    /**/ const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      userProvidedPassword
    );
    /**/
    /**/ await reauthenticateWithCredential(auth.currentUser, credential);
    /**/
  };
  /**/
  /**/ useEffect(() => {
    /**/
    /**/ return onAuthStateChanged(auth, (user) => {
      /**/ if (user) {
        /**/ setCurrentUserID(user);
        /**/
      } else {
        /**/ setCurrentUserID(null);
        /**/ setCurrentUser(null);
        /**/
      }
      /**/
    });
    /**/
    /**/
  }, [auth, currentUserID, currentUser]);

  const value = {
    setCurrentUserID,
    signup,
    signin,
    signout,
    updateMail,
    updatePass,
    deleteAccount,
    reauthenticateAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
