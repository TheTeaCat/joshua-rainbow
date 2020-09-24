<template>
  <Layout>
    <main class="main">
      <div class="info-cont">
        <div class="info">
          <g-link :to="$page.photography.category.path" class="category-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="arrow">
              <line x1="0%" y1="50%" x2="100%" y2="50%"/>
              <line x1="0%" y1="50%" x2="50%" y2="100%"/>
              <line x1="0%" y1="50%" x2="50%" y2="0%"/>
            </svg>
            <span class="name link">{{ $page.photography.category.title }}</span>
          </g-link>
          <h1 class="title">
            {{ $page.photography.title }}
          </h1>
          <p v-if="$page.photography.description.length > 0" class="desc" v-html="$page.photography.description"/>
        </div>
      </div>
      <ul class="images-ul">
        <li v-for="image of $page.photography.images" :key="image" class="image-li">
          <g-image :src="image" class="image"/>
        </li>
      </ul>
    </main>
  </Layout>
</template>

<page-query>
query Photography ($path: String!) {
   photography: photography (path: $path) {
    id
    title
    category {
      title
      path
    }
    description
    images
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
  justify-content: space-around;  
  flex-direction: row;
  @media(max-width:$breakpoint-1-width) {
    flex-direction:column;
  }

  .info-cont {
    margin: 0 auto;
    padding: $spacer*4;
    padding-top: $spacer*5;

    height:90vh;
    width:100%;
    max-width:400px;
    box-sizing: border-box;

    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media(max-width:$breakpoint-1-width) {
      padding:$spacer*8 $spacer*4;
      padding-top:$spacer*9;
      height:auto;
    }

    .info {
      display:flex;
      flex-direction:column;

      .title {
        @include serifBig();
      }
      .desc {
        margin-top: $spacer*2;
      }

      @media(max-width:$breakpoint-1-width) {
        align-items: center;
        .title, .desc {
          text-align:center;
        }
      }

      .category-link {
        margin-bottom: $spacer*2;

        display:flex;
        align-items: center;

        text-decoration: none;

        .name {
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
  }

  .images-ul {
    flex-basis:0;
    flex-grow:1;

    padding: $spacer $spacer*2;

    display:flex;
    flex-direction: column;
    align-items: center;

    .image-li {
      padding:$spacer 0;
      &:first-child {
        padding-top:0;
      }

      .image {
        max-height:90vh;
        max-width:100%;
      }
    }
    
    @media(min-width:$breakpoint-1-width) {
      padding-top: $spacer*3;
      .image-li:first-child {
        height:90vh;
        display:flex;
        align-items: center;
      }
    }
  }
}
</style>