import styled, { createGlobalStyle } from 'styled-components';

// Add fonts
// import photonEntypoEOT from '@assets/fonts/photon-entypo.eot'
// import photonEntypoWOFF from '@assets/fonts/photon-entypo.woff'
// import photonEntypoTTF from '@assets/fonts/photon-entypo.ttf'

const photonEntypoEOT = 'https://cdnjs.cloudflare.com/ajax/libs/photon/0.1.2-alpha/fonts/photon-entypo.eot';
const photonEntypoWOFF = 'https://cdnjs.cloudflare.com/ajax/libs/photon/0.1.2-alpha/fonts/photon-entypo.woff';
const photonEntypoTTF = '	https://cdnjs.cloudflare.com/ajax/libs/photon/0.1.2-alpha/fonts/photon-entypo.ttf';

export const GlobalPageStyles = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    height: 100%;
    padding: 0;
    margin: 0;
  }
`;

export const GlobalThemeStyled = styled.div`
  font-family: system, -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.global.color || '#333'};
  background-color: ${({ theme }) => theme.global.background || 'transparent'};

  ${({ theme }) => {
    const fontUrl = theme.typography.fontUrl;
    return fontUrl && `@import url('${fontUrl}');`;
  }}

  @font-face {
    font-family: "photon-entypo";
    src: url(${photonEntypoEOT});
    src: url(${photonEntypoEOT}) format("eot"), url(${photonEntypoWOFF}) format("woff"), url(${photonEntypoTTF}) format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  audio,
  canvas,
  progress,
  video {
    vertical-align: baseline;
  }

  audio:not([controls]) {
    display: none;
  }

  a:active,
  a:hover {
    outline: 0;
  }

  abbr[title] {
    border-bottom: 1px dotted;
  }

  b,
  strong {
    font-weight: bold;
  }

  dfn {
    font-style: italic;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  pre {
    overflow: auto;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }

  legend {
    border: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  hr {
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #ddd;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // Move to Headng components
  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 18px;
  }

  h5 {
    font-size: 14px;
  }

  h6 {
    font-size: 12px;
  }

  p {
    font-size: 1em;
    text-align: center;
  }
`
