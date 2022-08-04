const app = new Vue({
    el: '#app',
    data: {
      //データ0でも配列と認識されるように
      todos: [],

      options: [
        {value: -1, label: 'すべて'},
        {value: 0, label: '作業中'},
        {value: 1, label:'完了'}
      ],
      current: -1
    },

    methods: {
      //Todo追加処理（メソッド）
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
      },

      //状態変更の処理
      doChangeState: function(item) {
        item.state = item.state ? 0 : 1
      },
      //削除の処理
      doRemove: function(item) {
        //indexOfで検索
        var index = this.todos.indexOf(item)
        //splice(ある要素,0)はある要素を挿入、1だと削除
        this.todos.splice(index, 1)
      }

    },

    //ストレージ保存の自動処理
    watch: {
      //監視データ
      todos: {
        handler: function(todos) {
          todoStorage.save(todos)
        },
        //deepでネストした（入れ子状態）データを監視
        deep: true
      }
    },

    //保存されたリストを取得
    //インスタンス生成時に自動でフェッチ
    created() {
      this.todos = todoStorage.fetch()
    },

    //キャッシュの性質がある
    computed: {
      computedTodos: function() {
        //フィルターをかける
        return this.todos.filter(function(el) {
          //条件式 ? 分岐1 : 分岐2
          return this.current < 0 ? true : this.current === el.state
        }, this) 
      },

      labels() {
        return this.options.reduce(function(a,b) {
          return Object.assign(a, {[b.value]: b.label})
        },{})
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