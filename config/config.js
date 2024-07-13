import { defaultConfig } from 'umi';
import { defaultSettings } from './defaultSettings';
import webpackPlugin from './plugin.config'

const { primaryColor } = defaultSettings;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

export default defaultConfig({
    model: {},
    antd: {},
    dva: {},
    chunks: ['commons', 'misc', 'umi'],
    //国际化
    locale: {
        // default zh-CN
        default: 'zh-CN',
        antd: true,
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
    },
    fastRefresh: true,
    //路由模式
    history: {
        type: 'hash',
    },
    // webpack的publickpath 资源被引用根路径
    publicPath: './',
    hash: true,
    targets: {
        ie: 11,
    },
    devtool: isAntDesignProPreview ? 'source-map' : false,
    theme: {
        'primary-color': primaryColor,
    },
    define: {
        ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
            ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    },
    ignoreMomentLocale: true,
    lessLoader: {
        javascriptEnabled: true,
    },
    cssLoader: {
        modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            getLocalIdent: (context, _, localName) => {
                if (
                    context.resourcePath.includes('node_modules') ||
                    context.resourcePath.includes('ant.design.pro.less') ||
                    context.resourcePath.includes('global.less')
                ) {
                    return localName;
                }

                const match = context.resourcePath.match(/src(.*)/);

                if (match && match[1]) {
                    const antdProPath = match[1].replace('.less', '');
                    const arr = slash(antdProPath)
                        .split('/')
                        .map((a) => a.replace(/([A-Z])/g, '-$1'))
                        .map((a) => a.toLowerCase());
                    return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
                }

                return localName;
            },
        },
    },
    manifest: {
        basePath: '/',
    },
    chainWebpack:webpackPlugin,

});
