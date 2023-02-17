<!-- <template>
    <div class="dropinput" >
      <input
        @focus="showMulti = true"
        v-model="formatData"
        type="text"
        placeholder="select"
        @input="handleInput"
      />
      <img
        class="dropinput--select-arrow"
        @click="showMulti = !showMulti"
        src="../../assets/dropdown.svg"
      />
    </div>
    <div class="dropinput" >
      <input
        @focus="show = true"
        v-model="single"
        type="text"
        placeholder="select single"
      />
      <img
        class="dropinput--select-arrow"
        @click="show = !show"
        src="../../assets/dropdown.svg"
      />
    </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);
const showMulti = ref(false);
const single = ref();

const selected = ref(['']);
</script> -->