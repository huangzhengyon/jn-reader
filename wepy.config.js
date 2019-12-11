const path = require('path');
const prod = process.env.NODE_ENV === 'production'

module.exports = {
    wpyExt: '.wpy',
    build: {
        web: {
            htmlTemplate: path.join('src', 'index.template.html'),
            htmlOutput: path.join('web', 'index.html'),
            jsOutput: path.join('web', 'index.js')
        }
    },
    eslint: false,
    compilers: {
        less: {
            compress: false
        },
        sass: {
            outputStyle: 'compressed'
        },
        babel: {
            sourceMap: true,
            presets: [
                'es2015',
                'stage-1'
            ],
            plugins: [
                'transform-decorators-legacy',
                'transform-export-extensions',
                'syntax-export-extensions'
            ]
        }
    },
    plugins: {}
}

if (prod) {
    delete module.exports.compilers.babel.sourcesMap;
    // 压缩sass
    // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

    // 压缩less
    module.exports.compilers['less'] = {compress: true}

    // 压缩js
    module.exports.plugins = {
        'preprocess': {             //加载 wepy-plugin-preprocess
            filter: /config\.js$/,  //条件
            context: {              //preprocess 的context参数
                NODE_ENV: 'production'
            }
        }, // end preprocess
        filemin: {
            filter: /\.(json|wxml|xml)$/
        },
        img2base64: {
            css: true,
            html: true,
            path: './src/assets/img'
        },
        uglifyjs: {
            filter: /\.js$/,
            config: {
                mangle: {
                    except: ['$', 'exports', 'require']
                },
                compress: {warnings: false},
                output: {comments: false}
            }
        },
        imagemin: {
            filter: /\.(jpg|png|jpeg|svg)$/,
            config: {
                jpg: {
                    quality: 80
                },
                png: {
                    quality: 80
                }
            }
        }
    }
}
