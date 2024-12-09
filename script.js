const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img");

let preValue = "";

const setBackgroundImage = async () => {
  const apiUrl = "https://api.unsplash.com/photos/random?orientation=landscape&query=nature";

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch image from Unsplash.");

    const data = await response.json();
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  } catch (error) {
    console.error("Error fetching Unsplash background:", error);

    document.body.style.backgroundImage = "url('./assets/background.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }
};

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

setBackgroundImage();