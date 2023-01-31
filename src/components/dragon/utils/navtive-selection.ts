let nativeSelectionEnabled = true;

// 模拟原生的拖拽事件
const preventSelection = (e: Event) => {
    if (nativeSelectionEnabled) {
        return null;
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
};

// 监听全局的选择事件
document.addEventListener('selectstart', preventSelection, true);
document.addEventListener('dragstart', preventSelection, true);

// 开启拖拽模拟事件
export function setNativeSelection(enableFlag: boolean) {
    nativeSelectionEnabled = enableFlag;
}
