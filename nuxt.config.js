export default {
    ssr: false,
    head: {
        title: 'check',
        meta: [
            { charset: 'utf-8' },
            // { name: 'viewport', content: 'width=device-width, initial-scale=1' },  /// เพิ่มข้างล่าง หน้าจอมันจะไม่ขยายตาม
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: [
        'ant-design-vue/dist/antd.css',
        'toastr/build/toastr.min.css',
        '~/style/style.css'
    ],
    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return [ 'script', 'style', 'font' ].includes(type)
            }
        }
    },
    plugins: [
        '@/plugins/antd-ui',
        '~/plugins/validate.js',
    ],
    components: true,
    buildModules: [
        '@nuxtjs/eslint-module'
    ],
    modules: [ '@nuxtjs/firebase'
    // '@nuxtjs/auth'
    // '@nuxtjs/axios',
    ],
    firebase: {
        config: {
            apiKey: 'AIzaSyCqTKx-xG3SlBhMNibN3xCW7oKrmuhzO6U',
            authDomain: 'check-b9516.firebaseapp.com',
            databaseURL: 'https://check-b9516.firebaseio.com',
            projectId: 'check-b9516',
            storageBucket: 'check-b9516.appspot.com',
            messagingSenderId: '101675041173',
            appId: '1:101675041173:web:f930ca3efe8dff0371b69c',
            measurementId: 'G-JZ145Q2LEB'
        },
        services: {
            auth: true,
            firestore: true
        }
    },

    build: {
    },

    server: {
        port: 3000,
        host: '0.0.0.0'
    }
}
