/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'
import SvgImage from '@/libs/markerImage'

export default {
  GET_DATA({ state }) {
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/usermanager/get-proj-org-list')
        .then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.projectItem = []
            resp.data[0].forEach(element => {
              state.projectItem.push(element)
            })
          }
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  GET_GEO({ state }, payload) {
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/usermanager/get-geo-org-project', {
          params: {
            project: payload.prefix,
          },
        })
        .then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.projectItem = []
            resp.data[0].forEach(element => {
              state.projectItem.push(element)
            })
          }
          console.log(state.projectItem)
          resolve(resp.data[0])
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  GET_ROLE({ state, commit }, payload) {
    console.log('payload.proj.assmnt_type')
    console.log(payload.proj.assmnt_type)

    state.show = true
    if (payload.proj.assmnt_type === 2) {
      state.rolesField = [
        {
          key: 'full_name',
          label: 'Full Name',
          tdClass: 'full_name',
          stickyColumn: true,
        },
        {
          key: 'role_category',
          label: 'Role Category',
          class: 'role_category',
        },
        { key: 'referral_entry', label: 'Referral' },
        { key: 'geo_split', label: 'Task Manager' },
        { key: 'inventory', label: 'Inventory' },
        { key: 'distributor', label: 'Distributor' },
        { key: 'monitoring', label: 'Monitoring' },
        { key: 'reporting', label: 'Reporting' },
      ]
    } else {
      state.rolesField = [
        {
          key: 'full_name',
          label: 'Full Name',
          tdClass: 'full_name',
          stickyColumn: true,
        },
        {
          key: 'role_category',
          label: 'Role Category',
          class: 'role_category',
        },
        { key: 'referral_entry', label: 'Referral' },
        { key: 'case_assignment', label: 'Case Assignment' },
        { key: 'assessment', label: 'Assessment' },
        { key: 'link_assessment', label: 'Link Assessment' },
        { key: 'geo_split', label: 'Task Manager' },
        { key: 'inventory', label: 'Inventory' },
        { key: 'distributor', label: 'Distributor' },
        { key: 'awareness', label: 'Awareness' },
        { key: 'indicators', label: 'Indicators' },
        { key: 'monitoring', label: 'Monitoring' },
        { key: 'reporting', label: 'Reporting' },
      ]
    }
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/usermanager/get-role-org-project', {
          params: {
            project: payload.prefix,
          },
        })
        .then(resp => {
          console.log('resp', resp)
          if (Object.entries(resp.data).length !== 0) {
            state.rolesItem = []
            state.selectItem = []
            resp.data.role.forEach(element => {
              state.rolesItem.push(element)
            })
            state.rolesField = [
              {
                key: 'user_name', label: 'Full Name', tdClass: 'full_name', stickyColumn: true,
              },
            //  { key: 'role_category', label: 'Role Category', class: 'role_category' },
            ]
            resp.data.col.forEach(element => {
              state.rolesField.push({
                key: element.prefix, label: element.role_name, tdClass: 'full_name',
              })
            })
            console.log(state.rolesItem)
            commit('ADD_CAT', { data: resp.data.category })
            commit('SET_ITEM_ADV_orgigin', resp.data[0])
            // state.rolesItemOriginal = state.rolesItem
          }
          state.show = false
          resolve(resp.data[0])
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  Save_ROLE({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/usermanager/update-project-role', {
          items: state.selectItem,
          prefix: payload.prefix,
        })
        .then(resp => {
          console.log(resp)
          /* state.rolesItem.forEach(el => {
            el._rowVariant = null
          })
          state.rolesItemOriginal = []
          state.rolesItem.forEach(el => {
            resp.data.prj.forEach(elm => {
              if (el.id === elm[1].id) {
                if (elm[0].result === 1) {
                  state.rolesItem.filter(it => it.id === elm[1].id)[0]._rowVariant = 'success'
                } else {
                  state.rolesItem.filter(it => it.id === elm[1].id)[0]._rowVariant = 'danger'
                }
                // el.push({ _rowVariant: 'danger' })
              }
            })
          })
          commit('SET_ITEM_ADV_orgigin', state.rolesItem)

          state.selectItem.splice(0)
          state.selectItem.length = 0
          state.selectItem = []
          setTimeout(() => {
            state.selectItem.pop()
          }, 300) */
          if (resp.data.result === 1) {
            state.selectItem = []
          }
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error)
        })
    })
  },
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.show = true
      state.projectItem = []
      state.perPage = 10
      state.totalRows = 0
      state.currentPage = 1
      // Sort
      state.sortBy = ''
      state.sortDesc = false
      state.sortDirection = 'asc'
      // Filter
      state.filter = null
      state.filterOn = []
      dispatch('GET_DATA', {
        prefix: payload.prefix,
        prefixRole: payload.prefixRole,
      })
        .then(res => {
          state.show = false
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  GET_GEO_SEARCH({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/usermanager/get-role-org-search', {
          params: {
            prefix: payload.prefix,
            gov: state.governorate == null ? null : state.governorate.value,
            dis: state.district == null ? null : state.district.value,
            cad: state.municipality == null ? null : state.municipality.value,
            type: state.type == null ? null : state.type.value,
          },
        })
        .then(resp => {
          console.log('resp', resp)
          state.orgMarker = []
          resp.data.lst.forEach(async el => {
            const org = resp.data.org.filter(it => it.org_id === el.org_id)[0]
            console.log(org)
            state.orgMarker.push({
              infoText: `<b class="text-success">Org Name:${org.org_name}</b>
              <br><b class="text-info">Governorate:${el.governorate_name}</b>
              <br><b class="text-info">District:${el.district_name_eng}</b>
              <br><b class="text-info">Cadaster:${el.cadastre_name}</b>
              <br><b class="text-info">Settlement type:${el.type_name == null ? 'None' : el.type_name}</b>
              <br><b class="text-info">Settlement name:${el.is_name == null ? 'None' : el.is_name}</b>
              `,
              icon: {
                url: await SvgImage(org.org_logo), // url
                size: new window.google.maps.Size(45, 60),
                scaledSize: new window.google.maps.Size(50, 50),
                labelOrigin: this.google && new window.google.maps.Point(16, -10),
                anchor: new window.google.maps.Point(28, 40),
              },
              id: el.org_id,
              position: {
                lat: parseFloat(el.latitude),
                lng: parseFloat(el.longitude),
              },
            })
          })
          console.log(state.orgMarker)
          state.show = false
          resolve(resp.data.lst)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.district == null ? null : state.district.value,
            type: state.type.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', resp.data.result)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    }))
  },
}
