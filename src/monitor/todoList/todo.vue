<template>
  <div id="root">
    <div  class="todo-container">
      <div class="todo-wrap" >
        <!--
        1.给ListHeader,AllList,ListFooter子组件绑定属性
        2.在子组件中使用props进行声明接收就可以调用本组件定义的方法和数据了
        -->
        <ListHeader :add-todo="addTodo"  />
        <AllList :todos="todos" :check-todo="checkTodo" :delete-todo="deleteTodo" />
        <ListFooter :todos="todos" :check-all-todo="checkAllTodo" :clear-all-todo="clearAllTodo" />
      </div>
    </div>
  </div>
</template>

<script>
// 引入子组件
import ListHeader from './ListHeader'
import AllList from './AllList'
import ListFooter from './ListFooter'

export default {
  // 给当前组件命名为:App
  name: 'App',
  // 注册引入的子组件
  components: { ListHeader, AllList, ListFooter },
  // 初始化的todo list数据
  data() {
    return {
      todos: [
        // TODO 待办事项接口
        // { id: '001', title: '读文学书', done: true },
        // { id: '002', title: '解函数', done: false },
        // { id: '003', title: '上瑜珈课', done: false },
        // { id: '004', title: '研究三角函数', done: false }

      ]
    }
  },
  methods: {
    // 添加一个todo
    addTodo(todoObj) {
      this.todos.unshift(todoObj)
    },
    // 勾选or取消勾选一个todo
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done
      })
    },
    // 删除一个todo
    deleteTodo(id) {
      // 精简写法
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    // 全选or取消全选
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done
      })
    },
    // 清除所有已经完成的todo,保留done为false的todo
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done
      })
    }
  }
}
</script>

<style>
body {
  background: #ffffff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0);
  border-radius: 4px;
}

.btn-danger {
  color: #ffffff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #ffffff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 80%;
  margin: 10% auto;
}

.todo-container .todo-wrap {

  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 5px;
}
</style>
