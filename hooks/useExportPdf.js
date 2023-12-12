import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import { useState } from 'react'

const useExportPdf = (documentComponent, fileName) => {
  const [isExporting, setIsExporting] = useState(false)
  const exportPdf = async () => {
    if (isExporting) return
    setIsExporting(true)
    const asPdf = pdf([]) // {} is important, throws without an argument
    asPdf.updateContainer(documentComponent)
    const blob = await asPdf.toBlob()
    saveAs(blob, `Emtek-${documentComponent?.props.pageName || fileName}.pdf`)
    setIsExporting(false)
  }

  return {
    exportPdf,
    isExporting
  }
}

export default useExportPdf
