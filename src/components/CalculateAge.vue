<template>
  <div id="member" class="pt-2">
    <div class="w-full flex justify-center pb-2">
      <img
        src="https://i.pinimg.com/originals/23/4b/6a/234b6a4f2e93ba13a7da8200eb43147e.jpg"
        width="170"
      />
    </div>
    <h3 class="font-medium">Add Member</h3>
    <form @submit.prevent="addMember" class="flex justify-center">
      <br />
      <hr />
      <br />
      <div>
        <div>
          <label>Name</label><br />
          <input class="rounded-lg" type="text" v-model="member.name" />
        </div>
        <div>
          <label>Date of birth</label><br />
          <input
            class="rounded-lg"
            type="date"
            style="padding: 10px 20px"
            v-model="member.date"
            :max="today"
          />
        </div>
        <div class="py-2">
          <button
            class="
              bg-blue-400
              border-2 border-black border-solid
              rounded-xl
              px-4
              py-2
            "
            type="submit"
          >
            ADD
          </button>
        </div>
      </div>
    </form>
    <div class="overflow-x-auto">
      <table class="table-fixed py-2">
        <thead>
          <tr>
            <th class="w-auto">Name</th>
            <th class="w-1/2">Date of Birth</th>
            <th class="w-full">Age</th>
          </tr>
        </thead>
        <tbody v-for="memberData in testData" :key="memberData.key">
          <tr class="border-t-2 border-1">
            <td>
              <p v-if="!memberData.isEdit">{{ memberData.name }}</p>
              <input
                class="w-3/4 rounded-lg p-1"
                v-else
                v-model="memberData.name"
              />
            </td>
            <td>
              <p v-if="!memberData.isEdit">{{ memberData.date }}</p>
              <input
                class="w-full rounded-lg p-1"
                v-else
                v-model="memberData.date"
              />
            </td>
            <td>
              <p>{{ memberData.age }}</p>
            </td>
          </tr>
          <div class="flex">
            <button
              class="border-2 border-solid rounded-xl border-yellow-400 p-1"
              v-if="!memberData.isEdit"
              @click="setUpdate(memberData)"
            >
              Edit
            </button>
            <button
              class="border-2 border-solid rounded-xl border-green-400 p-1"
              v-else
              @click="updateMember(memberData)"
            >
              Done
            </button>
            <button
              class="border-2 border-solid rounded-xl border-red-400 p-1"
              @click="deleteMember(memberData.key)"
            >
              Delete
            </button>
          </div>
        </tbody>
      </table>
    </div>
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
<style scoped></style>
