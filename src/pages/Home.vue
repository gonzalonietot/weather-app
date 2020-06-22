<template>
   <v-app>
       <weather />
   </v-app>

</template>
<script>
  import Weather from '../components/Weather'
  export default {
    name: 'Home',
    components: {
      Weather
    },
    mounted () {},
    data () {
      return {
        loading: false
      }
    }
  }
</script>

<style>
</style>
