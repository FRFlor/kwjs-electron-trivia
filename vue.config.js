module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                mac: {
                    icon: "public/question.png",
                },
                win: {
                    icon: "public/question.png",
                    target: "portable",
                },
            },
        },
    },
};
