<template>
    <div>
        <div class="form-group">
            <a href="#"
               class="btn btn-xs btn-danger">
                Append
            </a>
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
                        <a href="#"
                           class="btn btn-xs btn-danger">
                            Edit
                        </a>
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