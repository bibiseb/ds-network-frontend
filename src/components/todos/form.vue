<template>
  <form class="form" @submit.prevent="$emit('submit', { name, description })">
    <div>
      <input type="text" v-model="name" id="todo-name" required placeholder="Name" @keyup="keyup">
      <span class="error" v-if="errors.hasOwnProperty('name')">{{ errors.name.message }}</span>
    </div>
    <div>
      <input type="text" v-model="description" id="todo-description" placeholder="Description (optional)" @keyup="keyup">
      <span class="error" v-if="errors.hasOwnProperty('description')">{{ errors.description.message }}</span>
    </div>
    <div class="form__actions">
      <button type="button" :disabled="busy" @click="$emit('cancel')">Cancel</button>
      <button type="submit" :disabled="busy">Save</button>
    </div>
  </form>
</template>

<script>
import authMixin from '../../mixins/auth'

export default {
  name: 'TodoForm',
  mixins: [authMixin],
  data() {
    return {
      name: '',
      description: '',
      errors: '',
      busy: false
    }
  },
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.name = newValue.name
        this.description = newValue.description
        this.errors = newValue.errors
        this.busy = newValue.busy
      }
    }
  },
  methods: {
    keyup() {
      this.$emit('input', {
        name: this.name,
        description: this.description,
        errors: this.errors,
        busy: this.busy
      })
    }
  },
  created() {
    this.name = this.value.name
    this.description = this.value.description
    this.errors = this.value.errors
    this.busy = this.value.busy
  }
}
</script>