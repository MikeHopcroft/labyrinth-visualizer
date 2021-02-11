// export default function InfoPane() {
//   return (
//     <div style={{width: '100%', height: '100%', backgroundColor: 'lightcoral'}}>
//       Info pane
//     </div>
//   );
// }

import React from 'react';
import ReactMarkdown from 'react-markdown';
// import { connect } from 'react-redux'

// import { ApplicationState } from '../actions';

// import AzureWarning from './azure-warning';
// import ChromeWarning from './chrome-warning';

import styles from './component.module.css';
const markdown = require('./info.md').default.toString();

interface Props {
  // application: ApplicationState;
};

// const renderers = {
//   code: ({ language, value }) => {
//     if (language === 'warning-chrome') {
//       return (
//         <ChromeWarning text={value}/>
//       );
//     } else if (language === 'warning-azure') {
//       return (
//         <AzureWarning text={value}/>
//       );
//     } else {
//       return (
//         <pre>
//           <code className={language && `language-${language}`}>
//             {value}
//           </code>
//         </pre>
//       )
//     }
//   }
// }

class InfoControl extends React.Component<Props> {
  render() {
    return (
      <div id='InfoControl' className={styles.infoPane} style={{overflow: 'auto'}}>
        <ReactMarkdown source={markdown}/>
        {/* <ReactMarkdown source={markdown} renderers={renderers}/> */}
        {/* But do thy worst to steal thyself away, For term of life thou art assured mine; And life no longer than thy love will stay, For it depends upon that love of thine. Then need I not to fear the worst of wrongs, When in the least of them my life hath end. I see a better state to me belongs Than that which on thy humour doth depend: Thou canst not vex me with inconstant mind, Since that my life on thy revolt doth lie. */}
      </div>
    );
  }
}

export default InfoControl;

// function mapStateToProps(application: ApplicationState) {
//   return { application };
// }

// export default connect(mapStateToProps)(InfoControl);
