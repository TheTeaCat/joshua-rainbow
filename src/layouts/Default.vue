<template>
  <div :class="{ 'layout':true, 'nav-shown':nav_shown }">
    <header class="header">
      <span class="site-title" @click="toggleNav"><Logo class="logo-highlight" />{{ $static.metadata.siteName }}</span>
      <div class="hamburger-button" @click="toggleNav">
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
          <li class="header-link-li"><g-link class="header-link link" to="/"><Logo class="logo-highlight" />Home</g-link></li>
          <li class="header-link-li"><g-link class="header-link link" to="/photography/"><Logo class="logo-highlight" />Photography</g-link></li>
          <li class="header-link-li"><g-link class="header-link link" to="/programming/"><Logo class="logo-highlight" />Programming</g-link></li>
          <li class="header-link-li"><g-link class="header-link link" to="/about/"><Logo class="logo-highlight" />About</g-link></li>
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
import Logo from "~/assets/svgs/logo.svg"

export default {
  components: {
    Logo
  },
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

  .logo-highlight {
    position:absolute;
    top:50%;left:50%;
    height:200%;width:auto;
    transform:translate(-50%,-50%);
    stroke-width:0.01;
    display:none;
  }

  .header {
    align-self: stretch;

    padding: $spacer*4 $spacer*2 $spacer*3 $spacer*2;
    border-bottom: $border-style;

    .header-nav {
      display:inline;

      .header-links {
        display:flex;
        justify-content: space-between;

        .header-link-li {
          display:inline-block;
          
          .header-link {
            @include sansItalic();
            &.active--exact {
              @media(min-width:$breakpoint-1-width) {
                color:$text-colour;
                .logo-highlight {
                  display: block;
                }
                &::after {
                  display:none;
                }
              }
            }
          }
        }
      }
    }
    .hamburger-button, .site-title {
      display:none;
    }
  }

  @media(max-width:$breakpoint-1-width) {
    .header {
      z-index:1;

      margin: 0 $spacer;

      display:flex;
      justify-content: space-between;
      align-items: center;

      .site-title {
        display:inline-block;
        @include sansItalic();
        position:relative;
        .logo-highlight {
          display:block;
          filter:contrast(1);
          transition: 0.5s ease filter;
        }
      }

      .hamburger-button {
        display:inline-block;

        .hamburger-icon, .cross-icon {
          stroke: $text-colour;
          transition: stroke 0.5s ease;
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
              .logo-highlight {
                display:none !important;
              }
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

        .site-title {
          .logo-highlight {
            filter:contrast(0);
          }
        }
        
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