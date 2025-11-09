import { defineNuxtPlugin } from '#app'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default defineNuxtPlugin(() => {
  const exportToExcel = (
    header: any[],
    rows: any[][],
    filename = 'data.xlsx'
  ) => {

    // ✅ 1-qator → header, keyingilar → rows
    const aoa = [header, ...rows]

    // ✅ faqat AOA format
    const worksheet = XLSX.utils.aoa_to_sheet(aoa)

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    saveAs(blob, filename)
  }

  return {
    provide: {
      exportToExcel
    }
  }
})
