export const toggleSidebar = () => {
  const sidebarState = document
    .getElementById('pageWrapper')
    ?.getAttribute('data-sidebar-hidden')

  if (sidebarState && sidebarState === 'hidden') {
    document
      .getElementById('pageWrapper')
      ?.removeAttribute('data-sidebar-hidden')
  } else {
    document
      .getElementById('pageWrapper')
      ?.setAttribute('data-sidebar-hidden', 'hidden')
  }
}
