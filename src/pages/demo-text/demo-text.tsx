import {defineComponent} from 'vue';
import {AssemTextEllipsis} from "../../components/assem-text-ellipsis/assem-text-ellipsis";

export const DemoText = defineComponent({
  name: 'DemoText',
  setup(props) {
    const text =
      '那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。';
    return () => {
      return <div>
        <AssemTextEllipsis content={text} rows={1}/>
      </div>
    }
  }
})
