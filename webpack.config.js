var webpack = require('webpack');

module.exports = [
    {
        entry: './src/index.tsx',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            /*alias: {
                'react': 'nervjs',
                'react-dom': 'nervjs',
                // Not necessary unless you consume a module using `createClass`
                'create-react-class': "nerv-create-class"
            }*/
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            /*new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),*/
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'awesome-typescript-loader'
                    }
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        output: {
            filename: "bundle.js",
            path: __dirname + '/functions'
        },
        devtool: "source-map"
    },

    {
        entry: './serviceWorker/sw.js',
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin()
            /*new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),*/
        ],
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
                {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
                {test: /\.css$/, loader: 'css-loader', exclude: /node_modules/}
            ]
        },
        output: {
            filename: "sw.js",
            path: __dirname + '/public'
        },
        devtool: "source-map"
    }
];