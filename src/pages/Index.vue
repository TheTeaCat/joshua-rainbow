<template>
  <Layout>
    <main class="main">
      <ul class="featured-pages-ul">
        <li v-for="[i, featured_page] of $page.allFrontPage.edges[0].node.featured_pages.entries()"
            :key="featured_page.title"
            class="featured-pages-li"
            v-show="displayed_tile==i || displayed_tile==null">
          <div class="image-cont">
            <g-link :to="featured_page.link" tabindex="-1">
              <g-image class="featured-page-cover" :src="featured_page.cover_image" :alt="featured_page.title"/>
            </g-link>
          </div>
        </li>
      </ul>
      <div class="bottom-bar">
        <button class="prev" @click="prev" v-if="gallery_interval != null">
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="arrow">
            <line x1="0%" y1="50%" x2="100%" y2="50%"/>
            <line x1="0%" y1="50%" x2="50%" y2="100%"/>
            <line x1="0%" y1="50%" x2="50%" y2="0%"/>
          </svg>
          <span class="link">Prev</span>
        </button>
        <g-link :to="$page.allFrontPage.edges[0].node.featured_pages[displayed_tile].link" class="featured-page-link link">
          {{ $page.allFrontPage.edges[0].node.featured_pages[displayed_tile].title }}
        </g-link>
        <button class="next" @click="next" v-if="gallery_interval != null">
          <span class="link">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="arrow">
            <line x1="0%" y1="50%" x2="100%" y2="50%"/>
            <line x1="100%" y1="50%" x2="50%" y2="100%"/>
            <line x1="100%" y1="50%" x2="50%" y2="0%"/>
          </svg>
        </button>           
      </div>
    </main>
  </Layout>
</template>

<page-query>
query {
  allFrontPage {
    edges {
      node {
        featured_pages {
          title
          link
          cover_image
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Home'
  },
  data() {return{
    displayed_tile:0,
    gallery_interval:null,
  }},
  methods:{
    next() {
      const pages = this.$page.allFrontPage.edges[0].node.featured_pages.length
      this.displayed_tile = (this.displayed_tile+1)%pages
      this.resetInterval()
    },
    prev() {
      const pages = this.$page.allFrontPage.edges[0].node.featured_pages.length
      this.displayed_tile = (this.displayed_tile-1+pages)%pages
      this.resetInterval()
    },
    resetInterval() {
      if (this.gallery_interval) {
        clearInterval(this.gallery_interval)
      }
      this.gallery_interval = setInterval(function(){
        this.displayed_tile = (this.displayed_tile+1)%this.$page.allFrontPage.edges[0].node.featured_pages.length
      }.bind(this),10000)
    }
  },
  mounted() {
    this.displayed_tile = 0;
    this.resetInterval()
  },
  destroyed() {
    clearInterval(this.gallery_interval)
  }
}
</script>

<style lang="scss" scoped>
.main {
  height:0;
  flex-grow:1;

  display:flex;
  flex-direction: column;

  .featured-pages-ul {
    flex-grow: 1;

    display:flex;
    flex-direction: column;
    align-items: center;

    .featured-pages-li {
      flex-grow:1;

      width:100%;
      padding: $spacer*3 $spacer*2 0 $spacer*2;
      box-sizing: border-box;
      
      display:flex;
      flex-direction: column;
      align-items: stretch;

      .image-cont {
        flex-basis:0;
        flex-grow:1;

        width:100%;

        position:relative;

        .featured-page-cover {
          position:absolute;
          top:50%; left:50%;
          transform:translate(-50%, -50%);
          max-width:100%;
          max-height:100%;
        }
      }
    }
  }

  .bottom-bar {
    width:100%;

    display:flex;
    justify-content: space-between;

    padding: $spacer*8 $spacer*2 $spacer*2 $spacer*2;
    box-sizing: border-box;

    .featured-page-link {
      margin: 0 auto;
      margin-top: $spacer;

      text-align: center;
      text-decoration: none;
      @include sansItalicUpper();
    }

    .next, .prev {
      display:flex;
      align-items: center;

      background: none;
      border: none;
      font-size: $font-size;
      padding:0;
      margin:0;

      cursor: pointer;

      .link {
        margin: 0 $spacer;
        margin-top: $spacer;
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
}
</style>