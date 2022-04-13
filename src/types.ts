export type CloudbeesUser = {
  user: {
    id: string;
    absoluteUrl: string;
    fullName: string;
    description?: string;
  };
};

export type CloudbeesUserResponse = {
  _class: string;
  users: CloudbeesUser[];
};

export type CloudbeesGroup = {
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

export type CloudbeesGroupResponse = {
  _class: string;
  groups: CloudbeesGroup[];
};

export type CloudbeesRole = {
  description?: string;
  filterable: boolean;
  grantedPermissions: string[];
  id: string;
  shortUrl: string;
};

export type CloudbeesRoleResponse = {
  _class: string;
  filterableRoles: string[];
  roles: CloudbeesRole[];
};
