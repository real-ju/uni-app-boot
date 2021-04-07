// 对框架内常用方法的二次封装

export default {
    methods: {
        /**
         * 确认对话框
         * @param {*} content 提示文字
         * @param {*} onOk 点击确定后的回调
         */
        $ask(content, onOk) {
            return this.$confirm({
                title: '提示',
                content,
                onOk,
                okText: '确定',
                cancelText: '取消'
            })
        }
    },
    filters: {
        notEmpty(value) {
            return value ? value : '-'
        }
    }
}