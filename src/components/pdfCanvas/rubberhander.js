const rubberhander = (function () {
    let canvas
        , context
        , mousedown = {}    // 鼠标点击时坐标
        , rubberhandRectangle = {} // 截取绘制框对象
        , dragging = false  // 拖拽状态
        , rectangleAreaImg // 截取框内区域绘制图片
        , workingMode;      // 截取框工作模式，等比例/任意

    const ALPHA = 0.35
        , FILL_COLOR = '#000'    // 拖拽框透明度
        , FREE_MODE = 'FREE'     // 自由模式拖拽框
        , PRO_MODE = 'PRO';      // 按照图片比例模式等比例拖拽框

    // Functions......................................................................

    function PRO() {
    }

    PRO.prototype.FREE_MODE = FREE_MODE;
    PRO.prototype.PRO_MODE = PRO_MODE;

    /**
     * window窗口坐标转换canvas内部坐标
     * @param canvas
     * @param x
     * @param y
     */
    function windowToCanvas(canvas, x, y) {
        const canvasRectangle = canvas.getBoundingClientRect();
        return {
            x: (x - canvasRectangle.left) * (canvas.width / canvasRectangle.width)
            , y: (y - canvasRectangle.top) * (canvas.height / canvasRectangle.height)
        };
    }

    /***
     * 默认截取区域填充
     */
    function defaultAreaFill() {
        context.save(); //保存状态

        context.globalAlpha = ALPHA;  // 设置透明度
        context.fillStyle = FILL_COLOR;
        // 填充矩形区域
        context.fillRect(
            rubberhandRectangle.left, rubberhandRectangle.top,
            rubberhandRectangle.width, rubberhandRectangle.height);
        context.restore();   //恢复画布状态

    }

    /***
     * 绘制截取框
     */
    function drawRubberband() {

        // 如果没有填充图片，则默认填充半透明黑块
        if (!rectangleAreaImg)
            defaultAreaFill();
        else {
            // 有填充图片则直接填充
            context.drawImage(rectangleAreaImg,
                rubberhandRectangle.left, rubberhandRectangle.top,
                rubberhandRectangle.width, rubberhandRectangle.height)
        }

        // 绘制外边框
        context.strokeRect(
            rubberhandRectangle.left + context.lineWidth
            , rubberhandRectangle.top + context.lineWidth
            , rubberhandRectangle.width - 2 * context.lineWidth
            , rubberhandRectangle.height - 2 * context.lineWidth
        );
    }

    /**
     * 设置截取矩形信息
     * @param x
     * @param y
     */
    function setRubberhandRectangle(x, y) {

        const loc = {};
        loc.left = Math.min(x, mousedown.x);
        loc.top = Math.min(y, mousedown.y);
        loc.width = Math.abs(x - mousedown.x);
        loc.height = Math.abs(y - mousedown.y);

        // 如果其中有一边没有长度直接长宽设置为0
        if (loc.width === 0 || loc.height === 0) {
            loc.width = loc.height = 0;
            rubberhandRectangle = loc;
            return;
        }


        const x0 = mousedown.x
            , y0 = mousedown.y;

        // 如果有填充图片则计算图片且使用等比例模式， 计算框的长宽
        if (rectangleAreaImg && workingMode === PRO_MODE) {
            // 计算宽高比
            const img_pro = rectangleAreaImg.height / rectangleAreaImg.width
                , area_pro = loc.height / loc.width;

            // H/W * alpha = PRO_H/PRO_W
            const alpha = img_pro / area_pro;

            // 截取框宽高
            let w, h;
            if (area_pro > img_pro) {
                h = loc.height * alpha;
                w = loc.width;
            } else if (area_pro < img_pro) {
                h = loc.height;
                w = loc.width / alpha;
            } else {
                h = loc.height;
                w = loc.width;
            }

            // 截取框左上角坐标
            let topX, topY;
            // 计算原点坐标
            if (x0 < x && y0 < y) {
                // 第一象限
                topX = x0;
                topY = y0;
            } else if (x0 > x && y0 < y) {
                // 第二象限
                topX = x0 - w;
                topY = y0;
            } else if (x0 > x && y0 > y) {
                // 第三象限
                topX = x0 - w;
                topY = y0 - h;
            } else if (x0 < x && y0 > y) {
                // 第四象限
                topX = x0;
                topY = y0 - h;

                console.log(h);
            } else {
                topX = loc.left;
                topY = loc.top;
            }

            rubberhandRectangle.left = topX;
            rubberhandRectangle.top = topY;
            rubberhandRectangle.width = w;
            rubberhandRectangle.height = h;

        } else {
            // 自由模式截取框设置
            rubberhandRectangle = loc;
        }
    }

    /**
     * 截取框拖动
     * @param x
     * @param y
     */
    function rubberhandStretch(x, y) {

        // 重置rubberhandRectangle参数
        setRubberhandRectangle(x, y);

        // 绘制拖拽框
        if (rubberhandRectangle.width > 2 * context.lineWidth &&
            rubberhandRectangle.height > 2 * context.lineWidth) {
            drawRubberband();
        }
    }


    /**
     * 拖拽开始初始化拖拽框
     * @param x
     * @param y
     */
    function rubberhandStart(x, y) {
        mousedown.x = x;
        mousedown.y = y;

        rubberhandRectangle.left = x;
        rubberhandRectangle.top = y;

        dragging = true;
    }

    /**
     * 拖拽结束
     */
    function rubberhandEnd() {
        dragging = false;
    }

    /**
     * 擦除整个canvas
     */
    function cl() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * 重置背景
     */
    function restBG() {
        cl();
        drawBackground();
    }

    /**
     * 绘制背景
     */
    function drawBackground() {

    }

    // Event handlers.................................................................

    /**
     * canvas上的鼠标点击事件
     * @param e
     */
    function onmousedownBind(e) {

        // 重置背景，清除上一次绘制框内容
        restBG();

        // 获取Canvas上的坐标
        const loc = windowToCanvas(canvas, e.clientX, e.clientY);
        e.preventDefault();
        // 初始化rubberhandRectangle参数
        rubberhandStart(loc.x, loc.y);
    }

    /**
     * 鼠标移动事件
     * @param e
     */
    function onmousemoveBind(e) {

        if (dragging) {
            // 重置背景
            restBG();
            // 获取Canvas上的坐标
            const loc = windowToCanvas(canvas, e.clientX, e.clientY);
            // 设置坐标并且重新绘制拖拽框
            rubberhandStretch(loc.x, loc.y);
        }
    }

    /**
     * 鼠标松开
     * @param e
     */
    function onmouseupBind(e) {
        rubberhandEnd();

        // 绘制完成之后回调
        handReactangleFinishCallback();
    }


    /**
     * 截取框绘制完成之后回调函数
     */
    function handReactangleFinishCallback() {

        // No doing thing...
    }


    // Initialization..................................................................
    /**
     * 初始化截取框
     * @param targetCanvas 目标Canvas
     * @param background 绘制背景函数
     * @param mode 工作模式
     * @param areaImage 拖拽框区域显示的图片，要求已经加载了的图片
     */
    PRO.prototype.init = function (targetCanvas, background, mode, areaImage) {
        canvas = targetCanvas;
        context = canvas.getContext("2d");

        mousedown = {};    // 鼠标点击时坐标
        rubberhandRectangle = {};// 截取绘制框对象
        dragging = false;  // 拖拽状态

        context.strokeStyle = "navy";
        context.lineWidth = 1;

        // 设置绘制模式，默认采用自由模式
        if (mode && mode === PRO_MODE && areaImage)
            workingMode = PRO_MODE;
        else
            workingMode = FREE_MODE;

        rectangleAreaImg = areaImage || undefined;

        // 鼠标事件绑定
        canvas.onmousemove = onmousemoveBind;
        canvas.onmousedown = onmousedownBind;
        canvas.onmouseup = onmouseupBind;

        // 设置背景绘制函数
        setBackground(background);
    };

    /**
     * 设置背景绘制函数
     * @param background
     */
    function setBackground(background) {

        if (!background)
            return;
        if (background || typeof 'function') {
            drawBackground = background;
        } else
            throw "background 必须是一个函数";
    }

    /**
     * 获取截取框属性
     * @returns {{x: *, y: *, width: (number|*), height: (number|*)}}
     */
    PRO.prototype.getBox = function () {
        return {
            x: rubberhandRectangle.left || 0
            , y: rubberhandRectangle.top || 0
            , width: rubberhandRectangle.width || 0
            , height: rubberhandRectangle.height || 0
        };
    };

    /**
     * 设置新的背景绘制函数
     * @param background 背景绘制函数
     */
    PRO.prototype.setBackground = setBackground;
    /**
     * 重设置截取区域填充图片
     * @param img 图片对象，要求已经加载好
     * @param modeType
     */
    PRO.prototype.resetAreaImg = function (img, modeType) {
        rectangleAreaImg = img;
        if (modeType || modeType === PRO_MODE) {
            workingMode = modeType;
        } else {
            workingMode = FREE_MODE;
        }
    };

    /**
     * 设置截取框绘制完成之后回调函数
     * @param fn 回调函数
     */
    PRO.prototype.setFinishCallback = function (fn) {

        if (!fn || (typeof fn) !== 'function')
            throw "FinishCallback 必须是一个函数";

        handReactangleFinishCallback = fn;
    };

    return new PRO();
})();

export default rubberhander;
