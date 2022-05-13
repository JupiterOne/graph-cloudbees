export type CloudBeesUser = {
  user: {
    id: string;
    absoluteUrl: string;
    fullName: string;
    description?: string;
  };
};

export type CloudBeesUserResponse = {
  _class: string;
  users: CloudBeesUser[];
};

export type CloudBeesGroup = {
  description?: string;
  name: string;
  roleAssignments: {
    inherited: boolean;
    offset: number;
    role: string;
  }[];
  roles: string[];
  url: string;
  users: string[];
};

export type CloudBeesGroupResponse = {
  _class: string;
  groups: CloudBeesGroup[];
};

export type CloudBeesRole = {
  description?: string;
  filterable: boolean;
  grantedPermissions: string[];
  id: string;
  shortUrl: string;
};

export type CloudBeesRoleResponse = {
  _class: string;
  filterableRoles: string[];
  roles: CloudBeesRole[];
};
