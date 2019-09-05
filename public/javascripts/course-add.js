
$( document ).ready(function() {

  // const weekDays = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']; 
  // let currentCourse = $('#course-id').val();
  // axios.get(`/api/courses/${currentCourse}`)
  // .then(response => {
  //     let course = response.data; 
  //     weekDays.forEach(day => {
  //       let checked = false;
  //       course.days.forEach(courseDay => {
  //         if(day == courseDay){
  //           checked = true;
  //         }
  //       })
  //       if(checked){
  //         $('#days').append(`<input type="checkbox" checked name="days" class="days" value=${day}> ${day} </input>`)
  //       }else{
  //         $('#days').append(`<input type="checkbox" name="days" class="days" value=${day}> ${day} </input>`)
  //       }  
  //     })
  // })
  


  // const schoolTerms = ['Spring','Fall','Summer'];
  // schoolTerms.forEach(term =>{
  //   $('#term').append(`<option value=${term}>${term}</option>`)
  // })


// axios.get('/api/students')
//   .then(response => {
//     let students = response.data;
//     students.forEach(student => {
//         $('#studentList').append(`<br> <input type="checkbox" name="studentList" class="studentList" value=${student._id}> ${student.name} ${student.lastName}</input>`)
//     }) 
//   })
//   .catch(err => console.log('Error retrieving students'))

// axios.get('/api/instructors')
//     .then(response => {
//       let instructors = response.data;
//       instructors.forEach(instructor => {
//           $('#instructorList').append(`<br> <input name="instructor" type="radio" class="instructorList" value=${instructor._id}> ${instructor.name} ${instructor.lastName}</input>`)
//       })  
//     })
//     .catch(err => console.log('Error retrieving instructor')) 

});