<template>
  <Layout>
    <main class="main">
      <div class="list-cont">
        <h1 class="title">Categories<span class="colon">:</span></h1>
        <ul class="categories-list">
          <li v-for="category of $page.allCategories.edges" :key="category.node.id" class="category-li">
            <g-link :to="category.node.path" class="category-link link">
              {{ category.node.title }}
            </g-link>
          </li>
        </ul>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query {
  allCategories(sortBy:"title", order: DESC) {
    edges {
      node {
        id
        title
        path
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Photography'
  }
}
</script>

<style lang="scss" scoped>
.main {
  flex-grow:1;

  display:flex;
  flex-direction: column;;
  align-items: center;
  justify-content: center;

  .list-cont {
    display:flex;
    flex-direction:row;
    align-items: flex-start;

    .title {
      margin-right: $spacer*4;
      line-height: $font-size-l;
      @include serifBig();
    }

    .categories-list {
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      
      .category-li {
        line-height: $font-size-l;

        margin-top: $spacer;
        &:first-child {
          margin-top:$spacer/2;
        }

        .category-link {
          @include sansItalicUpperMedium();
       }
      }
    }
    
    @media(max-width:$breakpoint-1-width) {
      flex-direction:column;
      .title {
        align-self:center;
        margin-right:0;
        margin-bottom: $spacer*2.5;
        .colon {
          display:none;
        }
      }
    }
  }
}
</style>