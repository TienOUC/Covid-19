// 让图表随着页面大小自动缩放
module.exports = function (obj) {
    window.addEventListener('resize', () => {
        obj.resize();
    })
}

