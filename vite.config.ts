import { fileURLToPath, URL } from 'node:url'
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
// elemtnuiplus所需要的插件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//@ts-ignore
const env = loadEnv(process.env.NODE_ENV, process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  // 项目的根目录访问路径
  // base: "/",
  /**修改打包跟目录路径 */
  build: {
    /**打包输出文件夹 */
    outDir: 'dist',
    /**打包输出的静态资源文件夹 */
    assetsDir: "assets"
  },
  // 配置跨域和端口代理服务
  server:{
    //  如果多台电脑处在同一个局域网下,配置0.0.0.0后,别的电脑通过当前电脑ip://端口号,可以直接访问当前电脑上运行的项目
    host: "0.0.0.0",
    // 端口号
    port: 9999,
    // 当前端口号被占用的时候,直接退出服务,不用新增端口
    strictPort: true,
    /**配置跨域服务 */
    proxy: {
      /**代理标识 */
      [env.VITE_APP_BASE_API]: {
        /**代理路径 */
        target: env.VITE_APP_BASE_URL,
        /**是否开启跨域地理 */
        changeOrigin: true,
        /**路径重写 */
        // rewrite: (path) => path.replace(/^\/env.VITE_APP_BASE_API/, ''),
        rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
			//安装两行后你会发现在组件中不用再导入ref，reactive等
			imports: ['vue', 'vue-router'],
            //存放的位置
			dts: "src/auto-import.d.ts",
      // elementui-plus自动导入的需求
      resolvers: [ElementPlusResolver()],
		}),
    Components({
       // elementui-plus自动导入的需求
      resolvers: [ElementPlusResolver()],
    }),
  ],
  /**配置路径别名 */
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@component": fileURLToPath(new URL('./src/components', import.meta.url)),
    }
  },
  /**还缺一个loader的配置 */
})
