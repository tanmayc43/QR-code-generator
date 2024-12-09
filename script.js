const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img");

let preValue = "";

const setBackgroundImage = async () => {
  document.body.style.backgroundColor = 'black';
  try {
    const response = await fetch('/api/fetchImage');
    if (!response.ok) {
      throw new Error('Error fetching image');
    }
    const data = await response.json();
    document.body.style.backgroundImage = `url(${data.imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  } catch (error) {
    console.error('Error fetching Unsplash background:', error);
    document.body.style.backgroundImage = "url('./assets/background.jpg')";
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setBackgroundImage();
});

generateBtn.addEventListener("click", () => {
  const qrValue = qrInput.value.trim();

  if (!qrValue || !qrValue.includes(".") || preValue === qrValue) {
    alert("Please enter a valid input containing a '.' to generate a QR code.");
    return;
  }

  preValue = qrValue;
  generateBtn.innerText = "Generating QR Code...";

  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
  });
});

qrInput.addEventListener("input", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
  }
});
