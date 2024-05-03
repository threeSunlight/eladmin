<template>
    <div class="login">
      <div class="input">
        <h3>ELADMIN 后台管理系统</h3>
  
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" :prefix-icon="Avatar" placeholder="账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              show-password
              :prefix-icon="Lock"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex; width: 100%">
              <el-input
                v-model="ruleForm.code"
                :prefix-icon="CircleCheckFilled"
                placeholder="验证码"
                @keyup.enter="submitForm(ruleFormRef)"
              />
              &ensp;
              <div @click="getImage">
                <el-image  style="width: 100px; height: 40px; cursor: pointer;" :src="codeurl" fit="contain" />
              </div>
              
              <!-- <img :src="codeurl" alt="" style="width: 100px" /> -->
            </div>
          </el-form-item>
  
          <p><el-checkbox v-model="checked" size="large" /> &ensp; 记住我</p>
  
          <el-form-item>
            <el-button
              style="width: 100%; height: 40px; margin-top: 10px"
              type="primary"
              @click="submitForm(ruleFormRef)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus'
  //引入图标
  import { Avatar, Lock, CircleCheckFilled } from '@element-plus/icons-vue'
  //引入路由
  import { useRouter } from 'vue-router'
  //密码加密
  import { encrypt } from '@/utils/rsaEncrypt'
  //引入接口
  import { loginCode, login } from '@/api/api'
  //引入cookie
  import { setToken } from '@/utils/auth'
  /**引入ts */
import type { LoginRuleForm } from '@/api/type'
  //获取验证码图片
  let codeurl = ref('')
  
  const router = useRouter()
 
  const ruleForm = reactive<LoginRuleForm>({
    username: 'admin',
    password: '123455',
    code: '',
    uuid: ''
  })
  //表单校验
  const rules = reactive<FormRules<LoginRuleForm>>({
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  })
  
  //登录
  const ruleFormRef = ref<FormInstance>()
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        //调用登录接口
        login({
          code: ruleForm.code,
          password: encrypt(ruleForm.password) as string,
          username: ruleForm.username,
          uuid: ruleForm.uuid
        }).then((res) => {
          console.log(res)
          //登录成功，保存token
          // setToken()
          //跳转页面，关闭当前页面
          // //跳转页面，关闭当前页面
          // router.replace('/')
        })
      }
    })
  }
  //复选框
  let checked = ref(false)
  

  const getcode = async () => {
    let result = await  loginCode()
    codeurl.value = result.img
    ruleForm.uuid = result.uuid
  }
  getcode()

  const getImage= () => {
    console.log('我被点击了');
    getcode()
  }
  </script>
  
  <style lang="scss" scoped>
  .login {
    width: 100vw;
    height: 100vh;
    background-image: url('https://eladmin.vip/demo/static/img/background.4a692a58.jpeg');
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .input {
      width: 385px;
      padding: 20px;
      box-sizing: border-box;
      background-color: #fff;
      h3 {
        text-align: center;
        color: #707070;
        margin-bottom: 20px;
      }
      p {
        display: flex;
        align-items: center;
        color: #606266;
      }
    }
  }
  </style>
  