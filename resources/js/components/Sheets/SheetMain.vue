<template>
  <div class="container">
    <div class="row">
      <div class="col my-2 text-right">
        <b-modal ref="modal" id="modal-1" title="Start a new sheet" @show="resetForm" @hidden="resetForm" @ok="handleOk">
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="nameState"
              label-for="name-input"
              invalid-feedback="Name is required">
              <b-form-input id="name-input" v-model="name" :state="nameState" required ref="focusThis"></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>
    </div>
    <div class="row">
      <SheetCard v-for="sheet in sheets" :key="sheet.id" :sheet="sheet"/>
      <div class="col-lg-3 col-md-6">
        <b-card
          border-variant="dark"
          class="mb-2 sheet-container"
          body-class="text-center d-flex justify-content-center align-items-center"
          v-b-modal.modal-1>
          <b-card-text class="mb-1">New sheet <font-awesome-icon icon="plus-circle" size="lg" /></b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SheetCard from './SheetCard'

export default {
  name: 'SheetMain',
  components: { SheetCard },
  data: function (){
    return {
      name: '',
      nameState: null
    }
  },
  computed: {
    ...mapState('sheets', ['sheets']),
    ...mapState('client', ['uuid']),
  },
  methods: {
    ...mapActions({
      'newSheet': 'sheets/newSheet',
      'getSheets': 'sheets/getSheets'
    }),
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid
      return valid
    },
    resetForm(e) {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }

      this.newSheet({ uuid: this.uuid, name: this.name})

      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  },
  mounted () {
    if (this.uuid) {
      this.getSheets(this.uuid)
    }
  }
};
</script>

<style>
.sheet-container {
  min-height: 125px;
  cursor: pointer;
}
</style>