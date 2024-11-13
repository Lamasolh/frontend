<template>
    <div ref="GSPLTADV">
        <b-overlay rounded="lg" :show="show">

            <wtr-list />
            <ReferralSide :is-add-new-user-sidebar-active.sync="showFilter" />
        </b-overlay>
    </div>
</template>
<script>
import { takeState } from 'vuex-dot'
import WtrList from './ListTask.vue'
import ReferralSide from './ReferralSide.vue'

export default {
    components: {
        WtrList,
        ReferralSide,
    },
    computed: {
        saved: takeState('drmNGOSup', 'saved').commit('drmNGOSup/SET_SAVED').map(),
        show: takeState('drmNGOSup', 'show').commit('drmNGOSup/SET_SHOW').map(),
        showFilter: takeState('drmNGOSup', 'showFilter').commit('drmNGOSup/SET_SHOW_FILTER').map(),

    },
    mounted() {
        this.ResetData()
    },
    methods: {
        ResetData() {
            this.$store.dispatch('drmNGOSup/GET_DATA', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
            })
        },
    },
}
</script>
