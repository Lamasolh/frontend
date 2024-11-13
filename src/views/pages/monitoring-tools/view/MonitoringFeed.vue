<template>
  <div>
    <!-- Case Basic Information -->
    <b-row>
      <b-col>
        <h5 class="mb-1 text-primary">
          Awareness Information
        </h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p><b class="text-primary">Awareness InProgress :</b> {{ awrnss_inprgrss }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Awareness Feedback:</b> {{ awrns_feedback }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Awareness Comment:</b> {{ awrns_comments }}</p>
      </b-col>
      <b-col cols="4">
        <p><b class="text-primary">Awareness Date:</b> {{ awrns_datetime }}</p>
      </b-col>
      <b-col cols="1" />
    </b-row>
    <b-row>
      <b-col>
        <p><b class="text-primary">Awareness Male Count :</b> {{ awrns_malecount }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Awareness Female Count:</b> {{ awrns_femalecount }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Awareness HouseHold Count:</b> {{ awrns_householdCount }}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8">
        <h3
          :class="awrns_status== null ? ' ':awrns_status == true? 'text-success' : 'text-danger' "
        >
          {{ awrns_status== null ? ' ':awrns_status == true? 'Verified' : 'Not Verified' }}
        </h3>
      </b-col>
    </b-row>
    <hr>
    <!-- Family Information -->
    <b-row>
      <b-col>
        <h5 class="mb-1 text-primary">
          FeedBack Information
        </h5>
      </b-col>
    </b-row>
    <!-- Info-->
    <b-row>
      <!-- Male Count -->
      <b-col>
        <p><b class="text-primary">Percentage score:</b> {{ fdbk_score }}</p>
      </b-col>
      <!-- Female Count -->
      <b-col>
        <p><b class="text-primary">Date of the feedback:</b> {{ fdbk_feedback_date }}</p>
      </b-col>
      <!-- Family Member -->
      <b-col>
        <p><b class="text-primary">Did you received a kit or any other items?</b> {{ fdbk_receive_item_q }}</p>
      </b-col>
      <!-- household -->
      <b-col>
        <p><b class="text-primary">What are the items received?</b> {{ fdbk_item_recieved }}</p>
      </b-col>
      <!-- Pregnant -->
      <b-col>
        <p><b class="text-primary">Did you received the item on schedule?</b> {{ fdbk_on_scheduled }}</p>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <p><b class="text-primary">Are the items are acceptable?</b> {{ fdbk_acceptable_on_scheduled }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Why the received item are not acceptable?</b> {{ fdbk_not_acceptable_res }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Is the received items quantity enough for your family?</b> {{ fdbk_number_item_sufficient }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Why the received items quantity wasn’t enough?</b> {{ fdbk_why_number_not_sufficient }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Is an awareness session conducted to explain the use of the items?</b> {{ fdbk_awareness_recieved }}</p>
      </b-col>

    </b-row>
    <b-row>
      <b-col>
        <p><b class="text-primary">Is the awareness session was useful?</b> {{ fdbk_awareness_usefull }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Why awareness wasn't useful?</b> {{ fdbk_why_not_usefull_awrns }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Is there any additional information want to be added?</b> {{ fdbk_additional_information }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Any addition items suggested to be added?</b> {{ fdbk_additional_items }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">The items item received are been used by you or you gave to others?</b> {{ fdbk_used_by_you_or_else }}</p>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <p><b class="text-primary">Is the communication team was polite while they were contacting you?</b> {{ fdbk_communication_behaviour }}</p>
      </b-col>
      <b-col>
        <p><b class="text-primary">Are there any complains?</b> {{ fdbk_complains_comments }}</p>
      </b-col>
    </b-row>
    <br>
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
// eslint-disable-next-line import/no-unresolved
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  computed: {
    monitored: takeState('monitoringView', 'monitored').map(),

    // Awerness
    awrns_comments: takeState('monitoringView', 'awrns_comments').map(),
    awrns_datetime: takeState('monitoringView', 'awrns_datetime').map(),
    awrns_feedback: takeState('monitoringView', 'awrns_feedback').map(),
    awrnss_inprgrss: takeState('monitoringView', 'awrnss_inprgrss').map(),
    awrns_status: takeState('monitoringView', 'awrns_status').map(),
    awrns_malecount: takeState('monitoringView', 'awrns_malecount').map(),

    awrns_femalecount: takeState('monitoringView', 'awrns_femalecount').map(),

    awrns_householdCount: takeState('monitoringView', 'awrns_householdCount').map(),
    // Feedback
    fdbk_acceptable_on_scheduled: takeState('monitoringView', 'fdbk_acceptable_on_scheduled').map(),
    fdbk_additional_information: takeState('monitoringView', 'fdbk_additional_information').map(),
    fdbk_additional_items: takeState('monitoringView', 'fdbk_additional_items').map(),
    fdbk_awareness_recieved: takeState('monitoringView', 'fdbk_awareness_recieved').map(),
    fdbk_awareness_usefull: takeState('monitoringView', 'fdbk_awareness_usefull').map(),

    fdbk_communication_behaviour: takeState('monitoringView', 'fdbk_communication_behaviour').map(),
    fdbk_complains_comments: takeState('monitoringView', 'fdbk_complains_comments').map(),
    fdbk_feedback_date: takeState('monitoringView', 'fdbk_feedback_date').map(),
    fdbk_item_recieved: takeState('monitoringView', 'fdbk_item_recieved').map(),
    fdbk_not_acceptable_res: takeState('monitoringView', 'fdbk_not_acceptable_res').map(),

    fdbk_number_item_sufficient: takeState('monitoringView', 'fdbk_number_item_sufficient').map(),
    fdbk_on_scheduled: takeState('monitoringView', 'fdbk_on_scheduled').map(),
    fdbk_receive_item_q: takeState('monitoringView', 'fdbk_receive_item_q').map(),
    fdbk_score: takeState('monitoringView', 'fdbk_score').map(),
    fdbk_used_by_you_or_else: takeState('monitoringView', 'fdbk_used_by_you_or_else').map(),

    fdbk_why_not_usefull_awrns: takeState('monitoringView', 'fdbk_why_not_usefull_awrns').map(),
    fdbk_why_number_not_sufficient: takeState('monitoringView', 'fdbk_why_number_not_sufficient').map(),

  },

}
</script>
<style scoped>
.vl {
  border-left: 6px solid black;
  height: 500px;
  position: absolute;
  left: 50%;
  margin-left: -3px;
  top: 0;
}
</style>
