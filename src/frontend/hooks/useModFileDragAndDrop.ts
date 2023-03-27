import { useEffect, useState } from 'react'
import { SUPPORTED_ARCHIVE_MIME_TYPES } from '../../config'

// TODO use this
type DragAndDropStatus = 'supported_file_dragged' | 'unsupported_file_dragged' | 'none'

const isFileTypeSupported = (mimeType: string) => SUPPORTED_ARCHIVE_MIME_TYPES.includes(mimeType)

const useModFileDragAndDrop = () => {
    const [pendingFile, setPendingFile] = useState<File>(null)
    const [isDragging, setDragging] = useState(false)

    const clear = () => {
        setPendingFile(null)
        setDragging(false)
    }

    useEffect(() => {
        const onDragOver = (evt: DragEvent) => {
            evt.preventDefault()
            evt.stopPropagation()
            // TODO show error state if file not supported

            setDragging(true)
        }
        const onDrop = (event: DragEvent): void => {
            event.preventDefault()
            event.stopPropagation()

            const file = event.dataTransfer.files[0]
            // TODO handle multiple files

            if (isFileTypeSupported(file.type)) setPendingFile(file)
            setDragging(false)
        }

        document.addEventListener('dragover', onDragOver)
        document.body.addEventListener('drop', onDrop)
        // TODO handle drag exit (?)
        return () => {
            document.removeEventListener('dragover', onDragOver)
            document.body.removeEventListener('drop', onDrop)
        }
    }, [])

    return {
        pendingFile,
        isDragging,
        clear,
    }
}

export default useModFileDragAndDrop
