<template>
  <Layout>
    <main class="main">
      <ul class="featured-pages-ul">
        <li v-for="[i, featured_page] of $page.allFrontPage.edges[0].node.featured_pages.entries()"
            :key="featured_page.title"
            class="featured-pages-li"
            v-show="displayed_tile==i || displayed_tile==null">
          
          <div class="image-cont">
            <g-link :to="featured_page.link">
              <g-image class="featured-page-cover" :src="featured_page.cover_image" />
            </g-link>
          </div>

          <div class="bottom-bar">
            <div class="prev" @click="prev" v-if="displayed_tile != null">
              <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="arrow">
                <line x1="0%" y1="50%" x2="100%" y2="50%"/>
                <line x1="0%" y1="50%" x2="50%" y2="100%"/>
                <line x1="0%" y1="50%" x2="50%" y2="0%"/>
              </svg>
              <span class="link">Prev</span>
            </div>

            <g-link :to="featured_page.link" class="featured-page-link link">
              {{ featured_page.title }}
            </g-link>

            <div class="next" @click="next" v-if="displayed_tile != null">
              <span class="link">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="arrow">
                <line x1="0%" y1="50%" x2="100%" y2="50%"/>
                <line x1="100%" y1="50%" x2="50%" y2="100%"/>
                <line x1="100%" y1="50%" x2="50%" y2="0%"/>
              </svg>
            </div>           
          </div>
        </li>
      </ul>
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
    displayed_tile:null,
    gallery_interval:null,
  }},
  methods:{
    next() {
      this.displayed_tile = (this.displayed_tile+1)%this.$page.allFrontPage.edges[0].node.featured_pages.length
      clearInterval(this.gallery_interval)
    },
    prev() {
      const pages = this.$page.allFrontPage.edges[0].node.featured_pages.length
      this.displayed_tile = (this.displayed_tile-1+pages)%pages
      clearInterval(this.gallery_interval)
    }
  },
  mounted() {
    this.displayed_tile = 0;
    this.gallery_interval = setInterval(function(){
      this.displayed_tile = (this.displayed_tile+1)%this.$page.allFrontPage.edges[0].node.featured_pages.length
    }.bind(this),10000)
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
    margin:0;padding:0;
    display:flex;
    flex-direction: column;
    align-items: center;
    .featured-pages-li {
      flex-grow:1; width:100%;
      margin:0;
      padding: $spacer*3 $spacer*2 $spacer*2 $spacer*2;
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
          object-fit: contain;
        }
      }
      .bottom-bar {
        width:100%;
        display:flex;
        justify-content: space-between;
        padding-top: $spacer*8;
        .featured-page-link {
          text-align: center;
          margin: 0 auto;
          margin-top: $spacer;
          text-decoration: none;
          text-transform: uppercase;
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 300;
          font-style: italic;
        }
        .next, .prev {
          display:flex;
          align-items: center;
          cursor: pointer;
          .link {
            margin: 0 $spacer;
            margin-top: $spacer;
            text-transform: uppercase;
            font-family: 'Josefin Sans', sans-serif;
            font-weight: 300;
            font-style: italic;
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
  }
}
</style>