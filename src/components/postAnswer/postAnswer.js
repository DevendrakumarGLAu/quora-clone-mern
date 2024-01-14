//src/components/postAnswer/postAnswer.js
import React from 'react'
import QuoraContent from '../postbox2/quoraContent';
import Header from '../Header/header';

function PostAnswer() {
  return (
    <div>
      <Header />
      <div class="d-flex justify-content-around">
        <div class="p-2">Flex item 2</div>

        <div class="p-2">
          <QuoraContent />
        </div>

        <div class="p-2">Flex item 3</div>
      </div>
    </div>
  );
}

export default PostAnswer;