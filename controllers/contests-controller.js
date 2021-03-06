const axios = require("axios");
require("dotenv").config();

function setCache(response) {
    response.set("Cache-Control", "public, max-age=300, s-maxage=600");
}

exports.getGitReposByLocation = async (req, res) => {
    setCache(res);
    await axios.all([axios({
            method: "get",
            url: `https://api.github.com/search/users?q=location:${req.params.location}`,
            headers: {
                Authorization: `token ${process.env.TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
            },
        }), axios({
            method: "get",
            url: `https://api.github.com/search/users?q=type:org location:${req.params.location}`,
            headers: {
                Authorization: `token ${process.env.TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
            },
        })])
        .then((responseArr) => {
            let listOfFetches = [];
            responseArr.forEach((userData) => {
                userData.data.items.forEach((element) => {
                    listOfFetches.push(
                        axios({
                            method: "get",
                            url: `https://api.github.com/users/${element.login}/repos`,
                            headers: {
                                Authorization: `token ${process.env.TOKEN}`,
                                "Content-Type": "application/json",
                                Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
                            },
                        })
                    );
                });
            })
            axios.all(listOfFetches).then((responseArr) => {
                let responseArrFinal = [];
                responseArr.forEach((element) => {
                    responseArrFinal = responseArrFinal.concat(element.data.filter((repo) => {
                        return repo.license != null && repo.license.key == 'apache-2.0'
                    }));
                });
                res.send(responseArrFinal);
            });
        })
        .catch((err) => {
            res.json({
                message: `There was an error: ${err}`,
            });
        });
};


exports.getContributorsByRepo = async (req, res) => {
    setCache(res);
    await axios({
            method: "get",
            url: `https://api.github.com/repos/${req.params.user}/${req.params.repo}/contributors`,
            headers: {
                Authorization: `token ${process.env.TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
            },
        })
        .then((userData) => {
            res.send(userData.data)
        })
        .catch((err) => {
            res.json({
                message: `There was an error: ${err}`,
            });
        });
};
