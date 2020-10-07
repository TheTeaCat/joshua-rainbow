<template>
  <Layout>
    <main class="main">
      <div class="topbar">
        <g-link to="/photography" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="arrow">
            <line x1="5%" y1="50%" x2="95%" y2="50%" stroke-width="0.5px"/>
            <line x1="5%" y1="49.5%" x2="50%" y2="95%" stroke-width="0.5px"/>
            <line x1="5%" y1="50.5%" x2="50%" y2="5%" stroke-width="0.5px"/>
          </svg>
          <span class="text link">Categories</span>
        </g-link>
        <h1 class="title">
          {{ $page.categories.title }}
        </h1>
      </div>
      <ul class="series-list">
        <li v-for="series of $page.categories.belongsTo.edges" 
            :key="series.node.id" 
            class="series-li">
          <g-link :to="series.node.path" class="image-link" tabindex="-1">
            <g-image class="cover-image" :alt="series.node.title" :src="series.node.cover_image" immediate="true"/>
          </g-link>
          <div class="info">
            <g-link class="title link" :to="series.node.path">{{ series.node.title }}</g-link>
            <p class="desc">
              {{ series.node.description }}
            </p>
          </div>
        </li>
      </ul>

    </main>
  </Layout>
</template>

<page-query>
query ($path: String!) {
  categories(path: $path) {
    title
    belongsTo(sortBy:"title", order: ASC) {
      edges {
        node {
          ... on Photography {
            title
            description
            path
            cover_image
          }
        }
      }
    }
  }
  allAbout {
    edges {
      node {
        cover_image
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
        title: this.$page.metadata.siteName + ' - ' + this.$page.categories.title,
        description: 'Photography by Joshua Rainbow O\'Sullivan',
        image: 'https://joshuarainbow.co.uk' + this.$page.allAbout.edges[0].node.cover_image
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display:flex;
  flex-direction:column;

  .topbar {
    padding: $spacer*4;
    padding-top: $spacer*5;
    @media(max-width:$breakpoint-1-width) {
      padding:$spacer*8 $spacer*4;
      padding-top:$spacer*9;
    }

    .title {
      margin:0 auto;
      width:fit-content;
      @include serifBoldItalicLarge();
    }

    .back-link {
      margin: 0 auto;
      margin-bottom: $spacer*2;

      width: fit-content;

      text-decoration: none;

      display:flex;
      align-items: center;

      .text {
        margin-top: $spacer;
        margin-left: $spacer;
        @include sansItalic();
      }

      .arrow {
        stroke: $text-colour;
        transition: stroke 0.5s ease;
      }
      &:hover {
        .arrow {
          stroke: $highlight-colour;
        }
      }
    }

  }
  .series-list {
    .series-li {
      display: flex;
      align-items: center;
      flex-direction: row;
      &:nth-child(even) {
        flex-direction:row-reverse;
      }

      padding: $spacer*3 $spacer*2;
      @media(max-width:$breakpoint-1-width) {
        padding: $spacer*2;
      }

      border-top: $border-style;

      .image-link {
        flex-basis:50%;
        max-height:90vh;
        .cover-image {
          display:block;
          max-width:100%;
          margin: 0 auto;
          max-height:90vh;
        }
      }

      .info {
        flex-basis:50%;

        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: $spacer*2;
        @media(max-width:$breakpoint-2-width) {
          padding-bottom: $spacer*4;
        }
        
        .title {
          @include serifBoldItalic();
        }

        .desc {
          margin-top: $spacer;
          max-width: 400px;
          text-align:center;
        }
      }
      
      @media(max-width:$breakpoint-2-width) {
        flex-direction:column !important;
        .info {
          margin-top: $spacer*4;
        }
      }
    }
  }
}
</style>