import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";

import AdminLogin from './views/admin/auth/Login';
import Admin from './views/admin/layout/Base';
import User from './views/user/layout/Base';
import AdminRoute from './utils/admin_route';
import AdminAuthRoute from './utils/admin_auth_route';



function App() {

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div>
        <Switch>

         <AdminRoute path="/admin"  > <Admin /> </AdminRoute>

         <AdminAuthRoute exact={true} path="/admin/login"><AdminLogin /></AdminAuthRoute>
          
         <User />
          
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
