import {defineComponent, getCurrentInstance, ref} from 'vue';

export const VuetifyDemoJsx = defineComponent({
  name: 'VuetifyDemoJsx',
  setup(props) {
    return () => {
      const firstName = ref('')

      console.log(getCurrentInstance());

      return <div>
        component name: VuetifyDemoJsx
        <v-sheet class={['mx-auto']} width={300}>
          <v-form>
            <v-text-field label="Name" v-model={firstName.value}></v-text-field>
            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
          </v-form>
        </v-sheet>
      </div>
    }
  }
})
