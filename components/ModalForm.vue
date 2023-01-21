<template>
    <div id="modalFrom" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <form @submit.prevent="onSubmit" class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">{{ $t(title) }}</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('Close') }}</button>
                    <div>
                        <button type="submit" class="btn btn-primary">{{ $t('Save changes') }}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            required: true,
            type: String
        }
    },
    emits: ['onSubmit'],
    setup(_, { emit }) {
        const onSubmit = () => {
            emit('onSubmit')
        }

        return {
            onSubmit
        }
    }
}
</script>
