
$( document ).ready(function() {
  const weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 
  const schoolTerms = ['Spring','Fall','Summer'];
  let currentCourse = $('#course-id').val();
  axios.get(`/api/courses/${currentCourse}`)
  .then(response => {
      let course = response.data; 
      weekDays.forEach(day => {
        let checked = false;
        course.days.forEach(courseDay => {
          if(day == courseDay){
            checked = true;
          }
        })
        if(checked){
          $('#days').append(`<input type="checkbox" checked name="days" class="days" value=${day}> ${day} </input>`)
        }else{
          $('#days').append(`<input type="checkbox" name="days" class="days" value=${day}> ${day} </input>`)
        }  
      })
      schoolTerms.forEach(term => {
        let selected = false;
        if(term == course.term){
          selected = true;
        }
        if(selected){
          $('#term').append(`<option selected value=${term}>${term}</option>`)
        }else{
          $('#term').append(`<option value=${term}>${term}</option>`)
        }
        
      })
  })

});