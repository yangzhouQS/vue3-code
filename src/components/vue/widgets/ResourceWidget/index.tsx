import {defineComponent, ref} from 'vue'
import './style.less'
import {IResource, isResourceHost, isResourceList} from "../../../core";
import {usePrefix} from "../../hooks/usePrefix";
import {IconWidget} from "../IconWidget";
import {TextWidget} from "../TextWidget";
import {isFn} from "../../../shared";

export const ResourceWidget = defineComponent({
  name: 'ResourceWidget',
  props: {
    title: String,
    sources: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultExpand: {
      type: Boolean,
      default: true
    },
    children: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  setup(props, {slots}) {
    const prefix = usePrefix('resource')
    const expand = ref(props.defaultExpand)
    const setExpand = (val: boolean) => {
      expand.value = val
    }
    const renderNode = (source: IResource) => {
      const {node, icon, title, thumb, span} = source

      return (
        <div
          class={prefix + '-item'}
          style={{gridColumnStart: `span ${span || 1}`}}
          key={node.id}
          data-designer-source-id={node.id}
        >
          {thumb && <img class={prefix + '-item-thumb'} src={thumb}/>}
          {
            <IconWidget
              class={prefix + '-item-icon'}
              infer={icon}
              width={'150px'}
              height={'40px'}
              style={{width: `150px`, height: `40px`}}
            />
          }
          <span class={prefix + '-item-text'}>
            {
              <TextWidget>
                {title || node.children[0]?.getMessage('title')}
              </TextWidget>
            }
          </span>
        </div>
      )
    }

    const sources = props.sources?.reduce((buf: any, souce: IResource) => {
      if (isResourceList(souce)) {
        return buf.concat(souce)
      } else if (isResourceHost(buf)) {
        return buf.concat(souce.Resource)
      }
      return buf
    }, [])


    /*单个分组*/
    const remainItems = props.sources.reduce((length, source: any) => {
      return length + (source?.span ?? 1)
    }, 0) % 3
    return () => {
      return <div class={[
        prefix, {expand: expand.value}
      ]}>
        <div
          class={prefix + '-header'}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setExpand(!expand.value)
          }}
        >
          <div class={prefix + '-header-expand'}>
            <IconWidget infer="Expand" size={10}/>
          </div>
          <div class={prefix + '-header-content'}>
            <TextWidget>{props.title}</TextWidget>
          </div>
        </div>
        <div class={prefix + '-content-wrapper'}>
          <div class={prefix + '-content'}>
            {sources.map(isFn(props.children) ? props.children : renderNode)}

            {remainItems ? (
              <div
                class={prefix + '-item-remain'}
                style={{gridColumnStart: `span ${3 - remainItems}`}}
              ></div>
            ) : null}
          </div>
        </div>
      </div>
    }
  }
})
