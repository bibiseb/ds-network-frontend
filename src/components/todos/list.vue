<template>
  <div id="todos" class="box" v-if="!loading">
    <div>
      <h2>Todo</h2>
      <ul>
        <li v-for="todo in todos" :key="todo._id">
          <todo-item
            :todo="todo"
            v-if="todoId !== todo._id"
            @edit="edit"
            @remove="remove"
            @toggle="toggle">
          </todo-item>
          <todo-form
            v-model="currentTodo"
            v-else
            @cancel="cancelEdit"
            @submit="update">
          </todo-form>
        </li>
      </ul>
    </div>
    <todo-form
      v-model="newTodo"
      v-if="authenticated && ['MEMBER', 'ADMINISTRATOR'].includes(user.role)"
      @cancel="cancelNew"
      @submit="create">
    </todo-form>
  </div>
  <div id="todos" class="box" v-else>
    <div class="loading__wrapper">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import todoApi from '../../api/todo'
import authMixin from '../../mixins/auth'
import TodoItem from './item'
import TodoForm from './form'
import Loading from '../loading'

export default {
  name: 'TodoList',
  components: {
    Loading,
    TodoItem,
    TodoForm
  },
  mixins: [authMixin],
  data() {
    return {
      todoId: null,
      currentTodo: {
        name : '',
        description: '',
        errors: {},
        busy: false
      },
      newTodo: {
        name: '',
        description: '',
        errors: {},
        busy: false
      },
      todos: [],
      loading: false
    }
  },
  methods: {
    toggle(todo) {
      todoApi.update(todo._id, { complete: todo.complete }).then((todo) => {
        const index = this.todos.findIndex((item) => item._id === todo._id)
        this.todos.splice(index, 1, todo)
      }).catch((error) => {
        const index = this.todos.findIndex((item) => item._id === todo._id)
        todo.complete = !todo.complete
        this.todos.splice(index, 1, todo)
        console.error(error)
      })
    },
    cancelNew() {
      this.newTodo.name = ''
      this.newTodo.description = ''
      this.newTodo.errors = ''
    },
    create(payload) {
      this.newTodo.busy = true
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
        this.newTodo.busy = false
      })
    },
    edit(todo) {
      this.currentTodo.name = todo.name
      this.currentTodo.description = todo.description
      this.todoId = todo._id
    },
    cancelEdit() {
      this.currentTodo.name = ''
      this.currentTodo.description = ''
      this.currentTodo.errors = {}
      this.currentTodo.busy = false
      this.todoId = null
    },
    update(payload) {
      this.busy = true
      todoApi.update(this.todoId, payload).then((todo) => {
        const index = this.todos.findIndex((item) => item._id === todo._id)
        this.todos.splice(index, 1, todo)
        this.currentTodo.name = ''
        this.currentTodo.description = ''
        this.currentTodo.errors = {}
        this.todoId = null
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
    remove(todo) {
      if (confirm('Are you sure? This operation cannot be undone.')) {
        todoApi.remove(todo._id).then(() => {
          const index = this.todos.findIndex((item) => item._id === todo._id)
          this.todos.splice(index, 1)
        }).catch((error) => {
          console.error(error)
        }).finally(() => {
          this.busy = false
        })
      }
    },
    getTodos() {
      this.loading = true
      todoApi.get().then((todos) => {
        this.todos = todos
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        this.loading = false
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
.todos__container .-complete {
  text-decoration: line-through;
  color: grey;
}
#todos .loading__wrapper {
  width: 100px;
  height: 100px;
  margin: auto;
}
</style>