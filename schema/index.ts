export {
    account, accountRelations, session, sessionRelations, user, userRelations, verification, type Account,
    type Session, type User, type Verification
} from "./auth-schema";

export {
    role, roleRelations, userRole, userRoleRelations, type Role,
    type UserRole
} from "./role-schema";

export {
    property,
    propertyRelations, type Property
} from "./property-schema";

export {
    favorite,
    favoriteRelations, type Favorite
} from "./favorite-schema";

export {
    propertyAssignment,
    propertyAssignmentRelations, propertyManagerFirm,
    propertyManagerFirmRelations,
    teamMember,
    teamMemberRelations, type PropertyAssignment, type PropertyManagerFirm,
    type TeamMember
} from "./property-manager-schema";

