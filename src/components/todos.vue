<template>
  <div id="todos" class="box">
    <div>
      <h2>Todo</h2>
      <ul>
        <li v-for="todo in todos" :key="todo._id">
          <div class="todos__container" v-if="currentTodo._id !== todo._id">
            <div class="todos__todo">
              <input type="checkbox">
              {{ todo.name }}
            </div>
            <div class="todos__ctrl" v-if="authenticated && ['ADMINISTRATOR'].includes(user.role)">
              <a href="#" @click.prevent="edit(todo._id)">edit</a> | <a href="#" @click.prevent="remove(todo._id)">remove</a>
            </div>
          </div>
          <template v-else>
            <form class="form" @submit.prevent="update" v-if="authenticated">
              <div>
                <input type="text" v-model="currentTodo.name" id="cur-todo-name" required placeholder="Name">
                <span class="error" v-if="currentTodo.errors.hasOwnProperty('name')">{{ currentTodo.errors.name.message }}</span>
              </div>
              <div>
                <input type="text" v-model="currentTodo.description" id="cur-todo-description" placeholder="Description (optional)">
                <span class="error" v-if="currentTodo.errors.hasOwnProperty('description')">{{ currentTodo.errors.description.message }}</span>
              </div>
              <div class="form__actions">
                <button type="button" :disabled="busy" @click="cancel">Cancel</button>
                <button type="submit" :disabled="busy">Update</button>
              </div>
            </form>
          </template>
        </li>
      </ul>
    </div>
    <form class="form" @submit.prevent="create" v-if="authenticated && ['MEMBER', 'ADMINISTRATOR'].includes(user.role)">
      <div>
        <input type="text" v-model="newTodo.name" id="new-todo-name" required placeholder="Name">
        <span class="error" v-if="newTodo.errors.hasOwnProperty('name')">{{ newTodo.errors.name.message }}</span>
      </div>
      <div>
        <input type="text" v-model="newTodo.description" id="new-todo-description" placeholder="Description (optional)">
        <span class="error" v-if="newTodo.errors.hasOwnProperty('description')">{{ newTodo.errors.description.message }}</span>
      </div>
      <div class="form__actions">
        <button type="submit" :disabled="busy">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import todoApi from '../api/todo'
import authMixin from '../mixins/auth'

export default {
  name: 'Todos',
  mixins: [authMixin],
  data() {
    return {
      currentTodo: {
        _id: null,
        name : '',
        description: '',
        errors: {}
      },
      newTodo: {
        name: '',
        description: '',
        errors: {}
      },
      todos: [],
      busy: false
    }
  },
  methods: {
    remove(todoId) {
      if (confirm('Are you sure? This operation cannot be undone.')) {
        todoApi.remove(todoId).then(() => {
          const index = this.todos.findIndex((todo) => todo._id === todoId)
          this.todos.splice(index, 1)
        }).catch((error) => {
          console.error(error)
        }).finally(() => {
          this.busy = false
        })
      }
    },
    edit(todoId) {
      const todo = this.todos.find(todo => todo._id === todoId)
      this.currentTodo.name = todo.name
      this.currentTodo.description = todo.description
      this.currentTodo._id = todoId
    },
    cancel() {
      this.currentTodo.name = ''
      this.currentTodo.description = ''
      this.currentTodo._id = null
    },
    update() {
      this.busy = true
      const payload = {
        name: this.currentTodo.name,
        description: this.currentTodo.description
      }
      todoApi.update(this.currentTodo._id, payload).then((todo) => {
        const index = this.todos.findIndex((todo) => todo._id === this.currentTodo._id)
        this.todos.splice(index, 1, todo)
        this.currentTodo.name = ''
        this.currentTodo.description = ''
        this.currentTodo._id = null
        this.currentTodo.errors = {}
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
          this.currentTodo.errors = errors
        }
      }).finally(() => {
        this.busy = false
      })
    },
    create() {
      this.busy = true
      const payload = {
        name: this.newTodo.name,
        description: this.newTodo.description
      }
      todoApi.create(payload).then((todo) => {
        this.todos.push(todo)
        this.newTodo.name = ''
        this.newTodo.description = ''
        this.newTodo.errors = {}
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
          this.newTodo.errors = errors
        }
      }).finally(() => {
        this.busy = false
      })
    },
    getTodos() {
      todoApi.get().then((todos) => {
        this.todos = todos
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  created() {
    this.getTodos()
  }
}
</script>

<style>
#todos {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.todos__container {
  display: flex;
  justify-content: space-between;
}
</style>