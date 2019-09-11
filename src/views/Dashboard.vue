<template>
  <div id="dashboard" class="container">
    <b-jumbotron
      header-level="4"
      header="Welcome"
      lead="Select bellow which action you want to take"
    >
      <div class="buttons">
        <b-button variant="primary" :to="{ name: 'new-group' }">
          <fa-icon icon="plus"></fa-icon>
          Create New Image Group
        </b-button>

        <b-button variant="primary" :to="{ name: 'list-groups' }">
          <fa-icon icon="tasks"></fa-icon>
          Manage Image Groups
        </b-button>
      </div>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  name: "Dashboard"
};
</script>
<style lang="scss">
#dashboard {
  .jumbotron {
    .buttons {
      display: flex;
      flex-direction: column;

      .btn {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
