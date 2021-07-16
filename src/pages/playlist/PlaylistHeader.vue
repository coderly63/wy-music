<!--  -->
<template>
  <div class="playlist-header">
    <div
      class="playlist-item"
      v-for="(item, i) in categories"
      :key="'playlist-item' + i"
    >
      <h4 class="item-tit" :class="{ second: i === 1 }">{{ item.name }}:</h4>
      <ul class="item-tags">
        <li
          v-for="(tag, i) in item.sub"
          @click="
            $bus.emit('screen', tag);
            currentTag = tag;
          "
          :key="'item-tags' + i"
          :class="{ active: currentTag === tag }"
        >
          {{ tag }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      songsList: [],
      currentTag: "全部",
    };
  },
};
</script>
<style scoped lang='less'>
.playlist-header {
  .second {
    margin-right: 20px;
  }
  margin-top: 30px;
  .playlist-item {
    margin-top: 30px;
    display: flex;
    .item-tit {
      width: 90px;
      color: #489bb9;
    }
    .item-tags {
      display: flex;
      flex-wrap: wrap;
      .active {
        color: #489bb9;
      }
      li {
        padding-bottom: 5px;
        cursor: pointer;
        margin-right: 30px;
        &:hover {
          color: #489bb9;
        }
      }
    }
  }
}
</style>