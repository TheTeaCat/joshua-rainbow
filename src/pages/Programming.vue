<template>
  <Layout>
    <main class="main">
      <ol class="programming-ol">
        <li v-for="edge of $page.allProgramming.edges" :key="edge.node.id" class="programming-li">
          <g-link class="cover-image-cont" :to="edge.node.link" tabindex="-1">
            <g-image class="cover-image" :src="edge.node.cover_image" :alt="edge.node.title"/>
          </g-link>
          <div class="info">
            <h2 class="title"><g-link class="link" :to="edge.node.link">{{ edge.node.title }}</g-link></h2>
            <div class="date">{{ edge.node.date }}</div>
            <p class="description">{{ edge.node.short_description }}</p>
          </div>
        </li>
      </ol>
    </main>
  </Layout>
</template>

<page-query>
query($page: Int) {
  allProgramming(sortBy:"date", order: DESC, perPage: 10, page:$page) @paginate {
    pageInfo {
      totalPages
      currentPage
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        cover_image
        date(format:"DD-MM-YYYY")
        short_description
        link        
      }
    }
  }
  allFrontPage {
    edges {
      node {
        featured_pages {
          cover_image
        }
      }
    }
  }
  metadata {
    siteName
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      ...this.$ogp({
        title: "Programming Projects",
        description: "Programming Projects of Joshua Rainbow O'Sullivan",
        image: 'https://joshuarainbow.co.uk' + this.$page.allFrontPage.edges[0].node.featured_pages[0].cover_image.src,
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  flex-grow:1;

  display:flex;
  align-items: center;

  .programming-ol {
    padding: $spacer*2;
    padding-top: $spacer*4;

    width:100%;
    display:flex;
    flex-wrap:wrap;

    .programming-li {
      margin:0 auto;
      margin-left:0;
      margin-bottom:$spacer*8;
      &:last-child {
        margin-bottom:$spacer*4;
      }

      width:50%;

      min-height:100px;

      display:inline-flex;
      align-items: center;

      position:relative;
      .cover-image-cont {
        position:absolute;
        top:50px; left:50px;
        transform:translate(-50%,-50%);
        max-height:100px;
        max-width:100px;
        .cover-image {
          max-width:100%;
          max-height:100%;
        }
      }

      .info {
        padding-left: 100px + $spacer*3;
        padding-right: $spacer*3;

        .title {
          padding-bottom: $spacer*2;
          @include serifBoldItalic();
        }

        .date {
          padding-bottom: $spacer;
          @include sansItalic();
        }

        .description {
          width:100%;
          max-width:400px;
        }
      }
    }
  }

  @media(max-width:$breakpoint-1-width) {
    align-items: flex-start;

    .programming-ol {
      flex-direction: column;
      flex-wrap:nowrap;
      align-items: center;

      .programming-li {
        margin-right:0;

        min-height:70px;
        max-width:470px+$spacer*2;
        width:100%;

        .cover-image-cont {
          top:35px;
          left:35px;
          max-width:70px;
          max-height:70px;
        }
        
        .info {
          padding-right: 0;
          padding-left: 70px + $spacer*2;
          max-width:100%;
        }
      }
    }
  }
}
</style>