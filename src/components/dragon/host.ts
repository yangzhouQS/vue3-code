import {IPublicModelNode} from "./drag-object";
import {VNode, ComponentPublicInstance} from 'vue'
import {createModuleEventBus, IEventBus} from "./event-bus";
import Viewport from './viewport';
import {IPublicModelSensor} from "./sensor";
import {IPublicModelLocateEvent} from "./locate-event";
import {IPublicModelDropLocation} from "./drop-location";
import {ILocateEvent} from "./dragon";
import {DropContainer} from "./dragon-type";
import {CanvasPoint, IPublicTypeRect} from "./location";
import {isElement} from "./utils/is-element";

/**
 * 拖拽识别区域
 */
export class SimulatorHost implements IPublicModelSensor {
    readonly viewport = new Viewport();

    private _dom?: HTMLElement
    readonly emitter: IEventBus = createModuleEventBus('BuiltinSimulatorHost');

    get dom(): HTMLElement {
        return this._dom as HTMLElement
    }

    private sensing = false;

    constructor() {
    }

    mountViewport(viewport: HTMLElement | null) {
        this.viewport.mount(viewport);
    }

    async mountContent(dom: HTMLElement | null) {
        if (!dom || dom === this._dom) {
            return
        }
        this._dom = dom

        this.mountViewport(dom)


        // 监听事件初始化
        this.setupEvents();
        console.log('dom mountContent')
    }

    setupEvents() {
        this.setupDragAndClick();
        this.setupDetecting();
        this.setupLiveEditing();
        this.setupContextMenu();
    }

    postEvent(eventName: string, ...data: any[]) {
        this.emitter.emit(eventName, ...data);
    }

    setupDragAndClick() {
        const dom = this.dom!;
        dom.addEventListener('mousedown', (downEvent: MouseEvent) => {
            // fix for popups close logic
            document.dispatchEvent(new Event('mousedown'));

            // 禁止原生拖拽
            downEvent.stopPropagation();
            downEvent.preventDefault();

            const checkSelect = (e: MouseEvent) => {
                dom.removeEventListener('mouseup', checkSelect, true);

            }

            dom.addEventListener('mouseup', checkSelect, true);
        }, true)
        dom.addEventListener('click', (e: MouseEvent) => {
        }, true)
    }


    /**
     * 设置悬停处理
     */
    setupDetecting() {
        const dom = this.dom!;
        const hover = (e: MouseEvent) => {
            // console.log('鼠标进入')
        }
        const leave = () => {
            // console.log('鼠标离开')
        }
        dom.addEventListener('mouseover', hover, true)
        dom.addEventListener('mouseleave', leave, false)

        // 鼠标在工作区域移动
        dom.addEventListener('mousemove', (e: Event) => {
        }, false)
    }

    // 直接进入编辑模式
    setupLiveEditing() {
        const dom = this.dom!;
        dom.addEventListener('dblclick', (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            const targetElement = e.target as HTMLElement;
            console.log(targetElement)
        }, true)
    }

    // 右键菜单操作
    setupContextMenu() {
        const dom = this.dom!;
        dom.addEventListener('contextmenu', (e: MouseEvent) => {
            const targetElement = e.target as HTMLElement;
        }, true)
    }

    /**
     * 通过 DOM 节点获取节点
     * @param target
     */
    getNodeInstanceFromElement(target: Element | null): NodeInstance | null {
        if (!target) {
            return null
        }
        return {
            node: {id: '666'},
            nodeId: '11'
        }
    }

    readonly sensorAvailable: boolean;


    // 取消激活
    deactiveSensor(): void {
        this.sensing = false;
        // this.scroller.cancel();
    }

    // 给事件打补丁
    fixEvent(e: ILocateEvent): ILocateEvent {
        if (e.fixed) {
            return e;
        }
        // 事件已订正
        e.fixed = true;
        return e;
    }

    /**
     * 判断鼠标位置是否在感应区域
     * 大于 left 小于 right
     * 大于 top 小于 bottom
     * @param e
     */
    isEnter(e: IPublicModelLocateEvent): boolean {
        const rect = this.viewport.bounds;
        return (
            e.globalY >= rect.top &&
            e.globalY <= rect.bottom &&
            e.globalX >= rect.left &&
            e.globalX <= rect.right
        );
    }

    // ========= drag location logic: helper for locate ==========
    // 定位并激活
    locate(e: IPublicModelLocateEvent): IPublicModelDropLocation | undefined | null {
        return undefined;
    }

    // 查找合适放置容器
    getDropContainer(e: ILocateEvent): DropContainer | null {

        return null
    }

    // 控制投放
    handleAccept({container, instance}: DropContainer, e: ILocateEvent): boolean {

        return true
    }
}


export interface NodeInstance {
    nodeId: string;
    instance: Element | VNode | ComponentPublicInstance<any> | object;
    node?: IPublicModelNode | null;
}

function isHTMLTag(name: string) {
    return /^[a-z]\w*$/.test(name);
}

function isPointInRect(point: CanvasPoint, rect: IPublicTypeRect) {
    return (
        point.canvasY >= rect.top &&
        point.canvasY <= rect.bottom &&
        point.canvasX >= rect.left &&
        point.canvasX <= rect.right
    );
}

function distanceToRect(point: CanvasPoint, rect: IPublicTypeRect) {
    let minX = Math.min(Math.abs(point.canvasX - rect.left), Math.abs(point.canvasX - rect.right));
    let minY = Math.min(Math.abs(point.canvasY - rect.top), Math.abs(point.canvasY - rect.bottom));
    if (point.canvasX >= rect.left && point.canvasX <= rect.right) {
        minX = 0;
    }
    if (point.canvasY >= rect.top && point.canvasY <= rect.bottom) {
        minY = 0;
    }

    return Math.sqrt(minX ** 2 + minY ** 2);
}

function distanceToEdge(point: CanvasPoint, rect: IPublicTypeRect) {
    const distanceTop = Math.abs(point.canvasY - rect.top);
    const distanceBottom = Math.abs(point.canvasY - rect.bottom);

    return {
        distance: Math.min(distanceTop, distanceBottom),
        nearAfter: distanceBottom < distanceTop,
    };
}

function isNearAfter(point: CanvasPoint, rect: IPublicTypeRect, inline: boolean) {
    if (inline) {
        return (
            Math.abs(point.canvasX - rect.left) + Math.abs(point.canvasY - rect.top) >
            Math.abs(point.canvasX - rect.right) + Math.abs(point.canvasY - rect.bottom)
        );
    }
    return Math.abs(point.canvasY - rect.top) > Math.abs(point.canvasY - rect.bottom);
}

function getMatched(elements: Array<Element | Text>, selector: string): Element | null {
    let firstQueried: Element | null = null;
    for (const elem of elements) {
        if (isElement(elem)) {
            if (elem.matches(selector)) {
                return elem;
            }

            if (!firstQueried) {
                firstQueried = elem.querySelector(selector);
            }
        }
    }
    return firstQueried;
}
