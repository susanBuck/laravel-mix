class MockEntryPlugin {
    /**
     * Handle the deletion of the temporary mix.js
     * output file that was generated by webpack.
     *
     * This file is created when the user hasn't
     * requested any JavaScript compilation, but
     * webpack still requires an entry.
     *
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.plugin('done', stats => {
            let temporaryOutputFile = stats.toJson()
                .assets
                .find(asset => asset.name.includes('mix.js'));

            if (temporaryOutputFile) {
                delete stats.compilation.assets[temporaryOutputFile.name];

                File.find(
                    path.resolve(Config.publicPath, temporaryOutputFile.name)
                ).delete();
            }
        });
    }
}

module.exports = MockEntryPlugin;
