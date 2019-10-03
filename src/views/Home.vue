<template>
  <div id="home">
    <b-jumbotron header-level="4" header="Golf App"></b-jumbotron>
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
