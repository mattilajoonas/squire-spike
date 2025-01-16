'use client';

import { ChangeEvent, useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import Squire from "squire-rte";

export default function Home() {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState<Squire>();

  useEffect(() => {
    if(editorRef.current) {
      const editor = new Squire(editorRef.current, {
        sanitizeToDOMFragment: (
          html: string,
      ): any => {
          const frag = DOMPurify.sanitize(html, {
              ALLOW_UNKNOWN_PROTOCOLS: true,
              WHOLE_DOCUMENT: false,
              RETURN_DOM: true,
              RETURN_DOM_FRAGMENT: true,
              FORCE_BODY: false,
          });
          return frag
              ? document.importNode(frag, true)
              : document.createDocumentFragment();
      },
      didError: (error: any): void => console.log(error),
      });
      setEditor(editor)
    }
  }, [editorRef])

  const handleSetHtml = () => {
    const html = prompt('Enter HTML:')

    editor?.setHTML(html ?? '')
  }

  return (
    <div>
      <h1>Squire demo</h1>
      <button onClick={() => handleSetHtml()}>Set HTML</button>
      <div style={{width: "600px", minHeight: "600px", backgroundColor: "white", color: "black", margin: "0 auto"}} ref={editorRef} />
    </div>
  );
}
