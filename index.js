const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
const submitButton = document.getElementById("submitButton");
const displayButton = document.getElementById("displayButton");
const displayField = document.getElementById("display");

//Set space for data
const data = JSON.parse(localStorage.getItem("obj")) || [];
//Save the data
submitButton.addEventListener("click", () => {
  //Validation check of form inputs
  if (
    firstName.value.length < 1 ||
    lastName.value.length < 1 ||
    phone.value.length < 1
  ) {
    displayField.innerHTML = "<p>Please fill the form!</p>";
  } else {
    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phone.value,
    };

    //Push into the array
    data.push(user);
    const dataJSON = JSON.stringify(data);
    localStorage.setItem("obj", dataJSON);
    alert("Submitted!");
    //Refresh Display
    location.reload();
  }
});

//Function for Displaying data
function displayData(data) {
  // const data = JSON.parse(localStorage.getItem("obj")) || [];
  if (data.length < 1) {
    displayField.innerHTML = "<p>No items to display!</p>";
  }
  data.map((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "bg-black text-white w-sm mb-4 py-4";
    displayField.appendChild(itemDiv);
    //User
    const user = document.createElement("p");
    user.textContent = `User: ${index + 1}`;
    itemDiv.appendChild(user);
    //First
    const firstName = document.createElement("p");
    firstName.textContent = `First Name : ${item.firstName}`;
    itemDiv.appendChild(firstName);
    //Last
    const lastName = document.createElement("p");
    lastName.textContent = `Last Name : ${item.lastName}`;
    itemDiv.appendChild(lastName);
    //Phone
    const phoneNumber = document.createElement("p");
    phoneNumber.textContent = `Phone Number : ${item.phoneNumber}`;
    itemDiv.appendChild(phoneNumber);

    //--------------Delete feature---------
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "bg-red-400 mt-4 px-2 py-1";
    itemDiv.appendChild(deleteButton);
    deleteButton.id = `user${index}`;
    const currentUser = document.getElementById(`user${index}`);
    //delete button
    currentUser.addEventListener("click", () => {
      //Delete based on index
      data.splice(index, 1);
      //Update data
      localStorage.setItem("obj", JSON.stringify(data));
      alert("Selected User Deleted!");
      //Refresh Display
      location.reload();
    });
  });
}

displayButton.addEventListener("click", () => displayData(data));
