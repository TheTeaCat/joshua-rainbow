<template>
  <div :class="{ 'layout':true, 'nav-shown':nav_shown }">
    <header class="header">
      <div class="hamburger-button" @click="toggleNav">
        <span class="link">{{ $static.metadata.siteName }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="hamburger-icon">
          <line x1="0%" y1="16.6%" x2="100%" y2="16.6%"/>
          <line x1="0%" y1="50%" x2="100%" y2="50%"/>
          <line x1="0%" y1="83.3%" x2="100%" y2="83.3%"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" class="cross-icon">
          <line x1="0%" y1="0%" x2="100%" y2="100%"/>
          <line x1="0%" y1="100%" x2="100%" y2="0%"/>
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
    align-self:flex-start;
    align-self: stretch;
    padding: $spacer*4 $spacer*2 $spacer*3 $spacer*2;
    border-bottom: 1px dotted $text-colour;
    .header-nav {
      display:inline;
      .header-links {
        display:flex;
        justify-content: space-between;
        margin: 0;
        padding-left:0;
        .header-link-li {
          display:inline-block;
          margin:0;
          .header-link {
            text-transform: uppercase;
            font-family: 'Josefin Sans', sans-serif;
            font-weight:300;
            font-style: italic;
            &.active--exact {
              font-weight:400;
            }
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
        margin-left: $spacer*2;
        display:inline-flex;
        text-transform: uppercase;
        font-family: 'Josefin Sans', sans-serif;
        font-weight:400;
        font-style: italic;
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
        display:none;
        z-index:-1;
        display:block;
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100vh;
        padding-top:$spacer*12;
        box-sizing: border-box;
        opacity:0;
        pointer-events: none;
        transition: opacity 0.5s ease;
        .header-links {
          height:100%;
          flex-direction:column;
          justify-content: center;
          align-items: center;
          background: rgba(255,255,255,0.9);
          .header-link-li {
            padding: $spacer 0;
            .header-link {
              font-size: $font-size-l;
            }
          }
        }
      }
    }
    &.nav-shown {
      height:100vh;
      overflow:hidden;
      .header {
        .hamburger-button {
          .hamburger-icon {
            display:none;
          }
          .cross-icon {
            display:inline;
          }
        }
        .header-nav {
          pointer-events: unset;
          opacity:1;
        }
      }
    }
  }

}
</style>