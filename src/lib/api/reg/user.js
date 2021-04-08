import Api from '../source/Api';

export default {
  login: new Api({
    url: 'login',
    public: true
  })
};
