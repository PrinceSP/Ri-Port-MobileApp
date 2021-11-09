//function to get the current date of the day
export default function getCurrentDate(){
  //initialize the month with the exact months's name
  const months = [
    'January','February','March','April',
    'Mei','June','July','August',
    'September','October','November','December'
  ]
  //make new date with buildtin method new Date()
  let today = new Date();
  //get the day from variable 'today' which is passed the exact date of the day
  let dd = String(today.getDate()).padStart(2, '0');
  //get the month from variable 'today' which is passed the exact date of the day
  let mm = String(today.getMonth()+1).padStart(2,'0');
  //get the full year from variable 'today' which is passed and use the build-in method getFullYear()
  let year = today.getFullYear()
  //combine all the data from dd,mm,year variables into today variable value
  return today=`${dd} ${months[mm-1]} ${year}`
}
