import { createStore } from "vuex";
import firebase from "firebase";
import router from "@/router";
import { db } from "../main";
import moment from "moment";

export default createStore({
  state: {
    user: null,
    data: null,
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async userLogin({ commit }, payload) {
      try {
        let res = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        await alert("Login Complete");
        await commit("setUser", res);
        await router.push("/member");
      } catch (error) {
        alert(error.message);
      }
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
    },
    async userSignOut({ commit }) {
      firebase.auth().signOut();
      await alert("Logout Complete");
      commit("setUser", null);
    },
    async addMember(_, payload) {
      try {
        db.collection("membersAuth")
          .doc(firebase.auth().currentUser.uid)
          .collection("members")
          .add({
            name: payload.name,
            date: payload.date,
            isEdit: false,
          });
      } catch (error) {
        console.log(error);
      }
    },
    async setUpdateMember(_,payload) {
      try {
        db.collection("membersAuth")
          .doc(firebase.auth().currentUser.uid)
          .collection("members")
          .doc(payload.key)
          .update({
            isEdit: true,
          });
      } catch (error) {
        console.log(error);
      }
    },
    async updateMember(_,payload) {
      try {
        db.collection("membersAuth")
          .doc(firebase.auth().currentUser.uid)
          .collection("members")
          .doc(payload.key)
          .update({
            name: payload.name,
            date: payload.date,
            isEdit: false,
          });
        await alert("Updated");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMember(_, payload) {
      try {
        db.collection("membersAuth")
          .doc(firebase.auth().currentUser.uid)
          .collection("members")
          .doc(payload.id)
          .delete();
        await alert("Delete Member Complete");
      } catch (error) {
        console.log(error);
      }
    },
    async getData({commit}) {
      var memberRef = await db
      .collection("membersAuth")
      .doc(firebase.auth().currentUser.uid)
      .collection("members");

      memberRef.onSnapshot((snapshotChange) => {
      let data = [];
      console.log('Heyyyy')
      snapshotChange.forEach((doc) => {
        let diff = moment(doc.data().date).diff(moment(), "milliseconds");
        let duration = moment.duration(diff);
        let result = duration.format().replace("-", "");
        data.push({
          key: doc.id,
          name: doc.data().name,
          date: doc.data().date,
          isEdit: doc.data().isEdit,
          age: result,
        });
        commit("setData", data)
      });
    });
    }
  },
  modules: {},
});
