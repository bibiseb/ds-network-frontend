<template>
  <div id="todos">
    <h2>Todo</h2>
    <ul>
      <li v-for="todo in todos" :key="todo._id">
        <template v-if="currentTodo._id !== todo._id">
          {{ todo.name }}
          <template v-if="authenticated && ['ADMINISTRATOR'].includes(user.role)">
            (<a href="#" @click.prevent="edit(todo._id)">edit</a> or <a href="#" @click.prevent="remove(todo._id)">remove</a>)
          </template>
        </template>
        <template v-else>
          <form class="todos__edit" @submit.prevent="update" v-if="authenticated">
            <div>
              <input type="text" v-model="currentTodo.name" id="cur-todo-name" required placeholder="Name">
              <span class="error" v-if="currentTodo.errors.hasOwnProperty('name')">{{ currentTodo.errors.name.message }}</span>
            </div>
            <div>
              <input type="text" v-model="currentTodo.description" id="cur-todo-description" placeholder="Description (optional)">
              <span class="error" v-if="currentTodo.errors.hasOwnProperty('description')">{{ currentTodo.errors.description.message }}</span>
            </div>
            <button type="button" :disabled="busy" @click="cancel">Cancel</button>
            <button type="submit" :disabled="busy">Update</button>
          </form>
        </template>
      </li>
    </ul>
    <form class="todos__new" @submit.prevent="create" v-if="authenticated && ['MEMBER', 'ADMINISTRATOR'].includes(user.role)">
      <div>
        <input type="text" v-model="newTodo.name" id="new-todo-name" required placeholder="Name">
        <span class="error" v-if="newTodo.errors.hasOwnProperty('name')">{{ newTodo.errors.name.message }}</span>
      </div>
      <div>
        <input type="text" v-model="newTodo.description" id="new-todo-description" placeholder="Description (optional)">
        <span class="error" v-if="newTodo.errors.hasOwnProperty('description')">{{ newTodo.errors.description.message }}</span>
      </div>
      <button type="submit" :disabled="busy">Create</button>
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
        alert(error.message)
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
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 15px;
  margin-top: 15px;
}
#todos > h2 {
  border-bottom: 1px solid lightgrey;
}
#todos > ul {
  list-style: none;
  padding: 0;
  border: 1px solid lightgrey;
  border-radius: 3px;
}
#todos > ul > li {
  padding: 15px;
  border-bottom: 1px solid lightgrey;
}
#todos > ul > li:last-child {
  border: none;
}
#todos > .todos__new {
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 15px;
}
#todos > .todos__new > div, #todos .todos__edit > div {
  margin-bottom: 15px;
}
#todos > .todos__new > div > input, #todos .todos__edit > div > input {
  border: 1px solid lightgrey;
  border-radius: 3px;
}
#todos > .todos__new > button, #todos .todos__edit > button {
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin-right: 5px;
}
.error {
  color: red;
}
</style>