$(function () {
	const hostList = ['help.primeton.com', "juejin.cn"]
	const $openButton = $("<button>remove</button>");
	$openButton.css({
		position: "fixed",
		top: "50px",
		right: "10px",
		background: "red",
		outline: "none",
		border: "none",
		zIndex: 999999,
		width: "100px",
		height: "50px",
	});
	$openButton.prop("draggable", true);

	const hostHandle = {
		'help.primeton.com': () => {

			// 锚点移除
			;[...document.querySelectorAll('.header-anchor')].forEach(item => {
				item.remove()
			});

			const navbar = document.querySelector(".navbar")
			if (navbar) {
				navbar.remove();
				console.log('navbar:移除成功');
			}

			const sidebar = document.querySelector(".sidebar")
			if (sidebar) {
				sidebar.remove();
				console.log('sidebar:移除成功');
			}

			const pageAnchor = document.querySelector(".page-anchor")
			if (pageAnchor) {
				pageAnchor.remove();
				console.log('pageAnchor:移除成功');
			}

			const pageNav = document.querySelector(".page-nav")
			if (pageNav) {
				pageNav.remove();
				console.log('pageNav:移除成功');
			}
			const globalUi = document.querySelector(".global-ui")
			if (globalUi) {
				globalUi.remove();
				console.log('globalUi:移除成功');
			}

			$openButton.remove();
		},
		"juejin.cn": () => {
			;[...document.querySelectorAll('.code-block-extension-header')].forEach(item => {
				item.remove()
			});

			function removeBefore() {
				// 创建style标签并插入<head>
				const style = document.createElement('style');
				document.head.appendChild(style);
				const sheet = style.sheet;

				// 插入覆盖规则（优先级需高于原有样式）
				sheet.insertRule(`
      .code-block-extension-codeLine::before {
        content: none !important;
      }
    `, 0);
			}

			removeBefore();
			[".article-suspended-panel", '.main-header', '.sidebar', '.comment-box-common', '.recommended-area', '.suspension-panel'].forEach(dom => {
				$(dom).remove()
			})
		},
	}


	$openButton.on("click", () => {
		if (hostHandle[window.location.host]) {
			hostHandle[window.location.host]();
		}
	});
	if (hostList.includes(window.location.host)) {
		$("body").append($openButton);

	}

});
