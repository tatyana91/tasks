<template>
    <references-menu/>

    <h1 class="h2">{{ $t('Tasks') }} ({{ tasks.length }})</h1>

    <Teleport to="#app">
        <Task :title="formTitle" @onSubmit="handleSubmit" :item="currentItem" :errors="errors"/>
    </Teleport>

    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="common_data" role="tabpanel"
             aria-labelledby="common-data-tab">

            <div class="row">
                <div class="col">
                    <button @click="showForm('add', 0)" class="btn btn-primary mb-2">{{ $t('Add') }}</button>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-hover table-bordered table-sm componentTable">
                    <thead>
                    <tr>
                        <th class="num">ID</th>
                        <th class="ref">{{ $t('Title') }}</th>
                        <th style="width: 100px !important;">{{ $t('Actions') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="task in tasks" :key="task.id">
                        <td>{{ task.id }}</td>
                        <td>{{ task.title }}</td>
                        <td class="text-nowrap">
                            <button class="btn btn-primary m-2" @click="showForm('edit', task.id)">{{ $t('Edit') }}</button>
                            <!--<button class="btn btn-danger m-2" @click="hide(component.id)">Hide</button>-->
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import useTasks from "../../composables/tasks";
import {onMounted, ref} from "vue";
import ReferencesMenu from "../../components/ReferencesMenu";
import {Modal} from "bootstrap";
import Task from "./Task";

export default {
    components: {
        ReferencesMenu,
        Task
    },
    setup() {
        let modal;
        const { tasks, getTasks, task, getTask, storeTask, updateTask, errors } = useTasks();
        const showLoader = ref(false);
        const currentItem = ref({});
        const formTitle = ref('');

        onMounted(getTasks);

        async function showForm(type, id){
            errors.value = [];

            if (type === 'add') {
                formTitle.value = "Create task";
                currentItem.value = {
                    title: '',
                    id: 0
                };
            }
            else {
                formTitle.value = "Edit task";
                await getTask(id);
                currentItem.value = task.value;
            }

            modal= new Modal(document.getElementById('modalFrom'), {});
            modal.show();
        }

        async function handleSubmit() {
            if (!currentItem.value.id) {
                await storeTask(currentItem.value)
            }
            else {
                task.value = currentItem.value;
                await updateTask(task.value.id)
            }

            if (Object.keys(errors.value).length === 0) {
                modal.hide()
            }
        }

        return {
            tasks,
            storeTask,
            updateTask,
            showLoader,
            handleSubmit,
            showForm,
            task,
            currentItem,
            formTitle,
            errors
        }
    }
}
</script>
