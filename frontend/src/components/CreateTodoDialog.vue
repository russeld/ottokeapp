<template>
  <div>
    <q-btn unelevated round dense color="primary" size="sm" icon="add" @click="display = !display" />
    <q-dialog v-model="display" persistent>
      <q-card>
        <q-card-section class="flex items-center justify-between">
          <div class="text-h6">New Todo</div>
          <q-btn unelevated round dense color="negative" size="sm" icon="close" @click="onClose"/>
        </q-card-section>

        <q-card-section class="q-pt-none" style="width: 500px; max-width: 80vw;">
          <q-form
            @submit="onSubmit"
            ref="form"
            class="q-gutter-md"
          >
            <q-input
              ref="title"
              v-model.trim="form.title"
              type="text"
              label="Description"
              :rules="[
                val => !!val || 'Field is required',
                val => (val.length >= 3) || 'Should be atleast 3 characters']"
              lazy-rules />

              <div class="flex justify-end">
                <q-btn label="Create" type="submit" color="primary" size="lg" class="self-right"
                />
              </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'create-todo-dialog',
  data () {
    return {
      display: false,
      form: {
        title: null
      }
    }
  },

  methods: {
    ...mapActions({
      createTodo: 'client/createTodo'
    }),
    formReset () {
      this.form.title = null
      this.$refs.form.resetValidation()
    },
    onClose () {
      this.formReset()
      this.display = !this.display
    },
    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createTodo(this.form).then(response => {
            this.onClose()
          })
        }
      })
    }
  }
}
</script>
