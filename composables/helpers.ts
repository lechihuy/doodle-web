export const currency = (number: number|string) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(number as unknown as number)
}

export const distance = (number: number|string) => {
  return (parseInt(number) / 1000).toFixed(2) + ' km'
}