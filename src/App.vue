<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'home' }">App Name</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Image Groups" right>
            <b-dropdown-item :to="{ name: 'new-group' }">
              <fa-icon icon="plus" />
              Create New Image Group
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'list-groups' }">
              <fa-icon icon="tasks"></fa-icon>
              Manage Image Groups
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-button href="#" variant="light">
            <fa-icon icon="sign-in-alt"></fa-icon>
            Login
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view class="container" />
  </div>
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

@import url("https://fonts.googleapis.com/css?family=Manjari:100,400,700&display=swap");

html,
body {
  font-family: "Manjari", sans-serif;
}

.navbar {
  margin-bottom: 20px;
}

.top-spaced-border {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e6e6e6;
}

section.footer {
  .btn {
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
    }
  }
}
</style>
