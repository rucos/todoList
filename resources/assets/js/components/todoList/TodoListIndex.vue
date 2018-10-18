<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'createTodoList'}" class="btn btn-success">Create</router-link>
        </div>
        <div class="form-group">
            <input type="text" v-model="searchStr" placeholder="Enter you search task" />
            <button type="button" class="btn btn-primary btn-sm" v-on:click="onClickStrSearch()">Find</button>
            <button type="button" class="btn btn-info btn-sm" v-on:click="onClickResetBtn()">Reset</button>
        </div>

        <div class="panel panel-default">
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Name task</th>
                    <th>Date</th>
                    <th>Complete</th>
                    <th width="120">&nbsp;</th>

                </tr>
                </thead>
                <tbody>
                    <tr v-for="todoList, index in todoList" v-bind:class="{ success: todoList.complete }">
                        <td>{{ todoList.name }}</td>
                        <td>{{ todoList.date }}</td>
                        <td>
                            <input type="checkbox" v-model="todoList.complete" v-on:input="onChangeComlete(todoList.id, index, todoList.complete)">
                        </td>
                        <td>
                            <router-link :to="{name: 'editTodoList', params: {id: todoList.id}}" class="btn btn-xs btn-default">
                                Edit
                            </router-link>
                            <a href="#"
                               class="btn btn-xs btn-danger"
                               v-on:click="deleteCurrentRow(todoList.id, index)">
                                Delete
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                todoList: [],
                searchStr: ''
            }
        },
        mounted() {
            this.getTodoList();
        },
        methods: {
            getTodoList() {
                let app = this;
                axios.get('/api/v1/todoList')
                    .then(function (resp) {
                        app.sortCompleteTodo(resp.data);
                    })
                    .catch(function (resp) {
                        alert("Could not load task");
                    });
            },
            deleteCurrentRow(id, index) {
                if (confirm("Do you really want to delete it?")) {
                    let app = this;
                    axios.delete('/api/v1/todoList/' + id)
                        .then(function (resp) {
                            app.todoList.splice(index, 1);
                        })
                        .catch(function (resp) {
                            alert("Could not delete company");
                        });
                }
            },
            onClickStrSearch() {
                if(!this.searchStr) {
                    this.getTodoList();
                    return;
                }
                let app = this;
                axios.get('/api/v1/todoList/find/' + this.searchStr)
                    .then(function (resp) {
                        app.todoList = resp.data;
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not edit");
                    });
            },
            onClickResetBtn() {
                this.searchStr = '';
                this.onClickStrSearch();
            },
            onChangeComlete(id, index, complete) {
                let app = this;
                this.todoList[index].complete = !complete;
                axios.patch('/api/v1/todoList/' + id, this.todoList[index])
                    .then(function (resp) {
                        app.sortCompleteTodo(app.todoList);
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not edit");
                    });
            },
            sortCompleteTodo(data) {
                this.todoList = data.sort(function(el){
                    return el.complete ? 1 : 0;
                });

            }
        }
    }
</script>