<!--  -->
<template>
  <div class="comments">
    <comments-list
      :commentsList="hotComments"
      :title="getHot"
      v-if="hotComments !== 0"
    ></comments-list>
    <comments-list
      :commentsList="comments"
      :title="getNew"
      ref="comments"
      v-if="comments !== 0"
    ></comments-list>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[20, 40, 60, 80]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="getTotal"
      v-if="comments.length !== 0"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getPlayListComment } from "@/network/api/music-list";
import CommentsList from "@/components/content/CommentsList.vue";
export default {
  data() {
    return {
      comments: [],
      hotComments: [],
      limit: 20, //每页评论数量 默认20
      page: 1, //当前页
    };
  },
  components: {
    CommentsList,
  },
  props: {
    id: {
      type: String,
      default: 0,
    },
    recommendsCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getHot() {
      return this.hotComments && `精选评论(${this.hotComments.length})`;
    },
    getNew() {
      return (
        this.comments &&
        `最新评论(${this.recommendsCount - this.hotComments.length})`
      );
    },
    getTotal() {
      return this.comments && this.recommendsCount - this.hotComments.length;
    },
  },
  created() {
    this.getComment();
  },
  methods: {
    async getComment() {
      const res = await getPlayListComment(this.id, this.limit, 0);
      console.log(res);
      this.comments = res && res.comments;
      this.hotComments = res && res.hotComments;
      // console.log(this.comments);
      // console.log(this.hotComments);
    },
    //获取分页评论
    async getPagingComment() {
      const offset = (this.page - 1) * this.limit;
      const res = await getPlayListComment(this.id, this.limit, offset);
      console.log(res);
      this.comments = res && res.comments;
    },
    //当每页大小发生改变时
    handleSizeChange(size) {
      this.limit = size;
      this.getPagingComment();
    },
    //当改变页数时
    handleCurrentChange(page) {
      this.page = page;
      this.getPagingComment();
      const top = this.$refs.comments.$el.offsetTop;
      window.scroll(0, top);
      //增加滚动使体验更好
    },
  },
};
</script>
<style scoped lang='less'>
</style>