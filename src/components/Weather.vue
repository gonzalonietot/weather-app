<template>
  <v-card
      class="mx-auto"
      max-width="500"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-subtitle class="city">Córdoba</v-list-item-subtitle>
        <v-list-item-subtitle>{{getDay()}}, {{getHours()}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{climateDescription}}</v-list-item-subtitle>
        <div class="weather">
          <div v-if="code === sunnyId">
            <img class="image" alt="Soleado" src="../assets/soleado.png">
          </div>
          <div v-if="code === fewCloudsId">
            <img class="image" alt="Pocas nubes" src="../assets/pocas_nubes.png">
          </div>
          <div v-if="code === scatteredCloudsId">
            <img class="image" alt="Nublado" src="../assets/nublado.png">
          </div>
          <div v-if="checkPartlyCloudy">
            <img class="image" alt="Nubes dispersas" src="../assets/nubes_dispersas.png">
          </div>
          <div v-if="checkShowerRain">
            <img class="image" alt="Aguacero" src="../assets/aguacero.png">
          </div>
          <div v-if="checkRain">
            <img class="image" alt="Lluvia" src="../assets/lluvia.png">
          </div>
          <div v-if="checkThunderstormId">
            <img class="image" alt="Tormenta" src="../assets/tormenta.png">
          </div>
          <div v-if="checkSnowId">
            <img class="image" alt="Nieve" src="../assets/tormenta.png">
          </div>
          <div class="temperature">
            <span v-if="showTemperatureInG">{{currentTempInG}}</span>
            <span v-else>{{currentTempInF}}</span>
          </div>
          <div class="button">
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
  import _ from 'lodash'
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
        fewCloudsId: 801,
        scatteredCloudsId: 802,
        brokenCloudsId: [803, 804],
        showerRainId: [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531],
        rainId: _.range(500, 505),
        thunderstormId: _.range(200, 233),
        snowId: _.range(600, 623)

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
      },
      checkPartlyCloudy () {
        return this.brokenCloudsId.find(p => p === this.code)
      },
      checkShowerRain () {
        return this.showerRainId.find(p => p === this.code)
      },
      checkRain () {
        return this.rainId.find(p => p === this.code)
      },
      checkThunderstormId () {
        return this.thunderstormId.find(p => p === this.code)
      },
      checkSnowId () {
        return this.snowId.find(p => p === this.code)
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
  .city {
    font-size: 25px
  }
  .image {
    float: left;
    height: 64px;
    width: 64px
  }
  .weather {
    margin-top: 20px;
  }
  .temperature {
    font-size: 60px;
    float: left
  }
  .button {
    float: left;
    margin-top: 6px;
  }
</style>