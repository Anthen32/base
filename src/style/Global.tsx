import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
* {
font-family: 'Overpass', sans-serif;
}
body {
  background-image: url(/images/breadcrumbs_bg.png);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: auto;
  background-color: #151515;
  text-shadow: 0px 0px 3px #39446d5c;
}
`

export default GlobalStyle
