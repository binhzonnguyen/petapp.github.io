'use strict';
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

const submitBtn = document.getElementById('submit-btn');
const tableBodyEl = document.getElementById('tbody');

const healthyBtn = document.getElementById('healthy-btn');
const calculateBmiBtn = document.getElementById('calculate-bmi-btn');
const petArr = [];

const data1 = {
  id: 'P001',
  name: 'Tom',
  age: 3,
  type: 'Cat',
  weight: 5,
  length: 10,
  color: 'red',
  breed: 'Tabby',
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 2, 1),
  bmi: '?',
};

const data2 = {
  id: 'P002',
  name: 'Tyke',
  age: 5,
  type: 'Dog',
  weight: 3,
  length: 40,
  color: 'green',
  breed: 'Mixed Breed',
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(2022, 2, 3),
  bmi: '?',
};

petArr.push(data1);
petArr.push(data2);
// 1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener('click', function () {
  // 1. Lấy dữ liệu từ các Form Input
  // petArr = [{data}]
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  // 2. Validate dữ liệu
  const validate = validateData(data);
  // Nếu hợp lệ: thực hiện 3,4,5
  if (validate) {
    // 3. Thêm thú cưng vào danh sách
    petArr.push(data);
    // 4. Hiện thị danh sách thú cưng
    renderTableData(petArr);
    // 5. Xóa các dữ liệu nhập trong Form Input
    clearInput();
  }
  // Không hợp lệ: thông báo các lỗi,...
});
renderTableData(petArr);
function renderTableData(petArr) {
  tableBodyEl.innerHTML = '';
  // gọi biến tableBodyEl bằng thao tac Dom, sau do ve lai tableBodyEl = ""

  // duyệt qua các phần tử trong petArr, tạo các hàng tương ứng và thêm vào bảng với cú pháp như sau:
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr'); // tạo 1 thẻ tr
    // vẽ lại trên HTML
    row.innerHTML = `
                <th scope="row">${petArr[i].id}</th>
                <td>${petArr[i].name}</td>
                <td>${petArr[i].age}</td>
                <td>${petArr[i].type}</td>
                <td>${petArr[i].weight} kg</td>
                <td>${petArr[i].length} cm</td>
                <td>${petArr[i].breed}</td>
                <td>
                  <i class="bi bi-square-fill" style="color: ${
                    petArr[i].color
                  }"></i>
                </td>
                <td><i class="bi ${
                  // toán tử 3 ngôi

                  petArr[i].vaccinated
                    ? 'bi-check-circle-fill '
                    : 'bi-x-circle-fill'
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].dewormed
                    ? 'bi-check-circle-fill '
                    : 'bi-x-circle-fill'
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].sterilized
                    ? 'bi-check-circle-fill '
                    : 'bi-x-circle-fill'
                }"></i></td>
                <td>?</td>
              
                <td>
                ${petArr[i].date.getDate()}/  ${
      petArr[i].date.getMonth() + 1
    } / ${petArr[i].date.getFullYear()} 
                </td>
                <td>
                <button class="btn btn-danger" onclick="deletePet('${
                  petArr[i].id
                }')">Delete</button>
                </td>`;
    // ép row mới vào table nằm dòng 93
    tableBodyEl.appendChild(row);
  }
}
// khai báo hàm
function deletePet(petId) {
  const isDeleted = confirm('Are you sure?');
  if (isDeleted) {
    // thực hiện bước xóa trong này
    for (let i = 0; i < petArr.length; i++) {
      // nếu petId giống id belong data object of petArr
      if (petId === petArr[i].id) {
        // Xóa khỏi mảng
        // tìm vị trí i và xóa 1 phần tử và trả lại mảng mới
        petArr.splice(i, 1);
        // gọi lại hàm hiển thị
        renderTableData(petArr);
      }
    }
  }
}

function clearInput() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select type';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#000000';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
function validateData(data) {
  // Không có trường nào bị nhập thiếu dữ liệu.

  // Khai báo biến cờ hiệu
  let isValidate = true;

  if (data.id.trim() === '') {
    alert('Không được để trống trường ID!');
    isValidate = false;
  }

  if (data.name.trim() === '') {
    alert('Không được để trống trường Name!');
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert('Không được để trống trường Age!');
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert('Không được để trống trường Weight!');
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert('Không được để trống trường Length!');
    isValidate = false;
  }

  // Kiểm tra ID có phải duy nhất hay không?

  // Duyệt qua cái mảng petArr của chúng ta. Sau .. Kiểm tra

  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      // giá trị truyền vào bằng trường id chứa trong object data thuộc petArr
      alert('ID must be unique!');
      isValidate = false;
      break;
    }
  }
  // normalArr = ["anh", "minh", "nguyen"]
  if (data.age < 1 || data.age > 15) {
    alert('Age must be between 1 and 15!');
    isValidate = false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert('Weight must be between 1 and 15!');
    isValidate = false;
  }
  if (data.length < 1 || data.age > 100) {
    alert('Length must be between 1 and 100!');
    isValidate = false;
  }
  if (data.type === 'Select Type') {
    //option
    alert('Please select Type!');
    isValidate = false;
  }
  if (data.breed === 'Select Breed') {
    alert('Please select Breed!');
    isValidate = false;
  }

  return isValidate;
}
let healthyCheck = true;
healthyBtn.addEventListener('click', function () {
  // hiện thị các thú cưng khỏe mạnh
  if (healthyCheck === true) {
    // hiện thị thú cưng khỏe mạnh
    const healthyPetArr = [];

    // lọc trong mảng petArr
    for (let i = 0; i < petArr.length; i++) {
      // nếu trường vaccinated,... belong data object of PetArr
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        //  thêm thú cưng thứ i đó vào mảng healthyPetArr
        healthyPetArr.push(petArr[i]);
      }
    }
    // sau for sẽ có được mảng healthyPetArr : chứa toàn bộ các thú cưng khỏe mạnh
    // gọi hàm hiện thị
    renderTableData(healthyPetArr);
    // sau đó đổi nút thành cái nút 'Show All Pet'
    healthyBtn.textContent = 'Show All Pet';

    // đổi lại biến cờ hiệu

    healthyCheck = false;
  } else {
    // hiện thị toàn bộ thú cưng,
    renderTableData(petArr);
    // sau đó đổi tên nút thành ...
    healthyBtn.textContent = 'Show Healthy Pet';
    healthyCheck = true;
  }
});

calculateBmiBtn.onclick = function () {};

// ==> Bắt sự kiện vào nút submit
// Thực hiện:

// 1.Lấy dữ liệu từ các Form Input

// 2.Validate dữ liệu
// nếu hợp lệ : thực hiện 3,4,5
// không hợp lệ: thông báo các lỗi
// 3.Thêm thú cưng vào danh sách

// 4.Hiển thị danh sách thú cưng

// 5.Xóa các dữ liệu nhập trong Form Input
