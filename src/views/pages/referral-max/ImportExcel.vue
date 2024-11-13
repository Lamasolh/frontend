<template>
  <div>
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <ImportSideBar
        ref="sidebar"
        :is-add-new-user-sidebar-active.sync="editToggle"
      />
      <b-card no-body>
        <b-card-header>
          <h4>Import Excel</h4>
        </b-card-header>
        <b-card-body>

          <b-row align-h="between">
            <b-col cols="9">
              <p>
                <span class="text-danger">Red color:</span>  This means that this cell contains wrong information, please Edit the case and resolve this error
                <br>
                <span class="text-warning">Yellow color:</span> This means that this row is duplicate by Phone Number please delete one of them
              </p>
            </b-col>
            <b-col cols="3">
              <download-excel
                class="btn btn-default"
                :data="ExportTable"
                :fields="json_fields"
                worksheet="Sheet1"
                type="xls"
                name="ReferralEntryErros.xls"
                :meta="json_meta"
              >
                <b-button
                  variant="success"
                  block
                  style="margin-top: 5px"
                >
                  Export Table<br> (Only Duplication Or Errors)
                </b-button>
              </download-excel>
            </b-col>
          </b-row>
          <p>Total: {{ items.length }}</p>
          <b-table
            ref="selectableTable"
            bordered
            responsive
            show-empty
            empty-text="No matching records found"
            :items="items"
            :busy="show"
            :selected-variant="
              $store.state.appConfig.layout.skin === 'dark'
                ? 'active'
                : 'primary'
            "
            sticky-header
            data-boundary="window"
            style="max-height: 450px"
            :fields="field"
          >
            <!-- Column: Actions -->
            <template #cell(action)="data">

              <b-button
                v-if="!field.filter(el=>el.variant !=null).length >0"
                variant="danger"
                block
                @click="Remove(data)"
              >
                <feather-icon icon="TrashIcon" />
                <span>Remove</span>
              </b-button>
              <b-button
                v-if="!field.filter(el=>el.variant !=null).length >0"
                variant="info"
                block
                @click="Edit(data)"
              >
                <feather-icon icon="EditIcon" />
                <span>Edit</span>
              </b-button>
              <p
                v-if="field.filter(el=>el.variant !=null).length >0"
                class="text-danger"
              >
                Fix Table
              </p>
            </template>
          </b-table>

          <p
            v-if="items.length ==0"
            class="text-danger"
          >
            Not have a data,please import excel contains data
          </p>
          <p
            v-else-if="field.filter(el=>el.variant !=null).length >0"
            class="text-danger"
          >
            You have not correct columns please fix it
          </p>
          <p
            v-else-if="items.filter(el=>el._rowVariant !=null).length >0"
            class="text-danger"
          >
            You have duplicate row, delete one of them
          </p>

          <p
            v-else-if="items.filter(el=>Object.keys(el._cellVariants).length !== 0).length >0"
            class="text-danger"
          >
            You have error in data, please fix them
          </p>
          <b-row v-else>
            <b-col cols="10" />
            <b-col cols="2">
              <b-button
                variant="success"
                block
                @click="Upload"
              >
                Upload
              </b-button>
            </b-col>
          </b-row>

        </b-card-body>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { takeState } from 'vuex-dot'
import ImportSideBar from './ImportSideBar.vue'

export default {
  components: {
    ImportSideBar,
  },
  data() {
    return {
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
    }
  },
  computed: {
    // Basic
    show: takeState('referralEXlS', 'show').map(),
    baseField: takeState('referralEXlS', 'baseField').map(),
    field: takeState('referralEXlS', 'field').map(),
    items: takeState('referralEXlS', 'items').map(),
    editToggle: takeState('referralEXlS', 'editToggle').map(),
    ExportTable: takeState('referralEXlS', 'exportTable').commit('referralEXlS/SET_EXP_TABLE').map(),
    json_fields() {
      const vs = { Code: 'code' }
      if (this.items[0] != null) {
        Object.keys(this.items[0]).forEach(el => {
          if (el !== '_cellVariants' && el !== 'id') {
            vs[el] = el
          }
        })
      }
      return vs
    },

  },
  mounted() {
    this.$store.dispatch('referralEXlS/GetExcelData', {
      prefix: this.$route.params.prefixPrj,
      prefixRole: this.$route.params.prefixRole,
      values: this.$route.params.value,
    }).then(() => {
      console.log('ee')
      // eslint-disable-next-line no-underscore-dangle
      this.ExportTable = JSON.parse(JSON.stringify(this.items.filter(el => el._rowVariant !== 'success')))
    })
  },
  methods: {
    Remove(item) {
      this.$swal({
        title: 'Attention',
        text: `Are you sure you want to Remove This case (${item.item.Name})?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store.commit('referralEXlS/REM_ITEM_BY_INDEX', {
            index: item.index,
          })
        }
      })
    },
    Edit(item) {
      this.$store.commit('referralEXlS/TOGGLE_EDIT', item)
      // eslint-disable-next-line func-names
      this.$nextTick(() => {
        this.$refs.sidebar.$refs.simpleRules.validate()
      })
    },
    Upload() {
      this.$store.dispatch('referralEXlS/UPLOAD', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).then(res => {
        console.log('res', res)
        // eslint-disable-next-line func-names
        this.$nextTick(() => {
          this.$refs.sidebar.$refs.simpleRules.validate()
        })
      })
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.action {
  min-width: 200px;
}

</style>
