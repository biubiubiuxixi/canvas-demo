let mouse = {
    x: undefined,
    y: undefined,
}

// 鼠标监听事件，获取鼠标移动的相应坐标
window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    console.log(mouse);
});

/* 创建画布 */
let canvas = document.querySelector('#canvas');
//宽高自适应
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 获取2d画布
let ctx = canvas.getContext('2d');

//圆的数组
let circleArray = [];
// 填充颜色
let colorArray = [
    '#ffffcc',
    '#ccffff',
    '#ffcccc',
    '#99cccc',
    '#cc9999',
    '#ffffcc',
    '#cccc99',
    '#ffff99',
    '#ccccff',
];
// 封装圆的制造过程
function init(){
    //循环制造不同的圆，存进数组
    for(let i=0;i<400;i++){
        let x = Math.random()*innerWidth;// 横坐标
        let y = Math.random()*innerHeight;// 纵坐标
        let r = Math.random()*3+1; // 半径
        let dx = Math.random()*1; // 横向平移距离
        let dy = Math.random()*1; // 纵向平移距离
        circleArray.push(new Circle(x,y,r,dx,dy));
    }
}

// 创建一个Circle对象
function Circle(x,y,r,dx,dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.minR =r;
    this.bg = colorArray[Math.floor(Math.random()*colorArray.length)];

    // 绘制圆
    this.draw = function() {
        /* 绘制样式 */
        ctx.fillStyle = this.bg; // 填充属性
        ctx.strokeStyle = 'black'; // 描边属性
        ctx.lineWidth = 1; // 线条属性

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.fill();
    }
    // 更新圆的位置
    this.update = function() {
        // 改变圆的位子
        this.x+=this.dx;
        this.y+=this.dy;    
        // 当触及边界时
        if(this.x+this.r>innerWidth || this.x-this.r<0) {
            this.dx=-this.dx;
        }
        if(this.y+this.r>innerHeight || this.y-this.r<0) {
            this.dy=-this.dy;
        }

        // 借助鼠标监听事件，鼠标坐标与圆50px以内时，圆会增大，否则减小
        if((mouse.x-this.x<50)&&(mouse.x-this.x>-50)&&(mouse.y-this.y<50)&&(mouse.y-this.y>-50)){
            // 防止圆无限增大
            if(this.r<40){
                this.r+=1;                
            }
        } else {
            //防止出现负数
            if(this.r>this.minR){
                this.r-=1;
            }
        }

        // 每一次更新都要重新在一个新的地方绘制圆
        this.draw();
    }
}

// 制造圆
init();
// 这个函数会在控制台无限输出"canvas"
function animate() {
    requestAnimationFrame(animate);
    // 橡皮擦函数 clearRect(x坐标,y坐标,宽度,高度)
    ctx.clearRect(0,0,innerWidth,innerHeight);
    // 循环刷新每个圆
    for(let i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}
animate();
