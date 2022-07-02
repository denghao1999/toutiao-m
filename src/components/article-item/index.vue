<template>
  <van-cell class="article-item"
  :to="{
    name:'acticle',
    params:{
      articleId: article.art_id
    }
  }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- 三张图片位置 -->
      <div v-if="article.cover.type === 3" class="cover_warp">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-text">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
      <!-- 右侧图片内容 -->
    </div>
    <div>
      <van-image
        slot="default"
        v-if="article.cover.type === 1"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }

  // 三张图片样式
  .label-text span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover_warp {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
