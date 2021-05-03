let birthDateRaw = document.querySelectorAll("#age");
console.log(birthDateRaw);
function calculateAge(bday) {
  const birthDate = new Date(bday);
  const birthDate_day = parseInt(birthDate.getDate());
  const birthDate_month = parseInt(birthDate.getMonth());
  const birthDate_year = parseInt(birthDate.getFullYear());
  const currentDate = new Date();
  const currentDate_day = parseInt(currentDate.getDate());
  const currentDate_month = parseInt(currentDate.getMonth());
  const currentDate_year = parseInt(currentDate.getFullYear());

  let age = 0;

  if (currentDate_month > birthDate_month) {
    age = currentDate_year - birthDate_year;
  } else {
    age = currentDate_year - birthDate_year - 1;
  }
  console.log(age);

  return age;
}

if (birthDateRaw.length != 0) {
  birthDateRaw.forEach((data) => {
    let age = calculateAge(data.innerText);
    data.innerHTML = age;
  });
}
