import { Router } from '../modules/Router.js';
import { LoginPage } from "./login/index.js";
import { ChatMainPage } from "./chat-main/index.js";
import { ChatSelectPage } from "./chat-select/index.js";
import { Error404Page } from "./error-404/index.js";
import { Error500Page } from "./error-500/index.js";
import { ProfilePage } from "./profile/index.js";
import { ProfileDataPage } from "./profile-data/index.js";
import { ProfilePasswordPage } from "./profile-password/index.js";
import { SignupPage } from "./signup/index.js";

const router = new Router('.application');

router
    .use('login', LoginPage)
    .use('chat-main', ChatMainPage)
    .use('chat-select', ChatSelectPage)
    .use('error-404', Error404Page)
    .use('error-500', Error500Page)
    .use('profile', ProfilePage)
    .use('profile-data', ProfileDataPage)
    .use('profile-password', ProfilePasswordPage)
    .use('signup', SignupPage)
    .start();

router.go('signup');