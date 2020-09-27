<template>
  <div :class="{ 'layout':true, 'nav-shown':nav_shown }">
    <header class="header">
      <div class="hamburger-button" @click="toggleNav">
        <span class="link">{{ $static.metadata.siteName }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="hamburger-icon">
          <line x1="0%" y1="16.6%" x2="100%" y2="16.6%" stroke-width="0.5px"/>
          <line x1="0%" y1="50%" x2="100%" y2="50%" stroke-width="0.5px"/>
          <line x1="0%" y1="83.3%" x2="100%" y2="83.3%" stroke-width="0.5px"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="cross-icon">
          <line x1="0%" y1="0%" x2="100%" y2="100%" stroke-width="0.5px"/>
          <line x1="0%" y1="100%" x2="100%" y2="0%" stroke-width="0.5px"/>
        </svg>
      </div>
      <nav class="header-nav">
        <ul class="header-links">
          <li class="header-link-li"><g-link class="header-link link" to="/">Home</g-link></li>
          <li class="header-link-li"><g-link class="header-link link" to="/photography/">Photography</g-link></li>
          <li class="header-link-li"><g-link class="header-link link" to="/programming/">Programming</g-link></li>
          <li class="header-link-li"><g-link class="header-link link" to="/about/">About</g-link></li>
        </ul>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  data() {return {
    nav_shown:false,
  }},
  methods:{
    toggleNav(){
      this.nav_shown = !this.nav_shown
    }
  }
}
</script>

<style lang="scss" scoped>

.layout {
  width:100%;
  flex-grow:1;
  
  display:flex;
  flex-direction: column;
  align-items: stretch;

  max-width:1280px;
  margin: 0 auto;

  .header {
    align-self: stretch;

    padding: $spacer*4 $spacer*2 $spacer*3 $spacer*2;
    border-bottom: 1px dotted $text-colour;

    .header-nav {
      display:inline;

      .header-links {
        display:flex;
        justify-content: space-between;

        .header-link-li {
          display:inline-block;
          
          .header-link {
            @include sansItalic();
          }
        }
      }
    }
    .hamburger-button {
      display:none;
    }
  }

  @media(max-width:$breakpoint-1-width) {
    .header {
      z-index:1;
      
      .hamburger-button {
        margin-left: $spacer;

        display:inline-flex;

        @include sansItalic();

        .link {
          margin-top:$spacer/2;
        }

        .hamburger-icon, .cross-icon {
          stroke: $text-colour;
          transition: stroke 0.5s ease;
          margin-left: $spacer*2;
        }
        .cross-icon {
          display:none;
        }
        &:hover {
          .hamburger-icon, .cross-icon {
            stroke: $highlight-colour;
          }
        }
      }

      .header-nav {
        z-index:-1;

        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100vh;

        padding-top:$spacer*12;
        box-sizing: border-box;

        pointer-events: none;
        opacity:0;
        transition: opacity 0.5s ease;
        
        .header-links {
          height:100%;

          flex-direction:column;
          justify-content: center;
          align-items: center;
          
          .header-link-li {
            padding: $spacer 0;
            .header-link {
              @include sansItalicLarge();
            }
          }
        }
      }
    }
    
    &.nav-shown {
      height:100vh;
      overflow:hidden;

      .header {        
        background: rgba(255,255,255,0.9);
        
        .header-nav {
          background: rgba(255,255,255,0.9);
          pointer-events: unset;
          opacity:1;
        }

        .hamburger-button {
          .hamburger-icon {
            display:none;
          }
          .cross-icon {
            display:inline;
          }
        }
      }
    }
  }

}
</style>