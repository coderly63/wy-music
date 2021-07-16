<!--  -->
<template>
  <div class="mv-video">
    <div class="video">
      <video :src="url" controls width="700" height="400"></video>
    </div>
  </div>
</template>

<script>
import { getUrl } from "@/network/api/mv";
export default {
  props: {
    id: {
      type: String,
      dafault: "",
    },
  },
  data() {
    return {
      url: "",
    };
  },
  watch: {
    id() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getUrl(this.id);
      if (res.code === 200) {
        this.url = res.data.url;
      }
    },
  },
};
</script>
<style scoped lang='less'>
.mv-video {
  .video {
    margin-left: 50px;
  }
}
</style>