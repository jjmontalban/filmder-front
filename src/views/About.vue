<template>
    <v-row class="text-center">
        <v-col cols="12">
            <h1 class="display-2 font-weight-bold mb-3">Insane film lover.</h1>
            <p>This project is about the headless wordpress project. My interest in treating wordpress as the backend of web app was combined with the little knowledge I have about javascript frameworks, in this case Vuejs. 
             <br> It all tied into my love of cinema <a target="_blank" href="https://www.imdb.com/user/ur22137408/?ref_=nv_usr_prof_2">you can check my IMDB profile</a>.</p>
            <p>For this I have created 2 plugins in a WordPress installation.</p>

              <strong>CPT Movie</strong><br><p>Which creates a custom post type Movie accessible from the rest-api to store all movie ratings set in TMDB.</p>
              <strong>Api TMDB</strong><br><p>This plugin syncs all my grades from the TMBD api via WP api rest.</p>

            <p>On the other hand. On the front end, I created a little game that pits my grades against yours, all rolled up into a tinder-style swipe game. Nothing special. <br>To know more you can check the repositories:</p>

              <h3>Frontend - Backend</h3>
              <br>

        </v-col>
    </v-row>
</template>

<script>
  export default {
    name: 'About'
  }
</script>
