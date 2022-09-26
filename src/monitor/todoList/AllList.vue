<template>
  <ul class="todo-main">
    <!--给子组件ListItem绑定事件,例如:todo,checkTodo,在ListItem组件中需要使用props进行声明接收后即可使用-->
    <ListItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
      :check-todo="checkTodo"
      :delete-todo="deleteTodo"
    />
  </ul>
</template>

<script>

import ListItem from './ListItem'
export default {

  name: 'AllList',

  components: { ListItem },

  props: ['todos', 'checkTodo', 'deleteTodo']
}
</script>

<style scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #dddddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #dddddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
