// Mockjs 拦截请求配置
export default [
    {
        api: 'api/login',
        tpl: {
            message: 'success'
        }
    },
    {
        api: 'api/employees',
        tpl: {
            total: 20,
            'list|10': [
                {
                    'name|+1': ['白展堂', '佟湘玉', '李秀才', '郭芙蓉'],
                    'sex|+1': ['男', '女', '男', '女'],
                    'power|+1': [90, 20, -1, 50]
                }
            ]
        }
    }
]