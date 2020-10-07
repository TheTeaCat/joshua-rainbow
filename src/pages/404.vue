<template>
  <Layout>
    <main class="main">
      <div class="err-notice">
        404 - Couldn't find that! :(
        <g-link to="/" class="home-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="arrow">
            <line x1="5%" y1="50%" x2="95%" y2="50%" stroke-width="0.5px"/>
            <line x1="5%" y1="49.5%" x2="50%" y2="95%" stroke-width="0.5px"/>
            <line x1="5%" y1="50.5%" x2="50%" y2="5%" stroke-width="0.5px"/>
          </svg>
          <span class="name link">
            Back To Homepage
          </span>
        </g-link>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query {
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
        title: "404",
        description: "Couldn't find that! :(",
        image: 'https://joshuarainbow.co.uk' + this.$page.allAbout.edges[0].node.cover_image
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  flex-grow:1;
  display:flex;
  align-items: center;
  justify-content: center;

  .err-notice {
    display:flex;
    flex-direction: column;
    align-items: center;

    @include serifBoldItalicLarge();

    .home-link {
      margin-top: $spacer*4;

      display:flex;
      align-items: center;
      
      text-decoration: none;

      .name {
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
}
</style>