(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{B2S6:function(t,a,s){},BTho:function(t,a,s){"use strict";var i=s("HAuM"),n=s("hh1v"),e=[].slice,r={},o=function(t,a,s){if(!(a in r)){for(var i=[],n=0;n<a;n++)i[n]="a["+n+"]";r[a]=Function("C,a","return new C("+i.join(",")+")")}return r[a](t,s)};t.exports=Function.bind||function(t){var a=i(this),s=e.call(arguments,1),r=function(){var i=s.concat(e.call(arguments));return this instanceof r?o(a,i.length,i):a.apply(t,i)};return n(a.prototype)&&(r.prototype=a.prototype),r}},VLs5:function(t,a,s){},odGf:function(t,a,s){"use strict";s.r(a);s("oVuX"),s("wLYn"),s("sMBO"),s("rB9j"),s("EnZy"),s("R5XZ");var i={props:["user","api_key","refresh_rate"],data:function(){return{track:"Ominous Cloud",album:"Haha Sound",artist:"Broadcast",nowplaying:null,err:"nojs",fave_track_i:0,fave_tracks:[{artist:"Broadcast",album:"Haha Sound",track:"Ominous Cloud"},{artist:"Tennis",album:"Young & Old",track:"My Better Self"},{artist:"Cults",album:"Cults",track:"Oh My God"},{artist:"Wild Nothing",album:"Gemini",track:"Live in Dreams"},{artist:"Crystal Castles",album:"(II)",track:"Not In Love - Radio Version"}]}},mounted:function(){this.getMostRecentTrack(),setInterval(function(){this.getMostRecentTrack()}.bind(this),this.refresh_rate)},computed:{artist_link:function(){return"https://www.last.fm/music/"+this.artist.split(" ").join("+").split("/").join("%2F")},track_link:function(){return("https://www.last.fm/music/"+this.artist.split("/").join("%2F")+"/"+this.album.split("/").join("%2F")+"/"+this.track.split("/").join("%2F")).split(" ").join("+")}},methods:{getMostRecentTrack:function(){this.axios.get("https://ws.audioscrobbler.com/2.0/?format=json",{params:{method:"user.getrecenttracks",user:this.user,limit:1,api_key:this.api_key}}).then(function(t){this.artist=t.data.recenttracks.track[0].artist["#text"],this.album=t.data.recenttracks.track[0].album["#text"],this.track=t.data.recenttracks.track[0].name,this.nowplaying=!!t.data.recenttracks.track[0]["@attr"]&&t.data.recenttracks.track[0]["@attr"].nowplaying,this.err=null}.bind(this)).catch(function(t){console.log("Listening-to widged went wrong :(\n",t),this.err=t,this.artist=this.fave_tracks[this.fave_track_i].artist,this.album=this.fave_tracks[this.fave_track_i].album,this.track=this.fave_tracks[this.fave_track_i].track,this.nowplaying=!1,this.fave_track_i=(this.fave_track_i+1)%fave_tracks.length}.bind(this))}}},n=(s("oduw"),s("KHd+")),e={metaInfo:{title:"About"},components:{ListeningTo:Object(n.a)(i,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"listening-to"},[s("svg",{class:{"headphones-icon":!0,live:t.nowplaying},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"15px",height:"15px"}},[s("line",{attrs:{x1:"16.6%",y1:"83.3%",x2:"16.6%",y2:"40%","stroke-width":"2px"}}),s("line",{attrs:{x1:"16.6%",y1:"40%",x2:"16.6%",y2:"16.6%"}}),s("line",{attrs:{x1:"16.6%",y1:"16.6%",x2:"83.3%",y2:"16.6%"}}),s("line",{attrs:{x1:"83.3%",y1:"16.6%",x2:"83.3%",y2:"40%"}}),s("line",{attrs:{x1:"83.3%",y1:"40%",x2:"83.3%",y2:"83.3%","stroke-width":"2px"}}),s("circle",{attrs:{id:"circle",cx:"50%",cy:"61.65%",r:"15%",stroke:"rgba(0,0,0,0)",fill:"rgba(0,0,0,0)"}})]),null==t.err?s("span",{staticClass:"title"},[t._v("\n    "+t._s(t.nowplaying?"Currently Listening To:":"Last Listened To:")+" \n  ")]):s("span",{staticClass:"title"},[t._v("\n    A Favourite Song:\n  ")]),null!=t.track?s("span",{staticClass:"track"},[s("g-link",{staticClass:"link",attrs:{to:t.artist_link}},[t._v(t._s(t.artist))]),s("span",{staticClass:"sep"},[t._v(" - ")]),s("g-link",{staticClass:"link",attrs:{to:t.track_link}},[t._v(t._s(t.track))])],1):t._e()])}),[],!1,null,"824b9a00",null).exports}},r=(s("okRu"),null),o=Object(n.a)(e,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("Layout",[s("main",{staticClass:"main"},[s("div",{staticClass:"about-cont"},[s("div",{staticClass:"cover-image-cont"},[s("g-image",{staticClass:"cover-image",attrs:{alt:"A photograph of Josh",src:t.$page.allAbout.edges[0].node.cover_image}})],1),s("div",{staticClass:"info-cont"},[s("h1",{staticClass:"title"},[t._v(t._s(t.$page.allAbout.edges[0].node.name))]),s("p",{staticClass:"bio"},[t._v(t._s(t.$page.allAbout.edges[0].node.bio))]),s("ul",{staticClass:"social-links"},t._l(t.$page.allAbout.edges[0].node.social_links,(function(a){return s("li",{key:a.link,staticClass:"social-li"},[s("g-link",{staticClass:"social-link link",attrs:{to:a.link}},[t._v(t._s(a.platform))])],1)})),0),s("listening-to",{staticClass:"listening-to",attrs:{api_key:"c49513b422b272720a73dc8c4c4d398d",user:"theteacat",refresh_rate:"30000"}})],1)])])])}),[],!1,null,"525985da",null);"function"==typeof r&&r(o);a.default=o.exports},oduw:function(t,a,s){"use strict";var i=s("VLs5");s.n(i).a},okRu:function(t,a,s){"use strict";var i=s("B2S6");s.n(i).a},wLYn:function(t,a,s){s("I+eb")({target:"Function",proto:!0},{bind:s("BTho")})}}]);