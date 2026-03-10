import { App } from 'vue'

// Styles
import './theme/variables.css'
import './theme/dark.css'

// Components
import VfButton from './components/VfButton/VfButton.vue'
import VfInput from './components/VfInput/VfInput.vue'
import VfSelect from './components/VfSelect/VfSelect.vue'
import VfModal from './components/VfModal/VfModal.vue'
import VfCard from './components/VfCard/VfCard.vue'
import VfBadge from './components/VfBadge/VfBadge.vue'
import VfAvatar from './components/VfAvatar/VfAvatar.vue'
import VfAlert from './components/VfAlert/VfAlert.vue'
import VfToggle from './components/VfToggle/VfToggle.vue'
import VfTabs from './components/VfTabs/VfTabs.vue'
import VfAccordion from './components/VfAccordion/VfAccordion.vue'
import VfDropdown from './components/VfDropdown/VfDropdown.vue'
import VfTable from './components/VfTable/VfTable.vue'
import VfToast from './components/VfToast/VfToast.vue'
import VfPagination from './components/VfPagination/VfPagination.vue'
import VfSkeleton from './components/VfSkeleton/VfSkeleton.vue'

// Composables
export {
  useForm,
  useDebounce,
  useDebounceFn,
  useDarkMode,
  useClickOutside,
  useClickOutsideElement,
  useInfiniteScroll,
  useMediaQuery,
  useBreakpoint,
  breakpoints,
} from './composables'

// Toast Composable
export { useToast } from './components/VfToast/useToast'

// Theme
export { themeManager, type ThemeConfig } from './theme'

// Types
export * from './types'

// All components
const components = [
  VfButton,
  VfInput,
  VfSelect,
  VfModal,
  VfCard,
  VfBadge,
  VfAvatar,
  VfAlert,
  VfToggle,
  VfTabs,
  VfAccordion,
  VfDropdown,
  VfTable,
  VfToast,
  VfPagination,
  VfSkeleton,
]

export {
  VfButton,
  VfInput,
  VfSelect,
  VfModal,
  VfCard,
  VfBadge,
  VfAvatar,
  VfAlert,
  VfToggle,
  VfTabs,
  VfAccordion,
  VfDropdown,
  VfTable,
  VfToast,
  VfPagination,
  VfSkeleton,
}

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name || component.__name, component)
    })
  },
}
