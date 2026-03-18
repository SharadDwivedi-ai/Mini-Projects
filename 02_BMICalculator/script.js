const form = document.querySelector('form')

form.addEventListener('submit', function(e){
  e.preventDefault();
  const height = parseInt(document.querySelector('#height').value)
  const weight = parseInt(document.querySelector('#weight').value)
  const result = document.querySelector('#results')
  if(height==='' || height<0 || isNaN(height)){
    result.innerHTML = `Please enter a valid Height ${height}`;
  } else if(weight ===''|| weight<0|| isNaN(weight)){
    result.innerHTML = `Please enter a valid Weight ${weight}`;
  } else{
    const bmi = (weight/((height*height)/10000)).toFixed(2)
    if(bmi<=18.6){
      result.innerHTML = `<span class="text-success">Under Weight : ${bmi}</span>`
    } else if(bmi>18.6 && bmi<=24.9){
      result.innerHTML = `<span class="text-primary">Normal Range : ${bmi}</span>`
    } else{
      result.innerHTML = `<span class="text-danger">Over Weight : ${bmi}</span>`
    }
  }
})