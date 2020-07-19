const ol = document.querySelector('ol');
const input = document.querySelector('.input-area');
const add = document.querySelector('.add');
const rem = document.querySelector('.remove');
var i = 0;

add.addEventListener('click', () => {
    
if(i<=8)    
{
  var val = input.value; 
  const li = document.createElement('li');
  const span = document.createElement('span'); 
  span.textContent = val;
  li.appendChild(span);
  ol.appendChild(li);
  input.value = '';
  input.focus();
  i++;
}
else
{
    alert(`Limit reached delete Some TODO's`);
    input.value = '';
    i--;
}

});

rem.addEventListener('click', () => {
    
    var val = input.value;
    // for(let j=0;j<=i;j++)
    // {
    //    if() 
    // }

});