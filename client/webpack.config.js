module.exports = {
    resolve: {
        fallback: {
            process: require.resolve("process/browser"),
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify")
        }
    }
};