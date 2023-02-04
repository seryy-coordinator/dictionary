import {
  createVuesticEssential,
  VaAlert,
  VaAvatar,
  VaButton,
  VaButtonGroup,
  VaButtonToggle,
  VaCheckbox,
  VaChip,
  VaDateInput,
  VaDivider,
  VaDropdown,
  VaDropdownContent,
  VaIcon,
  VaInput,
  VaNavbar,
  VaNavbarItem,
  VaSelect,
  VaToastPlugin,
} from 'vuestic-ui'

import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'

const config = createVuesticEssential({
  components: {
    VaAlert,
    VaAvatar,
    VaButton,
    VaButtonGroup,
    VaButtonToggle,
    VaCheckbox,
    VaChip,
    VaDateInput,
    VaDivider,
    VaDropdown,
    VaDropdownContent,
    VaIcon,
    VaInput,
    VaNavbar,
    VaNavbarItem,
    VaSelect,
  },
  plugins: { VaToastPlugin },
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
