<template>
  <div id="home">
    <b-jumbotron header-level="4" header="Golf App">
      <div class="buttons">
        <b-button @click="login" variant="primary" size="sm">
          <fa-icon :icon="['fab', 'facebook-square']"></fa-icon>
          Login with Facebook
        </b-button>
      </div>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  name: "Home",
  methods: {
    login: function() {
      window.FB.login(
        response => {
          this.$store.dispatch("auth/facebookLogin", response);
        },
        { scope: "public_profile,email" }
      );
    }
  },
  mounted: function() {
    if (this.$route.params.authError) {
      this.$bvToast.toast("You must login first", {
        title: "Error",
        variant: "danger"
      });
    }
  }
};
</script>
<style lang="scss">
#home {
}
</style>
