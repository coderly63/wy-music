<!--  -->
<template>
  <div class="playlist">
    <playlist-header
      :categories="categories"
      v-if="Object.keys(categories).length > 0"
    ></playlist-header>
    <playlist-content></playlist-content>
  </div>
</template>

<script>
import { getCatList } from "@/network/api/playlist";
import PlaylistHeader from "@/pages/playlist/PlaylistHeader.vue";
import PlaylistContent from "@/pages/playlist/PlaylistContent.vue";

export default {
  components: {
    PlaylistHeader,
    PlaylistContent,
  },
  data() {
    return {
      categories: [],
      sub: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getCatList();
      if (res && res.code === 200) {
        this.sub = res.sub;
        for (let i = 0; i < res.all.category + 1; i++) {
          this.categories.push({ name: res.categories[i], sub: [] });
        }
        this.sub.forEach((item) => {
          this.categories[item.category].sub.push(item.name);
        });
        // console.log(this.categories);
      }
    },
  },
};
</script>
<style scoped>
.playlist {
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 1240px) {
  .playlist {
    margin: 0 50px;
    min-width: 900px;
  }
}
</style>