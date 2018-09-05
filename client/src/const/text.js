const language = localStorage.getItem('language') || 'en';
let text = {};
if (language === 'en') {
  text = {
    or: 'or',
    cancel: 'Cancel',
    hello: 'Hello',
    login: 'Login',
    logout: 'logout',
    confirmLogout: 'Are you sure to logout?',
    register: 'register',
    username: 'username',
    password: 'password',
    confirmPassword: 'confirm password',
    registerNow: 'register now',
    helloDoctor: 'Hello, Doctor!',
    viewMedHistory: 'View Med History',
    managesMedicine: 'Manages Medicine',
    currentMeds: 'Current Medicines',
    yourMeds: 'Your Medicines',
    addNew: 'Add New',
    addNewMed: 'Add New Medicine',
    reportTime: 'Report Time',
    reportMedTaken: 'Report Medicine Taken',
    confirmMedTaken: 'Good job! Already reported!'
  };
} else if (language === 'cn') {
  text = {
    or: '或者',
    cancel: '取消',
    hello: '你好',
    login: '登录',
    logout: '登出',
    confirmLogout: '确认登出吗？',
    register: '注册',
    username: '用户名',
    password: '密码',
    confirmPassword: '确认密码',
    registerNow: '现在注册',
    helloDoctor: '你好，医生!',
    viewMedHistory: '药物历史记录',
    managesMedicine: '管理药物',
    currentMeds: '现有药物',
    yourMeds: '你的药物',
    addNew: '新增',
    addNewMed: '新增药物',
    reportTime: '汇报日期',
    reportMedTaken: '汇报药物已服用',
    confirmMedTaken: '感谢您，今天的药物服用已记录'
  };
}

export default text;
