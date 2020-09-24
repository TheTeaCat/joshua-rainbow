<template>
  <Layout>
    <main class="main">
      <div class="about-cont">
        <div class="cover-image-cont">
        <g-image alt="A photograph of Josh" 
                :src="$page.allAbout.edges[0].node.cover_image"
                class="cover-image"/>
        </div>
        <div class="info-cont">
          <h1 class="title">{{ $page.allAbout.edges[0].node.name }}</h1>
          <p class="bio">{{ $page.allAbout.edges[0].node.bio }}</p>
          <ul class="social-links">
            <li v-for="social of $page.allAbout.edges[0].node.social_links" 
                :key="social.link"
                class="social-li">
                <g-link :to="social.link" class="social-link link">{{ social.platform }}</g-link>
            </li>
          </ul>
          <listening-to api_key="c49513b422b272720a73dc8c4c4d398d" 
                        user="theteacat"
                        refresh_rate="30000"
                        class="listening-to"/>
        </div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query {
  allAbout {
    edges {
      node {
        name
        cover_image
        bio
        social_links {
          link
          platform
        }
      }
    }
  }
}
</page-query>

<script>
import ListeningTo from '../components/ListeningTo.vue'

export default {
  metaInfo: {
    title: 'About'
  },
  components: {
    ListeningTo
  }
}
</script>

<style lang="scss" scoped>
.main {
  flex-grow:1;
  display:flex;
  align-items: center;
  .about-cont {
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    width:100%;
    max-height:100%;
    box-sizing: border-box;
    @media(max-width:$breakpoint-1-width) {
      flex-direction:column;
      .info-cont {
        margin-top: $spacer*4;
      }
    }
    padding: $spacer*4;
    .cover-image-cont {
      width:fit-content;
      .cover-image {
        max-width:100%;
        max-height:60vh;
      }
    }
    .info-cont {
      margin-left: $spacer*12;
      @media(max-width:$breakpoint-1-width){
        margin-left:0;
        margin-top: $spacer*8;
        width:100%;
      }
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        text-align: center;
      }
      .bio {
        border-top: 1px dotted $text-colour;
        border-bottom: 1px dotted $text-colour;
        padding: $spacer*3 0;
        margin: $spacer*2 0;
        margin-bottom: $spacer*3;
        text-align: center;
        max-width:500px;
      }
      .social-links {
        list-style:none;
        margin: 0;
        padding: 0;
        padding-bottom:$spacer*2;
        display:flex;
        align-items: center;
        flex-wrap:wrap;
        justify-content: center;
        .social-li {
          padding: 0 $spacer*2;
          margin: 0;
          .social-link {
            text-transform: uppercase;
            font-family: 'Josefin Sans', sans-serif;
            font-weight: 300;
            font-style: italic;
          }
        }
      }
      .listening-to {
        max-width:500px;
        width:100%;
      }
    }
  }
}
</style>