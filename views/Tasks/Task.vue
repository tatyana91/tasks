<template>
    <ModalForm @onSubmit="onSubmit" :title="title">
        <div class="mb-3">
            <label for="title" class="form-label">{{ $t('Title') }}</label>
            <input name="title" class="form-control" id="title"
                   :class="{'is-invalid': errors.title}"
                   v-model="item.title">
            <div v-if="errors.title" class="invalid-feedback">
                <div v-for="error in errors.title">
                    {{ error }}
                </div>
            </div>
        </div>
    </ModalForm>
</template>

<script>
import ModalForm from "../../components/ModalForm";

export default {
    components: {
        ModalForm
    },
    props: {
        item: {
            required: true,
            type: Object
        },
        title: {
            required: true,
            type: String
        },
        errors: {
            required: true,
            type: Object
        },
    },
    emits: ['onSubmit'],
    setup(props, { emit }) {
        const onSubmit = () => {
            emit('onSubmit')
        }

        return {
            onSubmit
        }
    }
}
</script>
