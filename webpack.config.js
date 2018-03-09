module.exports = [
    {
        entry: './src/index.tsx',
        module: {
            /*loaders: [
                {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
                {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
                {test: /\.css$/, loader: 'css-loader', exclude: /node_modules/}
            ]*/
            rules: [
                /*{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },*/
                {
                    test: /\.(t|j)sx?$/,
                    use: {
                        loader: 'awesome-typescript-loader'
                    }
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
                /*{
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }*/
            ]
        },
        output: {
            filename: "bundle.js",
            path: __dirname + '/public'
        },
        devtool: "source-map"
    },

    {
        entry: './serviceWorker/sw.tsx',
        module: {
            /*loaders: [
                {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
                {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
                {test: /\.css$/, loader: 'css-loader', exclude: /node_modules/}
            ]*/
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    use: {
                        loader: 'awesome-typescript-loader'
                    }
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ]
        },
        output: {
            filename: "sw.js",
            path: __dirname + '/public'
        },
        devtool: "source-map"
    }
];