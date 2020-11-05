<template>
  <div class="todos__container">
    <div :class="{ 'todos__todo': true, '-complete': todo.complete }">
      <input type="checkbox" v-model="todo.complete" @change="$emit('toggle', todo)">
      {{ todo.name }}
    </div>
    <div class="todos__ctrl" v-if="authenticated && ['ADMINISTRATOR'].includes(user.role)">
      <a href="#" @click.prevent="$emit('edit', todo)">edit</a> | <a href="#" @click.prevent="$emit('remove', todo)">remove</a>
    </div>
  </div>
</template>

<script>
import authMixin from '../../mixins/auth'

export default {
  name: 'TodoItem',
  mixins: [authMixin],
  props: {
    todo: {
      type: Object
    }
  }
}
</script>