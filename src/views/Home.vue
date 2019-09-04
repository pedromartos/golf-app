<template>
  <b-container fluid id="home">
    <h1>Golf</h1>

    <b-row class="images px-1 px-md-3" v-draggable>
      <b-col
        cols="12"
        md="4"
        class="img px-0"
        v-for="(img, index) in images"
        :key="index"
      >
        <img :src="img" :id="`img-${index}`" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      images: [
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/1s.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/2b.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/3t.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/4d.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/5c.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/6f.png"
      ]
    };
  },
  mounted: function() {}
};
</script>

<style lang="scss">
#home {
  .images {
    .img {
      height: 350px;
      overflow: hidden;
      flex: 0 0 auto;
      position: relative;
      margin: 0 0 0 0;
      // box-shadow: 0 0 0 1px #fff;
      border: 1px solid #fff;

      img {
        width: 900px;
        position: absolute;
      }
    }
  }
}
</style>
