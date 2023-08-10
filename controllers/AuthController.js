const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      req.flash("message", "Senhas não coincidentes. Tente novamente.");
      res.render("auth/register");
      return;
    }

    const checkIfExists = await User.findOne({ where: { email: email } }); //column email and body email

    if (checkIfExists) {
      req.flash("message", "Esse email já existe. Tente novamente.");
      res.render("auth/register");
      return;
    }

    // create password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = { name, email, password: hashedPassword };

    try {
      const createdUser = await User.create(user);

      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Usuário não encontrado");
      res.render("auth/login");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha inválida");
      res.render("auth/login");
      return;
    }

    req.session.userid = user.id;

    req.flash("message", "Login realizado com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  }
};
