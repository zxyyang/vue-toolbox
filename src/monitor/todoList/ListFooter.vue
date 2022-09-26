<template>
  <div v-show="total" class="todo-footer">
    <label>
      <!-- v-model表示双向绑定,页面操作控制底层数据,底层数据变更影响页面展示 -->
      <input v-model="isAll" type="checkbox">
    </label>
    <span>
      <span>已完成:{{ doneTotal }}</span> /全部:{{ total }}
    </span>
    <!-- 绑定click事件调用clearAll方法用于删除已完成任务 -->
    <button class="btn btn-danger" @click="clearAll">删除已完成任务</button>
  </div>
</template>

<script>
export default {

  name: 'ListFooter',

  props: ['todos', 'checkAllTodo', 'clearAllTodo'],
  computed: {
    total() {
      return this.todos.length
    },
    doneTotal() {
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
    },
    isAll: {

      get() {
        return this.doneTotal === this.total && this.total > 0
      },

      set(value) {
        this.checkAllTodo(value)
      }
    }
  },
  methods: {

    clearAll() {
      this.clearAllTodo()
    }
  }
}
</script>

<style scoped>
.todo-footer {
  height: 100%;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
