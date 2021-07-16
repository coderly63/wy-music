<!--  -->
<template>
  <div class="subscribers">
    <img
      :src="item.avatarUrl"
      alt=""
      v-for="item in subscribers"
      :key="item.userId"
    />
  </div>
</template>

<script>
export default {
  props: {
    subscribers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped lang='less'>
.subscribers {
  display: flex;
  flex-wrap: wrap;
  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin: 20px 0 0 10px;
    cursor: pointer;
  }
}
</style>