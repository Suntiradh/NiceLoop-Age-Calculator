<template>
  <div class="members">
    <img
      src="https://i.pinimg.com/originals/23/4b/6a/234b6a4f2e93ba13a7da8200eb43147e.jpg"
      width="170"
    />

    <form @submit.prevent="addMember" class="form-member">
      <h3>Add Member</h3>
      <br />
      <hr />
      <br />
      <div class="row">
        <div class="column">
          <label>Name</label><br />
          <input type="text" v-model="member.name" />
        </div>
        <div class="column">
          <label>Date of birth</label><br />
          <input
            type="date"
            style="padding: 10px 20px"
            v-model="member.date"
            :max="today"
          />
        </div>
        <div class="column">
          <br />
          <button type="submit">ADD</button>
        </div>
      </div>
    </form>
    <table
      align="center"
      style="text-align: left; width: 80%; border-spacing: 0"
    >
      <thead>
        <tr>
          <th style="width: 30%">Name</th>
          <th style="width: 35%">Date of Birth</th>
          <th style="width: 35%">Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="memberData in testData" :key="memberData.key">
          <td>
            <p v-if="!memberData.isEdit">{{ memberData.name }}</p>
            <input v-else v-model="memberData.name" />
          </td>
          <td>
            <p v-if="!memberData.isEdit">{{ memberData.date }}</p>
            <input v-else v-model="memberData.date" />
          </td>
          <td>
            <p>{{ memberData.age }}</p>
          </td>
          <td>
            <button v-if="!memberData.isEdit" @click="setUpdate(memberData)">
              Edit
            </button>
            <button v-else @click="updateMember(memberData)">Done</button>
          </td>
          <td>
            <button @click="deleteMember(memberData.key)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import format from "moment-duration-format";

format(moment);

export default {
  data() {
    return {
      member: {},
      data: [],
      today: moment().format("YYYY-MM-DD"),
    };
  },
  mounted() {
    this.$store.dispatch("getData");
  },
  computed: {
    testData() {
      return this.$store.state.data;
    },
    // testData2: {
    //   get() {
    //     return this.$store.state.data
    //   },
    //   set() {
    //     return this.$store.state.data
    //   },
    //   deep: true
    // }
  },
  methods: {
    addMember() {
      this.$store.dispatch("addMember", {
        name: this.member.name,
        date: this.member.date,
      });
      this.member.name = "";
      this.member.date = "";
    },
    setUpdate(memberData) {
      this.$store.dispatch("setUpdateMember", {
        key: memberData.key,
      });
    },
    updateMember(memberData) {
      this.$store.dispatch("updateMember", {
        name: memberData.name,
        date: memberData.date,
        key: memberData.key,
      });
    },
    deleteMember(id) {
      this.$store.dispatch("deleteMember", {
        id: id,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
  justify-content: center;
}
.column {
  flex-grow: 1;
  height: 100px;
}
.form-member input {
  width: 80%;
  border: 1px solid #dddddd;
  padding: 12px 20px;
}
button[type="submit"] {
  border: 1px solid #dddddd;
  padding: 12px;
  background-color: #5d9ced;
  color: white;
  width: 65%;
  border-radius: 10px;
}
table th {
  border-bottom: 1px solid #a29c9c;
  padding-bottom: 10px;
}
</style>
