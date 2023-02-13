<template>
  <div class="flex flex-col gap-2 p-2">
    <h1 class="text-xl font-semibold">Admin</h1>
    <!-- <va-button :loading="loading" @click="removeAllExpressions()">Remove all expressions</va-button> -->
    <!-- <va-button :loading="loading" @click="fixAllExpressions()">Fix all expressions</va-button> -->
    <template v-if="getKeys.length">
      <va-divider orientation="center">Keys: {{ getKeys.length }}</va-divider>
      <ul>
        <li v-for="key in getKeys" :key="key">{{ key }}</li>
      </ul>
    </template>
    <va-divider v-if="activeRu" orientation="center">Active ru: {{ activeRu.name }}</va-divider>
    <va-divider v-if="activeEn" orientation="center">Active us: {{ activeEn.name }}</va-divider>
    <ul>
      <li v-for="(voice, index) in voices" :key="index">{{ voice.lang }} - {{ voice.name }} ({{ voice.voiceURI }})</li>
    </ul>
    <va-divider orientation="center">en-US: {{ enVoices.length }}</va-divider>
    <ul>
      <li v-for="(voice, index) in enVoices" :key="index">{{ voice.lang }} - {{ voice.name }}</li>
    </ul>
    <va-divider orientation="center">Ru-ru: {{ ruVoices.length }}</va-divider>
    <ul>
      <li v-for="(voice, index) in ruVoices" :key="index">{{ voice.lang }} - {{ voice.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ExpressionsCollection } from '../api/collections'
import { voiceData } from '../api/utilities/speech'

function getAllProperties(obj) {
  var allProps = [],
    curr = obj
  do {
    var props = Object.getOwnPropertyNames(curr)
    props.forEach(function (prop) {
      if (allProps.indexOf(prop) === -1) allProps.push(prop)
    })
  } while ((curr = Object.getPrototypeOf(curr)))
  return allProps
}

export default {
  name: 'Admin',
  data: () => ({
    loading: false,
    voices: voiceData.all,
    enVoices: voiceData.US,
    ruVoices: voiceData.RU,
    activeEn: voiceData.activeEn,
    activeRu: voiceData.activeRu,
  }),
  computed: {
    getKeys() {
      return this.voices.length ? getAllProperties(this.voices[0]) : []
    },
  },
  methods: {
    async removeAllExpressions() {
      this.loading = true
      const expressions = await ExpressionsCollection.getAll()
      const promises = expressions.map(({ _id }) => ExpressionsCollection.delete(_id))
      Promise.all(promises)
      this.loading = false
    },
    async fixAllExpressions() {
      this.loading = true
      const expressions = await ExpressionsCollection.getAll()
      const dateString = '2/8/2023, 6:32:09 PM'
      const promises = expressions.map(({ _id, history }) => {
        const date = history[0].date
        const historyItem = {
          ...history[0],
          date,
          categories: ['1', '2', '3', '4'],
        }
        const result = {
          history: [historyItem],
          statistic:
            date < dateString
              ? {
                  1: {
                    rate: 3,
                  },
                  2: {
                    rate: 3,
                  },
                  3: {
                    rate: 3,
                  },
                  4: {
                    rate: 3,
                  },
                }
              : {},
        }
        return ExpressionsCollection.update(_id, result)
      })
      Promise.all(promises)
      this.loading = false
    },
  },
}
</script>

<style></style>
