import { Router } from '../modules/Router';
import { LoginPage } from './login/index';
import { ChatMainPage } from './chat-main/index';
import { ChatSelectPage } from './chat-select/index';
import { Error404Page } from './error-404/index';
import { Error500Page } from './error-500/index';
import { ProfilePage } from './profile/index';
import { ProfileDataPage } from './profile-data/index';
import { ProfilePasswordPage } from './profile-password/index';
import { SignupPage } from './signup/index';
import { data as loginContext } from './login/index.tmpl';
import { data as chatMainContext } from './chat-main/index.tmpl';
import { data as chatSelectContext } from './chat-select/index.tmpl';
import { data as error404Context } from './error-404/index.tmpl';
import { data as error500Context } from './error-500/index.tmpl';
import { data as profileContext } from './profile/index.tmpl';
import { data as profileDataContext } from './profile-data/index.tmpl';
import { data as profilePasswordContext } from './profile-password/index.tmpl';
import { data as signupContext } from './signup/index.tmpl';

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