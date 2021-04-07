export default {
    props: {
        data: {
            // 列表数据
            type: Array,
            default: () => {
                /**
                 * 数组项规范：
                 * { anymore }
                 */
                return []
            }
        }
    },
    computed: {
        // 数据总数
        dataTotal() {
            return this.data.length
        }
    }
}