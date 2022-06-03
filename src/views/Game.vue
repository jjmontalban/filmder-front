<template>
  <v-container>
      <transition name="fade" mode="out-in">
          <div key=1 v-if="ok">
              <tinder class="text-center" ref="tinder" key-name="title" :queue.sync="queue" :offset-y="1" allow-down @submit="onSubmit">
                  <template slot-scope="movie">
                      {{ movie.data.title }}
                      <img class="pic" :style="{ 'background-image': `url(${movie.data.img})` }"/>
                  </template>
                  <img class="nope-pointer" slot="nope" src="../assets/nope.png">
                  <img class="super-pointer" slot="super" src="../assets/super.png">
                  <img class="down-pointer" slot="down" src="../assets/down.png">
                  <img class="like-pointer" slot="like" src="../assets/like.png"> 
              </tinder>
              <div class="btns">
                  <img src="../assets/nope.png" @click="decide('nope')">
                  <img src="../assets/super.png" @click="decide('super')">
                  <img src="../assets/down.png" @click="decide('down')">
                  <img src="../assets/like.png" @click="decide('like')">
              </div>
          </div>
          <div class="text-center" v-else>
              <div v-for="movie in movies" v-bind:key="movie.id">
                  <img :src="movie.img" width="25%" alt="Image Movie">
                  <h2>{{ movie.original }}</h2>
                  <span>in spanish</span>
                  <h3>{{ movie.title }}</h3>
                  <br>
                  <span>Number of votes: {{ movie.votes }}</span><br>
                  <span>Vote average: {{ movie.vote_avg }}</span><br>
                  
                  <div v-if="movie.user_rating  === 'like'">
                      You liked this movie and my rating was {{ movie.rating }}<br>
                      <span class="quote" v-if="movie.rating <= 5">Good movie? Really? Don't know what movie you saw...</span>
                      <span class="quote" v-else-if="(5 < movie.rating) && (movie.rating < 7)">Movies have to entertain, and this one does...</span>
                      <span class="quote" v-else>What? There's something you let go. this is better than average...</span>
                  </div>

                  <div v-else-if="movie.user_rating === 'nope'">
                        You didnt like and my rating was {{ movie.rating }}<br>  
                        <span class="quote" v-if="movie.rating <= 5">We agree. It's not a movie to watch again...</span>
                        <span class="quote" v-else-if="(5 < movie.rating) && (movie.rating < 7)">I recommend that you watch it again...</span>
                        <span class="quote" v-else>Bad movie? Really??</span>
                  </div>

                  <div v-else-if="movie.user_rating === 'super'">
                        For you this movie is the best and my rating was {{ movie.rating }}<br>
                        <span v-if="movie.rating <= 5">
                            <span class="quote" v-if="movie.vote_avg <= 6">Calm down. {{ movie.votes }} people can't be wrong...</span>
                            <span class="quote" v-else>Meh. It seems you follow the crowd...</span>
                        </span>
                        <span class="quote" v-else-if="(5 < movie.rating) && (movie.rating < 7)">I recommend that you watch it again...</span>
                        <span class="quote" v-else>We agree. You have good taste</span>
                  </div>
                  <div v-else>
                        Didn't you see this movie? Let's just let it go...Anyway I scored it with {{ movie.rating }}<br>
                        <span class="quote" v-if="movie.rating <= 5">You're not missing anything...</span>
                        <span class="quote" v-else-if="(5 < movie.rating) && (movie.rating < 7)">I recommend that you watch it...</span>
                        <span class="quote" v-else>Run to see it please!</span>
                  </div>
                  <br>
                  <hr>
                  <br>
                  <br>
              </div>
              <h1>Our Film Afinnity</h1>
              <div v-if="movies.total < this.cont/2">
                    <span class="quote">Sorry but you need to see more films!</span>
              </div>
              <div v-else>
                    <span class="quote" v-if="movies.result < 0">
                          We don't have the same idea of what cinema is. 
                          <a target="_blank" href="https://www.complex.com/pop-culture/2019/10/martin-scorsese-on-marvel-movies">  
                              Marvel movies is cinema for you?
                          </a>
                    </span>
                    <span class="quote" v-else-if="(movies.result >= 0) && (movies.result < 3)" >
                          Not bad. I leave you my references so you can learn 
                          <a target="_blank" href="https://www.imdb.com/user/ur22137408/watchlist?sort=your_rating%2Cdesc">
                              something.
                          </a>
                    </span>
                    <span v-else class="quote">
                          I like your style. 
                          <a target="_blank" href="https://www.imdb.com/user/ur22137408/watchlist?sort=your_rating%2Cdesc">
                              You can check all my favourite movies for ever.
                          </a> 
                    </span>
              </div>
          </div>
      </transition>
  </v-container>  
</template>

<script>
/* eslint-disable */
import Tinder from "vue-tinder";
import axios from "axios";

