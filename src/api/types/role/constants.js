import { role } from './enums'

export const roles = [
  {
    key: role.STUDENT,
    permissions: [],
    label: 'Student',
    icon: 'person_outline',
    isDefault: true,
  },
  {
    key: role.TEACHER,
    permissions: [],
    label: 'Teacher',
    icon: 'record_voice_over',
    isDefault: true,
  },
  {
    key: role.ADMIN,
    permissions: [],
    label: 'Admin',
  },
  {
    key: role.SUPER_ADMIN,
    permissions: [],
    label: 'Super admin',
  },
]
