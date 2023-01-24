import {
  createVuesticEssential,
  VaAvatar,
  VaButton,
  VaButtonDropdown,
  VaButtonToggle,
  VaButtonGroup,
  VaIcon,
  VaInput,
  VaNavbar,
  VaNavbarItem,
} from 'vuestic-ui'

import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'

const config = createVuesticEssential({
  components: {
    VaAvatar,
    VaButton,
    VaButtonDropdown,
    VaButtonToggle,
    VaButtonGroup,
    VaIcon,
    VaInput,
    VaNavbar,
    VaNavbarItem,
  },
  config: {
    colors: {
      variables: {
        // https://vuestic.dev/en/styles/colors#color-presets
        'gray-200': '#e5e7eb',
        'gray-300': '#d1d5db',
      },
    },
  },
})

export default config
