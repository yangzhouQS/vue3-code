import {IPublicModelDragon} from "./dragon-type";
import {IPublicModelDragObject, IPublicModelNode, IPublicTypeDragObject} from "./drag-object";
import {IPublicModelLocateEvent} from "./locate-event";
import {createModuleEventBus, IEventBus} from "./event-bus";
import {IPublicModelSensor} from "./sensor";
import {cursor} from "./Cursor/cursor";
import {setNativeSelection} from './utils/navtive-selection'

export interface ILocateEvent extends IPublicModelLocateEvent {
    readonly type: 'LocateEvent';

    /**
     * 激活的感应器
     */
    sensor?: IPublicModelSensor;

}


export interface IDragon extends IPublicModelDragon {

}

function isDragEvent(e: any): e is DragEvent {
    return e?.type?.startsWith('drag');
}

export function isDragNodeObject(obj: any) {
    return obj && obj.type === 'node';
}

const SHAKE_DISTANCE = 4;

/**
 * mouse shake check
 * 碰撞检测
 */
export function isShaken(e1: MouseEvent | DragEvent, e2: MouseEvent | DragEvent): boolean {
    if ((e1 as any).shaken) {
        return true;
    }
    if (e1.target !== e2.target) {
        return true;
    }
    return (
        Math.pow(e1.clientY - e2.clientY, 2) + Math.pow(e1.clientX - e2.clientX, 2) > SHAKE_DISTANCE
    );
}

export function isInvalidPoint(e: any, last: any): boolean {
    return (
        e.clientX === 0 &&
        e.clientY === 0 &&
        last &&
        (Math.abs(last.clientX - e.clientX) > 5 || Math.abs(last.clientY - e.clientY) > 5)
    );
}

export function isSameAs(e1: MouseEvent | DragEvent, e2: MouseEvent | DragEvent): boolean {
    return e1.clientY === e2.clientY && e1.clientX === e2.clientX;
}

export function setShaken(e: any) {
    e.shaken = true;
}

function makeEventsHandler(
    boostEvent: MouseEvent | DragEvent,
): (fn: (sdoc: Document) => void) => void {
    const topDoc = window.document;
    const sourceDoc = boostEvent.view?.document || topDoc;
    const docs = new Set<Document>();
    docs.add(topDoc);
    docs.add(sourceDoc);
    return (handle: (sdoc: Document) => void) => {
        docs.forEach((doc) => handle(doc));
    };
}

/**
 * Drag-on 拖拽引擎
 */
export class Dragon implements IDragon {

    // 拖拽敏感板
    private sensors: IPublicModelSensor[] = [];
    // 拖拽状态
    private _dragging = false;

    private _canDrop = false;

    /**
     * 是否正在拖动
     */
    get dragging(): boolean {
        return this._dragging;
    }

    // 事件总线
    private emitter: IEventBus = createModuleEventBus('Dragon');

    constructor() {
    }

    /**
     * 发射拖拽对象
     * boost your dragObject for dragging(flying)
     *
     * @param dragObject 拖拽对象
     * @param boostEvent 拖拽初始时事件
     */
    boost(dragObject: IPublicTypeDragObject, boostEvent: MouseEvent | DragEvent): void {
        const masterSensors = null

        // 事件对象
        const handleEvents = makeEventsHandler(boostEvent)

        // 拖拽的是否为节点对象，根据type判断 type === 'node'
        const newBie = !isDragNodeObject(dragObject);

        this._dragging = false;

        // esc按键取消检查
        const checkKeydownEsc = (e: KeyboardEvent) => {
            console.log('checkKeydownEsc')
            if (e.keyCode === 27) {
                // designer.clearLocation();
                over();
            }
        };

        let copy = false;

        // copy快捷键检查
        const checkcopy = (e: MouseEvent | DragEvent | KeyboardEvent) => {

        }

        let lastArrive: any;
        const drag = (e: MouseEvent | DragEvent) => {

            if (isInvalidPoint(e, lastArrive)) return;

            if (lastArrive && isSameAs(e, lastArrive)) {
                lastArrive = e;
                return;
            }
            lastArrive = e;

            const locateEvent = createLocateEvent(e);


            // 清除上次拖拽缓存的座标信息，从新发射坐标
            // designer.clearLocation();
            this.emitter.emit('drag', locateEvent);
        }

        // 设置开始拖拽
        const dragstart = () => {
            // 设置状态拖拽的状态
            this._dragging = true;
            const locateEvent = createLocateEvent(boostEvent);

            if (newBie) {
                // 设置拷贝态样式类
                this.setCopyState(true)
            }

            // 设置拖拽状态的鼠标样式
            this.setDraggingState(true);


            // esc 取消拖拽
            handleEvents((doc) => {
                doc.addEventListener('keydown', checkKeydownEsc, false);
            });
            console.log('locateEvent', locateEvent)
            this.emitter.emit('dragstart', locateEvent);
        }

        // 鼠标移动过程
        const move = (e: MouseEvent | DragEvent) => {
            if (this._dragging) {
                // process dragging
                drag(e);
                return;
            }

            // first move check is shaken
            if (isShaken(boostEvent, e)) {
                // is shaken dragstart
                dragstart();
                drag(e);
            }
            console.log('drag move')
        }

        // 放置元素 dragenter -> dragover -> drop
        let didDrop = true;
        /* istanbul ignore next */
        const drop = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            didDrop = true;
        };

