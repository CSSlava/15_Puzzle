const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        // path: 'dist',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ["absolute/path/a", "absolute/path/b"]
                        }
                    }
                ]
            }
        ]
    }
};


// module.exports = {
//     entry: './src/index.js',
//     output: {
//         filename: './app.bundle.js'
//     },
//     module: {
//         rules: [
//             {test: '/src/.css$/', use: ['style-loader', 'css-loader']}
//         ]
//     }
// }