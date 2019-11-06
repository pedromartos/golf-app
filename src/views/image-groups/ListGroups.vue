<template>
  <div id="list-groups">
    <section class="header">
      <h1>Listing all your image groups</h1>
    </section>

    <section class="body">
      <div class="empty" v-if="!groups.length">
        You don't have any groups so far.

        <br />

        <b-button variant="primary" :to="{ name: 'new-group' }">
          <fa-icon icon="plus" />
          Create New Image Group
        </b-button>
      </div>

      <b-row class="groups" no-gutters>
        <router-link
          v-for="(group, i) in groups"
          :key="i"
          class="group px-2 col-md-4 col-12"
          :to="{ name: 'view-group', params: { groupId: group.id } }"
        >
          <b-img :src="group.thumbnail" />
          <div class="name">{{ group.name }}</div>
        </router-link>
      </b-row>
    </section>
  </div>
</template>
<script>
export default {
  name: "ListGroups",
  computed: {
    groups: function() {
      return this.$store.getters["imageGroup/formatGroups"];
    }
  },
  created: function() {
    this.$store.dispatch("imageGroup/recoverGroups");
  }
};
</script>
<style lang="scss">
#list-groups {
  .body {
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #999;
  }
  .empty {
    font-weight: bold;
    font-size: 2em;
    color: #999;
  }
  .groups {
    .group {
      position: relative;
      margin-bottom: 1rem;
      transition: all ease-in-out 200ms;

      img {
        display: block;
        width: 100%;
        box-shadow: 5px 8px 25px -10px rgba(0, 0, 0, 1);
        transition: all ease-in-out 200ms;
      }

      .name {
        position: absolute;
        bottom: 0;
        left: 0;
        width: calc(100% - 1rem);
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        font-weight: 700;
        color: #fff;
        padding: 10px 0;
        margin: 0 0.5rem;
      }

      &:hover {
        transform: scale(1.05);

        img {
          box-shadow: 5px 8px 50px -25px rgba(0, 0, 0, 1);
        }
      }
    }
  }
}
</style>
