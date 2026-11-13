export interface NavItem {
  title: string
  url: string
}

export interface FooterLink {
  title: string
  url: string
}

export interface Award {
  title: string
  subtitle?: string
  path: string
}

export interface Committee {
  id: number | string
  name?: string
  home: string
}

export interface SocialLink {
  url: string
}

export interface GoogleAnalytics {
  id: string
}

export interface SiteConfig {
  title: string
  /** HTML-allowed variant of the title, rendered raw in header/footer */
  titleHtml?: string
  brandSub?: string
  description?: string
  nav?: NavItem[]
  footerLinks?: FooterLink[]
  committee?: Committee
  social?: { links: SocialLink[] }
  awards?: Award[]
  googleAnalytics?: GoogleAnalytics
  headerLogo?: string
  faviconSvg?: string
  faviconIco?: string
}
