import { relationStatus } from './enums'

export const relationStatuses = [
  {
    key: relationStatus.REQUEST,
    icon: 'hourglass_bottom',
    color: 'secondary',
  },
  {
    key: relationStatus.APPROVE,
    icon: 'how_to_reg',
    color: 'success',
  },
  {
    key: relationStatus.REJECT,
    icon: 'person_add_disabled',
    color: 'warning',
  },
  {
    key: relationStatus.REMOVED,
    icon: 'person_remove',
    color: 'danger',
  },
  {
    key: relationStatus.DISABLED,
    icon: '',
    color: '',
  },
]
