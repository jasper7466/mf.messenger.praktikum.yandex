import Router from '@modules/Router';
import { LoginPage } from './pages/login/index';
import { ChatSelectPage } from './pages/chat-select/index';
import { ErrorPage } from './pages/error/index';
import { ProfilePage } from './pages/profile/index';
import { ProfileDataPage } from './pages/profile-data/index';
import { ProfilePasswordPage } from './pages/profile-password/index';
import { SignupPage } from './pages/signup/index';
import { DemoPage } from './pages/demo/index';
import { data as loginContext } from './pages/login/index.tmpl';
import { data as chatSelectContext } from './pages/chat-select/index.tmpl';
import { data as profileContext } from './pages/profile/index.tmpl';
import { data as profileDataContext } from './pages/profile-data/index.tmpl';
import { data as profilePasswordContext } from './pages/profile-password/index.tmpl';
import { data as signupContext } from './pages/signup/index.tmpl';
import Store from "@modules/Store";
import {storeMap} from "@/config";
import '../static/styles/index.css';

const router = new Router('.application');

export enum Routes {
    login = '/login',
    chatSelect = '/chat-select',
    error = '/error',
    profile = '/profile',
    profileData = '/profile-data',
    profilePassword = '/profile-password',
    signup = '/signup',
    demo = '/demo',
}

/**
 * Обработчик перехода по несуществующему роуту
 */
const badRouteHandler = () => {
    new Store().set(storeMap.errorPageProps, {type: '404', description: 'Не туда попали'});
    router.go(Routes.error);
}

router
    .use(Routes.login, LoginPage, loginContext)
    .use(Routes.chatSelect, ChatSelectPage, chatSelectContext)
    .use(Routes.error, ErrorPage, {})
    .use(Routes.profile, ProfilePage, profileContext)
    .use(Routes.profileData, ProfileDataPage, profileDataContext)
    .use(Routes.profilePassword, ProfilePasswordPage, profilePasswordContext)
    .use(Routes.signup, SignupPage, signupContext)
    .use(Routes.demo, DemoPage, {})
    .setDefaultRoute(Routes.login)
    .setBadRouteHandler(badRouteHandler)
    .start()
