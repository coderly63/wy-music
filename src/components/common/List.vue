<!--  -->
<template>
  <div class="box">
    <div class="title">
      <slot name="title"></slot>
      <slot name="subhead"></slot>
    </div>
    <div class="content">
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
    border-bottom: 2px solid rgb(193, 13, 12);
    font-size: 20px;
    font-weight: normal;
    line-height: 28px;
    display: flex;
  }
  .subhead {
    font-size: 14px;
    margin: 8px 0px 0px 30px;
  }
}
</style>