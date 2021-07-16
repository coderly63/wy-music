<!--  -->
<template>
  <div class="tab">
    <div class="title">{{ title }}：</div>
    <div class="content">
      <div
        class="item"
        v-for="(item, i) in array"
        :key="i"
        @click="changeItem(i)"
        :class="{ active: currentIndex === i }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    array: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changeItem(i) {
      this.currentIndex = i;
      this.$emit("change", i);
    },
  },
};
</script>
<style scoped lang='less'>
.tab {
  display: flex;
  margin-bottom: 20px;
  .content {
    display: flex;
    .item {
      margin-left: 20px;
      cursor: pointer;
    }
    .item:hover {
      color: #6abdf8;
    }
    .active {
      color: #6abdf8;
    }
  }
}
</style>