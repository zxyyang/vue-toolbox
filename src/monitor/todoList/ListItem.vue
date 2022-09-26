<template>
  <li>
    <label>
      <!--
      1.初始化时: 绑定checked事件,如果为true时则勾选中checkbox,反之不勾选中checkbox
      2.数据变更时: 绑定change事件,调用handleCheck方法并传入当前item的所属id值来操作是取消还是选中checkbox的勾选
      -->
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)">
      <span>{{ todo.title }}</span>
    </label>
    <!-- 给每条item的删除按钮绑定click点击事件,通知App组件中将对应的todo进行删除操作 -->
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script>
export default {

  name: 'ListItem',

  props: ['todo', 'checkTodo', 'deleteTodo'],
  methods: {

    handleCheck(id) {
      this.checkTodo(id)
    },

    handleDelete(id) {
      if (confirm('确认删除吗？')) {
        this.deleteTodo(id)
      }
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #dddddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: lightskyblue;
}

li:hover button {
  display: block;
}
</style>
