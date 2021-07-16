<!--  -->
<template>
  <div class="mv-comment">
    <comments-list
      :commentsList="comments"
      :title="getComments"
      ref="comments"
    ></comments-list>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getMVComment } from "@/network/api/mv";
import CommentsList from "@/components/content/CommentsList.vue";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      limit: 10,
      hotComments: [],
      comments: [],
      total: 0,
      page: 1, // 当前页
    };
  },
  watch: {
    id() {
      this.init();
    },
  },
  components: {
    CommentsList,
  },
  computed: {
    getComments() {
      return this.comments && `最新评论(${this.total})`;
    },
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getMVComment(this.id, this.limit, this.offset);
      // console.log(res);
      if (res.code === 200) {
        this.hotComments = res.hotComments;
        this.comments = res.comments;
        this.total = res.total;
      }
    },
    //获取分页评论
    async getPagingComment() {
      const offset = (this.page - 1) * this.limit;
      const res = await getMVComment(this.id, this.limit, offset);
      // console.log(res);
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