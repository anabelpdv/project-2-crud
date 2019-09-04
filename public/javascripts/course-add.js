
$( document ).ready(function() {

  const weekDays = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']  

  weekDays.forEach(day => {
    $('#days').append(`<input type="checkbox" name="days" class="days" value=${day}> ${day} </input>`)
  })

axios.get('/api/students')
  .then(response => {
    let students = response.data;
    students.forEach(student => {
        $('#studentList').append(`<br> <input type="checkbox" name="studentList" class="studentList" value=${student._id}> ${student.name} ${student.lastName}</input>`)
    }) 
  })
  .catch(err => console.log('Error retrieving students'))

axios.get('/api/instructors')
    .then(response => {
      let instructors = response.data;
      instructors.forEach(instructor => {
          $('#instructorList').append(`<br> <input name="instructor" type="radio" class="instructorList" value=${instructor._id}> ${instructor.name} ${instructor.lastName}</input>`)
      })  
    })
    .catch(err => console.log('Error retrieving instructor')) 

});