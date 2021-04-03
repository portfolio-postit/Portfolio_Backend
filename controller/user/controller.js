const { User } = require("../../model/user");
const mkToken = require("./mkToken");


const register = async (req, res) => {

    const user = new User(req.body);
    try {
        const findUser = await User.findOne({ email: user.email });
        if (findUser) return res.status(409).end();

        user.password = user.passwordEncoding({ password: user.password })
        await user.save();
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
    res.status(200).end();
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findUser = await User.findOne({ email: email });
        if (!findUser) return res.status(400).end();
        if (!(findUser.comparePassword(password, findUser.password))) return res.status(400).end();
        const accessToken = await mkToken.mkAccess(req, findUser);
        const refreshToken = await mkToken.mkRefresh(req, findUser);

        res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        console.log(err);

        res.status(400).end();
    }
};

const refresh = async (req, res, next) => {
    const user = await User.findOne(req.email);
    const accessToken = await mkToken.mkAccess(req, user);
    res.status(200).json({ accessToken });
};

const check = async (req, res, next) => {
    const user = await User.findOne(req.email);
    res.status(200).json({ email: user.email });
};

const token = async (req, res, next) => {
    res.status(200).end();

}

module.exports = {
    register,
    login,
    refresh,
    check,
    token,
}
