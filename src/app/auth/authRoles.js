/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    staff    : ['admin', 'staff'],
    user     : ['admin', 'staff', 'user'],
    onlyGuest: ["ROLE_DOCTOR"]
};

export default authRoles;
