
//登录
interface Ilogin {
    username: string
    password: string
    code: string
    uuid: string
}

//表单双向绑定
interface LoginRuleForm {
    username: string
    password: string
    code: string
    uuid: string
}

export {
    Ilogin,
    LoginRuleForm
}