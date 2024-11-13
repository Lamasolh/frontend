<template>
  <b-card id="cl">
    <b-card-title>
      <card-header />
      <h2 align="center">
        RDMS
      </h2>
    </b-card-title>
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <b-card-body
        v-if="res === 1"
        id="bd"
        class="text-center"
      >
        <b-card-text>
          <h4 class="text-center">
            <b>{{ des_rep }}</b>
          </h4>
          <br>
          <p class="text-center">
            <b>اسم الحالة: {{ caseDetail.Name }} </b>
          </p>
          <p class="text-center">
            <b>الكود الخاص بك هو: {{ caseDetail.caseCode }} </b>
          </p>
          <p class="text-center">
            <b>تقييم الحالة هي: {{ caseDetail.status }} </b>
          </p>
        </b-card-text>
      </b-card-body>
      <b-card-body
        v-else-if="res === 3"
        id="bd"
        class="text-center"
      >
        <b-card-text>
          <p class="text-center">
            إن الرابط ليس موجود في بياناتنا الرجاء تأكد من الرابط او
            يمكنكم تعبئة استمارة
          </p>
        </b-card-text>
        <b-row>
          <b-button
            variant="primary"
            @click="goTo"
          >
            استمارة جديدة
          </b-button>
        </b-row>
      </b-card-body>
      <b-card-body
        v-else-if="res === 0"
        id="bd"
      >
        <b-card-text>
          <p class="text-center">
            إن الرابط غير صحيح يمكنكم تعبئة إستمارة جديدة
          </p>
        </b-card-text>
        <b-row align-h="center">
          <b-button
            variant="primary"
            @click="goTo"
          >
            استمارة جديدة
          </b-button>
        </b-row>
      </b-card-body>
      <b-card-body
        v-else-if="res === 2 || res === 4"
        id="bd"
        class="text-left"
      >
        <b-card-text class="justify-content-start">
          <p class="text-justify">
            {{ title }}<br> {{ description }}
          </p>
        </b-card-text>
        <b-card-text v-show="res === 2">
          <p class="text-center">
            {{ des_code }} <br>{{ case_code }}
          </p>
        </b-card-text>
        <validation-observer ref="simpleRules">
          <b-form>
            <!-- Organization -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group
                  label="المنظمة"
                  label-for="Organization"
                >
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="المنظمة"
                  >
                    <v-select
                      v-model="org"
                      dir="rtl"
                      placeholder="اختار المنظمة"
                      label="title"
                      :clearable="false"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :options="orgOptions"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Full Name -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group
                  label="الاسم الكامل"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="الاسم"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="full_name"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      placeholder="ادخل الاسم الثلاثي"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Phone -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="الهاتف">
                  <validation-provider
                    v-slot="{ errors }"
                    name="رقم الهاتف"
                    :rules="
                      'required|' +
                        `${
                          id === 1
                            ? 'phonelbed'
                            : 'min:8|max:11'
                        }`
                    "
                    style="display: inline"
                  >
                    <b-input-group>
                      <template #append>
                        <b-dropdown
                          :text="text"
                          variant="outline-primary"
                        >
                          <b-dropdown-item
                            v-for="ct in phoneOptions"
                            :key="ct.id"
                            :value="ct.value"
                            @click="
                              dropSelect(ct.value)
                            "
                          >
                            {{ ct.title }}
                          </b-dropdown-item>
                        </b-dropdown>
                      </template>
                      <b-form-input
                        v-model.number="number"
                        type="tel"
                        dir="ltr"
                        class="form-control"
                        :state="
                          errors.length > 0
                            ? false
                            : null
                        "
                        :placeholder="
                          phoneProps[0].placeholder
                        "
                        :formatter="formatter"
                      />
                    </b-input-group>
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Gender -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group
                  label="الجنس"
                  label-for="Gender"
                >
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="الجنس"
                  >
                    <v-select
                      v-model="gender"
                      dir="rtl"
                      placeholder="اختار الجنس"
                      label="title_ar"
                      :clearable="false"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :options="genderOptions"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Nationality
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="الجنسية">
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="الجنسية"
                  >
                    <v-select
                      v-model="nationality"
                      placeholder="اختار الجنسية"
                      label="title_ar"
                      dir="rtl"
                      :clearable="false"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :options="nationalityOptions"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>-->
            <!-- Governorate -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="المحافظة">
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="المحافظة"
                  >
                    <v-select
                      v-model="governorate"
                      dir="rtl"
                      :clearable="false"
                      placeholder="اختار المحافظة"
                      label="title_ar"
                      :state="errors.length > 0 ? false : null"
                      :options="governorateOption"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider></b-form-group>
              </b-col>
            </b-row>
            <!-- district -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="القضاء">
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="القضاء"
                  >
                    <v-select
                      v-model="district"
                      dir="rtl"
                      :clearable="false"
                      placeholder="اختار القضاء"
                      label="title_ar"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :options="districtSelect"
                      @input="(value) => ChangeDistrict(value)"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider></b-form-group>
              </b-col>
            </b-row>
            <!-- Type -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="نوع السكن">
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="نوع السكن"
                  >
                    <v-select
                      v-model="type"
                      dir="rtl"
                      :clearable="false"
                      placeholder="اختار نوع السكن"
                      label="title_ar"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :options="typeOptions"
                      @input="value=>ChangeType(value)"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider></b-form-group>
              </b-col>
            </b-row>
            <!-- Cadatser -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="البلدية">
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="البلدية"
                  >
                    <v-select
                      v-model="cadaster"
                      dir="rtl"
                      placeholder="اختار البلدية"
                      label="title_ar"
                      :clearable="false"
                      :state="errors.length > 0 ? false : null"
                      :options="cadOptions"
                      @input="value=>ChangeCAD(value)"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider></b-form-group>
              </b-col>
            </b-row>
            <!-- ISS -->
            <b-row
              v-if="type ==null ? false : type.value >3"
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col v-if="type ==null ? false : type.value >3">
                <b-form-group
                  v-if="type ==null ? false : type.value >3"
                  label="مكان السكن"
                >
                  <validation-provider
                    v-if="type ==null ? false : type.value >3"
                    #default="{ errors }"
                    rules="required"
                    name="مكان السكن"
                  >
                    <v-select
                      v-if="type ==null ? false : type.value >3"
                      v-model="iss"
                      dir="rtl"
                      placeholder="اختار مكان السكن"
                      label="title_ar"
                      :clearable="false"
                      :state="errors.length > 0 ? false : null"
                      :options="issOptions"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Male Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد الذكور">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد الذكور"
                    :rules="
                      `required|malefemale:${male_count},${female_count},${family}|valfam:${family}||min_value:${minMale}`
                    "
                  >
                    <b-form-spinbutton
                      id="malecount"
                      v-model="male_count"
                      class="lg"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :min="minMale"
                      max="30"
                      placeholder="أدخل عدد الذكور"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Female Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد الإناث">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد الإناث"
                    :rules="
                      `required|malefemale:${male_count},${female_count},${family}|valfam:${family}||min_value:${minFemale}`
                    "
                  >
                    <b-form-spinbutton
                      id="femalecount"
                      v-model="female_count"
                      class="lg"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :min="minFemale"
                      max="30"
                      placeholder="أدخل عدد الإناث"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Babies 0-5 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد الاطفال">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد الاطفال"
                    :rules="
                      `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family}`
                    "
                  >
                    <p>
                      أدخل عدد الأفرادأعمارهم بين 0 - 5 سنوات
                    </p>
                    <b-form-spinbutton
                      id="babiescount"
                      v-model="yng_child_count"
                      class="lg"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      min="0"
                      max="30"
                      placeholder="ادخل عدد الاطفال"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Children 6- 11 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد الاولاد">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد الاولاد"
                    :rules="
                      `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family}`
                    "
                  >
                    <p>
                      أدخل عدد الأفرادأعمارهم بين 6 - 11 سنوات
                    </p>
                    <b-form-spinbutton
                      id="childcount"
                      v-model="child_count"
                      class="lg"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      min="0"
                      max="30"
                      placeholder="ادخل عدد الاولاد"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- young 12- 17 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد المراهقين">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد المراهقين"
                    :rules="
                      `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family}`
                    "
                  >
                    <p>
                      أدخل عدد الأفرادأعمارهم بين 12- 17 سنوات
                    </p>
                    <b-form-spinbutton
                      id="young_count"
                      v-model="young_count"
                      class="lg"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      min="0"
                      max="30"
                      placeholder="ادخل عدد المراهقين"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- teenager 18- 25 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد الشباب">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد الشباب"
                    :rules="
                      `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family}`
                    "
                  >
                    <p>
                      أدخل عدد الأفرادأعمارهم بين 18 - 25 سنوات
                    </p>
                    <b-form-spinbutton
                      id="teenager_count"
                      v-model="teenager_count"
                      class="lg"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      min="0"
                      max="30"
                      placeholder="ادخل عدد الشباب"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- adults 26- 64 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد البالغين">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد البالغين"
                    :rules="
                      `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family}`
                    "
                  >
                    <p>
                      أدخل عدد الأفرادأعمارهم بين 26 - 64 سنوات
                    </p>
                    <b-form-spinbutton
                      id="adult_count"
                      v-model="adult_count"
                      class="lg"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      min="0"
                      max="30"
                      placeholder="ادخل عدد البالغين"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- old individuals count  -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد كبار السن">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد كبار السن"
                    :rules="
                      `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family}`
                    "
                  >
                    <p>
                      أدخل عدد الأفراد الذين تزيد أعمارهم
                      عن 65 عامًا
                    </p>
                    <b-form-spinbutton
                      id="elderly_count"
                      v-model="elderly_count"
                      class="lg"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      min="0"
                      max="30"
                      placeholder="ادخل عدد كبار السن"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- infected count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="عدد المصابين">
                  <validation-provider
                    #default="{ errors }"
                    name="عدد المصابين"
                    :rules="
                      `required|val:${family}|min_value:1`
                    "
                  >
                    <b-form-spinbutton
                      id="infectedcount"
                      v-model="infected_count"
                      class="lg"
                      :disabled="family < 0"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :min="1"
                      :max="family"
                      placeholder="أدخل عدد الأفراد المصابين."
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- The household is the infected   -->
            <b-row>
              <b-col>
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="رب الاسرة"
                  >
                    <b-form-checkbox
                      id="household"
                      v-model="Head_hhold"
                      name="household"
                      :value="1"
                      :unchecked-value="0"
                    >
                      هل رب(ة) الاسرة هو الشخص المصاب
                    </b-form-checkbox>
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- pregnant woman  -->
            <b-row>
              <b-col>
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="امرأة حامل"
                  >
                    <b-form-checkbox
                      id="Pregnant"
                      v-model="pregnant"
                      name="Pregnant"
                      :value="1"
                      :unchecked-value="0"
                    >
                      هناك امرأة حامل في الأسرة
                    </b-form-checkbox>
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- payments -->
            <b-row>
              <b-col>
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="مدفوعات شهرية"
                  >
                    <b-form-checkbox
                      id="paymnts"
                      v-model="monthly_payments"
                      name="paymnts"
                      :value="1"
                      :unchecked-value="0"
                    >
                      هل هناك أي مدفوعات مستحقة !؟
                    </b-form-checkbox>
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- isolation -->
            <b-row>
              <b-col>
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="مدفوعات شهرية"
                  >
                    <b-form-checkbox
                      id="isolation"
                      v-model="isolation_room"
                      name="isolation"
                      :value="1"
                      :unchecked-value="0"
                    >
                      هل الحالات المصابة معزولة في غرفة
                      منفصلة !؟
                    </b-form-checkbox>
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Employment Type -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="نوع الوظيفة">
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="نوع الوظيفة"
                  >
                    <v-select
                      v-model="employment"
                      dir="rtl"
                      placeholder="حدد نوع التوظيف"
                      label="title_ar"
                      :clearable="false"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :options="emplymntOptions"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- care giver -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group
                  label="من الذي يعتني بالحالة المصابة؟"
                >
                  <validation-provider
                    #default="{ errors }"
                    rules="required"
                    name="الراعي"
                  >
                    <v-select
                      v-model="caregiver"
                      dir="rtl"
                      placeholder="حدد من يتولى رعاية الحالات المصابة"
                      label="title_ar"
                      :clearable="false"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :options="giveroption"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- PCR Date -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group
                  label="PCR تاريخ"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="PCR تاريخ"
                    rules="required"
                  >
                    <flat-pickr
                      v-model="pcr_date"
                      class="form-control"
                      placeholder="ادخل تاريخ الPCR"
                      :config="{
                        maxDate: maxDate,
                      }"
                      :state="
                        errors.length > 0 ? false : null
                      "
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <br>
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <!-- PCR Result -->
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="PCR نتيجة"
                >
                  <b-form-group label="PCR نتيجة">
                    <v-select
                      v-model="pcres"
                      placeholder="اختار نتيجة PCR"
                      label="title_ar"
                      dir="rtl"
                      :options="pcrResult"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- Address -->
            <b-row>
              <b-col>
                <b-form-group label="العنوان">
                  <validation-provider
                    #default="{ errors }"
                    name="العنوان"
                    rules="required"
                  >
                    <b-form-input
                      id="Address"
                      v-model="adresstext"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      placeholder="اكتب عنوانك بالكامل"
                    />
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Map -->
            <b-row>
              <b-col>
                <b-form-group label="العنوان">
                  <div
                    class="d-flex flex-wrap align-content-between"
                  >
                    <div class="order-1 p-2">
                      <GmapMap
                        ref="mapRef"
                        :center="center"
                        :zoom="8"
                        map-style-id="roadmap"
                        :options="mapOptions"
                        class="gmap"
                        @click="handleMapClick"
                      >
                        <GmapMarker
                          :position="marker.position"
                          :clickable="true"
                          :draggable="true"
                          @drag="handleMarkerDrag"
                          @click="panToMarker"
                        />
                      </GmapMap>
                      <br>
                      <button
                        type="button"
                        class="btn btn-primary noprint"
                        @click="geolocate"
                      >
                        كشف الموقع الحالي
                      </button>
                    </div>
                    <div class="order-2 p-2">
                      <b-form-group>
                        <h5>خط الطول</h5>
                        <validation-provider
                          #default="{ errors }"
                          name="خط الطول"
                          rules="required|zero"
                        >
                          <b-form-input
                            id="lat"
                            v-model="
                              address_latitude
                            "
                            :disabled="true"
                            :state="
                              errors.length > 0
                                ? false
                                : null
                            "
                          />
                          <small
                            class="text-danger"
                          >{{ errors[0] }}</small>
                        </validation-provider>
                        <br>
                        <h5>خط العرض</h5>
                        <validation-provider
                          #default="{ errors }"
                          name="خط العرض"
                          rules="required|zero"
                        >
                          <b-form-input
                            id="long"
                            v-model="
                              address_longitude
                            "
                            :disabled="true"
                            :state="
                              errors.length > 0
                                ? false
                                : null
                            "
                          />
                          <small
                            class="text-danger"
                          >{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Container -->
            <b-container>
              <b-row
                class="text-center"
                align-v="center"
              >
                <b-col>
                  <b-button
                    v-ripple.400="
                      'rgba(255, 255, 255, 0.15)'
                    "
                    variant="primary"
                    @click="formSubmited"
                  >
                    تسجيل
                  </b-button>
                </b-col>
                <b-col>
                  <b-button
                    v-ripple.400="
                      'rgba(255, 255, 255, 0.15)'
                    "
                    variant="primary"
                    @click="reset"
                  >
                    إعادة تعيين
                  </b-button>
                </b-col>
                <!-- <b-col>
                  <b-button
                    v-ripple.400="
                      'rgba(255, 255, 255, 0.15)'
                    "
                    variant="primary"
                    @click=""
                  >
                    حفظ
                  </b-button>
                </b-col> -->
              </b-row>
            </b-container>
          </b-form>
        </validation-observer>
      </b-card-body>
      <b-card-body
        v-else-if="res === 5"
        id="bd"
      >
        <b-card-text>
          <p class="text-center">
            كود الخاص بك:  {{ case_code }}
          </p>
          <p class="text-center">
            لقد تم تسجيل حالتكم بنجاح يمكنكم متابعة تقدم حالتكم من
            خلال الدخول إلى الرابط المرسل لكم
          </p>
        </b-card-text>
      </b-card-body>
      <b-card-body
        v-else-if="res === 6"
        id="bd"
      >
        <b-card-text>
          <p class="text-center">
            لقد تم تسجيلكم من قبل ان هذه الحالة مكررة
          </p>
        </b-card-text>
      </b-card-body>
      <b-card-body
        v-else-if="res === 7"
        id="bd"
      >
        <b-card-text>
          <p class="text-center">
            كود الخاص بك:  {{ case_code }}
          </p>
          <p class="text-center">
            لقد تم تسجيل حالتكم بنجاح سيتم ارسال رسالة لكم مع رابط
            لتتبع حالتكم
          </p>
        </b-card-text>
      </b-card-body>
      <b-card-body
        v-show="show"
        id="bd"
        class="text-center"
      >
        <b-card-text>
          <h4 class="text-center">
            <b>تحميل.....</b>
          </h4>
        </b-card-text>
      </b-card-body>
    </b-overlay>
  </b-card>
</template>

<script>
import { ValidationObserver, ValidationProvider, localize } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import CardHeader from '@/views/card/card-app/CardHeader.vue'
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'

export default {
  components: {
    ValidationObserver,
    CardHeader,
    ValidationProvider,
    vSelect,
    flatPickr,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      pc: null,
      pdf: false,
      pageCount: 0,
      lg: 3,
      md: 3,
      xl: 3,
      sm: 2,
      marker: { position: { lat: 33.8547, lng: 35.8623 } },
      center: { lat: 33.8547, lng: 35.8623 },
      mapOptions: {
        disableDefaultUI: true,
        fullscreenControl: true,
      },
    }
  },
  computed: {
    ...takeState('assessmentClr', 'items').expose([
      'full_name',
      'org_id',
      'case_code',
      'case_phone',
      'nationality_id',
      'referral_id',
      'cadastre_id',
      'address_latitude',
      'address_longitude',
      'adresstext',
      'district_id',
      'family_members',
      'Head_hhold',
      'employed',
      'monthly_payments',
      'isolation_room',
    ]).commit('assessmentClr/SET_ITEM').map(),
    ...takeState('assessmentClr', 'itemsrec').expose(['pcr_date', 'pcr_photo']).commit('assessmentClr/SET_ITEM_REC').map(),
    ...takeState('assessmentClr', 'itemsfamily').expose([
      'yng_child_count',
      'child_count',
      'young_count',
      'teenager_count',
      'adult_count',
      'elderly_count',
      'female_count',
      'infected_count',
      'male_count',
      'pregnant',
      'comments',
    ]).commit('assessmentClr/SET_ITEM_FAM').map(),
    ...takeState('assessmentClr', 'country').expose(['id', 'number', 'text']).commit('assessmentClr/SET_CON').map(),
    nationalityOptions: takeState('global', 'nationality').map(),
    genderOptions: takeState('global', 'gender').map(),
    phoneOptions: takeState('global', 'phoneOptions').map(),
    phoneProps: takeState('global', 'phoneProps').map(),
    family_relation: takeState('global', 'family_relation').map(),
    emplymntOptions: takeState('global', 'employment').map(),
    giveroption: takeState('global', 'caregiver').map(),
    priority_period: takeState('assessmentClr', 'priority_period').map(),
    grace_period: takeState('assessmentClr', 'grace_period').map(),
    priority_interval: takeState('assessmentClr', 'priority_interval').map(),
    //
    referralOptions: takeState('global', 'referral').map(),
    governorateOption: takeState('assessmentClr', 'governorateOption').map(),
    districtOptions: takeState('assessmentClr', 'disOption').map(),
    cadOptions: takeState('assessmentClr', 'cadOptions').commit('assessmentClr/SET_CAD_OPT').map(),
    typeOptions: takeState('assessmentClr', 'typeOptions').map(),
    issOptions: takeState('assessmentClr', 'issOptions').map(),
    items: takeState('assessmentClr', 'items').map(),
    pcrResultOption: takeState('global', 'pcr_result').map(),
    orgOptions: takeState('assessmentClr', 'orgOptions').map(),

    ///
    governorate: takeState('assessmentClr', 'governorate').commit('assessmentClr/SET_GOV').map(),
    district: takeState('assessmentClr', 'district').commit('assessmentClr/SET_DIS').map(),
    cadaster: takeState('assessmentClr', 'cadaster').commit('assessmentClr/SET_CAD').map(),
    type: takeState('assessmentClr', 'type').commit('assessmentClr/SET_TYPE').map(),
    iss: takeState('assessmentClr', 'iss').commit('assessmentClr/SET_ISS').map(),
    referral: takeState('assessmentClr', 'referral').commit('assessmentClr/SET_REF').map(),
    pcres: takeState('assessmentClr', 'pcres').commit('assessmentClr/SET_PCR_RES').map(),
    org: takeState('assessmentClr', 'org').commit('assessmentClr/SET_ORG').map(),

    //
    nationality: takeState('assessmentClr', 'nationality').commit('assessmentClr/SET_NAT').map(),
    gender: takeState('assessmentClr', 'gender').commit('assessmentClr/SET_GEN').map(),
    employment: takeState('assessmentClr', 'employment').commit('assessmentClr/SET_EMPL').map(),
    caregiver: takeState('assessmentClr', 'caregiver').commit('assessmentClr/SET_GVR').map(),
    photo: takeState('assessmentClr', 'photo').commit('assessmentClr/SET_PHOTO').map(),
    iscode: takeState('assessmentClr', 'iscode').map(),
    des_code: takeState('assessmentClr', 'des_code').map(),
    des_rep: takeState('assessmentClr', 'des_rep').map(),
    show: takeState('assessmentClr', 'show').map(),
    res: takeState('assessmentClr', 'res').map(),
    caseDetail: takeState('assessmentClr', 'case').map(),
    pcrResult() {
      return this.pcrResultOption.slice(0, -1)
    },
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
    minMale() {
      if (this.gender == null) {
        return 0
      }
      if (this.gender.value === 2) {
        return 1
      }
      return 0
    },
    minFemale() {
      if (this.gender == null) {
        return 0
      }
      if (this.gender.value === 3) {
        return 1
      }
      return 0
    },
    description() {
      /* let str
      console.log('grace', this.grace_period)
      switch (this.priority_period - this.grace_period) {
        case 1:
          str = 'يوم واحد'
          break
        case 2:
          str = 'يومان'
          break
        default:
          str = `${this.priority_period - this.grace_period} ايام`
      } */
      const d = '\'ان كنتم مصابين بإسهال حاد (الكوليرا) وبحاجة لأدوات التعقيم و التنظيف، الرجاء ادخال المعلومات المطلوبة ادناه بشكل صحيح و باللغة العربية، وإلا سيعتبر طلبكم ملغى. يرجى الاخذ بعين الاعتبار ان أدوات التعقيم تصل للعائلة الواحدة في بيت واحد، بغض النظر عن عدد افرادها. ملاحظة: ان هذه المساعدة تقدّم للاشخاص المحتاجين، و الكمية محدودة، كما ان اعطائها لعائلة، سيحرم اخرى. نرجوا عدم طلبها الا ان كنتم بحاجة ماسة للحصول عليها. شكرا لتعاونكم.\''
      return d
    },
    title() {
      return this.$store.getters['assessmentClr/title']
    },
    family() {
      return (this.male_count ?? 0) + (this.female_count ?? 0)
    },
    maxDate() {
      return moment().valueOf()
    },
    minDate() {
      console.log('priority_period', this.priority_period)
      return moment()
        .subtract(this.priority_period - this.grace_period - 1, 'days')
        .valueOf()
    },
  },
  watch: {
    male_count() {
      const fm = (this.male_count ?? 0) + (this.female_count ?? 0)
      if (this.infected_count !== fm && this.infected_count > fm) {
        this.infected_count = fm
      }
      this.family_members = fm
    },
    female_count() {
      const fm = (this.male_count ?? 0) + (this.female_count ?? 0)
      if (this.infected_count !== fm && this.infected_count > fm) {
        this.infected_count = fm
      }
      this.family_members = fm
    },
    res(newval) {
      if (newval === 4) {
        this.geolocate()
      }
    },
  },
  created() {
    document.documentElement.setAttribute('dir', 'rtl')
    localize('ar')
    if (localStorage.getItem('save')) {
      this.$swal({
        title: 'استرجاع الحفظ',
        text: 'لقد تم حفظ معلوماتك مسبقاًُ هل تريد إسترجاعها؟',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'نعم',
        cancelButtonText: '!كلا، سيتم حذف البيانات ',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('assessmentClr/GetLocalStorage', {
            prefix: this.$route.query.q,
            save: true,
          })
        } else if (result.dismiss === 'cancel') {
          this.$store.dispatch('assessmentClr/GetLocalStorage', {
            prefix: this.$route.query.q,
            save: false,
          })
        } else {
          this.$store.dispatch('assessmentClr/GetLocalStorage', {
            prefix: this.$route.query.q,
            save: false,
          })
        }
      })
    } else {
      this.$store.dispatch('assessmentClr/GetLocalStorage', {
        prefix: this.$route.query.q,
        save: false,
      })
    }
  },
  methods: {
    ChangeDistrict(value) {
      if (value != null) {
        this.$store.dispatch('assessmentClr/GET_TYPE')
      }
    },
    ChangeType(value) {
      if (value != null) {
        this.$store.dispatch('assessmentClr/GET_CAD')
      }
    },
    ChangeCAD(value) {
      if (value != null || this.type != null) {
        console.log(this.$store)
        if (this.type.value !== 1) {
          this.$store.dispatch('assessmentClr/GET_ISS')
        }
      }
    },
    reset() {
      this.$store.dispatch('assessmentClr/RESET_DATA', {
        prefix: this.$route.query.q,
      })
    },
    isImage(data) {
      const image = new Image()
      image.src = data
      return new Promise(resolve => {
        image.onload = () => {
          if (image.height === 0 || image.width === 0) {
            resolve(false)
            return
          }
          // this.pc = 'pdf'
          // this.pdf = true
          resolve(true)
        }
        image.onerror = () => {
          resolve(false)
        }
      })
    },
    /* SaveintoStorage() {
      this.$store.dispatch('assessmentClr/SaveLocalStorage').then(() => {
        this.$swal({
          icon: 'success',
          title: 'تم الحفظ!',
          text:
                        'لقد تم حفظ معلوماتك يمكنك الرجوع إلى هذه الصفحة بدون الحاجةإلى تعبئة ملعلوماتك مرة اخرى',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      })
    }, */
    dropSelect(value) {
      // eslint-disable-next-line prefer-destructuring
      this.id = this.phoneOptions.filter(
        ct => ct.value === value,
      )[0].value
      this.text = this.phoneOptions.filter(
        ct => ct.value === value,
      )[0].text
    },
    goTo() {
      this.$router.replace({ query: null })
      this.$router.go()
    },
    formSubmited() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('assessmentClr/SubmitAssmnt', {
              prefix: this.$route.query.q,
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
    dooo(value) {
      const t = value.target.files[0].type
      if (value.target.files[0].size / 1024 / 1024 > 5) {
        this.$refs.fileinput.reset()
        this.$swal({
          icon: 'error',
          title: 'خطأ!',
          text: 'الحد الاقصى للصورة هو 5 ميجا',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      } else if (t === 'image/jpeg' || t === 'image/png') {
        if (t === 'application/pdf') {
          this.pdf = true
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(value.target.files[0])
            reader.onload = () => {
              // eslint-disable-next-line prefer-destructuring
              this.pcr_photo = reader.result.split(',')[1]
              resolve(reader.result)
            }
            reader.onerror = error => reject(error)
          })
        }
        this.pdf = false
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(value.target.files[0])
          reader.onload = () => {
            // eslint-disable-next-line prefer-destructuring
            this.pcr_photo = reader.result.split(',')[1]
            resolve(reader.result)
          }
          reader.onerror = error => reject(error)
        })
      } else {
        this.$refs.fileinput.reset()
        this.$swal({
          icon: 'error',
          title: 'خطأ!',
          text: `الرجاء رفع صورة من نوع${'(Jpeg او png)'}`,
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      }
      return null
    },
    formatter(value) {
      const fr = this.fixNumbers(value)
      return fr.replace(/[^0-9]/g, '')
    },
    fixNumbers(str) {
      if (typeof str === 'string') {
        const persianNumbers = [
          /۰/g,
          /۱/g,
          /۲/g,
          /۳/g,
          /۴/g,
          /۵/g,
          /۶/g,
          /۷/g,
          /۸/g,
          /۹/g,
        ]
        const arabicNumbers = [
          /٠/g,
          /١/g,
          /٢/g,
          /٣/g,
          /٤/g,
          /٥/g,
          /٦/g,
          /٧/g,
          /٨/g,
          /٩/g,
        ]
        for (let i = 0; i < 10; i += 1) {
          // eslint-disable-next-line no-param-reassign
          str = str
            .replace(persianNumbers[i], i)
            .replace(arabicNumbers[i], i)
        }
      }
      return str
    },
    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.marker.position = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            this.panToMarker()
          },
          error => {
            let vb
            switch (error.code) {
              case error.PERMISSION_DENIED:
                vb = 'Could not get your location. User denied the request for Geolocation.'
                break
              case error.POSITION_UNAVAILABLE:
                vb = 'Could not get your location. Location information is unavailable.'
                break
              case error.TIMEOUT:
                vb = 'Could not get your location. The request to get user location timed out.'
                break
              case error.UNKNOWN_ERROR:
                vb = 'Could not get your location. An unknown error occurred.'
                break
              default:
                vb = 'Could not get your location. An unknown error occurred.'
            }
            this.$swal({
              icon: 'error',
              title: 'Location',
              text: vb,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          },
          {
            // maximumAge: 500000,
            // enableHighAccuracy: true,
            timeout: 6000,
          },
        )
      }
    },
    // sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      this.address_latitude = this.marker.position.lat
      this.address_longitude = this.marker.position.lng
    },
    // Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo({
        lat: this.marker.position.lat,
        lng: this.marker.position.lng,
      })
      this.address_latitude = this.marker.position.lat
      this.address_longitude = this.marker.position.lng
    },
    // Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      this.address_latitude = this.marker.position.lat
      this.address_longitude = this.marker.position.lng
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 280px) {
    .gmap {
        width: 100%;
        height: 300px;
    }
}
@media only screen and (min-width: 280px) {
    .gmap {
        width: 200px;
        height: 300px;
    }
}
@media only screen and (min-width: 350px) {
    .gmap {
        width: 280px;
        height: 300px;
    }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (min-width: 430px) {
    .gmap {
        width: 330px;
        height: 300px;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 680px) {
    .gmap {
        width: 300px;
        height: 300px;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .gmap {
        width: 300px;
        height: 300px;
    }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .gmap {
        width: 400px;
        height: 300px;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .gmap {
        width: 500px;
        height: 400px;
    }
}
</style>
