<template>
  <v-card
      class="mx-auto"
      max-width="500"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-subtitle style="font-size: 25px">Córdoba</v-list-item-subtitle>
        <v-list-item-subtitle>{{getDay()}}, {{getHours()}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{climateDescription}}</v-list-item-subtitle>
        <div style="margin-top: 20px;">
          <div v-if="code === sunnyId">
            <img style="float: left; height: 64px; width: 64px" alt="Soleado" src="../assets/soleado.png">
          </div>
          <div>
            <img style="float: left; height: 64px; width: 64px" alt="Soleado" src="../assets/nublado.png">
          </div>
          <div style="font-size: 60px; float: left">
            <span v-if="showTemperatureInG">{{currentTempInG}}</span>
            <span v-else>{{currentTempInF}}</span>
          </div>
          <div style="float: left;margin-top: 6px;">
            <button @click="showWeatherInCelsius">
              <span>°C |</span>
            </button>
            <button @click="showWeatherInFahrenheit">
              <span>°F</span>
            </button>
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-snackbar
        v-model="error"
        :bottom="y === 'bottom'"
        :color="color"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
    >
      {{ textError }}
    </v-snackbar>
  </v-card>
</template>

<script>
  import moment from 'moment'
  import axios from 'axios'
  import codesWeather from '../data/weathersCodes'
  export default {
    name: 'Weather',
    data () {
      return {
        days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        tempInF: 0,
        tempInG: 0,
        showTemperatureInG: true,
        description: '',
        error: false,
        color: 'blue',
        mode: '',
        x: null,
        y: 'top',
        timeout: 3000,
        textError: 'Algo ha salido mal',
        code: null,
        sunnyId: 800,
        fewCloudsId: 801
      }
    },
    computed: {
      currentTempInG () {
        return this.tempInG
      },
      currentTempInF () {
        return this.tempInF
      },
      climateDescription () {
        return this.description
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      getDay () {
        const d = new Date()
        return this.days[d.getDay()]
      },
      getHours () {
        return moment().format('HH:mm')
      },
      async loadData () {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=-31.41&lon=-64.18&appid=a7bcfe9957ce3840f5e0a1fa1a0eb730`)
          this.tempInG = Math.round(response.data.current.temp - 273.15)
          this.tempInF = Math.round((response.data.current.temp - 273.15) * 9/5 + 32)
          const codeId = response.data.current.weather[0].id,
            climateDescription = codesWeather.find(p => p.id === codeId)
          this.code = climateDescription.id
          console.log(this.code, 'code')
          this.description = climateDescription.description
        } catch (e) {
          this.error = true
        }

      },
      showWeatherInCelsius () {
        this.showTemperatureInG = true
      },
      showWeatherInFahrenheit () {
        this.showTemperatureInG = false
      }
    }
  }
</script>

<style scoped>

</style>