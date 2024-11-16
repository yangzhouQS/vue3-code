import {defineComponent, onMounted, ref, reactive} from "vue"

export const DemoWebrtc = defineComponent({
  name: 'demo-webrtc',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    // data
    const deviceInfoList = ref([])
    const audioinputList = ref([])
    const state = reactive({
      audioinput: '',
      videoinput: '',
      audiooutput: '',
      audioinputList: [],
      videoinputList: [],
      audiooutputList: [],
    })

    // methods
    const methods = {
      loadData: () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          console.log('enumerateDevices is not function')
        } else {
          const constraints = {audio: true, video: {width: 1280, height: 720}}
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          }).then(result => {
            console.log(result)
          }).catch(error => {
            console.log(error)
          })

          navigator.mediaDevices.enumerateDevices().then(getDevices).catch(error => {
            console.log(error)
          })
        }


        async function getDevices(deviceList) {
          deviceInfoList.value = deviceList

          const audioinputList2 = []
          for (const device of deviceList) {
            if (device.kind === 'audioinput') {
              audioinputList2.push(device)
              state.audioinput = device.deviceId
            }
            if (device.kind === 'videoinput') {
              state.videoinputList.push(device)
              state.videoinput = device.deviceId
            }
            if (device.kind === 'audiooutput') {
              state.audiooutputList.push(device)
              state.audiooutput = device.deviceId
            }
          }
          audioinputList.value = audioinputList2;
        }
      }
    }

    onMounted(() => {
      methods.loadData()
    })

    return () => {
      return (
        <div class={'full-container'}>
          <div class={'d-flex pa-2'}>
            <span>audioinput device</span>
            <div class={"ml-3"}>
              <el-select
                placeholder="请选择设备" v-model={state.audioinput} size="small"
                clearable={true}
              >
                {
                  audioinputList.value.map(device => {
                    return <el-option
                      value={device.deviceId}
                      label={device.label}
                      key={device.deviceId}
                    >
                      {device.label}
                    </el-option>
                  })
                }
              </el-select>
            </div>
          </div>
        </div>
      )
    }
  }
})
