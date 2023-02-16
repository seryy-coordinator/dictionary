import { contactStatus } from './enums'

export const contactStatuses = [
  {
    key: contactStatus.REQUEST,
    icon: 'hourglass_bottom',
    color: 'secondary',
  },
  {
    key: contactStatus.APPROVE,
    icon: 'how_to_reg',
    color: 'success',
  },
  {
    key: contactStatus.REJECT,
    icon: 'person_add_disabled',
    color: 'warning',
  },
  {
    key: contactStatus.REMOVED,
    icon: 'person_remove',
    color: 'danger',
  },
]
