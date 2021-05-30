import { combineReducers } from 'redux';
import user from './user.reducer';
import profile from './profile_reducer';
import settings from './site.reducer';
import adminsettings from './admin/settings.reducer';
import admin from './admin/auth.reducer';
import posts from './admin/post.reducer';
import users from './admin/user.reducer';



const rootReducer = combineReducers({
    user,
    users,
    profile,
    admin,
    adminsettings,
    settings,
    posts,

});

export default rootReducer;
