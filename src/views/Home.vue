<template>
  <div id="home" class="container-fluid">
    <h1>Golf</h1>

    <div class="images" v-draggable>
      <div
        class="img"
        :ref="`img-${index}`"
        v-for="(img, index) in images"
        :key="index"
      >
        <img :src="img" :id="`img-${index}`" />
      </div>
    </div>
  </div>
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
    width: 100%;
    display: flex;
    padding: 10px;

    .img {
      width: 300px;
      height: 300px;
      overflow: hidden;
      flex: 0 0 auto;
      position: relative;
      margin: 0 5px 0 0;
      box-shadow: 0 0 0 1px #000;

      img {
        width: 900px;
        position: absolute;
      }
    }
  }
}
</style>
