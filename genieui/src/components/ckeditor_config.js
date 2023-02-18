import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = (props) => {
  return (
    <CKEditor
      editor={ ClassicEditor }
      config={{         
        toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
          'tableColumn', 'tableRow', 'mergeTableCells', 'mediaEmbed', '|', 'undo', 'redo']
      }}
      data={props.value}
      onChange={ (event, editor ) => {
        const data = editor.getData()
        props.onChange(data)
      } }
    />
  )
}

export default Editor;