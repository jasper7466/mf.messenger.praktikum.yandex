import { Router } from './modules/Router';
import { LoginPage } from './pages/login/index';
import { ChatMainPage } from './pages/chat-main/index';
import { ChatSelectPage } from './pages/chat-select/index';
import { Error404Page } from './pages/error-404/index';
import { Error500Page } from './pages/error-500/index';
import { ProfilePage } from './pages/profile/index';
import { ProfileDataPage } from './pages/profile-data/index';
import { ProfilePasswordPage } from './pages/profile-password/index';
import { SignupPage } from './pages/signup/index';
import { data as loginContext } from './pages/login/index.tmpl';
import { data as chatMainContext } from './pages/chat-main/index.tmpl';
import { data as chatSelectContext } from './pages/chat-select/index.tmpl';
import { data as error404Context } from './pages/error-404/index.tmpl';
import { data as error500Context } from './pages/error-500/index.tmpl';
import { data as profileContext } from './pages/profile/index.tmpl';
import { data as profileDataContext } from './pages/profile-data/index.tmpl';
import { data as profilePasswordContext } from './pages/profile-password/index.tmpl';
import { data as signupContext } from './pages/signup/index.tmpl';

const router = new Router('.application');

export enum Routes {
    login = 'login',
    chatMain = 'chat-main',
    chatSelect = 'chat-select',
    error404 = 'error-404',
    error500 = 'error-500',
    profile = 'profile',
    profileData = 'profile-data',
    profilePassword = 'profile-password',
    signup = 'signup'
}

router
    .use(Routes.login, LoginPage, loginContext)
    .use(Routes.chatMain, ChatMainPage, chatMainContext)
    .use(Routes.chatSelect, ChatSelectPage, chatSelectContext)
    .use(Routes.error404, Error404Page, error404Context)
    .use(Routes.error500, Error500Page, error500Context)
    .use(Routes.profile, ProfilePage, profileContext)
    .use(Routes.profileData, ProfileDataPage, profileDataContext)
    .use(Routes.profilePassword, ProfilePasswordPage, profilePasswordContext)
    .use(Routes.signup, SignupPage, signupContext)
    .start();

router.go(Routes.profileData);