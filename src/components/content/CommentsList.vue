<!--  -->
<template>
  <div>
    <comment-list v-if="commentsList.length !== 0">
      <template v-slot:title>
        <p>{{ title }}</p>
      </template>
      <template v-slot:content>
        <div class="item" v-for="item in commentsList" :key="item.commentId">
          <div class="img">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="content">
            <div class="title">
              <span class="name">{{ item.user.nickname }} : </span>
              <span class="comment">{{ item.content }}</span>
            </div>
            <div class="time">
              {{ getTime(item) }}
            </div>
          </div>
        </div>
      </template>
    </comment-list>
  </div>
</template>

<script>
import CommentList from "../common/CommentList.vue";
import moment from "moment";
export default {
  components: { CommentList },
  props: {
    title: {
      type: String,
      default: "",
    },
    commentsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getTime(item) {
      return moment(item.time).format("YYYY年M-D-h:mm:ss");
    },
  },
};
</script>
<style scoped lang='less'>
.item {
  display: flex;
  margin: 10px 0 10px 10px;
  padding: 10px 0 10px;
  border-top: 1px solid #cfcfcf;
  img {
    width: 40px;
    height: 40px;
  }
  .content {
    margin-left: 10px;
    .title {
      .name {
        color: #5abae9;
      }
    }
    .time {
      color: slategrey;
      font-size: 10px;
      margin-top: 10px;
    }
  }
}
</style>