import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

function TextEditor({setValue, value}) {
  const editor = useRef();

  return (
    <div className="py-2">
      <JoditEditor ref={editor} onChange={(content) => setValue(content)} value={value ? value : ''} />
    </div>
  )
}

export default TextEditor