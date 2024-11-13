export default {
    //
    SET_SHOW_END(state, payload) {
        state.showEnd = payload
    },
    SET_END_ITEM(state, payload) {
        state.endItem = payload
    },
    SET_SHOW_EDIT(state, payload) {
        state.showEdit = payload
    },
    SET_EDIT_ITEM(state, payload) {
        state.editItem = payload
    },
    //
    ADD_TYPE(state, payload) {
        console.log(payload)
        state.typeOptions = []
        payload.forEach(el => {
            state.typeOptions.push({
                title: el.name,
                title_ar: el.name_ar,
                value: el.st_id,
            })
        })
        localStorage.setItem('TaskManager:TypeOptions', JSON.stringify(state.typeOptions))
    },
    ADD_CAD(state, payload) {
        state.cadOptions = []
        payload.forEach(el => {
            state.cadOptions.push({
                title: el.cadastre_name,
                title_ar: el.cadastre_name_ar,
                value: el.cadastre_id,
            })
        })
        localStorage.setItem('TaskManager:CadOptions', JSON.stringify(state.cadOptions))
    },
    ADD_ISS(state, payload) {
        state.issOptions = []
        payload.forEach(el => {
            state.issOptions.push({
                title: el.is_name,
                title_ar: el.is_name_ar,
                value: el.is_id,
                parms: el.cad_id,
            })
        })
        localStorage.setItem('TaskManager:IssOptions', JSON.stringify(state.issOptions))
    },
    SET_CAD_OPT(state, payload) {
        state.cadOptions = payload
        localStorage.setItem('TaskManager:CadOptions', JSON.stringify(payload))
    },
    ///
    SET_REF(state, payload) {
        state.referral = payload
        localStorage.setItem('TaskManager:Referral', JSON.stringify(payload))
    },
    SET_GOV(state, payload) {
        state.governorate = payload
        localStorage.setItem('TaskManager:Gov', JSON.stringify(payload))
        state.district = null
        state.cadaster = null
        state.iss = null
        state.saved = true
        state.cadOptions = []
        state.issOptions = []
    },
    SET_DIS(state, payload) {
        state.district = payload
        localStorage.setItem('TaskManager:Dis', JSON.stringify(payload))
        state.cadaster = null
        state.iss = null
        state.cadOptions = []
        state.issOptions = []
    },
    SET_TYPE(state, payload) {
        state.type = payload
        localStorage.setItem('TaskManager:Type', JSON.stringify(payload))
        state.cadaster = null
        state.iss = null
        state.saved = true
        state.cadOptions = []
        state.issOptions = []
    },
    SET_CAD(state, payload) {
        state.cadaster = payload
        localStorage.setItem('TaskManager:Cadaster', JSON.stringify(payload))
        state.iss = null
        state.issOptions = []
    },
    SET_CASE_ITEM(state, data) {
        state.caseItem.push(data); // Add new data to caseItem
    },
    SET_USERS_OPTIONS(state, data) {
        state.UsersOtions.push(data); // Add new data to UsersOtions
    },
    SET_ISS(state, payload) {
        state.iss = payload
        localStorage.setItem('TaskManager:ISS', JSON.stringify(payload))
    },
    SET_RANG_DAT(state, payload) {
        state.rangedate = payload
        localStorage.setItem('TaskManager:RangeDate', JSON.stringify(payload))
    },
    // Data
    SET_ITEM(state, payload) {
        state.caseItem = payload
        state.saved = false
    },
    SET_FIELD(state, payload) {
        state.caseField = payload
    },
    // Options
    SET_PER_PAGE(state, payload) {
        state.perPage = payload
        localStorage.setItem('TaskManager:PerPage', JSON.stringify(payload))
    },
    SET_CUR_PAGE(state, payload) {
        state.currentPage = payload
    },
    /// Sort
    SET_SORT_BY(state, payload) {
        state.sortBy = payload
        localStorage.setItem('TaskManager:sortBy', JSON.stringify(payload))
    },
    SET_SORT_DESC(state, payload) {
        state.sortDesc = payload
        localStorage.setItem('TaskManager:sortDesc', JSON.stringify(payload))
    },
    SET_SORT_DIR(state, payload) {
        state.sortDirection = payload
        localStorage.setItem('TaskManager:sortDirection', JSON.stringify(payload))
    },
    /// Filter
    SET_FILTER(state, payload) {
        state.filter = payload
    },
    SET_FILTER_ON(state, payload) {
        state.filterOn.push(payload)
        localStorage.setItem('TaskManager:filterOn', JSON.stringify(payload))
    },

    SET_ASS_TO(state, payload) {
        state.isAssignSidebarActive = payload
    },
    SET_USER(state, payload) {
        state.usersValue = payload
        state.saved = true
    },
    SET_SELECT_ITEM(state, payload) {
        state.selectedCase = payload
        state.saved = true
    },
    SET_SELECT_USER_ITEM(state, payload) {
        state.selectedUserCase = payload
        state.saved = true
    },
    SET_SAVED(state, payload) {
        state.saved = payload
    },
    SET_SHOW(state, payload) {
        state.show = payload
    },
    SET_MAP_CENTER(state, payload) {
        state.centerMap = payload
    },
    SET_TABLE_FILTERED(state, payload) {
        state.itemTable = payload
    },
    SET_SHOW_REF(state, payload) {
        state.showModalRef = payload
    },
    SET_SEL_USER(state, payload) {
        state.selecteduser = payload
    },
    SET_USER_LIST(state, payload) {
        state.userList = []
        console.log('users', state.userList)
        payload.forEach(el => {
            state.userList.push(
                {
                    title: el.full_name,
                    value: el.id,
                },
            )
        })
        console.log('s', state.userList)
    },
}
