document.addEventListener("DOMContentLoaded", function () {
    // Intersection Observer setup for scrolling elements
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled'); // Add class when in view
            } else {
                entry.target.classList.remove('scrolled'); // Remove class when out of view
            }
        });
    }, {
        threshold: 0.5  // Trigger when 50% of the element is in view
    });

    // Observe elements with the 'scroll-element' class
    const scrollElements = document.querySelectorAll('.scroll-element');
    scrollElements.forEach(element => observer.observe(element));

    // Fetch dog image button click handler
    const apiButton = document.getElementById("apiButton");
    const apiOutput = document.getElementById("apiOutput");

    if (apiButton && apiOutput) {
        apiButton.addEventListener("click", async function () {
            apiButton.innerText = "Loading...";

            try {
                // Fetch data from the Dog API
                const response = await fetch("https://dog.ceo/api/breeds/image/random");
                const data = await response.json();

                if (response.ok) {
                    apiOutput.innerHTML = `
                        <img src="${data.message}" alt="Random Dog" style="max-width: 100%; border-radius: 10px;">
                    `;
                } else {
                    apiOutput.innerHTML = `<p>Error fetching image: ${data.message}</p>`;
                }
            } catch (error) {
                apiOutput.innerHTML = `<p>Error: ${error.message}</p>`;
            } finally {
                apiButton.innerText = "Fetch API Data";
            }
        });
    }
});
