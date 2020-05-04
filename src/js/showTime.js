var t = null
t = setTimeout(time, 1000)
function time () {
    clearTimeout(t) //清除定时器

    const myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1 > 9 ? (myDate.getMonth() + 1).toString() : '0' + (myDate.getMonth() + 1);
    var day = myDate.getDate() > 9 ? myDate.getDate().toString() : '0' + myDate.getDate();
    var hours = myDate.getHours() > 9 ? myDate.getHours().toString() : '0' + myDate.getHours();
    var minutes = myDate.getMinutes() > 9 ? myDate.getMinutes().toString() : '0' + myDate.getMinutes();
    // var seconds = myDate.getSeconds() > 9 ? myDate.getSeconds().toString() : '0' + myDate.getSeconds();
    document.querySelector('.showTime').innerHTML = year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes;

    t = setTimeout(time, 1000) //设定定时器，循环运行
}
