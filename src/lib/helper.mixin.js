// 对框架内常用方法的二次封装

export default {
  methods: {},
  filters: {
    notEmpty(value) {
      return value ? value : '-';
    }
  }
};
