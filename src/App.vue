<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'home' }">Golf App</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button
            @click="login"
            variant="primary"
            size="sm"
            v-if="!isLoggedIn"
          >
            <fa-icon :icon="['fab', 'facebook-square']"></fa-icon>
            Login with Facebook
          </b-button>

          <b-dropdown
            size="sm"
            right
            variant="light"
            class="m-2 logged-in"
            v-if="isLoggedIn"
          >
            <template v-slot:button-content>
              <b-img class="pic" :src="user.picture.data.url" />
              <span class="name">{{ user.name }}</span>
            </template>

            <b-dropdown-item :to="{ name: 'new-group' }">
              <fa-icon icon="plus" />
              Create New Image Group
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'list-groups' }">
              <fa-icon icon="tasks"></fa-icon>
              Manage Image Groups
            </b-dropdown-item>

            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view class="container" />
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    user: function() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    login: function() {
      window.FB.login(
        response => {
          this.$store.dispatch("auth/facebookLogin", response).then(() => {
            this.$router.push({ name: "dashboard" });
          });
        },
        { scope: "public_profile,email" }
      );
    },
    logout: function() {
      window.FB.logout(response => {
        this.$store.dispatch("auth/facebookLogin", response).then(() => {
          this.$router.push({ name: "home" });
        });
      });
    },
    checkLoginState: function() {
      window.FB.getLoginStatus(response => {
        this.$store.dispatch("auth/facebookLogin", response);
      });
    }
  },
  mounted: function() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "501952337325008",
        cookie: true,
        xfbml: true,
        version: "v2.2"
      });

      window.FB.AppEvents.logPageView();

      this.checkLoginState();
    };
  },
  created: function() {
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
};
</script>

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

  .logged-in {
    > .btn {
      padding-left: 38px;
      .pic {
        position: absolute;
        left: -1px;
        top: -1px;
        width: 32px;
        border-radius: 3px 0 0 3px;
      }
    }
  }
}

.btn {
  &.btn-sm {
    * {
      vertical-align: middle;
    }
  }
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
