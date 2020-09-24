<template>
  <Layout>
    <main class="main">
      <div class="topbar">
        <g-link to="/photography" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="arrow">
            <line x1="0%" y1="50%" x2="100%" y2="50%"/>
            <line x1="0%" y1="50%" x2="50%" y2="100%"/>
            <line x1="0%" y1="50%" x2="50%" y2="0%"/>
          </svg>
          <span class="text link">Categories</span>
        </g-link>
        <h1 class="title">
          {{$page.categories.title}}
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
            <div class="dotted-line"/>
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
      @include serifBig();
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
        @include sansItalicUpper();
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
    padding-bottom:$spacer;

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

      border-top: 1px dotted $text-colour;

      .image-link {
        flex-basis:50%;
        max-height:90vh;
        .cover-image {
          width:100%;
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