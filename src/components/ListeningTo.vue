<template>
  <div class="listening-to" v-if="err==null && track!=null">
    <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" :class="{ 'headphones-icon':true, 'live':nowplaying }">
      <line x1="16.6%" y1="83.3%" x2="16.6%" y2="40%" stroke-width="2px"/>
      <line x1="16.6%" y1="40%" x2="16.6%" y2="16.6%"/>
      <line x1="16.6%" y1="16.6%" x2="83.3%" y2="16.6%"/>
      <line x1="83.3%" y1="16.6%" x2="83.3%" y2="40%"/>
      <line x1="83.3%" y1="40%" x2="83.3%" y2="83.3%" stroke-width="2px"/>
      <circle id="circle" cx="50%" cy="61.65%" r="15%" stroke="rgba(0,0,0,0)" fill="rgba(0,0,0,0)"/>
    </svg>
    <span class="title">
      {{ nowplaying ? 'Currently Listening To:' : 'Last Listened To:'}} 
    </span>
    <span class="track">
      <g-link :to="'https://www.last.fm/music/'+artist.split(' ').join('+')"
              class="link">
              {{ artist }}
      </g-link>
      <span class="sep">-</span>
      <g-link :to="('https://www.last.fm/music/'+artist+'/'+album+'/'+track).split(' ').join('+')"
              class="link">
              {{ track }}
      </g-link>
    </span>
  </div>
</template>

<script>
export default {
  props: ['user','api_key',"refresh_rate"],
  data() {return {
    track: null,
    album:null,
    artist: null,
    nowplaying: null,
    err: null,
  }},
  mounted() {
      this.getMostRecentTrack();
    setInterval(function(){
      this.getMostRecentTrack();
    }.bind(this),
    this.refresh_rate)
  },
  methods: {
    getMostRecentTrack() {
      this.axios.get(
        'https://ws.audioscrobbler.com/2.0/?format=json',
        { 
          params: {
            method: 'user.getrecenttracks',
            user:this.user,
            limit:1,
            api_key:this.api_key
          }
        }).then(function(response) {
          this.artist = response.data.recenttracks.track[0].artist['#text']
          this.album = response.data.recenttracks.track[0].album['#text']
          this.track = response.data.recenttracks.track[0].name
          this.nowplaying = response.data.recenttracks.track[0]['@attr'] ? response.data.recenttracks.track[0]['@attr'].nowplaying : false
        }.bind(this)
        ).catch(function(err) {
          console.log("Listening-to widged went wrong :(\n", err)
          this.err = err
        }.bind(this))
    }
  }
}
</script>

<style scoped lang="scss">
.listening-to {
  padding-top:$spacer*2;
  border-top: 1px dotted $text-colour;
  display:flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  >*{
    margin-right: $spacer;
  }
  .headphones-icon {
    stroke: $text-colour;
    @keyframes flash {
      0% { fill:$highlight-colour }
      50% { fill:rgba(0,0,0,0) }
      100% { fill:$highlight-colour }
    }
    &.live {
      #circle {
        animation-name: flash;
        animation-duration:2s;
        animation-iteration-count: infinite;
      }
    }
  }
  .track {
    display:inline-block;
    margin-top:$spacer;
    text-align: center;
    .link {
      font-family: 'Josefin Sans', sans-serif;
      font-weight: 300;
      font-style: italic;
    }
  }
}
</style>