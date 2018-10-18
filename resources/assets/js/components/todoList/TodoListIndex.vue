<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'createTodoList'}" class="btn btn-success">Create</router-link>
        </div>

        <div class="panel panel-default">
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Name task</th>
                    <th>Date</th>
                    <th>Complete</th>
                    <th width="100">&nbsp;</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="todoList, index in todoList">
                    <td>{{ todoList.name }}</td>
                    <td>{{ todoList.date }}</td>
                    <td>{{ todoList.complete }}</td>
                    <td>
                        <router-link :to="{name: 'editTodoList', params: {id: todoList.id}}" class="btn btn-xs btn-default">
                            Edit
                        </router-link>
                        <a href="#"
                           class="btn btn-xs btn-danger">
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
                todoList: []
            }
        },
        mounted() {
            var app = this;
            axios.get('/api/v1/todoList')
                .then(function (resp) {
                    app.todoList = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load task");
                });
        },
        methods: {

        }
    }
</script>