/**
 * 一.如何让字符串变成 一个个的字体，让我们去控制
 * 获取字符串内容
 * 清空字符串内容
 * 遍历字符串， 然后一个个的切割出来。
 * 给切割出来的文字添加定位
 * 把添加好定位的文字，重新赋值到获取的 元素里面。
 * 
 * 二.鼠标滑动上去之后， 该怎么去实现 文字的跳动

1 定义一个变量0

2 定义 定时器

3让变量不断的 减少

4改变元素的top == 变量

5当 变量 达到一定高度的时候，让变量不断的 增加

6 当变量 减少到0（本身位置） 的时候，

7清除动画 改变元素的top = 0（本身位置）
 */
let txtAnim = {
    len: 0,
    txtDom: '',
    arrTxt: [],
    init: function(obj) { //获取和清空字符串
        this.obj = obj;
        this.txtDom = obj.innerHTML.replace(/\s+/g, ""); //获取去掉空格后的字符串
        this.len = this.txtDom.length;
        obj.innerHTML = ''; //置空
        this.addDom();
    },
    addDom: function() { //遍历字符串并切割
        for(let i=0;i<this.len;i++){
            let spanDom = document.createElement('span');
            spanDom.innerHTML = this.txtDom.slice(i,i+1);
            this.obj.appendChild(spanDom);
            this.arrTxt.push(spanDom);
        }
        for(let i=0;i<this.len;i++){
            this.arrTxt[i].style.position = 'relative';
        }
        this.start();
    },
    start: function() {
        for(let i=0;i<this.len;i++){
            this.arrTxt[i].onmouseover = function() {
                this.stop = 0;
                this.speed = -1;
                let $this = this;
                this.timer = setInterval(function() {
                    $this.stop += $this.speed;
                    if($this.stop<=-20) {
                        $this.speed =1;
                    }
                    $this.style.top = $this.stop+'px';
                    if($this.stop>=0){
                        clearInterval($this.timer);
                        $this.style.top = 0+'px';
                    }
                },15);
            }
        }
    }
};

let txtDom = document.getElementById('txtDom');
txtAnim.init(txtDom);