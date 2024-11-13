<template>
  <b-card
    class="m-2"
    dir="rtl"
  >
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <div v-if="res ==1">
        <b-card-title class="text-center">
          <h1>
            تقييم الخدمة
          </h1>

          <b-row align-h="center">
            <b-col>
              <p>اسم الحالة: <b class="text-warning">{{ fullname }}</b></p>
              <p>الكود الخاص بك هو: <b class="text-danger">{{ code }}</b></p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>يتمنى لكم فريق RDMS الشفاء العاجل.</p>
              <p>
                لتقديم الخدمة بشكل افضل يرجى المشاركة في تعبئة الاستمارة</p>
            </b-col>
          </b-row>
        </b-card-title>
        <validation-observer ref="simpleRules">
          <b-form ref="form">
            <b-card-body dir="rtl">
              <!-- Recive Kit-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="receiveItem"
                  >
                    <template v-slot:label>
                      <h5>هل استلمت مواد أو عدة ؟<span class="text-danger">*</span></h5>
                    </template>
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                    >
                      <b-form-radio-group
                        id="receiveItem"
                        v-model="receiveItem"
                        :state="
                          errors.length > 0 ? false : null
                        "
                      >
                        <b-form-radio
                          name="yes"
                          :value="true"
                        >
                          نعم
                        </b-form-radio>
                        <b-form-radio
                          name="no"
                          :value="false"
                        >
                          كلا
                        </b-form-radio>
                      </b-form-radio-group>
                      <small class="text-danger">{{
                        errors[0]
                      }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- reciveInclude-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    v-if="receiveItem ==null ? false :receiveItem"
                    label-for="reciveInclude"
                  >
                    <template v-slot:label>
                      <h5>ما هي الأغراض التي استلمتها؟</h5>
                    </template>

                    <b-form-textarea
                      v-if="receiveItem ==null ? false :receiveItem"
                      id="reciveInclude"
                      v-model="reciveInclude"
                      name="حقل"
                      rows="3"
                      placeholder="ادخل الاغراض التي استلمتها"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- receiveItemDate-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="receiveItemDate"
                  >
                    <template v-slot:label>
                      <h5>هل استلمت المواد بالوقت المحدد لها؟<span class="text-danger">*</span></h5>
                    </template>
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                    >
                      <b-form-radio-group
                        id="receiveItemDate"
                        v-model="receiveItemDate"
                        :state="
                          errors.length > 0 ? false : null
                        "
                      >
                        <b-form-radio
                          name="yes"
                          :value="true"
                        >
                          نعم
                        </b-form-radio>
                        <b-form-radio
                          name="no"
                          :value="false"
                        >
                          كلا
                        </b-form-radio>

                      </b-form-radio-group>
                      <small class="text-danger">{{
                        errors[0]
                      }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- receiveItemAccept-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="receiveItemDate"
                  >
                    <template v-slot:label>
                      <h5>هل وجدت الأغراض التي استلمتها مقبولة؟<span class="text-danger">*</span></h5>
                    </template>
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                    >
                      <b-form-radio-group
                        id="receiveItemAccept"
                        v-model="receiveItemAccept"
                        :state="
                          errors.length > 0 ? false : null
                        "
                      >
                        <b-form-radio
                          name="yes"
                          :value="true"
                        >
                          نعم
                        </b-form-radio>
                        <b-form-radio
                          name="no"
                          :value="false"
                        >
                          كلا
                        </b-form-radio>
                      </b-form-radio-group>
                      <small class="text-danger">{{
                        errors[0]
                      }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- notAccept-->
              <b-row
                v-if="receiveItemAccept ==null ? false :!receiveItemAccept"
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    v-if="receiveItemAccept ==null ? false :!receiveItemAccept"
                    label-for="notAccept"
                  >
                    <template v-slot:label>
                      <h5>في حال كان الجواب لا، لماذا؟</h5>
                    </template>
                    <b-input
                      id="notAccept"
                      v-model="notAccept"
                      name="حقل"
                      placeholder="لماذا؟"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- receiveItemAcceptFamily-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                  >
                    <b-form-group
                      label-for="receiveItemAcceptFam"
                    >
                      <template v-slot:label>
                        <h5>هل كان عدد المواد التي استلمتها كافي لعلئلتك؟<span class="text-danger">*</span></h5>
                      </template>
                      <b-form-radio-group
                        id="receiveItemAcceptFam"
                        v-model="receiveItemAcceptFam"
                        :state="errors.length > 0 ? false : null"
                      >
                        <b-form-radio
                          name="yes"
                          :value="true"
                        >
                          نعم
                        </b-form-radio>
                        <b-form-radio
                          name="no"
                          :value="false"
                        >
                          كلا
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-col>
              </b-row>
              <!-- notAcceptFamil-->
              <b-row
                v-if="receiveItemAcceptFam ==null ? false :!receiveItemAcceptFam"
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    v-if="receiveItemAcceptFam ==null ? false :!receiveItemAcceptFam"
                    label-for="notAcceptFam"
                  >
                    <template v-slot:label>
                      <h5>في حال كان الجواب لا، لماذا؟</h5>
                    </template>
                    <b-input
                      id="notAcceptFam"
                      v-model="notAcceptFam"
                      name="حقل"
                      placeholder="لماذا؟"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- ReciveAwerness-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="ReciveAwerness"
                  >
                    <template v-slot:label>
                      <h5>هل تم الشرح لك عن كيفية استخدام هذه المواد؟<span class="text-danger">*</span></h5>
                    </template>
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                    >
                      <b-form-radio-group
                        id="ReciveAwerness"
                        v-model="ReciveAwerness"
                        :state="
                          errors.length > 0 ? false : null
                        "
                      >
                        <b-form-radio
                          name="yes"
                          :value="true"
                        >
                          نعم
                        </b-form-radio>
                        <b-form-radio
                          name="no"
                          :value="false"
                        >
                          كلا
                        </b-form-radio>
                      </b-form-radio-group>
                      <small class="text-danger">{{
                        errors[0]
                      }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- ReciveAwernessUseful-->
              <b-row
                v-if="ReciveAwerness ==null ? false :ReciveAwerness"
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="ReciveAwernessuseful"
                  >
                    <template v-slot:label>
                      <h5>في حال كان الجواب نعم، هل كان الشرح واضح ومفيد؟<span class="text-danger">*</span></h5>
                    </template>
                    <validation-provider
                      v-if="ReciveAwerness ==null ? false :ReciveAwerness"
                      #default="{ errors }"
                      rules="required"
                    >
                      <b-form-radio-group
                        v-if="ReciveAwerness ==null ? false :ReciveAwerness"
                        id="ReciveAwernessuseful"
                        v-model="ReciveAwernessuseful"
                        :state="
                          errors.length > 0 ? false : null
                        "
                      >
                        <b-form-radio
                          name="yes"
                          :value="true"
                        >
                          نعم
                        </b-form-radio>
                        <b-form-radio
                          name="no"
                          :value="false"
                        >
                          كلا
                        </b-form-radio>
                      </b-form-radio-group>
                      <small class="text-danger">{{
                        errors[0]
                      }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- ReciveAwernessAccept-->
              <b-row
                v-if="(ReciveAwernessuseful ==null ? false :!ReciveAwernessuseful)&& ReciveAwerness == true"
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    v-if="(ReciveAwernessuseful ==null ? false :!ReciveAwernessuseful)&& ReciveAwerness == true"
                    label-for="ReciveAwernessAccept"
                  >
                    <template v-slot:label>
                      <h5>في حال كان الجواب كلا، ما الشرح الذي لم يكن واضح؟</h5>
                    </template>
                    <b-form-textarea
                      v-if="(ReciveAwernessuseful ==null ? false :!ReciveAwernessuseful)&& ReciveAwerness == true"
                      id="ReciveAwernessAccept"
                      v-model="ReciveAwernessAccept"
                      name="حقل"
                      rows="3"
                      placeholder="ادخل الاغراض التي استلمتها"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- OtherInfo-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="OtherInfo"
                  >
                    <template v-slot:label>
                      <h5>ما هي  المعلومات الإضافية التي ترغب بإضافتها حول جلسة التوعية؟</h5>
                    </template>
                    <b-form-textarea
                      id="OtherInfo"
                      v-model="OtherInfo"
                      name="حقل"
                      rows="3"
                      placeholder="ادخل الاغراض التي استلمتها"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- OtherItem-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="OtherItem"
                  >
                    <template v-slot:label>
                      <h5>ما هي المواد الإضافية التي ترغب أن توزع؟</h5>
                    </template>
                    <b-form-textarea
                      id="OtherItem"
                      v-model="OtherItem"
                      name="حقل"
                      rows="3"
                      placeholder="ادخل الاغراض التي استلمتها"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- TakeToOther-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="TakeToOther"
                  >
                    <template v-slot:label>
                      <h5>هل قمت بإستعمال المواد التي وزعت لك ولعائلتك أم قمت بإعطائها لأحد اّخر؟حدد من فضلك؟</h5>
                    </template>
                    <b-form-textarea
                      id="TakeToOther"
                      v-model="TakeToOther"
                      name="حقل"
                      rows="3"
                      placeholder="ادخل الاغراض التي استلمتها"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- TeamReat-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="TeamReat"
                  >
                    <template v-slot:label>
                      <h5>هل كان سلوك الفريق خلال التواصل معك جيد ومؤدب؟<span class="text-danger">*</span></h5>
                    </template>
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                    >
                      <b-form-radio-group
                        id="TeamReat"
                        v-model="TeamReat"
                        :state="
                          errors.length > 0 ? false : null
                        "
                      >
                        <b-form-radio
                          name="yes"
                          :value="true"
                        >
                          نعم
                        </b-form-radio>
                        <b-form-radio
                          name="no"
                          :value="false"
                        >
                          كلا
                        </b-form-radio>
                      </b-form-radio-group>
                      <small class="text-danger">{{
                        errors[0]
                      }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- Other Comment-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col>
                  <b-form-group
                    label-for="OtherComment"
                  >
                    <template v-slot:label>
                      <h5>هل لديك أي شكاوي او تعليقات؟ اشرح ؟</h5>
                    </template>
                    <b-form-textarea
                      id="OtherComment"
                      v-model="OtherComment"
                      name="حقل"
                      rows="3"
                      placeholder="ادخل الاغراض التي استلمتها"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- Raiting-->
              <b-row
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col cols="6">
                  <b-form-group
                    label-for="OtherComment"
                  >
                    <template v-slot:label>
                      <h5>قيم خدماتنا</h5>
                    </template>
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                    >
                      <b-form-rating
                        v-model="value"
                        dir="rtl"
                        no-border
                        size="lg"
                        show-value
                        :variant="colorVar"
                      />
                      <small class="text-danger">{{
                        errors[0]
                      }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>

              <br>
              <!-- Action-->
              <b-row
                class="text-center"
                align-h="center"
                :cols-lg="lg"
                :cols-md="md"
                :cols-xl="xl"
                :cols-sm="sm"
              >
                <b-col cols="auto">
                  <b-button
                    variant="primary"
                    @click="formSubmited"
                  >
                    تسجيل
                  </b-button>
                </b-col>
                <b-col cols="auto">
                  <b-button
                    variant="warning"
                    @click="reset"
                  >
                    إعادة تعيين
                  </b-button>
                </b-col>
              </b-row>
            </b-card-body>
          </b-form>
        </validation-observer>
      </div>
      <div v-else-if="res ==2">
        <b-card-title class="text-center">
          <h1>
            تقييم الخدمة
          </h1>
          <br>
          <b-row align-h="center">
            <b-col>
              <p>{{ state }}</p>
            </b-col>
          </b-row>
        </b-card-title>
      </div>
      <div v-else-if="res ==3">
        <b-card-title class="text-center">
          <h1>
            تقييم الخدمة
          </h1>
          <br>
          <b-row align-h="center">
            <b-col>
              <p>تم التقييم بنجاح شكراً لاعطأنا جزء من وقتكم، يتمنى فريق RDMS لكم الشفاء العاجل</p>
            </b-col>
          </b-row>
        </b-card-title>
      </div>
      <div v-else>
        <b-card-title class="text-center">
          <h1>
            تقييم الخدمة
          </h1>
          <br>
          <b-row align-h="center">
            <b-col>
              <p>إن الرابط غير صحيح</p>
            </b-col>
          </b-row>
        </b-card-title>
      </div>
    </b-overlay>
  </b-card>
</template>

<script >
/* eslint-disable prefer-destructuring */
import { ValidationObserver, ValidationProvider, localize } from 'vee-validate'
import { takeState } from 'vuex-dot'

export default {
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      xl: 2,
      lg: 2,
      md: 3,
      sm: 2,
      res: 1,
      state: null,
    }
  },
  computed: {
    fullname: takeState('feedback', 'fullname').commit('feedback/SET_FULL_NAME').map(),
    code: takeState('feedback', 'case_code').commit('feedback/SET_CODE').map(),
    receiveItem: takeState('feedback', 'receiveItem').commit('feedback/SET_REC_ITEM').map(),
    reciveInclude: takeState('feedback', 'reciveInclude').commit('feedback/SET_REC_INC').map(),
    receiveItemDate: takeState('feedback', 'receiveItemDate').commit('feedback/SET_REC_DATE').map(),
    receiveItemAccept: takeState('feedback', 'receiveItemAccept').commit('feedback/SET_REC_ITEM_ACC').map(),
    notAccept: takeState('feedback', 'notAccept').commit('feedback/SET_NOT_ACC').map(),
    receiveItemAcceptFam: takeState('feedback', 'receiveItemAcceptFam').commit('feedback/SET_REC_ITEM_ACC_FAM').map(),
    notAcceptFam: takeState('feedback', 'notAcceptFam').commit('feedback/SET_NOT_ACC_FAM').map(),
    ReciveAwerness: takeState('feedback', 'ReciveAwerness').commit('feedback/SET_REC_AWR').map(),
    ReciveAwernessuseful: takeState('feedback', 'ReciveAwernessuseful').commit('feedback/SET_REC_AWR_USFULL').map(),
    ReciveAwernessAccept: takeState('feedback', 'ReciveAwernessAccept').commit('feedback/SET_REC_AW_ACC').map(),
    OtherInfo: takeState('feedback', 'OtherInfo').commit('feedback/SET_OTH_INFO').map(),
    OtherItem: takeState('feedback', 'OtherItem').commit('feedback/SET_OTH_ITEM').map(),
    TakeToOther: takeState('feedback', 'TakeToOther').commit('feedback/SET_TAKE_OTH').map(),
    OtherComment: takeState('feedback', 'OtherComment').commit('feedback/SET_OTH_COM').map(),
    TeamReat: takeState('feedback', 'TeamReat').commit('feedback/SET_TEAM_REAT').map(),
    value: takeState('feedback', 'value').commit('feedback/SET_VALUE').map(),
    show: takeState('feedback', 'show').map(),
    colorVar() {
      let cl = ''
      switch (this.value) {
        case 1:
          // code block
          cl = 'danger'
          break
        case 2:
          // code block
          cl = 'warning'
          break
        case 3:
          // code block
          cl = 'info'
          break
        case 4:
          // code block
          cl = 'primary'
          break
        case 5:
          // code block
          cl = 'success'
          break
        default:
          // code block
          cl = 'warning'
      }
      return cl
    },
  },
  watch: {
    receiveItem(newvalue) {
      if (newvalue) {
        this.reciveInclude = null
      }
    },
    receiveItemAccept(newvalue) {
      if (!newvalue) {
        this.notAccept = null
      }
    },
    receiveItemAcceptFam(newvalue) {
      if (!newvalue) {
        this.notAcceptFam = null
      }
    },
    ReciveAwerness(newValue) {
      if (newValue) {
        this.ReciveAwernessuseful = null
      }
    },
    ReciveAwernessuseful(newvalue) {
      if (!newvalue) {
        this.ReciveAwernessAccept = null
      }
    },
  },
  beforeCreate() {
    document.documentElement.setAttribute('dir', 'rtl')
    localize('ar')
  },
  mounted() {
    this.$store.dispatch('feedback/GET_DATA', {
      prefix: this.$route.query.q,
    }).then(value => {
      this.res = value[0]
      if (value[1] != null) {
        this.state = value[1]
      }
    }).catch(() => {
      this.res = 0
    })
  },
  methods: {
    goTo() {
      this.$router.go({ path: '/dashboard' })
    },
    reset() {
      this.receiveItem = null
      this.reciveInclude = null
      this.receiveItemDate = null
      this.receiveItemAccept = null
      this.notAccept = null
      this.receiveItemAcceptFam = null
      this.notAcceptFam = null
      this.ReciveAwerness = null
      this.ReciveAwernessuseful = null
      this.ReciveAwernessAccept = null
      this.OtherInfo = null
      this.OtherItem = null
      this.TakeToOther = null
      this.OtherComment = null
      this.TeamReat = null
      this.value = null
      this.$refs.form.reset()
      this.$refs.simpleRules.reset()
    },
    formSubmited() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('feedback/Save_DATA', {
              code: this.$route.query.q,
              prefix: this.$route.params.prefixPrj,
            })
            .then(res => {
              if (res === 1) {
                this.res = 3
              } else {
                this.$swal({
                  icon: 'warning',
                  title: 'انتبه!',
                  text: 'لم تحفظ المعلومات، الرجاء التأكد من المعلومات المدخلة',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
              }
            })
            .catch(() => {
              // eslint-disable-next-line
                this.$swal({
                icon: 'error',
                title: 'خطأ!',
                text: 'الرجاء التحقق من اتصال الانترنت، وإعادة المحاولة',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            })
        } else {
          this.$swal({
            icon: 'warning',
            title: 'انتبه!',
            text: 'هناك معلومات ناقصة الرجاء التأكد منها',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      })
    },
  },
}
</script>
