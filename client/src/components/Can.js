import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';

export const check = (action, rules) => {

  const decoded = jwt_decode(localStorage.admin_token);
  if(decoded && decoded.roles) {
    for(var role of decoded.roles) {
      const permissions = rules[role];
      if (!permissions) {
        // role is not present in the rules
        return false;
      }

      if (permissions && permissions.includes(action)) {
        // static rule not provided for action
        return true;
      }
    }
  }
  return false;
};

const Can = props => {
  const admin = useSelector((state) => state.admin);

  if(check(props.permission, admin.permissions)) {
    return props.children;
  }

  return null;
}
  

export default Can;