        // 松开鼠标
        const over = (e?: any) => {


            /* istanbul ignore next */
            if (e && isDragEvent(e)) {
                e.preventDefault();
            }

            /* istanbul ignore next */
            this.setNativeSelection(true);


            // 移除全局的鼠标状态
            this.clearState();
            let exception;
            if (this._dragging) {
                this._dragging = false
                try {
                    this.emitter.emit('dragend', {dragObject, copy});
                } catch (error) {
                    exception = error
                }
            }

            // 清除上次拖拽缓存的座标信息
            // designer.clearLocation();


            // 销毁注册的全局事件
            handleEvents((doc) => {
                /* istanbul ignore next */
                doc.removeEventListener('mousemove', move, true);
                doc.removeEventListener('mouseup', over, true);

                doc.removeEventListener('mousedown', over, true);
                doc.removeEventListener('keydown', checkKeydownEsc, false);
                doc.removeEventListener('keydown', checkcopy, false);
                doc.removeEventListener('keyup', checkcopy, false);
            });

            /* istanbul ignore next */
            if (exception) {
                throw exception;
            }
            console.log('over')
        }

        // 创建包装好的事件对象
        const createLocateEvent = (e: MouseEvent | DragEvent): ILocateEvent => {
            const evt: any = {
                type: 'LocateEvent',
                dragObject,
                target: e.target,
                originalEvent: e,
            };

            evt.globalX = e.clientX
            evt.globalY = e.clientY

            return evt
        }

        // 检测是否为原生的drag拖拽事件
        if (isDragEvent(boostEvent)) {
            const {dataTransfer} = boostEvent;
            if (dataTransfer) {
                dataTransfer.effectAllowed = 'all';

                try {
                    dataTransfer.setData('application/json', '{}');
                } catch (ex) {
                    // ignore
                }
            }
            dragstart();
        } else {
            // 禁用原生拖拽事件
            this.setNativeSelection(false);
        }

        // 向文档对象派发事件
        handleEvents((doc) => {
            doc.addEventListener('mousemove', move, true);
            doc.addEventListener('mouseup', over, true);
            doc.addEventListener('mousedown', over, true);
        })

    }

    /**
     * 设置拖拽监听的区域 shell，以及自定义拖拽转换函数 boost
     * set a html element as shell to dragon as monitoring target, and
     * set boost function which is used to transform a MouseEvent to type
     * IPublicTypeDragNodeDataObject.
     * @param shell 拖拽监听的区域
     * @param boost 拖拽转换函数
     */
    from(shell: HTMLElement, boost: (e: MouseEvent) => IPublicModelDragObject | null) {
        const mousedown = (e: MouseEvent) => {
            // ESC or RightClick
            if (e.which === 3 || e.button === 2) {
                return;
            }

            // 获取 在感应区域 拖拽结束的返回结果
            // dragObject: 根据返回值需要在组件的注册列表找到对应唯一组件
            const dragObject = boost(e);
            if (!dragObject) {
                return;
            }

            // 发射返回结果
            this.boost(dragObject, e);
        }
        shell.addEventListener('mousedown', mousedown)
        return () => {
            shell.removeEventListener('mousedown', mousedown)
        }
    }

    private setNativeSelection(enableFlag: boolean) {
        setNativeSelection(enableFlag);
        console.log('setNativeSelection')
        /*setNativeSelection(enableFlag);
        this.getSimulators().forEach((sim) => { // frame 内容区域操作
            sim?.setNativeSelection(enableFlag);
        });*/
    }

    /**
     * 设置拖拽态
     */
    private setDraggingState(state: boolean) {
        cursor.setDragging(state);
        /*this.getSimulators().forEach((sim) => {
            sim?.setDraggingState(state);
        });*/
    }

    /**
     * 设置拷贝态
     */
    private setCopyState(state: boolean) {
        cursor.setCopy(state);
        /*this.getSimulators().forEach((sim) => {
            sim?.setCopyState(state);
        });*/
    }

    /**
     * 清除所有态：拖拽态、拷贝态
     */
    private clearState() {
        cursor.release();
        /*this.getSimulators().forEach((sim) => {
            sim?.clearState();
        });*/
    }

    /**
     * 添加投放感应区
     */
    addSensor(sensor: any) {
        this.sensors.push(sensor);
    }

    /**
     * 移除投放感应
     */
    removeSensor(sensor: any): void {
        const i = this.sensors.indexOf(sensor);
        if (i > -1) {
            this.sensors.splice(i, 1);
        }
    }

    onDrag(func: (e: IPublicModelLocateEvent) => any): () => void {
        this.emitter.on('drag', func);
        return () => {
            this.emitter.removeListener('drag', func);
        };
    }

    onDragstart(func: (e: IPublicModelLocateEvent) => any): () => void {
        this.emitter.on('dragstart', func);
        return () => {
            this.emitter.removeListener('dragstart', func);
        };
    }

    onDragend(func: (o: { dragObject: IPublicModelDragObject; copy?: boolean }) => any): () => void {
        this.emitter.on('dragend', func);
        return () => {
            this.emitter.removeListener('dragend', func)
        };
    }
}
