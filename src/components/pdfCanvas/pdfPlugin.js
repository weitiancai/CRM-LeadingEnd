import pdfjsLib from 'pdfjs-dist'

const pdfPlugin = (function () {
    "use strict";

    const DEFAULT_SCALE = 1;
    const DEFAULT_PAGE = 1;
    const CMAP_URL = '../../../static/cmaps/';
    const CMAP_PACKED = true;

    function PRO() {
    }

    // PDF代理对象，用于操作PDF渲染显示
    let localPDFDocumentProxy = null;
    // PDF页面缩放大小
    let scale = DEFAULT_SCALE,
        // 当前渲染的PDF所处页
        currentPage = DEFAULT_PAGE;
    // Prepare canvas using PDF page dimensions
    let canvas, context;
    // 离线Canvas屏幕
    let offscreenCanvas, offscreenContext;

    // 判断页面渲染处理是否完成
    let isProcessFinish = false;

    /**
     * 设置本地PDF代理对象
     * @param pdf
     */
    function setLocalPDFDocumentProxy(pdf) {
        if (pdf) {
            localPDFDocumentProxy = pdf;
        }
    }

    /**
     * 为Canvas重新设置尺寸
     * @param viewport 待渲染PDF页面信息
     */
    function resizeCanvas(viewport) {
        if (!canvas)
            throw "请初始化Canvas";

        if (!offscreenCanvas) {
            offscreenCanvas = document.createElement('canvas');
            offscreenContext = offscreenCanvas.getContext('2d');
        }
        // console.log(canvas.width, canvas.height);
        // 设置可见Canvas屏幕大小
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // console.log(viewport.width, viewport.height);

        // 设置离屏Canvas大小
        offscreenCanvas.height = viewport.height;
        offscreenCanvas.width = viewport.width;
    }


    /**
     * 从离屏Canvas渲染到可见Canvas
     */
    function renderToCanvas() {
        if (!canvas)
            throw "必须初始化显示用Canvas";
        if (!offscreenCanvas)
            throw "必须初始化offscreenCanvas";
        if (!isProcessFinish)
            throw "页面渲染未完成";

        context.drawImage(offscreenCanvas, 0, 0
            , offscreenCanvas.width, offscreenCanvas.height
            , 0, 0, canvas.width, canvas.height
        );
    }


    /**
     * 渲染PDF页面到Canvas
     *
     * @param pageNumber 需要渲染的页码
     * @param callback 渲染完成后回调函数
     */
    function render(pageNumber, callback) {

        isProcessFinish = false;
        if (!localPDFDocumentProxy)
            throw "必须初始化localPDFDocumentProxy对象";

        localPDFDocumentProxy.getPage(pageNumber).then(function (page) {

            // 按照比例缩放 获取页面内容
            const viewport = page.getViewport(scale);

            // 重设Canvas尺寸
            resizeCanvas(viewport);

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: offscreenContext,
                viewport: viewport
            };
            const renderTask = page.render(renderContext);
            renderTask.then(function () {
                isProcessFinish = true;
                // 渲染完成后，将离屏canvas内容渲染到可见canvas
                renderToCanvas();
                // 完成后回调函数
                callback && callback();
            });
        });
    }

    /**
     * 使用PDF文件的Base64字符串初始化PDF对象，调用此方法之前应该先调用initPDFPlugin
     * @param data
     * @param callBack
     * @author Cliven
     * @since 2018-7-24 12:52:13
     */
    PRO.prototype.initPDFJSByBase64 = function (data, callBack) {
        //重置页面
        scale = DEFAULT_SCALE;
        currentPage = DEFAULT_PAGE;
        isProcessFinish = false;
        // 解码Base64字符串，还原PDF文件
        const pdfData = atob(data);
        //  Using DocumentInitParameters object to load binary data.
        pdfjsLib.getDocument({
            data: pdfData,
            cMapUrl: CMAP_URL,
            cMapPacked: CMAP_PACKED
        }).promise.then(function (pdf) {
            // 设置本地PDF代理对象
            setLocalPDFDocumentProxy(pdf);
            // console.log('PDF loaded');
            render(currentPage, callBack);
            // callBack && callBack();
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });
    };
    /**
     * 加载文件并且初始化PDFJS,调用此方法之前应该先调用initPDFPlugin
     * @param file 文件对象
     * @param callBack 回调函数
     */
    PRO.prototype.initPDFJS = function (file, callBack) {


        scale = DEFAULT_SCALE;
        currentPage = DEFAULT_PAGE;
        isProcessFinish = false;

        //Step 2: Read the file using file render
        const fileReader = new FileReader();
        //Step 3:Read the file as ArrayBuffer
        fileReader.readAsArrayBuffer(file);

        // 文件读取完成之后
        fileReader.onload = function () {

            //Step 4:turn array buffer into typed array
            const typedarray = new Uint8Array(this.result);

            //Step 5:PDFJS should be able to read this
            pdfjsLib.getDocument({
                data: typedarray,
                cMapUrl: CMAP_URL,
                cMapPacked: CMAP_PACKED
            }).promise.then(function (pdf) {

                // 设置本地PDF代理对象
                setLocalPDFDocumentProxy(pdf);
                console.log('PDF loaded');

                callBack && callBack();
                render(currentPage, renderToCanvas);
            }, function (reason) {
                // PDF loading error
                console.error(reason);
            });
        };
    };
    /**
     * 初始化绘制组件
     * @param srcCanvas 绘制用Canvas
     */
    PRO.prototype.initPDFPlugin = function (srcCanvas) {
        canvas = srcCanvas;
        context = canvas.getContext('2d');
        if (!offscreenCanvas) {
            // The workerSrc property shall be specified.
            // pdfjsLib.GlobalWorkerOptions.workerSrc = '../../../node_modules/pdfjs-dist/build/pdf.worker.js';

            offscreenCanvas = document.createElement('canvas');
            offscreenContext = offscreenCanvas.getContext('2d');
        }
    };

    /**
     * 获取当前浏览页码
     * @returns number
     */
    PRO.prototype.getCurrentPage = function () {
        if (!localPDFDocumentProxy)
            throw "必须请先初始化PDFJS";
        return currentPage;
    };

    /**
     * 获取当前页码缩放比例
     * @returns {*}
     */
    PRO.prototype.getScale = function () {
        if (!localPDFDocumentProxy)
            throw "必须请先初始化PDFJS";
        return scale;
    };

    /**
     * 设置文档缩放倍数
     * @param scaleNumber
     */
    PRO.prototype.setScale = function (scaleNumber, callback) {
        scaleNumber = scaleNumber && parseFloat(scaleNumber);
        scale = scaleNumber;
        render(currentPage, callback);
    };

    /**
     * 获取PDF文档总页码数
     */
    PRO.prototype.getPageTotal = function () {
        if (!localPDFDocumentProxy)
            throw "必须请先初始化PDFJS";
        return localPDFDocumentProxy.numPages;
    };

    /**
     * 翻页
     * @param pageNumber
     */
    PRO.prototype.pageTo = function (pageNumber) {
        pageNumber = pageNumber && parseInt(pageNumber);

        if (!localPDFDocumentProxy)
            throw "必须请先初始化PDFJS";

        if (pageNumber >= 1 && pageNumber <= localPDFDocumentProxy.numPages) {

            currentPage = pageNumber;
            render(pageNumber, renderToCanvas);
        } else {
            console.error("页码非法");
        }
    };

    /**
     * 下一页
     * @returns {*}
     */
    PRO.prototype.next = function () {
        if (!localPDFDocumentProxy)
            throw "必须请先初始化PDFJS";

        if (localPDFDocumentProxy.numPages >= (currentPage + 1))
            currentPage++;
        else
            console.warn("已经是最后一页");

        render(currentPage, renderToCanvas);

        return currentPage;
    };

    /**
     * 前一页
     * @returns {*}
     */
    PRO.prototype.previous = function () {
        if (!localPDFDocumentProxy)
            throw "必须请先初始化PDFJS";

        if ((currentPage - 1) >= 1)
            currentPage--;
        else
            console.warn("已经是第一页");

        render(currentPage, renderToCanvas);

        return currentPage;
    };

    /**
     * 重新渲染页面
     */
    PRO.prototype.reDraw = function () {
        renderToCanvas();
    };

    /**
     * 获取当前canvas对象
     * @return {*}
     */
    PRO.prototype.getCanvas = function() {
        return canvas;
    };

    return new PRO();
})();

export default pdfPlugin;
