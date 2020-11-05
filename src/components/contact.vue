<template>
  <div id="contact" class="box">
    <h2>Contact</h2>
    <form class="form" @submit.prevent="send">
      <div>
        <input type="text" v-model="form.name" id="contact-name" required placeholder="Name">
        <span class="error" v-if="form.errors.hasOwnProperty('name')">{{ form.errors.name.message }}</span>
      </div>
      <div>
        <input type="email" v-model="form.email" id="contact-email" required placeholder="E-mail">
        <span class="error" v-if="form.errors.hasOwnProperty('email')">{{ form.errors.email.message }}</span>
      </div>
      <div>
        <textarea v-model="form.message" id="contact-message" required placeholder="Message"></textarea>
        <span class="error" v-if="form.errors.hasOwnProperty('message')">{{ form.errors.message.message }}</span>
      </div>
      <div class="form__actions">
        <button type="submit" :disabled="form.busy" v-if="!form.busy">Send</button>
        <div v-else><div class="loading__wrapper"><loading></loading></div></div>
      </div>
    </form>
  </div>
</template>

<script>
import contactApi from '../api/contact'
import Loading from '../components/loading';

export default {
  name: 'Contact',
  components: {
    Loading
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
        errors: {},
        busy: false
      }
    }
  },
  methods: {
    send() {
      this.form.busy = true
      const payload = {
        name: this.form.name,
        email: this.form.email,
        message: this.form.message
      }
      contactApi.send(payload).then(() => {
        this.form.name = ''
        this.form.email = ''
        this.form.message = ''
        alert('Message sent!')
      }).catch((error) => {
        if (error.response && error.response.status === 422) {
          const errorsBag = error.response.data.errors
          const errors = {}
          errorsBag.forEach((error) => {
            errors[error.path.join('.')] = {
              type: error.type,
              message: error.message
            }
          })
          this.form.errors = errors
        } else {
          alert('An error occurred...')
        }
      }).finally(() => {
        this.form.busy = false
      })
    }
  }
}
</script>

<style>
#contact .loading__wrapper {
  width: 40px;
  height: 40px;
  margin: auto;
}
</style>