export default {
  
    name: "Game",
    components: { 'tinder': Tinder },
  
    data: () => ({
      // Wordpress Posts Endpoint
      count: 10,
      moviesUrl: "https://filmder.jjmontalban.com/wp-json/wp/v2/movies?per_page=10&orderby=rand",
      queue: [],
      movies: [],
      offset: 0,
      history: [],
      total_pages: 0,
      page_number: 0,
      pos: 0,
      ok: true,
    }),

    created() {
        this.mock();
    },

    methods: {

        mock() {
          const list = [];

          axios
              .get(this.moviesUrl)
              .then(response => {
                for (let j = 0; j < this.count; j++) {
                    list.push({  
                          img: response.data[this.offset].movie_image,
                          title: response.data[this.offset].title.rendered,
                          rating: response.data[this.offset].movie_data.rating[0],
                          original: response.data[this.offset].movie_data.original_title[0],
                          votes: response.data[this.offset].movie_data.vote_count[0],
                          vote_avg: response.data[this.offset].movie_data.vote_avg[0],
                          });
                    this.offset++;
                    }

                    this.queue = this.queue.concat(list);
                    this.movies = this.movies.concat(list);
                    this.offset = 0;
                    this.movies['result'] = 0;
                    this.movies['total'] = 0;

                  }).catch(error => { console.log(error); });                
        },

        onSubmit(item) {
            if(this.queue.length == 0){ 
              this.ok = false; 
            }
            
            this.movies[this.offset]['user_rating'] = item['type'];

            switch(this.movies[this.offset]['user_rating'])
            {      
                  case 'nope':

                        if(this.movies[this.offset]['rating'] <= 5){
                            this.movies['result'] = this.movies['result'] + 3;
                            this.movies['total'] = this.movies['total'] + 1;
                        }
                        else if(5 < this.movies[this.offset]['rating'] && this.movies[this.offset]['rating'] < 7){
                            this.movies['total'] = this.movies['total'] + 1;
                        }
                        else{
                            this.movies['result'] = this.movies['result'] - 3;
                            this.movies['total'] = this.movies['total'] + 1;                          
                        }
                        break;
                  
                  case 'like':

                        if(this.movies[this.offset]['rating'] <= 5){
                            this.movies['result'] = this.movies['result'] - 1;
                            this.movies['total'] = this.movies['total'] + 1;
                        }
                        else if(5 < this.movies[this.offset]['rating'] && this.movies[this.offset]['rating'] < 7){
                            this.movies['result'] = this.movies['result'] + 1;
                            this.movies['total'] = this.movies['total'] + 1;
                        }
                        else{
                            this.movies['result'] = this.movies['result'] - 1;
                            this.movies['total'] = this.movies['total'] + 1;
                        }
                        break;

                  case 'super':

                        if(this.movies[this.offset]['rating'] <= 6){
                            this.movies['result'] = this.movies['result'] - 3;
                            this.movies['total'] = this.movies['total'] + 1;
                        }
                        else if(5 < this.movies[this.offset]['rating'] && this.movies[this.offset]['rating'] < 7){
                            this.movies['result'] = this.movies['result'] + 1;
                            this.movies['total'] = this.movies['total'] + 1;
                        }
                        else{
                            this.movies['result'] = this.movies['result'] - 2;
                            this.movies['total'] = this.movies['total'] + 1;
                        }

            }

            console.log("el resultado va siendo", this.movies['result']);
            console.log("y el total de ratings", this.movies['total']);
            this.offset++;
        },

        async decide (choice) {
                this.$refs.tinder.decide(choice)
        },
   },
};
</script>

<style>
html,
body {
  height: 100%;
}

body {
  margin: 0;
  background-color: #20262e;
  overflow: hidden;
}

#app .vue-tinder {
  position: absolute;
  z-index: 1;
  top: 1%;
  left: 0;
  right: 20px;
  margin: auto;
  width:20%;
  min-width:312px;
  height: 80%;
}

.tinder-card { 
  border-radius: 0px !important;
}

.nope-pointer, .like-pointer {
  position: absolute;
  z-index: 1;
  top: 100px;
  width: 164px;
  height: 164px;
}

.nope-pointer {
  left: 10px;
}

.like-pointer {
  right: 10px;
}

.super-pointer {
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  width: 164px;
  height: 164px;
}

.down-pointer {
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 0;
  right: 0;
  margin: auto;
  width: 164px;
  height: 164px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.btns {
  z-index: 10;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  margin: auto;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 500px;
}

.btns img {
  margin-right: 12px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.btns img:nth-child(1n) {
  width: 65px;
}

.btns img:nth-child(2n) {
  width: 53px;
}

.btns img:nth-child(3n) {
  width: 53px;
}

.btns img:nth-child(4n) {
  width: 65px;
}

.btns img:nth-last-child(1) {
  margin-right: 0;
}

/* Transtions */
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}

.fade-enter, .fade-leave-to {
    opacity: 0
}

span.quote {
  font-size: 20px;
}

</style>
