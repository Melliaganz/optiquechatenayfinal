import React from 'react'
import MentionLégales from './MentionLégales';
import Footer from './Footer';

function Mentions() {
  return (
    <div>
        <MentionLégales />
        <div className='footerMention'>
        <Footer />
        </div>
    </div>
  )
}

export default Mentions