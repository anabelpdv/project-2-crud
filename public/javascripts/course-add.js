
$( document ).ready(function() {

  const weekDays = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']  

  weekDays.forEach(day => {
    $('#days').append(`<input type="checkbox" value=${day} id="days"> ${day} </input>`)
  })

axios.get('/api/students')
  .then(response => {
    let students = response.data;
    students.forEach(student => {
        $('#studentList').append(`<br> <input type="checkbox" name="studentList" class="studentList" value=${student._id}> ${student.name} ${student.lastName}</input>`)
    }) 
  })
  .catch(err => console.log('Error retrieving students'))
  let test;
axios.get('/api/instructors')
    .then(response => {
      let instructors = response.data;
      instructors.forEach(instructor => {
          $('#instructorList').append(`<br> <input name="instructor" type="radio" class="instructorList" value=${instructor._id}> ${instructor.name} ${instructor.lastName}</input>`)
      })  
    })
    .catch(err => console.log('Error retrieving instructor')) 

$('#course-create').submit(function(e){
  e.preventDefault()  
  let courseName = $('#name').val();
  let courseCode = $('#code').val();
  const course = {
    name: courseName,
    code: courseCode,
  }

 let formData = new FormData;
  // formData.append('name', $('#name').val())
  // formData.append('code',$('#code').val())
  formData.append('file',document.getElementById('syllabus').files)

  

  console.log(formData)
// let contentType = {
//   headers : {
//   "content-type": "multipart/form-data"
//   }
// }

//   axios.post('/api/courses',formData,contentType)
//         .then(console.log('Todo en talla')) 
//         .catch(err=>{console.log('Tremendo error'. err)})

 })


});