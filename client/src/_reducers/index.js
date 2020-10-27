import { combineReducers } from 'redux';
import user from './user.reducer';
import postjob from './postjob_reducer';
import profile from './profile_reducer';
import menu from './menu_reducer';
import gig from './gigs_reducer';
import settings from './site.reducer';
import admin from './admin/auth.reducer';
import categories from './admin/category.reducer';
import subcategories from './admin/subcategory.reducer';
import skills from './admin/skill.reducer';
import deliverytimes from './admin/deliverytime.reducer';
import languages from './admin/language.reducer';
import coupons from './admin/coupon.reducer';
import slides from './admin/slide.reducer';

const rootReducer = combineReducers({
    user,
    postjob,
    profile,
    admin,
    settings,
    menu,
    categories,
    subcategories,
    skills,
    deliverytimes,
    languages,
    coupons,
    slides,
    gig

});

export default rootReducer;
