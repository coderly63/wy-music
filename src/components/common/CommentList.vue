<!--  -->
<template>
  <div class="box">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped lang='less'>
.box {
  box-sizing: border-box;
  padding: 20px 20px 40px;
  .title {
    width: 100%;
    height: 33px;
    border-bottom: 2px solid #000;
    // float: left;
    font-size: 20px;
    font-weight: normal;
    line-height: 28px;
    display: flex;
  }
}
</style>