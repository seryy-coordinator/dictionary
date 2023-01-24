import { createVuesticEssential, VaButton, VaInput } from 'vuestic-ui'

import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'

const config = createVuesticEssential({
  components: { VaButton, VaInput },
  config: {
    colors: {
      variables: {
        'gray-200': '#e5e7eb',
        'gray-300': '#d1d5db',
      },
    },
  },
})

export default config
