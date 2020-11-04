<template>
  <div id="contact">
    <h2>Leave a message</h2>
    <form class="contact__form" @submit.prevent="send">
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
      <button type="submit" :disabled="form.busy">Send</button>
    </form>
  </div>
</template>

<script>
import contactApi from '../api/contact'

export default {
  name: 'Contact',
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
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
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
#contact {
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 15px;
  margin-top: 15px;
}
#contact > h2 {
  border-bottom: 1px solid lightgrey;
}
#contact > .contact__form {
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 15px;
}
#contact > .contact__form > div {
  margin-bottom: 15px;
}
#contact > .contact__form > div > input, #contact > .contact__form > div > textarea {
  border: 1px solid lightgrey;
  border-radius: 3px;
  width: 100%;
}
#contact > .contact__form > button {
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin-right: 5px;
}
</style>