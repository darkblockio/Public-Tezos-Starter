export function dateTimeFormat(date) {
    let dt = date
    if (date) {
      dt = new Date(date).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric' })
    }
    return dt
  }