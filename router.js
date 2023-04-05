import express, { request } from "express";
import { login, register } from "./controller/UserController.js";
import passport from "passport";
import { isAuthenticated } from "./passportConfig.js";

const router = express.Router();

// views

router.get("/", (_, response) => {
  response.render("index");
});
router.get("/register", (_, response) => {
  response.render("register");
});
router.get("/login", (_, response) => {
  response.render("login");
});

// to authenticated users only.
router.get("/profile", isAuthenticated, (request, response) => {
  response.send(request.user);
});


router.get("/logout", function (request, response, next) {
  request.logout(function (error) {
    if (error) {
      return next(error);
    }
    response.redirect("/");
  });
});

router.post("/api/register", register);


router.post(
  "/api/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successMessage: "done",
    successMessage: "success",
    successRedirect: "/",
  })
);

export default router;
