<template>
    <div>
        <div class="form-group">
            <router-link to="/" class="btn btn-default">Back</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Create new company</div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Namr</label>
                            <input type="text" v-model="todoList.name" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Date</label>
                            <input type="date" v-model="todoList.date" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Complete</label>
                            <input type="checkbox" v-model="todoList.complete" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <button class="btn btn-success">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            let app = this;
            let id = app.$route.params.id;
            app.todoListId = id;
            axios.get('/api/v1/todoList/' + id)
                .then(function (resp) {
                    app.todoList = resp.data;
                })
                .catch(function () {
                    alert("Could not load")
                });
        },
        data: function () {
            return {
                todoListId: null,
                todoList: {
                    name: '',
                    date: '',
                    complete: ''
                }
            }
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;

                axios.patch('/api/v1/todoList/' + app.todoListId, app.todoList)
                    .then(function (resp) {
                        app.$router.replace('/');
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not edit");
                    });
            }
        }
    }
</script>