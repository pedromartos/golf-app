<template>
  <div id="list-groups">
    <section class="header">
      <h1>Listing all your image groups</h1>
    </section>

    <section class="body">
      <h4>Groups:</h4>

      <b-row class="groups" no-gutters>
        <router-link
          v-for="(group, i) in groups"
          :key="i"
          class="group px-2 col-md-4 col-12"
          :to="{ name: 'view-group', params: { groupId: group.id } }"
        >
          <b-img :src="group.images[0]" />
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
      return this.$store.state.groups;
    }
  },
  created: function() {
    this.$store.dispatch("recoverGroups");
  }
};
</script>
<style lang="scss">
#list-groups {
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
