import type { RouterConfig } from '@nuxt/schema'

// Hashes address sections, not page anchors, so the router must not scroll to them
export default <RouterConfig>{
  scrollBehavior: () => false
}
