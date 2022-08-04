const app = new Vue({
    el: '#app',
    data: {
      //データ0でも配列と認識されるように
      todos: []
    },
    methods: {
      //Todo追加処理（インスタンスメソッド）
      doAdd: function(event,value) {
        //refで名前を付けた要素を参照、varは再代入可能な変数宣言
        var comment = this.$refs.comment
        //入力なければ何もしない
        if(!comment.value.length) {
          return
        }
        //{ID,コメント,作業状態}
        //のオブジェクトをtodosリストへpush
        //stateはデフォが作業中=0で作成
        this.todos.push({
          id: todoStorage.uid++,
          comment: comment.value,
          state: 0
        })
        comment.value = ''
      }
    }
  }
)

// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}