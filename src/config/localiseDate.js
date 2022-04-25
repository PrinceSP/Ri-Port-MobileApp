import months from './months'

const localizeDateStr = (actualDate)=>{

  let fullDate = actualDate.split('T').shift()
  let [day, month, year] = fullDate.split('-')

  return actualDate = `${year} ${months[month-1]} ${day}`;
}

export default localizeDateStr
