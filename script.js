function checkOpenStatus() {
  let now = new Date();
  let day = now.getDay();
  let hour = now.getHours();
  let statusBox = document.getElementById("open-status");

  if (day === 1) {
    statusBox.textContent = "Closed today (Monday). We open tomorrow at 11:00 AM.";
    statusBox.className = "closed";
  } else if (hour >= 11 && hour < 23) {
    statusBox.textContent = "We're Open Now! (till 11:00 PM)";
    statusBox.className = "open";
  } else {
    statusBox.textContent = "Closed right now. We are open daily 11:00 AM - 11:00 PM.";
    statusBox.className = "closed";
  }
}

checkOpenStatus();


function showCategory(name) {
  let categories = document.getElementsByClassName("menu-category");
  let buttons = document.getElementsByClassName("tab-btn");

  for (let i = 0; i < categories.length; i++) {
    if (name === "all" || categories[i].id === "cat-" + name) {
      categories[i].style.display = "";
    } else {
      categories[i].style.display = "none";
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  document.getElementById("btn-" + name).classList.add("active");
}

showCategory("all");


function checkReservation() {
  let name = document.getElementById("res-name").value.trim();
  let phone = document.getElementById("res-phone").value.trim();
  let guests = Number(document.getElementById("res-guests").value);
  let date = document.getElementById("res-date").value;
  let message = document.getElementById("res-message");

  message.className = "error";

  if (name.length < 3) {
    message.textContent = "Please enter your name (at least 3 letters).";
    return false;
  }

  if (phone.length !== 10 || isNaN(phone)) {
    message.textContent = "Please enter a valid 10 digit phone number.";
    return false;
  }

  if (guests < 1 || guests > 20) {
    message.textContent = "Number of guests must be between 1 and 20.";
    return false;
  }

  if (date === "") {
    message.textContent = "Please choose a date.";
    return false;
  }

  message.className = "success";
  message.textContent =
    "Thank you, " + name + "! Table for " + guests + " on " + date + " is booked. We will call you on " + phone + ".";
  document.getElementById("reservation-form").reset();
  return false;
}


let reviews = [
  { name: "Sample Review 1", rating: 5, comment: "Sample: Great biryani and lovely service!" },
  { name: "Sample Review 2", rating: 4, comment: "Sample: Paneer dishes were tasty, will come again." }
];

function showReviews() {
  let list = document.getElementById("review-list");
  let averageBox = document.getElementById("average-rating");

  list.innerHTML = "";

  if (reviews.length === 0) {
    averageBox.textContent = "No reviews yet. Be the first!";
    return;
  }

  let total = 0;

  for (let i = 0; i < reviews.length; i++) {
    let r = reviews[i];
    total = total + r.rating;

    let card = document.createElement("div");
    card.className = "review-card";

    let title = document.createElement("h4");
    title.textContent = r.name + "  " + "★".repeat(r.rating);

    let text = document.createElement("p");
    text.textContent = r.comment;

    card.appendChild(title);
    card.appendChild(text);
    list.appendChild(card);
  }

  let average = (total / reviews.length).toFixed(1);
  averageBox.textContent = average + " ★  (" + reviews.length + " reviews)";
}

function addReview() {
  let name = document.getElementById("rev-name").value.trim();
  let rating = Number(document.getElementById("rev-rating").value);
  let comment = document.getElementById("rev-comment").value.trim();
  let message = document.getElementById("rev-message");

  message.className = "error";

  if (name.length < 2) {
    message.textContent = "Please enter your name.";
    return false;
  }

  if (rating < 1 || rating > 5) {
    message.textContent = "Please select a rating from 1 to 5.";
    return false;
  }

  if (comment.length < 10) {
    message.textContent = "Please write a comment of at least 10 characters.";
    return false;
  }

  let newReview = { name: name, rating: rating, comment: comment };
  reviews.unshift(newReview);

  showReviews();
  document.getElementById("review-form").reset();
  message.className = "success";
  message.textContent = "Thank you for your review!";
  return false;
}

showReviews();