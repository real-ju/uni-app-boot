/**
 * 异步导入页面级组件
 * @param {String} url 相对于views文件夹的路径
 */
function asyncViewImport(url) {
    return () => import('@/views/' + url);
}

export {
    asyncViewImport
}
