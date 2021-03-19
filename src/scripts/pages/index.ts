import { Router } from '../modules/Router';
import { LoginPage } from "./login/index";
import { ChatMainPage } from "./chat-main/index";
import { ChatSelectPage } from "./chat-select/index";
import { Error404Page } from "./error-404/index";
import { Error500Page } from "./error-500/index";
import { ProfilePage } from "./profile/index";
import { ProfileDataPage } from "./profile-data/index";
import { ProfilePasswordPage } from "./profile-password/index";
import { SignupPage } from "./signup/index";

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