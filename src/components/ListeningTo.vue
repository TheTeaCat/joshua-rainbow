<template>
  <div class="listening-to" v-if="err!=null || track!=null">
    <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" :class="{ 'headphones-icon':true, 'live':nowplaying }">
      <line x1="16.6%" y1="83.3%" x2="16.6%" y2="40%" stroke-width="2px"/>
      <line x1="16.6%" y1="40%" x2="16.6%" y2="16.6%"/>
      <line x1="16.6%" y1="16.6%" x2="83.3%" y2="16.6%"/>
      <line x1="83.3%" y1="16.6%" x2="83.3%" y2="40%"/>
      <line x1="83.3%" y1="40%" x2="83.3%" y2="83.3%" stroke-width="2px"/>
      <circle id="circle" cx="50%" cy="61.65%" r="15%" stroke="rgba(0,0,0,0)" fill="rgba(0,0,0,0)"/>
    </svg>
    <span class="title" v-if="err==null">
      {{ nowplaying ? 'Currently Listening To:' : 'Last Listened To:'}} 
    </span>
    <span class="title" v-else>
      A Favourite Song:
    </span>
    <span class="track" v-if="track!=null">
      <g-link :to="artist_link"
              class="link"
      >{{ artist }}</g-link>
      <span class="sep"> - </span>
      <g-link :to="track_link"
              class="link"
      >{{ track }}</g-link>
    </span>
  </div>
  <div v-else-if="err==null" class="loading-notice">
    Checking last.fm...
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
    fave_track_i: 0,
  }},
  mounted() {
    this.getMostRecentTrack();
    setInterval(function(){
      this.getMostRecentTrack();
    }.bind(this),
    this.refresh_rate)
  },
  computed: {
    artist_link() {
      return 'https://www.last.fm/music/'+this.artist.split(' ').join('+').split('/').join('%2F')
    },
    track_link() {
      return ('https://www.last.fm/music/'+this.artist.split('/').join('%2F')+'/'+this.album.split('/').join('%2F')+'/'+this.track.split('/').join('%2F')).split(' ').join('+')
    }
  },
  methods: {
    getMostRecentTrack() {
      const fave_tracks = [
        {
          artist: 'Broadcast',
          album:'Haha Sound',
          track:'Ominous Cloud',
        },
        {
          artist: 'Tennis',
          album:'Young & Old',
          track:'My Better Self',
        },
        {
          artist: 'Cults',
          album:'Cults',
          track:'Oh My God',
        },
        {
          artist: 'Wild Nothing',
          album:'Gemini',
          track:'Live in Dreams',
        },
        {
          artist: 'Crystal Castles',
          album:'(II)',
          track:'Not In Love - Radio Version',
        },
      ]
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
          this.artist = fave_tracks[this.fave_track_i].artist
          this.album = fave_tracks[this.fave_track_i].album
          this.track = fave_tracks[this.fave_track_i].track
          this.nowplaying = false
          this.fave_track_i = (this.fave_track_i+1)%fave_tracks.length
        }.bind(this))
    }
  }
}
</script>

<style scoped lang="scss">
.listening-to {
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
    margin-top:$spacer;

    display:inline-block;

    text-align: center;

    .link {
      @include sansItalic();
    }
  }
}

.loading-notice {
  min-height:22px;
}
</style>