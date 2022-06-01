<template>
    <v-footer color="black">
        <v-col class="text-center white--text" cols="12">
            {{ new Date().getFullYear() }} © Dev by <a href="https://jjmontalban.github.io" target="_blank">JJMontalban</a>
        </v-col>
    </v-footer>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>
